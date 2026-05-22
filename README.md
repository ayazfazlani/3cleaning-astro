# H3cleaning Service — Astro Site

Professional cleaning, junk removal, and pressure washing website for Tri-Cities, WA.

## Setup

```sh
npm install
cp .env.example .env
# Edit .env with your SMTP credentials
npm run dev
```

## Email (contact form)

The contact form sends mail via `/api/contact` using SMTP settings in `.env`:

| Variable | Description |
|----------|-------------|
| `SMTP_HOST` | SMTP server (e.g. `smtp.gmail.com`) |
| `SMTP_PORT` | Usually `587` |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password or app password |
| `CONTACT_FROM_EMAIL` | Sender address |
| `CONTACT_TO_EMAIL` | Inbox that receives form submissions |

For production, run with the Node adapter (`npm run build` then `node ./dist/server/entry.mjs` or your host’s Node process).

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Local dev server at `localhost:4321` |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
