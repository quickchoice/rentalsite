import ProductClientPage from '@/app/product/product-client-page';
import { products } from '@/lib/data';

export function generateStaticParams() {
  return products.map(product => ({ productId: product.id }));
}

export default async function ProductByIdPage({ params }) {
  const { productId } = await params;
  return <ProductClientPage productId={productId} />;
}
