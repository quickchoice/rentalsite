import { absoluteUrl, getSiteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/']
      }
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: getSiteUrl()
  };
}
