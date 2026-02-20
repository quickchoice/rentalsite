'use client';

import CartBubble from '@/components/CartBubble';
import CartDrawer from '@/components/CartDrawer';
import UtilityHeader from '@/components/UtilityHeader';

export default function RentalsShell({ children, backHref }) {
  return (
    <>
      <UtilityHeader backHref={backHref} />
      {children}
      <CartBubble />
      <CartDrawer />
    </>
  );
}
