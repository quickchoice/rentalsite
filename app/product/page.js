import ProductClientPage from '@/app/product/product-client-page';
import { products } from '@/lib/data';

export default function ProductPage() {
  return <ProductClientPage productId={products[0]?.id || ''} />;
}
