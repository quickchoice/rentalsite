import BundleClientPage from '@/app/bundle/bundle-client-page';
import { bundles } from '@/lib/data';

export function generateStaticParams() {
  return bundles.map(bundle => ({ bundleId: bundle.id }));
}

export default async function BundleByIdPage({ params }) {
  const { bundleId } = await params;
  return <BundleClientPage bundleId={bundleId} />;
}
