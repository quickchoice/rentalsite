'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getCartCount, getCartSubtotal } from '@/lib/cart';
import { products } from '@/lib/data';

const ORDER_META_KEY = 'qc_order_meta';
const CART_KEY = 'qc_cart';
const DEFAULT_ORDER_META = { startDate: '', endDate: '', location: '' };
const validLocations = new Set(['charleston', 'myrtle-beach']);

const StoreContext = createContext(null);
const validProductIds = new Set(products.map(product => product.id));

function sanitizeCart(cart) {
  if (!Array.isArray(cart)) return [];
  return cart
    .filter(line => line && validProductIds.has(line.productId))
    .map(line => ({ productId: line.productId, qty: Math.max(1, Number(line.qty) || 1) }));
}

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function sanitizeOrderMeta(orderMeta) {
  const next = orderMeta && typeof orderMeta === 'object' ? orderMeta : {};
  const location = validLocations.has(next.location) ? next.location : '';
  return {
    startDate: typeof next.startDate === 'string' ? next.startDate : '',
    endDate: typeof next.endDate === 'string' ? next.endDate : '',
    location
  };
}

export function StoreProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderMeta, setOrderMeta] = useState(DEFAULT_ORDER_META);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setOrderMeta(sanitizeOrderMeta(readJson(ORDER_META_KEY, DEFAULT_ORDER_META)));
    setCart(sanitizeCart(readJson(CART_KEY, [])));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(ORDER_META_KEY, JSON.stringify(sanitizeOrderMeta(orderMeta)));
  }, [ready, orderMeta]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [ready, cart]);

  const value = useMemo(() => {
    const cartCount = getCartCount(cart);
    const subtotal = getCartSubtotal(cart, orderMeta);

    return {
      ready,
      cartOpen,
      setCartOpen,
      orderMeta,
      setOrderMeta,
      setLocation(location) {
        if (!validLocations.has(location)) return;
        setOrderMeta(prev => ({ ...sanitizeOrderMeta(prev), location }));
      },
      cart,
      cartCount,
      subtotal,
      addToCart(productId, qty = 1) {
        setCart(prev => {
          const next = sanitizeCart(prev);
          const existing = next.find(line => line.productId === productId);
          if (existing) existing.qty += qty;
          else next.push({ productId, qty });
          return sanitizeCart(next);
        });
      },
      addBundle(items) {
        setCart(prev => {
          const next = sanitizeCart(prev);
          items.forEach(({ productId, qty }) => {
            const existing = next.find(line => line.productId === productId);
            if (existing) existing.qty += qty;
            else next.push({ productId, qty });
          });
          return sanitizeCart(next);
        });
      },
      updateQty(productId, delta) {
        setCart(prev =>
          sanitizeCart(prev).map(line =>
            line.productId === productId
              ? { ...line, qty: Math.max(1, line.qty + delta) }
              : line
          )
        );
      },
      removeFromCart(productId) {
        setCart(prev => sanitizeCart(prev).filter(line => line.productId !== productId));
      },
      clearCart() {
        setCart([]);
      }
    };
  }, [ready, cartOpen, orderMeta, cart]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used inside StoreProvider');
  }
  return context;
}
