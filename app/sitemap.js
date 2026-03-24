import { getAllIndexablePaths } from '@/lib/seo-content';
import { absoluteUrl } from '@/lib/site';

export default function sitemap() {
  const now = new Date();

  return getAllIndexablePaths().map(path => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === '/' || path === '/rentals' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/rentals') || path.startsWith('/locations') ? 0.9 : 0.7
  }));
}
