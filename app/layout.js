import './globals.css';
import Providers from '@/app/providers';

export const metadata = {
  title: 'QuickChoice Rentals',
  description: 'Beach and baby gear rental storefront'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
