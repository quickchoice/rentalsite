import { BASE_PATH } from '@/lib/paths';

export const SITE_NAME = 'QuickChoice Rentals';
export const SITE_URL = 'https://quickchoice.net';
export const DEFAULT_OG_IMAGE_PATH = '/rentals/visual/carosel-images/myrtle2.jpg';

function normalizeSiteUrl(value) {
  const nextValue = value || SITE_URL;
  return nextValue.endsWith('/') ? nextValue.slice(0, -1) : nextValue;
}

export function getSiteUrl() {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || SITE_URL);
}

export function absoluteUrl(path = '/') {
  if (!path) return `${getSiteUrl()}${BASE_PATH}`;
  if (/^https?:\/\//.test(path)) return path;

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getSiteUrl()}${BASE_PATH}${normalizedPath}`;
}

export function buildMetadata({
  title,
  description,
  path = '/',
  keywords = [],
  image = DEFAULT_OG_IMAGE_PATH,
  noindex = false
}) {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const robots = {
    index: !noindex,
    follow: true,
    googleBot: {
      index: !noindex,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  };

  return {
    title,
    description,
    keywords: keywords.filter(Boolean),
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl]
    },
    robots
  };
}
