'use client';

import styles from '@/components/CartBubble.module.css';
import { useStore } from '@/context/StoreContext';

export default function CartBubble() {
  const { cartOpen, setCartOpen, cartCount } = useStore();

  if (cartOpen) return null;

  return (
    <button className={styles.bubble} type="button" onClick={() => setCartOpen(true)} aria-label="Open cart">
      <span className={styles.icon}>🛒</span>
      <span className={styles.count}>{cartCount}</span>
    </button>
  );
}
