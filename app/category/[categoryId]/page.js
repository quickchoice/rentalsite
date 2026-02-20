import CategoryClientPage from '@/app/category/category-client-page';
import { categories } from '@/lib/data';

export function generateStaticParams() {
  return categories.map(category => ({ categoryId: category.id }));
}

export default function CategoryByIdPage({ params }) {
  return <CategoryClientPage categoryId={params.categoryId} />;
}
