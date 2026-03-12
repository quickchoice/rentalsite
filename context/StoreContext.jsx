'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getCartCount, getCartSubtotal } from '@/lib/cart';
import { bundles, products } from '@/lib/data';

const ORDER_META_KEY = 'qc_order_meta';
const CART_KEY = 'qc_cart';
const DEFAULT_ORDER_META = { startDate: '', endDate: '', location: 'charleston' };
const validLocations = new Set(['charleston', 'myrtle-beach']);

const StoreContext = createContext(null);
const validProductIds = new Set(products.map(product => product.id));
const validBundleIds = new Set(bundles.map(bundle => bundle.id));

function sanitizeCart(cart) {
  if (!Array.isArray(cart)) return [];
  return cart.flatMap(line => {
    if (!line || typeof line !== 'object') return [];

    if (line.type === 'bundle' && validBundleIds.has(line.bundleId)) {
      return [{
        type: 'bundle',
        bundleId: line.bundleId,
        qty: Math.max(1, Number(line.qty) || 1)
      }];
    }

    if (!validProductIds.has(line.productId)) return [];
    return [{
      type: 'product',
      productId: line.productId,
      qty: Math.max(1, Number(line.qty) || 1),
      discountPercent: Math.max(0, Math.min(100, Math.floor(Number(line.discountPercent) || 0)))
    }];
  });
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
  const location = validLocations.has(next.location) ? next.location : DEFAULT_ORDER_META.location;
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
          const existing = next.find(
            line => line.type === 'product' && line.productId === productId && line.discountPercent === 0
          );
          if (existing) existing.qty += qty;
          else next.push({ type: 'product', productId, qty, discountPercent: 0 });
          return sanitizeCart(next);
        });
      },
      addBundle(bundleId, qty = 1) {
        if (!validBundleIds.has(bundleId)) return;
        setCart(prev => {
          const next = sanitizeCart(prev);
          const existing = next.find(line => line.type === 'bundle' && line.bundleId === bundleId);
          if (existing) existing.qty += Math.max(1, Number(qty) || 1);
          else next.push({ type: 'bundle', bundleId, qty: Math.max(1, Number(qty) || 1) });
          return sanitizeCart(next);
        });
      },
      updateQty(target, delta) {
        setCart(prev =>
          sanitizeCart(prev).map(line =>
            (
              (target.type === 'bundle' && line.type === 'bundle' && line.bundleId === target.bundleId) ||
              (target.type !== 'bundle' && line.type === 'product' && line.productId === target.productId && line.discountPercent === (target.discountPercent || 0))
            )
              ? { ...line, qty: Math.max(1, line.qty + delta) }
              : line
          )
        );
      },
      removeFromCart(target) {
        setCart(prev =>
          sanitizeCart(prev).filter(
            line => !(
              (target.type === 'bundle' && line.type === 'bundle' && line.bundleId === target.bundleId) ||
              (target.type !== 'bundle' && line.type === 'product' && line.productId === target.productId && line.discountPercent === (target.discountPercent || 0))
            )
          )
        );
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
