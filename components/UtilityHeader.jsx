'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '@/components/UtilityHeader.module.css';
import { useStore } from '@/context/StoreContext';
import { withBasePath } from '@/lib/paths';

export default function UtilityHeader({ backHref = '/category/baby' }) {
  const router = useRouter();
  const { cartCount, setCartOpen } = useStore();

  function handleBack() {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
      return;
    }
    router.push(backHref);
  }

  return (
    <header className={styles.header}>
      <button className={styles.back} type="button" onClick={handleBack} aria-label="Go back">
        ←
      </button>
      <Link className={styles.logoWrap} href="/" aria-label="QuickChoice Rental home">
        <Image src={withBasePath('/rentals/visual/logo.png')} alt="QuickChoice Rental" width={168} height={52} className={styles.logo} />
      </Link>
      <button className={styles.cart} type="button" onClick={() => setCartOpen(true)} aria-label="Open cart">
        <span>🛒</span>
        <span>{cartCount}</span>
      </button>
    </header>
  );
}
