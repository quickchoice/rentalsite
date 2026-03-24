import { notFound } from 'next/navigation';
import SeoPage from '@/components/SeoPage';
import { products } from '@/lib/data';
import { getAllRentalPages, getRentalPage } from '@/lib/seo-content';
import { buildMetadata } from '@/lib/site';
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildLocalBusinessSchema,
  buildProductSchema
} from '@/lib/structured-data';

function compact(list) {
  return list.filter(Boolean);
}

function simplifyIntro(paragraph) {
  if (!paragraph) return '';
  const sentences = paragraph.match(/[^.!?]+[.!?]/g) || [paragraph];
  return sentences
    .map(sentence => sentence.trim())
    .filter(sentence => {
      const normalized = sentence.toLowerCase();
      return !(
        normalized.startsWith('this page') ||
        normalized.startsWith('the page') ||
        normalized.includes('search') ||
        normalized.includes('seo') ||
        normalized.includes('ai ')
      );
    })
    .slice(0, 2)
    .join(' ');
}

function isCustomerFaq(item) {
  const question = item?.question?.toLowerCase() || '';
  return !(
    question.includes('main service area') ||
    question.includes('one of your main service areas') ||
    question.includes('what this page covers')
  );
}

function getBrowseCta(page) {
  const babySlugs = new Set([
    'baby-gear',
    'crib-rentals',
    'stroller-rentals',
    'pack-and-play-rentals',
    'high-chair-rentals',
    'sleep-essentials-bundle',
    'baby-basics-bundle',
    'car-safety-bundle'
  ]);
  const beachSlugs = new Set([
    'beach-gear',
    'accessibility-equipment',
    'beach-chair-rentals',
    'umbrella-rentals',
    'beach-wagon-rentals',
    'beach-wheelchair-rentals',
    'family-beach-bundle'
  ]);

  if (babySlugs.has(page.slug)) return { href: '/category/baby', label: 'Browse Baby Gear' };
  if (beachSlugs.has(page.slug)) return { href: '/category/beach', label: 'Browse Beach Gear' };
  return { href: '/rentals', label: 'Browse Rentals' };
}

export function generateStaticParams() {
  return getAllRentalPages().map(page => ({ slug: page.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getRentalPage(slug);
  if (!page) return {};

  return buildMetadata({
    title: page.metaTitle || `${page.title} | QuickChoice Rentals`,
    description: page.metaDescription || page.intro?.[0],
    path: page.path,
    image: page.image,
    keywords: [
      page.primaryKeyword,
      'QuickChoice Rentals',
      'Myrtle Beach rentals',
      'Charleston rentals'
    ]
  });
}

export default async function RentalLandingPage({ params }) {
  const { slug } = await params;
  const page = getRentalPage(slug);
  if (!page) notFound();

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Rentals', href: '/rentals' },
    { label: page.shortTitle || page.title, href: page.path }
  ];

  const primaryProduct = page.primaryProductId
    ? products.find(product => product.id === page.primaryProductId)
    : null;
  const intro = [simplifyIntro(page.intro?.[0])].filter(Boolean);
  const cardSections = (page.cardSections || []).slice(0, 1).map(section => ({
    ...section,
    intro: null
  }));
  const contentSections =
    page.slug === 'baby-gear' || page.slug === 'beach-gear'
      ? (page.contentSections || []).slice(0, 1)
      : [];
  const faqs = (page.faqs || []).filter(isCustomerFaq).slice(0, 2);
  const relatedLinks = (page.relatedLinks || []).slice(0, 2);
  const primaryCta = getBrowseCta(page);

  const structuredData = compact([
    buildBreadcrumbSchema(breadcrumbs),
    buildFaqSchema(faqs),
    buildLocalBusinessSchema({
      path: page.path,
      description: page.metaDescription || intro[0] || page.intro?.[0],
      image: page.image
    }),
    primaryProduct
      ? buildProductSchema({
          path: page.path,
          name: primaryProduct.name,
          description: primaryProduct.shortDescription,
          image: primaryProduct.imageUrl,
          category: primaryProduct.categoryId === 'beach' ? 'Beach gear rental' : 'Baby gear rental'
        })
      : null
  ]);

  return (
    <SeoPage
      breadcrumbs={breadcrumbs}
      title={page.title}
      intro={intro}
      heroCtas={[
        primaryCta,
        { href: '/checkout', label: 'Choose Dates', kind: 'secondary' }
      ]}
      cardSections={cardSections}
      contentSections={contentSections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      structuredData={structuredData}
    />
  );
}
