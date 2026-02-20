# QuickChoice Rentals (Next.js)

This project is now structured as a Next.js App Router application.

## Routes
- `/` landing scene with category zones
- `/checkout` trip date selection
- `/category/baby` and `/category/beach` category browsing and quick add
- `/product/<product-id>` product details
- `/summary` order summary and checkout stub
- `/empty-cart` empty cart fallback

## Project Structure
- `app/globals.css`: shared tokens, utility classes, global resets
- `app/**/page.module.css`: page-specific styles only
- `components/`: reusable UI pieces (header, cart drawer, cart bubble, shell)
- `context/StoreContext.jsx`: persisted cart + order state
- `lib/data.js`: centralized categories/products/bundles
- `lib/cart.js`: shared cart/date/math helpers
- `public/rentals`: static rental assets

## Notes
- Legacy static files remain in `docs/` for reference.
- `vending` content was left untouched.
- Stripe checkout is still a frontend stub (`/summary`) and needs backend session creation wiring.
