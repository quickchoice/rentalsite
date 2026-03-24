import { notFound } from 'next/navigation';
import SeoPage from '@/components/SeoPage';
import { getAllResourcePages, getResourcePage } from '@/lib/seo-content';
import { buildMetadata } from '@/lib/site';
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildLocalBusinessSchema
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
        normalized.startsWith('this guide') ||
        normalized.includes('transactional') ||
        normalized.includes('topical authority')
      );
    })
    .slice(0, 2)
    .join(' ');
}

export function generateStaticParams() {
  return getAllResourcePages().map(page => ({ slug: page.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getResourcePage(slug);
  if (!page) return {};

  return buildMetadata({
    title: page.metaTitle || `${page.title} | QuickChoice Rentals`,
    description: page.metaDescription || page.intro?.[0],
    path: page.path,
    image: page.image,
    keywords: [page.primaryKeyword, 'QuickChoice Rentals resources']
  });
}

export default async function ResourcePage({ params }) {
  const { slug } = await params;
  const page = getResourcePage(slug);
  if (!page) notFound();
  const intro = [simplifyIntro(page.intro?.[0])].filter(Boolean);
  const cardSections = (page.cardSections || []).slice(0, 1).map(section => ({
    ...section,
    intro: null
  }));
  const faqs = (page.faqs || []).slice(0, 2);
  const relatedLinks = (page.relatedLinks || []).slice(0, 2);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Resources', href: '/resources' },
    { label: page.title, href: page.path }
  ];

  const structuredData = compact([
    buildBreadcrumbSchema(breadcrumbs),
    buildFaqSchema(faqs),
    buildLocalBusinessSchema({
      path: page.path,
      description: intro[0] || page.intro?.[0],
      image: page.image
    })
  ]);

  return (
    <SeoPage
      breadcrumbs={breadcrumbs}
      title={page.title}
      intro={intro}
      heroCtas={[
        { href: '/rentals', label: 'Browse Rentals' },
        { href: '/checkout', label: 'Choose Dates', kind: 'secondary' }
      ]}
      cardSections={cardSections}
      contentSections={page.contentSections || []}
      faqs={faqs}
      relatedLinks={relatedLinks}
      structuredData={structuredData}
    />
  );
}
