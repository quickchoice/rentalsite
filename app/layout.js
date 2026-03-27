import './globals.css';
import Script from 'next/script';
import { headers } from 'next/headers';
import Providers from '@/app/providers';
import { Analytics } from '@vercel/analytics/next';
import CartBubble from '@/components/CartBubble';
import CartDrawer from '@/components/CartDrawer';
import ContactBubble from '@/components/ContactBubble';
import StructuredData from '@/components/StructuredData';
import { withBasePath } from '@/lib/paths';
import { buildOrganizationSchema } from '@/lib/structured-data';
import { getSiteUrl, SITE_NAME } from '@/lib/site';

const GOOGLE_TAG_ID = 'AW-18041825199';
const GOOGLE_TAG_MANAGER_ID = 'GTM-5K466CPN';

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

export default async function RootLayout({ children }) {
  const pathname = (await headers()).get('x-pathname') || '';
  const shouldIncludeGoogleTag = pathname !== '/vending' && !pathname.startsWith('/Vending');
  const appBackgroundImage = `url('${withBasePath('/rentals/visual/BACKGROUND.png')}')`;

  return (
    <html lang="en" suppressHydrationWarning>
      {shouldIncludeGoogleTag ? (
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GOOGLE_TAG_MANAGER_ID}');
          `}
        </Script>
      ) : null}
      <body suppressHydrationWarning style={{ '--app-bg-image': appBackgroundImage }}>
        {shouldIncludeGoogleTag ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GOOGLE_TAG_MANAGER_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        ) : null}
        {shouldIncludeGoogleTag ? (
          <>
            <Script
              id="google-tag-src"
              src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-tag-config" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GOOGLE_TAG_ID}');
              `}
            </Script>
          </>
        ) : null}
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
