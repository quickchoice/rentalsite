import ContactClientPage from '@/app/contact/contact-client-page';
import { buildMetadata } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Contact QuickChoice Rentals | Myrtle Beach & Charleston Rentals',
  description:
    'Contact QuickChoice Rentals for baby gear, beach gear, bundle, and beach wheelchair rental questions in Myrtle Beach and Charleston, SC.',
  path: '/contact',
  keywords: [
    'contact QuickChoice Rentals',
    'Myrtle Beach rental delivery',
    'Charleston rental delivery'
  ]
});

export default function ContactPage() {
  return <ContactClientPage />;
}
