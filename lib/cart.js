import { bundles, products } from '@/lib/data';
export const DEFAULT_DELIVERY_FEE = 10;
export const DEFAULT_DELIVERY_FEE_CENTS = DEFAULT_DELIVERY_FEE * 100;
export const DEFAULT_EXPEDITE_FEE = 10;
export const DEFAULT_EXPEDITE_FEE_CENTS = DEFAULT_EXPEDITE_FEE * 100;

// Sun-Soaked Savings: automatic tiered promo based on rental subtotal
export const PROMO_TIERS = [
  { minSubtotal: 595, discount: 150 },
  { minSubtotal: 495, discount: 100 },
  { minSubtotal: 395, discount: 75 },
  { minSubtotal: 295, discount: 50 }
];

export function getPromoDiscount(subtotal) {
  for (const tier of PROMO_TIERS) {
    if (subtotal >= tier.minSubtotal) return tier.discount;
  }
  return 0;
}

// Bundle Builder: discount tiers based on unique product line count
export const BUNDLE_TIERS = [
  { minLines: 7, discountPercent: 15, freeDelivery: true },
  { minLines: 5, discountPercent: 15, freeDelivery: false },
  { minLines: 3, discountPercent: 10, freeDelivery: false },
];

export function getBundleTier(cart) {
  if (!Array.isArray(cart)) return null;
  const lineCount = cart.filter(l => l.type === 'product').length;
  for (const tier of BUNDLE_TIERS) {
    if (lineCount >= tier.minLines) return tier;
  }
  return null;
}

export function getBundleDiscount(cart, subtotal) {
  const tier = getBundleTier(cart);
  if (!tier) return 0;
  return Math.round(subtotal * tier.discountPercent) / 100;
}

const DELIVERY_FEE = DEFAULT_DELIVERY_FEE;
const EXPEDITE_FEE = DEFAULT_EXPEDITE_FEE;
const ONE_DAY_MS = 86400000;
const bundleById = new Map(bundles.map(bundle => [bundle.id, bundle]));

export function parseDateLocal(value) {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

export function formatDateLocal(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getProductById(id) {
  return products.find(product => product.id === id);
}

export function getBundleById(id) {
  return bundleById.get(id);
}

export function getBundleBasePricePerDay(bundle) {
  if (!bundle) return 0;
  return bundle.items.reduce((sum, item) => {
    const product = getProductById(item.productId);
    if (!product) return sum;
    return sum + product.pricePerDay * item.qty;
  }, 0);
}

export function getDayCount(orderMeta) {
  const start = parseDateLocal(orderMeta.startDate);
  const end = parseDateLocal(orderMeta.endDate);
  if (!start || !end) return 1;
  return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / 86400000));
}

export function getCartCount(cart) {
  return cart.reduce((sum, line) => sum + line.qty, 0);
}

export function getCartSubtotal(cart, orderMeta) {
  const days = getDayCount(orderMeta);
  return cart.reduce((sum, line) => {
    if (line.type === 'bundle' && line.bundleId) {
      const bundle = getBundleById(line.bundleId);
      if (!bundle) return sum;
      return sum + bundle.pricePerDay * line.qty * days;
    }

    const product = getProductById(line.productId);
    if (!product) return sum;
    const discountPercent = Math.max(0, Math.min(100, Number(line.discountPercent) || 0));
    const discountedPricePerDay = product.pricePerDay * ((100 - discountPercent) / 100);
    return sum + discountedPricePerDay * line.qty * days;
  }, 0);
}

export function getDeliveryFee(cart) {
  if (!Array.isArray(cart) || !cart.length) return 0;
  const tier = getBundleTier(cart);
  if (tier?.freeDelivery) return 0;
  return DELIVERY_FEE;
}

export function isExpeditedOrder(orderMeta, now = new Date()) {
  const start = parseDateLocal(orderMeta?.startDate);
  if (!start) return false;

  const today = formatDateLocal(now);
  if (orderMeta?.startDate === today) {
    return true;
  }

  const diffMs = start.getTime() - now.getTime();
  return diffMs > 0 && diffMs <= ONE_DAY_MS;
}

export function getExpediteFee(orderMeta) {
  return isExpeditedOrder(orderMeta) ? EXPEDITE_FEE : 0;
}

export function formatMoney(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}
