'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '@/components/CartBubble.module.css';
import { useStore } from '@/context/StoreContext';

export default function CartBubble() {
  const { cartOpen, setCartOpen, cartCount } = useStore();
  const [bump, setBump] = useState(false);
  const previousCountRef = useRef(cartCount);

  useEffect(() => {
    if (cartCount > previousCountRef.current) {
      setBump(true);
      const timeout = window.setTimeout(() => setBump(false), 420);
      previousCountRef.current = cartCount;
      return () => window.clearTimeout(timeout);
    }
    previousCountRef.current = cartCount;
    return undefined;
  }, [cartCount]);

  if (cartOpen) return null;

  return (
    <button
      className={`${styles.bubble} ${bump ? styles.bounce : ''}`}
      type="button"
      onClick={() => setCartOpen(true)}
      aria-label="Open cart"
    >
      <span className={`${styles.icon} ${bump ? styles.iconBounce : ''}`}>🛒</span>
      <span className={`${styles.count} ${bump ? styles.countBounce : ''}`}>{cartCount}</span>
    </button>
  );
}
