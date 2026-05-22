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

### Deploy on Vercel

1. Push the repo and import the project in [Vercel](https://vercel.com).
2. Add the same variables from `.env` in **Project → Settings → Environment Variables**.
3. Deploy — the `@astrojs/vercel` adapter serves static pages and the `/api/contact` form endpoint.

Do **not** set a custom output directory in Vercel; the adapter handles the build output.

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Local dev server at `localhost:4321` |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
