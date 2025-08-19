# Agent Aura — MVP (Vue + Auth + Billing)

This repo includes:
- **apps/frontend** — Vue 3 + Vite + Tailwind + Supabase Auth
- **apps/server** — Express API with Stripe Checkout + webhook
- **render.yaml** — Render Blueprint to deploy both from one GitHub repo

## Local Dev
```bash
# Frontend
cd apps/frontend
cp .env.example .env
npm i
npm run dev   # http://localhost:5173

# Server
cd ../server
cp .env.example .env
npm i
npm run dev   # http://localhost:8788
```

## Deploy on Render
- Push repo to GitHub
- Render → **New → Blueprint** → select this repo
- Add backend env vars (see apps/server/.env.example)
- Deploy; frontend gets `VITE_API_BASE` automatically from the server URL
