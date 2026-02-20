import CategoryClientPage from '@/app/category/category-client-page';

export default async function CategoryPage({ searchParams }) {
  const params = await searchParams;
  const categoryId = typeof params?.cat === 'string' ? params.cat : 'baby';

  return <CategoryClientPage categoryId={categoryId} />;
}
