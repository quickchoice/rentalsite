import { redirect } from 'next/navigation';

// This page has been merged into the homepage as an inline section.
// next.config.mjs handles the 301 redirect in server mode.
// This fallback handles static export mode.
export default function HowItWorksPage() {
  redirect('/');
}
