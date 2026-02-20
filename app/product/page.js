import ProductClientPage from '@/app/product/product-client-page';

export default async function ProductPage({ searchParams }) {
  const params = await searchParams;
  const productId = typeof params?.id === 'string' ? params.id : '';

  return <ProductClientPage productId={productId} />;
}
