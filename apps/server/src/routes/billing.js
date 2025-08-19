
import { Router } from 'express'
import Stripe from 'stripe'
import bodyParser from 'body-parser'

const r = Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

// Create Checkout Session
r.post('/create-checkout-session', async (req, res) => {
  try {
    const map = {
      starter: process.env.STRIPE_PRICE_ID_STARTER,
      pro: process.env.STRIPE_PRICE_ID_PRO,
      team: process.env.STRIPE_PRICE_ID_TEAM
    }
    const priceId = map[req.body.priceId] || req.body.priceId
    if (!priceId) return res.status(400).json({ error: 'No price configured' })
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}?checkout=success`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/pricing?checkout=cancel`,
    })
    res.json({ sessionUrl: session.url })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Failed to create checkout session' })
  }
})

// Webhook (raw body)
r.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  try {
    const event = Stripe.webhooks.constructEvent(req.body, sig, secret)
    switch(event.type){
      case 'checkout.session.completed':
        console.log('Checkout completed', event.data.object.id)
        break
      case 'customer.subscription.updated':
      case 'customer.subscription.created':
      case 'customer.subscription.deleted':
        console.log('Subscription lifecycle:', event.type)
        break
      default:
        console.log('Unhandled event:', event.type)
    }
    res.json({ received: true })
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message)
    res.status(400).send(`Webhook Error: ${err.message}`)
  }
})

export default r
