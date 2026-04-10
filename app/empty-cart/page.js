import { redirect } from 'next/navigation';

// Empty cart is no longer a dead-end page.
// next.config.mjs handles the redirect in server mode.
// This fallback handles static export mode.
export default function EmptyCartPage() {
  redirect('/category/baby');
}
