import { bundles, products } from '@/lib/data';
export const DEFAULT_DELIVERY_FEE = 10;
export const DEFAULT_DELIVERY_FEE_CENTS = DEFAULT_DELIVERY_FEE * 100;
const DELIVERY_FEE = DEFAULT_DELIVERY_FEE;
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
  return Array.isArray(cart) && cart.length ? DELIVERY_FEE : 0;
}

export function formatMoney(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}
