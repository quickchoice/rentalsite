import { notFound } from 'next/navigation';
import SeoPage from '@/components/SeoPage';
import {
  getAllLocationTopicPages,
  getLocationTopicPage
} from '@/lib/seo-content';
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
        normalized.startsWith('this page') ||
        normalized.includes('service area') ||
        normalized.includes('search')
      );
    })
    .slice(0, 2)
    .join(' ');
}

function getBrowseLink(topicSlug) {
  if (topicSlug === 'baby-gear-rentals') return { href: '/category/baby', label: 'Browse Baby Gear' };
  return { href: '/category/beach', label: 'Browse Beach Gear' };
}

function isCustomerFaq(item) {
  const question = item?.question?.toLowerCase() || '';
  return !question.includes('main service area');
}

export function generateStaticParams() {
  return getAllLocationTopicPages().map(page => ({
    locationSlug: page.location.slug,
    topicSlug: page.topicSlug
  }));
}

export async function generateMetadata({ params }) {
  const { locationSlug, topicSlug } = await params;
  const page = getLocationTopicPage(locationSlug, topicSlug);
  if (!page) return {};

  return buildMetadata({
    title: `${page.title} | QuickChoice Rentals`,
    description: page.intro?.[0],
    path: page.path,
    image: page.location.image,
    keywords: [
      page.primaryKeyword,
      `${page.location.shortName} rentals`,
      'QuickChoice Rentals'
    ]
  });
}

export default async function LocationTopicLandingPage({ params }) {
  const { locationSlug, topicSlug } = await params;
  const page = getLocationTopicPage(locationSlug, topicSlug);
  if (!page) notFound();
  const intro = [simplifyIntro(page.intro?.[0])].filter(Boolean);
  const cardSections = (page.cardSections || []).slice(0, 1).map(section => ({
    ...section,
    intro: null
  }));
  const contentSections = (page.contentSections || []).slice(0, 1);
  const faqs = (page.faqs || []).filter(isCustomerFaq).slice(0, 2);
  const relatedLinks = (page.relatedLinks || []).slice(0, 2);
  const browseLink = getBrowseLink(topicSlug);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: page.location.shortName, href: `/locations/${page.location.slug}` },
    { label: page.label, href: page.path }
  ];

  const structuredData = compact([
    buildBreadcrumbSchema(breadcrumbs),
    buildFaqSchema(faqs),
    buildLocalBusinessSchema({
      path: page.path,
      description: intro[0] || page.intro?.[0],
      image: page.location.image,
      areasServed: [page.location.name]
    })
  ]);

  return (
    <SeoPage
      breadcrumbs={breadcrumbs}
      title={page.title}
      intro={intro}
      heroCtas={[
        browseLink,
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
