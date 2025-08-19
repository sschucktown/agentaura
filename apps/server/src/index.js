
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import billing from './routes/billing.js'

const app = express()
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*'}))
app.use(express.json({ limit: '1mb' }))
app.use(morgan('dev'))

app.get('/', (_req, res) => res.json({ ok: true, name: 'Agent Aura API (MVP)' }))

// Billing routes
app.use('/api/billing', billing)

const PORT = process.env.PORT || 8788
app.listen(PORT, () => console.log(`API listening on :${PORT}`))
