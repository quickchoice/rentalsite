'use client';

import SeasonalPromoModal from '@/components/SeasonalPromoModal';
import UtilityHeader from '@/components/UtilityHeader';

export default function RentalsShell({ children, backHref }) {
  return (
    <>
      <UtilityHeader backHref={backHref} />
      <SeasonalPromoModal />
      {children}
    </>
  );
}
