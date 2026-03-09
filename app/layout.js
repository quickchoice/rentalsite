import './globals.css';
import Providers from '@/app/providers';
import { Analytics } from '@vercel/analytics/next';
import { withBasePath } from '@/lib/paths';

export const metadata = {
  title: 'QuickChoice Rentals',
  description: 'Beach and baby gear rental storefront'
};

export default function RootLayout({ children }) {
  const appBackgroundImage = `url('${withBasePath('/rentals/visual/BACKGROUND.png')}')`;

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning style={{ '--app-bg-image': appBackgroundImage }}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
