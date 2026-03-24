import './globals.css';
import Providers from '@/app/providers';
import { Analytics } from '@vercel/analytics/next';
import CartBubble from '@/components/CartBubble';
import CartDrawer from '@/components/CartDrawer';
import ContactBubble from '@/components/ContactBubble';
import StructuredData from '@/components/StructuredData';
import { withBasePath } from '@/lib/paths';
import { buildOrganizationSchema } from '@/lib/structured-data';
import { getSiteUrl, SITE_NAME } from '@/lib/site';

export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: SITE_NAME,
  description:
    'QuickChoice Rentals delivers baby gear, beach gear, bundles, and beach wheelchair rentals in Myrtle Beach, SC and Charleston, SC.',
  applicationName: SITE_NAME,
  openGraph: {
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website'
  }
};

export default function RootLayout({ children }) {
  const appBackgroundImage = `url('${withBasePath('/rentals/visual/BACKGROUND.png')}')`;

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning style={{ '--app-bg-image': appBackgroundImage }}>
        <StructuredData data={buildOrganizationSchema()} />
        <Providers>
          {children}
          <CartBubble />
          <CartDrawer />
          <ContactBubble />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
