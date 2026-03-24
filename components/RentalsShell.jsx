'use client';

import UtilityHeader from '@/components/UtilityHeader';

export default function RentalsShell({ children, backHref }) {
  return (
    <>
      <UtilityHeader backHref={backHref} />
      {children}
    </>
  );
}
