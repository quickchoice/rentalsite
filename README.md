# QuickChoice Rentals (Next.js)

This project is now structured as a Next.js App Router application.

## Stripe Checkout Status
- `/summary` now creates a real Stripe Checkout Session through `POST /api/checkout-session`.
- `/checkout/success` is the payment success return page and clears the cart.
- The server calculates pricing from `lib/data.js` (price/day x qty x rental days), so client-side price tampering is ignored.

## Routes
- `/` landing scene with category zones
- `/checkout` trip date selection
- `/category/baby` and `/category/beach` category browsing and quick add
- `/product/<product-id>` product details
- `/summary` order summary + Stripe checkout redirect
- `/checkout/success` Stripe success return
- `/empty-cart` empty cart fallback

## Project Structure
- `app/globals.css`: shared tokens, utility classes, global resets
- `app/**/page.module.css`: page-specific styles only
- `components/`: reusable UI pieces (header, cart drawer, cart bubble, shell)
- `context/StoreContext.jsx`: persisted cart + order state
- `lib/data.js`: centralized categories/products/bundles
- `lib/cart.js`: shared cart/date/math helpers
- `public/rentals`: static rental assets

## Deploy + Setup (Exact Steps)
1. Stripe: Create or log in to your Stripe account.
2. Stripe: Open `Developers -> API keys`.
3. Stripe: Copy your **Secret key** (starts with `sk_test_` for test mode).
4. Local dev: create `.env.local` in the project root with:

```bash
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
RESEND_API_KEY=re_your_resend_api_key
RESEND_FROM_EMAIL=dante.smith@quickchoice.net
ORDER_NOTIFY_EMAIL=dante.smith@quickchoice.net
NEXT_PUBLIC_BASE_PATH=
```

5. Install and run locally:

```bash
npm install
npm run dev
```

6. Open `http://localhost:3000`, add items to cart, go to summary, click `Pay Now`.
7. In Stripe test mode, use card `4242 4242 4242 4242` with any future date/CVC/ZIP.
8. Vercel: Import this GitHub repo as a new Vercel project.
9. Vercel: In project settings, add env var `STRIPE_SECRET_KEY` (Production + Preview).
10. Vercel: Keep `NEXT_PUBLIC_BASE_PATH` empty unless you intentionally deploy under a subpath.
11. Vercel: Deploy. Use your Vercel domain for live checkout.
12. Stripe: Add a webhook endpoint to `https://<your-domain>/api/stripe-webhook` and subscribe to `checkout.session.completed`.
13. Stripe: Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET` in Vercel.
14. Vercel: Add `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `ORDER_NOTIFY_EMAIL` env vars so paid checkouts email Dante.
15. Vercel Postgres (or Neon via Vercel integration): connect a database so webhook inserts are stored in `rental_transactions`.

## Important Notes
- GitHub Pages is static-only and cannot safely run Stripe secret-key server code.
- This repo now supports server-side Stripe session creation for Vercel/Node hosting.
- Paid checkout summaries are sent from the webhook to Dante and stored in `rental_transactions`.
- `RESEND_FROM_EMAIL` can be the same as `ORDER_NOTIFY_EMAIL`, but it must be a sender address/domain that Resend accepts for your account.
- You do **not** need to manually create Stripe products for this implementation; items are sent dynamically from your existing catalog in `lib/data.js`.
- Legacy static files remain in `docs/` for reference.
- `vending` content was left untouched.
