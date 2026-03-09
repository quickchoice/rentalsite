import CategoryClientPage from '@/app/category/category-client-page';
import { categories } from '@/lib/data';

export function generateStaticParams() {
  return categories.map(category => ({ categoryId: category.id }));
}

export default async function CategoryByIdPage({ params }) {
  const { categoryId } = await params;
  return <CategoryClientPage categoryId={categoryId} />;
}
