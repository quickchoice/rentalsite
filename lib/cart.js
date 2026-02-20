import { products } from '@/lib/data';

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
    const product = getProductById(line.productId);
    if (!product) return sum;
    return sum + product.pricePerDay * line.qty * days;
  }, 0);
}

export function formatMoney(value) {
  return `$${value.toFixed(0)}`;
}
