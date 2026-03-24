import { formatMoney } from '@/lib/cart';
import { bundles, products } from '@/lib/data';
import { withBasePath } from '@/lib/paths';

const productById = new Map(products.map(product => [product.id, product]));
const bundleById = new Map(bundles.map(bundle => [bundle.id, bundle]));

const locationImageBySlug = {
  'myrtle-beach-sc': withBasePath('/rentals/visual/carosel-images/myrtle2.jpg'),
  'charleston-sc': withBasePath('/rentals/visual/carosel-images/charleston3.jpg')
};

export const serviceLocations = {
  'myrtle-beach-sc': {
    slug: 'myrtle-beach-sc',
    name: 'Myrtle Beach, SC',
    shortName: 'Myrtle Beach',
    image: locationImageBySlug['myrtle-beach-sc'],
    summary:
      'QuickChoice Rentals delivers baby gear, beach gear, and beach wheelchair rentals in Myrtle Beach, South Carolina.',
    travelContext:
      'A simple way to skip the bulky extras and enjoy your stay sooner.',
    answerCards: [
      {
        title: 'What We Deliver',
        text:
          'QuickChoice Rentals offers baby gear, beach gear, bundles, and beach wheelchair rentals for Myrtle Beach vacations.'
      },
      {
        title: 'Who It Helps',
        text:
          'It is built for vacationing families, grandparents hosting a beach trip, and travelers who need easier shoreline access.'
      },
      {
        title: 'Why It Matters',
        text:
          'Delivered rentals cut down on packing stress, free up car space, and make check-in day easier.'
      }
    ],
    keyPoints: [
      'Service area focus: Myrtle Beach, South Carolina.',
      'Strong fit for beach-week travel with babies, toddlers, and family groups.',
      'Popular rentals include cribs, strollers, chairs, umbrellas, wagons, and beach wheelchairs.'
    ],
    contentSections: [
      {
        title: 'Why Myrtle Beach Families Rent Instead of Pack',
        paragraphs: [
          'Beach trips come with a lot to carry. Renting the essentials locally makes the drive easier and your setup much simpler once you arrive.'
        ]
      },
      {
        title: 'Delivery Areas',
        paragraphs: [
          'QuickChoice Rentals serves Myrtle Beach stays. The site intentionally keeps its service-area language narrow so search engines and guests can clearly understand where delivery is offered.'
        ],
        bullets: [
          'Myrtle Beach vacation stays',
          'Family trips that need baby gear delivered ahead of arrival',
          'Beach days that call for umbrella, chair, wagon, or wheelchair rentals'
        ]
      },
      {
        title: 'Popular Myrtle Beach Rentals',
        bullets: [
          'Crib rentals for families staying a full week',
          'Stroller rentals for walks, outings, and busy travel days',
          'Beach chair and umbrella rentals for easier shore setups',
          'Beach wheelchair rentals for smoother sand access'
        ]
      }
    ],
    faqs: [
      {
        question: 'What does QuickChoice Rentals deliver in Myrtle Beach?',
        answer:
          'QuickChoice Rentals delivers baby gear, beach gear, bundles, and beach wheelchair rentals in Myrtle Beach, SC.'
      },
      {
        question: 'Is Myrtle Beach one of your main service areas?',
        answer:
          'Yes. Myrtle Beach is one of the two core service areas on this site, along with Charleston, SC.'
      },
      {
        question: 'What Myrtle Beach rentals are most popular for families?',
        answer:
          'Cribs, pack n plays, strollers, high chairs, beach chairs, umbrellas, wagons, and beach wheelchairs are some of the most requested items.'
      }
    ]
  },
  'charleston-sc': {
    slug: 'charleston-sc',
    name: 'Charleston, SC',
    shortName: 'Charleston',
    image: locationImageBySlug['charleston-sc'],
    summary:
      'QuickChoice Rentals delivers baby gear, beach gear, and beach wheelchair rentals in Charleston, South Carolina.',
    travelContext:
      'A lighter, easier setup for family trips and beach days.',
    answerCards: [
      {
        title: 'What We Rent',
        text:
          'QuickChoice Rentals offers cribs, strollers, pack n plays, high chairs, beach gear, bundles, and beach accessibility rentals in Charleston.'
      },
      {
        title: 'Who It Is For',
        text:
          'It is designed for families visiting Charleston with babies or kids, plus travelers who need easier beach access equipment.'
      },
      {
        title: 'Why Guests Use It',
        text:
          'Guests use the service to avoid overpacking, reduce airport or road-trip stress, and get vacation gear delivered locally.'
      }
    ],
    keyPoints: [
      'Service area focus: Charleston, South Carolina.',
      'Useful for family trips that mix city plans with beach time.',
      'Popular Charleston rentals include cribs, strollers, pack n plays, umbrellas, wagons, and beach wheelchairs.'
    ],
    contentSections: [
      {
        title: 'Why Charleston Travelers Use Rental Delivery',
        paragraphs: [
          'When space is tight, renting the bigger items locally makes travel easier and helps you settle in faster.'
        ]
      },
      {
        title: 'Delivery Areas',
        paragraphs: [
          'QuickChoice Rentals serves Charleston stays. The messaging stays specific so there is no confusion about the site’s two core delivery markets: Charleston and Myrtle Beach.'
        ],
        bullets: [
          'Charleston vacation stays',
          'Family trips that need baby gear brought locally',
          'Beach-focused travel that benefits from rented mobility or comfort gear'
        ]
      },
      {
        title: 'Popular Charleston Rentals',
        bullets: [
          'Crib rentals for sleep-ready arrivals',
          'Stroller rentals for easier family outings',
          'Pack n play rentals for flexible sleeping arrangements',
          'Beach gear and beach wheelchair rentals for lower-stress day trips'
        ]
      }
    ],
    faqs: [
      {
        question: 'What does QuickChoice Rentals deliver in Charleston?',
        answer:
          'QuickChoice Rentals delivers baby gear, beach gear, bundles, and beach wheelchair rentals in Charleston, SC.'
      },
      {
        question: 'Is Charleston one of your main service areas?',
        answer:
          'Yes. Charleston is one of the two main service areas on the site, alongside Myrtle Beach, SC.'
      },
      {
        question: 'What Charleston rentals are most common for family trips?',
        answer:
          'Cribs, strollers, pack n plays, high chairs, beach umbrellas, wagons, and beach wheelchairs are some of the most common requests.'
      }
    ]
  }
};

const locationTopicDefinitions = {
  'baby-gear-rentals': {
    label: 'Baby Gear Rentals',
    getPage(location) {
      const isMyrtle = location.slug === 'myrtle-beach-sc';
      return {
        primaryKeyword: `baby gear rentals ${location.shortName} SC`,
        eyebrow: `${location.shortName} vacation baby gear delivery`,
        title: `Baby Gear Rentals in ${location.shortName}, SC`,
        intro: isMyrtle
          ? [
              'QuickChoice Rentals offers baby gear rentals in Myrtle Beach, SC for families who want the essentials waiting for them instead of packed in the trunk. The focus is simple: clean, practical gear that supports sleep, meals, and easier outings during a beach vacation.',
              'Popular Myrtle Beach baby gear rentals include cribs, pack n plays, strollers, high chairs, booster seats, monitors, and other stay-friendly essentials for families traveling with babies or toddlers.'
            ]
          : [
              'QuickChoice Rentals offers baby gear rentals in Charleston, SC for travelers who want to arrive lighter and settle in faster. The service is built for families visiting Charleston who need dependable sleep gear, stroller options, and meal-time essentials without bringing everything from home.',
              'Popular Charleston baby gear rentals include cribs, pack n plays, strollers, high chairs, booster seats, monitors, and other practical items that help family trips run more smoothly.'
            ],
        heroNote: `${location.name} is one of the two active QuickChoice Rentals service areas.`,
        answerCards: isMyrtle
          ? [
              {
                title: 'What We Rent',
                text:
                  'Myrtle Beach baby gear rentals include cribs, pack n plays, strollers, high chairs, booster seats, monitors, and related travel essentials.'
              },
              {
                title: 'Who It Is For',
                text:
                  'This page is for vacationing families who want a more comfortable Myrtle Beach stay without loading every large item into the car.'
              },
              {
                title: 'Why It Helps',
                text:
                  'Bulky gear is one of the hardest parts of a beach trip. Renting locally gives families the space and flexibility they need.'
              }
            ]
          : [
              {
                title: 'What We Rent',
                text:
                  'Charleston baby gear rentals include cribs, pack n plays, stroller options, high chairs, booster seats, monitors, and practical nursery travel gear.'
              },
              {
                title: 'Who It Is For',
                text:
                  'This page is for Charleston travelers who want fewer bags, simpler arrivals, and a more usable setup for babies or toddlers.'
              },
              {
                title: 'Why It Helps',
                text:
                  'Families visiting Charleston often need to travel light. Renting the biggest gear locally reduces the hardest packing decisions.'
              }
            ],
        keyPoints: isMyrtle
          ? [
              'Best fit for Myrtle Beach family vacations and longer coastal stays.',
              'Strong options for sleep, feeding, and stroller-friendly travel days.',
              'Easy next step: choose dates, then shop baby gear.'
            ]
          : [
              'Best fit for Charleston visits where light packing matters.',
              'Strong options for sleep, stroller use, and easy feeding setups.',
              'Easy next step: choose dates, then shop baby gear.'
            ],
        cardSections: [
          {
            title: `Popular ${location.shortName} Baby Gear Options`,
            intro:
              'These are the baby gear rental pages most likely to match high-intent family searches and practical vacation needs.',
            cards: [
              buildRentalIntentCard('crib-rentals'),
              buildRentalIntentCard('stroller-rentals'),
              buildRentalIntentCard('pack-and-play-rentals'),
              buildRentalIntentCard('high-chair-rentals')
            ]
          }
        ],
        contentSections: isMyrtle
          ? [
              {
                title: 'What Myrtle Beach Families Usually Need',
                paragraphs: [
                  'For Myrtle Beach stays, the most common rental questions revolve around sleep and beach-day mobility. Families want a crib or pack n play for consistent nights, a stroller for outings, and a high chair so meals feel normal in the rental.'
                ],
                bullets: [
                  'Crib rentals for longer stays',
                  'Pack n play rentals for flexible sleeping space',
                  'Stroller rentals for outings and walks',
                  'High chair rentals for easier family meals'
                ]
              },
              {
                title: 'Delivery Focus for Myrtle Beach Trips',
                paragraphs: [
                  'This page targets Myrtle Beach baby gear rentals specifically because the local travel pattern is different: more beach packing, more family equipment, and more value in keeping the vehicle clear for luggage and food.'
                ]
              }
            ]
          : [
              {
                title: 'What Charleston Families Usually Need',
                paragraphs: [
                  'For Charleston stays, families often prioritize the items that are hardest to fly with or fit into a smaller car. Cribs, pack n plays, strollers, and high chairs are the essentials most likely to improve the trip immediately.'
                ],
                bullets: [
                  'Crib rentals for better sleep after travel',
                  'Pack n play rentals for compact flexibility',
                  'Stroller rentals for family outings',
                  'High chair rentals for smoother meal times'
                ]
              },
              {
                title: 'Delivery Focus for Charleston Trips',
                paragraphs: [
                  'This page targets Charleston baby gear rentals with direct, answerable language so travelers and AI search systems can quickly identify what is available and where the service is offered.'
                ]
              }
            ],
        faqs: isMyrtle
          ? [
              {
                question: 'What baby gear can I rent in Myrtle Beach, SC?',
                answer:
                  'QuickChoice Rentals offers baby gear rentals in Myrtle Beach including cribs, pack n plays, strollers, high chairs, booster seats, monitors, and more.'
              },
              {
                question: 'What is the most requested Myrtle Beach baby rental?',
                answer:
                  'Crib rentals, stroller rentals, and pack n play rentals are some of the most common Myrtle Beach family searches and requests.'
              }
            ]
          : [
              {
                question: 'What baby gear can I rent in Charleston, SC?',
                answer:
                  'QuickChoice Rentals offers Charleston baby gear rentals including cribs, pack n plays, strollers, high chairs, booster seats, monitors, and other family travel essentials.'
              },
              {
                question: 'Why do families rent baby gear in Charleston?',
                answer:
                  'Most families rent to avoid overpacking and to make arrival day easier, especially when traveling with bulky sleep or feeding gear.'
              }
            ],
        relatedLinks: [
          buildRelatedLink(`/locations/${location.slug}`, `${location.shortName} rental delivery`, `See the full ${location.shortName} rental overview.`),
          buildRelatedLink('/rentals/baby-gear', 'Baby gear rentals overview', 'Compare the full baby gear category for both service areas.'),
          buildRelatedLink('/rentals/baby-basics-bundle', 'Baby basics bundle', 'Bundle together some of the most common family essentials.')
        ],
        footerCta: {
          title: `Ready to reserve baby gear in ${location.shortName}?`,
          text:
            'Choose your dates first, then shop the baby category or compare the most common rental pages for your trip.',
          links: [
            { href: '/checkout', label: 'Choose Your Dates' },
            { href: '/category/baby', label: 'Shop Baby Gear', kind: 'secondary' }
          ]
        }
      };
    }
  },
  'beach-gear-rentals': {
    label: 'Beach Gear Rentals',
    getPage(location) {
      const isMyrtle = location.slug === 'myrtle-beach-sc';
      return {
        primaryKeyword: `beach gear rentals ${location.shortName} SC`,
        eyebrow: `${location.shortName} beach setup rentals`,
        title: `Beach Gear Rentals in ${location.shortName}, SC`,
        intro: isMyrtle
          ? [
              'QuickChoice Rentals offers beach gear rentals in Myrtle Beach, SC for travelers who want an easier setup once they reach the shore. Instead of packing chairs, umbrellas, wagons, and games, guests can rent the gear that makes a beach day more usable.',
              'The Myrtle Beach beach gear lineup focuses on practical comfort and transport: beach chairs, umbrellas, wagons, carts, towels, and selected add-ons for family beach trips.'
            ]
          : [
              'QuickChoice Rentals offers beach gear rentals in Charleston, SC for travelers who want to keep their packing list light and still have the basics for a better beach day. The goal is straightforward: make it easier to enjoy the coast without bringing every large item along.',
              'The Charleston beach gear lineup includes chairs, umbrellas, wagons, carts, towels, and selected add-ons that support family beach travel.'
            ],
        heroNote: `${location.name} is one of the two active QuickChoice Rentals service areas.`,
        answerCards: isMyrtle
          ? [
              {
                title: 'What We Rent',
                text:
                  'Myrtle Beach beach gear rentals include chairs, umbrellas, wagons, carts, towels, and accessible beach-day equipment.'
              },
              {
                title: 'Who It Is For',
                text:
                  'This page is for families, friend groups, and beach travelers who want less hauling and a faster setup near the water.'
              },
              {
                title: 'Why It Helps',
                text:
                  'Beach gear takes up space quickly. Renting locally helps guests skip bulky packing and get straight to the vacation.'
              }
            ]
          : [
              {
                title: 'What We Rent',
                text:
                  'Charleston beach gear rentals include chairs, umbrellas, wagons, carts, towels, and beach-ready support items for easier day trips.'
              },
              {
                title: 'Who It Is For',
                text:
                  'This page is for Charleston travelers who want a lighter vehicle or luggage load without giving up beach comfort.'
              },
              {
                title: 'Why It Helps',
                text:
                  'Guests use rentals to avoid carrying oversized gear through a trip and to make the beach portion of the vacation easier.'
              }
            ],
        keyPoints: [
          `Service area focus: ${location.name}.`,
          'Popular gear includes beach chairs, umbrellas, wagons, carts, and beach wheelchair support.',
          'Strong next step for guests who already know they need beach-specific gear.'
        ],
        cardSections: [
          {
            title: `Popular ${location.shortName} Beach Gear Options`,
            intro: 'These rental pages match the beach comfort and transport items guests search for most often.',
            cards: [
              buildRentalIntentCard('beach-chair-rentals'),
              buildRentalIntentCard('umbrella-rentals'),
              buildRentalIntentCard('beach-wagon-rentals'),
              buildRentalIntentCard('family-beach-bundle')
            ]
          }
        ],
        contentSections: isMyrtle
          ? [
              {
                title: 'What Myrtle Beach Guests Usually Need',
                paragraphs: [
                  'Myrtle Beach beach gear searches are usually practical. Guests want shade, seats, and a better way to move everything to the sand. That is why chairs, umbrellas, and wagons matter so much on this market-specific page.'
                ],
                bullets: [
                  'Beach chair rentals for comfort',
                  'Umbrella rentals for shade',
                  'Beach wagon or cart rentals for transport',
                  'Optional add-ons for family beach play'
                ]
              },
              {
                title: 'Why This Page Is Location-Specific',
                paragraphs: [
                  'This page is written specifically for Myrtle Beach beach gear rentals rather than generic beach language. The goal is to make the location and the offer unmistakably clear for searchers and AI-generated summaries.'
                ]
              }
            ]
          : [
              {
                title: 'What Charleston Guests Usually Need',
                paragraphs: [
                  'Charleston beach gear searches often come from travelers who want a simple, dependable setup without packing bulky comfort items. Chairs, umbrellas, and wagons usually lead the list because they change the day immediately.'
                ],
                bullets: [
                  'Beach chair rentals for a better setup',
                  'Umbrella rentals for shade and comfort',
                  'Wagon or cart rentals for easier hauling',
                  'Add-ons for families traveling with kids'
                ]
              },
              {
                title: 'Why This Page Is Location-Specific',
                paragraphs: [
                  'This page is written specifically for Charleston beach gear rentals so the service area stays clear and the content is more useful for local-intent search.'
                ]
              }
            ],
        faqs: [
          {
            question: `What beach gear can I rent in ${location.shortName}, SC?`,
            answer:
              `QuickChoice Rentals offers beach gear rentals in ${location.shortName} including chairs, umbrellas, wagons, carts, towels, and selected beach-day add-ons.`
          },
          {
            question: `What are the most common ${location.shortName} beach gear rentals?`,
            answer:
              `Beach chair rentals, umbrella rentals, and beach wagon rentals are some of the strongest high-intent searches for ${location.shortName} travelers.`
          }
        ],
        relatedLinks: [
          buildRelatedLink(`/locations/${location.slug}`, `${location.shortName} rental delivery`, `See all rental categories available in ${location.shortName}.`),
          buildRelatedLink('/rentals/beach-gear', 'Beach gear overview', 'Compare the full beach gear category for both markets.'),
          buildRelatedLink('/rentals/beach-wheelchair-rentals', 'Beach wheelchair rentals', 'See the accessibility-focused beach rental page.')
        ],
        footerCta: {
          title: `Need beach gear in ${location.shortName}?`,
          text:
            'Choose your dates and then head into the beach category, or compare the most common product pages first.',
          links: [
            { href: '/checkout', label: 'Choose Your Dates' },
            { href: '/category/beach', label: 'Shop Beach Gear', kind: 'secondary' }
          ]
        }
      };
    }
  },
  'accessibility-rentals': {
    label: 'Accessibility Rentals',
    getPage(location) {
      const isMyrtle = location.slug === 'myrtle-beach-sc';
      return {
        primaryKeyword: `beach wheelchair rentals ${location.shortName} SC`,
        eyebrow: `${location.shortName} beach access rentals`,
        title: `Accessibility Equipment Rentals in ${location.shortName}, SC`,
        intro: isMyrtle
          ? [
              'QuickChoice Rentals offers accessibility-focused beach rentals in Myrtle Beach, SC with an emphasis on beach wheelchair access and support gear that makes shoreline time easier to manage.',
              'The current accessibility inventory centers on beach wheelchair rentals, with related items like beach carts and umbrellas that help simplify a beach-day setup.'
            ]
          : [
              'QuickChoice Rentals offers accessibility-focused beach rentals in Charleston, SC with a clear emphasis on beach wheelchair access and support gear for easier shoreline visits.',
              'The current accessibility inventory centers on beach wheelchair rentals, along with related items like beach carts and umbrellas that help support a more usable beach setup.'
            ],
        heroNote: `${location.name} is one of the two active QuickChoice Rentals service areas.`,
        answerCards: [
          {
            title: 'What Is Available',
            text:
              'The main accessibility offering is a beach wheelchair rental, supported by related transport and comfort gear for beach-day logistics.'
          },
          {
            title: 'Who It Helps',
            text:
              'This page is for travelers who need easier shoreline access and families planning a more comfortable beach outing.'
          },
          {
            title: 'Why It Matters',
            text:
              'Accessible beach equipment can change whether a trip feels manageable. Clear local information helps families plan with more confidence.'
          }
        ],
        keyPoints: [
          `Primary search focus: beach wheelchair rentals in ${location.shortName}, SC.`,
          'Supportive add-ons include beach carts, umbrellas, and the beach access bundle.',
          'Content stays specific to real inventory rather than inventing equipment that is not listed on the site.'
        ],
        cardSections: [
          {
            title: `${location.shortName} Accessibility Rental Options`,
            intro: 'These pages and products support beach access and simpler shoreline logistics.',
            cards: [
              buildRentalIntentCard('beach-wheelchair-rentals'),
              buildProductCard('beach-cart'),
              buildRentalIntentCard('family-beach-bundle'),
              buildBundleCard('bundle-beach-access', '/bundle/bundle-beach-access', 'Beach access bundle')
            ]
          }
        ],
        contentSections: isMyrtle
          ? [
              {
                title: 'What Myrtle Beach Accessibility Searchers Usually Need',
                paragraphs: [
                  'For Myrtle Beach accessibility rentals, the primary need is usually a beach wheelchair that helps with sand access. Supporting items like carts and umbrellas can also make the outing easier for families or caregivers managing a full setup.'
                ]
              },
              {
                title: 'How This Page Avoids Thin Content',
                paragraphs: [
                  'The page does not pretend there is a large catalog of unrelated accessibility products. It stays centered on the actual equipment currently represented on the site, especially beach wheelchair rentals.'
                ]
              }
            ]
          : [
              {
                title: 'What Charleston Accessibility Searchers Usually Need',
                paragraphs: [
                  'For Charleston accessibility rentals, the main need is also straightforward: beach wheelchair access and a simpler way to manage the rest of the beach-day setup.'
                ]
              },
              {
                title: 'How This Page Avoids Thin Content',
                paragraphs: [
                  'The content remains tightly tied to the site’s actual inventory. It highlights beach wheelchair rentals first and uses supporting gear only where it meaningfully helps the trip.'
                ]
              }
            ],
        faqs: [
          {
            question: `Do you offer beach wheelchair rentals in ${location.shortName}, SC?`,
            answer:
              `Yes. QuickChoice Rentals offers beach wheelchair rentals in ${location.shortName}, SC as part of its accessibility-focused beach rental lineup.`
          },
          {
            question: `What accessibility equipment does QuickChoice Rentals rent?`,
            answer:
              'The current accessibility focus is beach wheelchair rentals, along with related beach setup gear that can support a smoother outing.'
          }
        ],
        relatedLinks: [
          buildRelatedLink(`/locations/${location.slug}`, `${location.shortName} rental delivery`, `See the main ${location.shortName} service-area page.`),
          buildRelatedLink('/rentals/accessibility-equipment', 'Accessibility equipment overview', 'Compare the accessibility category across both service areas.'),
          buildRelatedLink('/rentals/beach-wheelchair-rentals', 'Beach wheelchair rentals', 'Go to the dedicated beach wheelchair landing page.')
        ],
        footerCta: {
          title: `Need accessibility-focused beach rentals in ${location.shortName}?`,
          text:
            'Choose your dates first, then review the beach wheelchair page or go straight into the beach rental category.',
          links: [
            { href: '/checkout', label: 'Choose Your Dates' },
            { href: '/rentals/beach-wheelchair-rentals', label: 'See Beach Wheelchair Rentals', kind: 'secondary' }
          ]
        }
      };
    }
  }
};

function buildRelatedLink(href, label, description) {
  return { href, label, description };
}

function buildProductCard(productId, href = `/product/${productId}`) {
  const product = productById.get(productId);
  if (!product) return null;

  const shortDescriptionById = {
    'baby-cribs': 'A full-size crib for easier nights away from home.',
    'baby-bassinet': 'A compact bedside sleep option for younger babies.',
    'baby-pack-n-play': 'A flexible sleep option that packs light.',
    'baby-high-chair-tray': 'A simple meal-time setup for your stay.',
    'baby-booster-seat-tray': 'A compact seat for easy meals on the go.',
    'baby-single-jogging-stroller': 'An easy stroller for outings and walks.',
    'baby-double-jogging-stroller': 'Room for two with a smooth, steady ride.',
    'baby-tandem-double-stroller': 'A practical double stroller for busy travel days.',
    'beach-chair': 'A comfortable chair for long beach days.',
    'beach-chair-umbrella': 'Seating and shade in one setup.',
    'beach-umbrella': 'Reliable shade for a more comfortable day.',
    'beach-wagon': 'An easy way to move towels, toys, and extras.',
    'beach-cart': 'A handy cart for hauling gear with less hassle.',
    'beach-wheelchair': 'Built to make sand access easier.'
  };

  return {
    title: product.name,
    href,
    description: shortDescriptionById[product.id] || product.shortDescription,
    imageUrl: product.imageUrl,
    imageAlt: `${product.name} rental from QuickChoice Rentals`,
    linkLabel: 'View rental details'
  };
}

function buildBundleCard(bundleId, href = `/bundle/${bundleId}`, metaLabel = 'Bundle option') {
  const bundle = bundleById.get(bundleId);
  if (!bundle) return null;

  const shortDescriptionById = {
    'bundle-baby-basics': 'A simple setup for sleep, meals, and bath time.',
    'bundle-baby-sleep': 'Sleep essentials grouped together in one bundle.',
    'bundle-baby-travel-safety': 'A travel-ready mix of baby essentials.',
    'bundle-baby-mobility': 'A lighter bundle for outings and everyday movement.',
    'bundle-beach-day': 'Chairs, shade, and a wagon for an easy beach setup.',
    'bundle-beach-shade': 'Comfort and shade for a relaxed day outside.',
    'bundle-beach-play': 'A fun setup for families and groups.',
    'bundle-beach-access': 'Helpful gear for a smoother beach setup.'
  };

  return {
    title: bundle.name,
    href,
    description: shortDescriptionById[bundle.id] || bundle.description,
    imageUrl: bundle.imageUrl,
    imageAlt: `${bundle.name} rental bundle from QuickChoice Rentals`,
    linkLabel: 'View bundle details'
  };
}

const rentalPageCardData = {
  'baby-gear': {
    title: 'Baby Gear Rentals',
    path: '/rentals/baby-gear',
    description: 'Cribs, strollers, pack n plays, high chairs, and more.',
    image: withBasePath('/rentals/visual/product-images/crib.webp')
  },
  'beach-gear': {
    title: 'Beach Gear Rentals',
    path: '/rentals/beach-gear',
    description: 'Chairs, umbrellas, wagons, carts, and beach-day extras.',
    image: withBasePath('/rentals/visual/product-images-beach/beach-chair.png')
  },
  'accessibility-equipment': {
    title: 'Accessibility Equipment Rentals',
    path: '/rentals/accessibility-equipment',
    description: 'Beach wheelchair rentals and a few helpful add-ons.',
    image: withBasePath('/rentals/visual/product-images-beach/beach-wheelchair.png')
  },
  bundles: {
    title: 'Rental Bundles',
    path: '/rentals/bundles',
    description: 'Grouped options for a faster, simpler booking.',
    image: withBasePath('/rentals/visual/product-images/bundle/baby-basics.png')
  },
  'crib-rentals': {
    title: 'Crib Rentals',
    path: '/rentals/crib-rentals',
    description: 'A full-size crib for easier nights away from home.',
    image: withBasePath('/rentals/visual/product-images/crib.webp')
  },
  'stroller-rentals': {
    title: 'Stroller Rentals',
    path: '/rentals/stroller-rentals',
    description: 'Single and double stroller options for outings and errands.',
    image: withBasePath('/rentals/visual/product-images/single-jogging-stroller.png')
  },
  'pack-and-play-rentals': {
    title: 'Pack and Play Rentals',
    path: '/rentals/pack-and-play-rentals',
    description: 'A flexible sleep option that travels well.',
    image: withBasePath('/rentals/visual/product-images/packnplay.png')
  },
  'high-chair-rentals': {
    title: 'High Chair Rentals',
    path: '/rentals/high-chair-rentals',
    description: 'Meal-time seating for a smoother stay.',
    image: withBasePath('/rentals/visual/product-images/high-chair-tray.png')
  },
  'beach-chair-rentals': {
    title: 'Beach Chair Rentals',
    path: '/rentals/beach-chair-rentals',
    description: 'Comfortable seating for long beach days.',
    image: withBasePath('/rentals/visual/product-images-beach/beach-chair.png')
  },
  'umbrella-rentals': {
    title: 'Umbrella Rentals',
    path: '/rentals/umbrella-rentals',
    description: 'Reliable shade for a more comfortable setup.',
    image: withBasePath('/rentals/visual/product-images-beach/umbrella.png')
  },
  'beach-wagon-rentals': {
    title: 'Beach Wagon Rentals',
    path: '/rentals/beach-wagon-rentals',
    description: 'An easier way to move the extras.',
    image: withBasePath('/rentals/visual/product-images-beach/beach-wagon.png')
  },
  'beach-wheelchair-rentals': {
    title: 'Beach Wheelchair Rentals',
    path: '/rentals/beach-wheelchair-rentals',
    description: 'Built to make sand access easier.',
    image: withBasePath('/rentals/visual/product-images-beach/beach-wheelchair.png')
  },
  'family-beach-bundle': {
    title: 'Family Beach Bundle',
    path: '/rentals/family-beach-bundle',
    description: 'A simple beach setup with chairs, shade, and a wagon.',
    image: withBasePath('/rentals/visual/product-images-beach/bunndle/beach-day-set.png')
  },
  'sleep-essentials-bundle': {
    title: 'Sleep Essentials Bundle',
    path: '/rentals/sleep-essentials-bundle',
    description: 'A sleep-focused bundle for easier nights away.',
    image: withBasePath('/rentals/visual/product-images/bundle/baby-sleep-set.png')
  },
  'baby-basics-bundle': {
    title: 'Baby Basics Bundle',
    path: '/rentals/baby-basics-bundle',
    description: 'A simple setup for the basics.',
    image: withBasePath('/rentals/visual/product-images/bundle/baby-basics.png')
  },
  'car-safety-bundle': {
    title: 'Car Safety Bundle',
    path: '/rentals/car-safety-bundle',
    description: 'A travel-ready bundle with a few key essentials.',
    image: withBasePath('/rentals/visual/product-images/bundle/travel-ready-set.png')
  }
};

function buildRentalIntentCard(slug) {
  const page = rentalPageCardData[slug];
  if (!page) return null;

  return {
    title: page.title,
    href: page.path,
    description: page.description,
    imageUrl: page.image,
    imageAlt: page.title,
    meta: page.meta,
    linkLabel: 'Explore this page'
  };
}

function compact(list) {
  return list.filter(Boolean);
}

function makeRentalPage(config) {
  return {
    ...config,
    path: `/rentals/${config.slug}`
  };
}

const rentalPages = [
  makeRentalPage({
    slug: 'baby-gear',
    primaryKeyword: 'baby gear rentals Myrtle Beach SC',
    metaTitle: 'Baby Gear Rentals in Myrtle Beach & Charleston, SC | QuickChoice Rentals',
    metaDescription:
      'Rent cribs, pack n plays, strollers, high chairs, and more with local delivery in Myrtle Beach and Charleston, SC.',
    eyebrow: 'Vacation baby gear delivery',
    title: 'Baby Gear Rentals in Myrtle Beach & Charleston',
    shortTitle: 'Baby Gear Rentals',
    cardMeta: 'Transactional category page',
    cardDescription:
      'Browse cribs, strollers, pack n plays, high chairs, and other family travel essentials for Myrtle Beach and Charleston stays.',
    image: withBasePath('/rentals/visual/product-images/crib.webp'),
    intro: [
      'QuickChoice Rentals provides baby gear rentals for Myrtle Beach and Charleston vacations. The focus is on the high-use items families search for most often: cribs, pack n plays, strollers, high chairs, booster seats, monitors, and practical travel add-ons.',
      'The page is built to answer a simple question clearly: what baby gear can you rent, where is it delivered, and which options make a vacation easier for families traveling with babies or toddlers?'
    ],
    heroNote: 'QuickChoice Rentals serves Myrtle Beach and Charleston only.',
    answerCards: [
      {
        title: 'What We Rent',
        text:
          'Baby gear rentals include cribs, bassinets, pack n plays, stroller options, high chairs, booster seats, monitors, and other vacation-ready essentials.'
      },
      {
        title: 'Where We Deliver',
        text:
          'QuickChoice Rentals delivers baby gear in Myrtle Beach, SC and Charleston, SC, the two service areas represented across this site.'
      },
      {
        title: 'Who It Is For',
        text:
          'This category is for vacationing families, grandparents hosting relatives, and travelers who want to avoid carrying bulky nursery gear.'
      }
    ],
    keyPoints: [
      'Built for high-intent local searches around cribs, strollers, pack n plays, and high chairs.',
      'Written in explicit language that is easy for search engines and AI systems to summarize.',
      'Connected to product, bundle, and location pages for stronger internal linking.'
    ],
    cardSections: [
      {
        title: 'Popular Baby Gear Rental Pages',
        intro: 'Start with the most common family travel searches and compare the options that fit your stay.',
        cards: compact([
          buildRentalIntentCard('crib-rentals'),
          buildRentalIntentCard('stroller-rentals'),
          buildRentalIntentCard('pack-and-play-rentals'),
          buildRentalIntentCard('high-chair-rentals')
        ])
      },
      {
        title: 'Popular Baby Bundles',
        intro: 'Bundles make strong landing pages for families who want fewer decisions and faster checkouts.',
        cards: compact([
          buildRentalIntentCard('baby-basics-bundle'),
          buildRentalIntentCard('sleep-essentials-bundle'),
          buildRentalIntentCard('car-safety-bundle')
        ])
      }
    ],
    contentSections: [
      {
        title: 'What Makes Baby Gear Rentals Useful',
        paragraphs: [
          'Traveling with babies usually means bringing the exact items that are hardest to carry: sleep gear, stroller gear, feeding gear, and safety gear. Renting locally makes that tradeoff easier.',
          'QuickChoice Rentals keeps the category focused on real vacation needs so shoppers can move from research to booking without sorting through filler content.'
        ]
      },
      {
        title: 'Popular Rental Options',
        bullets: [
          'Crib rentals for vacation sleep setups',
          'Stroller rentals for family outings and walks',
          'Pack n play rentals for flexible sleep and play',
          'High chair rentals for easier meals at the rental'
        ]
      },
      {
        title: 'Delivery Areas',
        paragraphs: [
          'Baby gear rentals are marketed to the two core service areas only: Myrtle Beach, SC and Charleston, SC. That tight location targeting strengthens local SEO and keeps the message clear for users.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What baby gear can I rent from QuickChoice Rentals?',
        answer:
          'QuickChoice Rentals rents cribs, bassinets, pack n plays, strollers, high chairs, booster seats, monitors, and related baby travel gear.'
      },
      {
        question: 'Where do you deliver baby gear rentals?',
        answer:
          'QuickChoice Rentals delivers baby gear rentals in Myrtle Beach, SC and Charleston, SC.'
      },
      {
        question: 'What baby gear rental pages should I check first?',
        answer:
          'Most families start with crib rentals, stroller rentals, pack n play rentals, or high chair rentals because those match the most common vacation needs.'
      }
    ],
    relatedLinks: [
      buildRelatedLink('/locations/myrtle-beach-sc/baby-gear-rentals', 'Baby gear rentals in Myrtle Beach', 'See the Myrtle Beach-specific baby gear landing page.'),
      buildRelatedLink('/locations/charleston-sc/baby-gear-rentals', 'Baby gear rentals in Charleston', 'See the Charleston-specific baby gear landing page.'),
      buildRelatedLink('/resources/how-to-choose-between-crib-bassinet-and-pack-and-play-rentals', 'Crib vs. bassinet vs. pack n play guide', 'Read the comparison guide before choosing a sleep setup.')
    ],
    footerCta: {
      title: 'Ready to reserve baby gear?',
      text:
        'Choose your travel dates first, then shop the baby category or go directly to the rental page that matches your biggest need.',
      links: [
        { href: '/checkout', label: 'Choose Your Dates' },
        { href: '/category/baby', label: 'Shop Baby Gear', kind: 'secondary' }
      ]
    }
  }),
  makeRentalPage({
    slug: 'beach-gear',
    primaryKeyword: 'beach gear rentals Myrtle Beach SC',
    metaTitle: 'Beach Gear Rentals in Myrtle Beach & Charleston, SC | QuickChoice Rentals',
    metaDescription:
      'Rent beach chairs, umbrellas, wagons, carts, and family beach bundles with local delivery in Myrtle Beach and Charleston, SC.',
    eyebrow: 'Vacation beach setup delivery',
    title: 'Beach Gear Rentals in Myrtle Beach & Charleston',
    shortTitle: 'Beach Gear Rentals',
    cardMeta: 'Transactional category page',
    cardDescription:
      'Browse beach chair, umbrella, wagon, cart, and family beach rental options for Myrtle Beach and Charleston trips.',
    image: withBasePath('/rentals/visual/product-images-beach/beach-chair.png'),
    intro: [
      'QuickChoice Rentals provides beach gear rentals for Myrtle Beach and Charleston vacations. The category is designed around the items people least want to pack and most want ready for a beach day: chairs, umbrellas, wagons, carts, towels, and comfort-focused bundles.',
      'The copy on this page is intentionally direct so searchers and AI-driven summaries can quickly tell what the business rents, where delivery happens, and which product pages are worth comparing next.'
    ],
    heroNote: 'QuickChoice Rentals serves Myrtle Beach and Charleston only.',
    answerCards: [
      {
        title: 'What We Rent',
        text:
          'Beach gear rentals include beach chairs, umbrellas, wagons, carts, towels, games, bundles, and beach wheelchair support.'
      },
      {
        title: 'Where We Deliver',
        text:
          'QuickChoice Rentals delivers beach gear in Myrtle Beach, SC and Charleston, SC.'
      },
      {
        title: 'Who It Is For',
        text:
          'This category is for families, couples, and group travelers who want a simpler beach setup with less hauling and less overpacking.'
      }
    ],
    keyPoints: [
      'Prioritizes the highest-intent beach rental terms first: chairs, umbrellas, wagons, and wheelchair access.',
      'Supports both local search and AI-readable summaries with explicit category descriptions.',
      'Links cleanly to bundles and location pages so important landing pages are only a few clicks away.'
    ],
    cardSections: [
      {
        title: 'Popular Beach Gear Rental Pages',
        intro: 'These are the strongest beach product-intent pages for local search and vacation planning.',
        cards: compact([
          buildRentalIntentCard('beach-chair-rentals'),
          buildRentalIntentCard('umbrella-rentals'),
          buildRentalIntentCard('beach-wagon-rentals'),
          buildRentalIntentCard('beach-wheelchair-rentals')
        ])
      },
      {
        title: 'Popular Beach Bundles',
        intro: 'Bundle pages help capture shoppers who want ready-made combinations instead of individual item decisions.',
        cards: compact([
          buildRentalIntentCard('family-beach-bundle'),
          buildBundleCard('bundle-beach-shade'),
          buildBundleCard('bundle-beach-play')
        ])
      }
    ],
    contentSections: [
      {
        title: 'What Makes Beach Gear Rentals Useful',
        paragraphs: [
          'Beach gear gets bulky fast. Chairs, umbrellas, wagons, and mobility equipment take up more space than most guests expect, especially when a family is already packing coolers, clothes, and baby gear.',
          'Local rental delivery removes some of that friction and makes it easier for a ranking landing page to convert instead of acting like a thin directory.'
        ]
      },
      {
        title: 'Popular Rental Options',
        bullets: [
          'Beach chair rentals for comfort and convenience',
          'Umbrella rentals for shade-focused setups',
          'Beach wagon and cart rentals for easier transport',
          'Beach wheelchair rentals for better shoreline access'
        ]
      },
      {
        title: 'Delivery Areas',
        paragraphs: [
          'Beach gear rental targeting stays specific to Myrtle Beach, SC and Charleston, SC so the site can compete more clearly for local, high-intent searches in those markets.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What beach gear can I rent from QuickChoice Rentals?',
        answer:
          'QuickChoice Rentals rents beach chairs, umbrellas, wagons, carts, towels, selected game items, bundles, and beach wheelchair rentals.'
      },
      {
        question: 'Where do you deliver beach gear rentals?',
        answer:
          'QuickChoice Rentals delivers beach gear rentals in Myrtle Beach, SC and Charleston, SC.'
      },
      {
        question: 'Which beach rental pages should I compare first?',
        answer:
          'Most guests start with beach chair rentals, umbrella rentals, beach wagon rentals, or beach wheelchair rentals because those match the strongest beach-day needs.'
      }
    ],
    relatedLinks: [
      buildRelatedLink('/locations/myrtle-beach-sc/beach-gear-rentals', 'Beach gear rentals in Myrtle Beach', 'See the Myrtle Beach-specific beach gear landing page.'),
      buildRelatedLink('/locations/charleston-sc/beach-gear-rentals', 'Beach gear rentals in Charleston', 'See the Charleston-specific beach gear landing page.'),
      buildRelatedLink('/resources/best-beach-gear-for-families-traveling-with-kids', 'Best beach gear for families', 'Read the family-focused planning guide.')
    ],
    footerCta: {
      title: 'Ready to reserve beach gear?',
      text:
        'Choose your dates first, then shop the beach category or jump directly to the page that fits your beach setup.',
      links: [
        { href: '/checkout', label: 'Choose Your Dates' },
        { href: '/category/beach', label: 'Shop Beach Gear', kind: 'secondary' }
      ]
    }
  }),
  makeRentalPage({
    slug: 'accessibility-equipment',
    primaryKeyword: 'beach wheelchair rentals Myrtle Beach SC',
    metaTitle: 'Accessibility Equipment Rentals in Myrtle Beach & Charleston | QuickChoice Rentals',
    metaDescription:
      'Explore beach wheelchair rentals and related accessibility-focused beach equipment for Myrtle Beach and Charleston, SC trips.',
    eyebrow: 'Beach access and mobility support',
    title: 'Accessibility Equipment Rentals in Myrtle Beach & Charleston',
    shortTitle: 'Accessibility Equipment Rentals',
    cardMeta: 'Accessibility-focused category page',
    cardDescription:
      'See beach wheelchair rentals and related beach access gear for Myrtle Beach and Charleston trips.',
    image: withBasePath('/rentals/visual/product-images-beach/beach-wheelchair.png'),
    intro: [
      'QuickChoice Rentals uses this page to clearly present its accessibility-focused beach rental offering. The current inventory centers on beach wheelchair rentals, supported by related beach setup gear that can make a shoreline trip more manageable.',
      'The page stays tightly connected to real inventory so it can rank for local accessibility searches without drifting into thin or misleading content.'
    ],
    heroNote: 'QuickChoice Rentals serves Myrtle Beach and Charleston only.',
    answerCards: [
      {
        title: 'What We Rent',
        text:
          'The main accessibility offering is a beach wheelchair rental, with related support gear like beach carts and umbrella options.'
      },
      {
        title: 'Where We Deliver',
        text:
          'QuickChoice Rentals offers this accessibility-focused beach rental content for Myrtle Beach, SC and Charleston, SC.'
      },
      {
        title: 'Who It Is For',
        text:
          'This page is for families, caregivers, and travelers who need clearer information about beach access equipment before a coastal trip.'
      }
    ],
    keyPoints: [
      'Built around actual inventory, not inflated accessibility claims.',
      'Strongest keyword focus is beach wheelchair rentals.',
      'Links to location-specific accessibility pages and related beach setup options.'
    ],
    cardSections: [
      {
        title: 'Accessibility-Focused Rental Options',
        intro: 'These pages and product details reflect the equipment currently supported by the site.',
        cards: compact([
          buildRentalIntentCard('beach-wheelchair-rentals'),
          buildBundleCard('bundle-beach-access'),
          buildProductCard('beach-cart'),
          buildProductCard('beach-umbrella')
        ])
      }
    ],
    contentSections: [
      {
        title: 'What This Page Is Meant to Answer',
        paragraphs: [
          'Searchers looking for accessibility equipment usually want fast clarity: does the business offer beach wheelchairs, where does it deliver, and what else might help make a beach day easier? This page answers those questions directly.'
        ]
      },
      {
        title: 'Why The Content Stays Narrow',
        paragraphs: [
          'The site avoids doorway-style accessibility pages with invented inventory. Instead, it focuses on the real equipment currently represented by the catalog and supports it with local location pages where the copy can stay unique.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Do you offer beach wheelchair rentals?',
        answer:
          'Yes. QuickChoice Rentals offers beach wheelchair rentals and supports that offer with related beach access gear on the site.'
      },
      {
        question: 'Where do you offer accessibility-focused rentals?',
        answer:
          'This site targets Myrtle Beach, SC and Charleston, SC as the two main service areas.'
      }
    ],
    relatedLinks: [
      buildRelatedLink('/locations/myrtle-beach-sc/accessibility-rentals', 'Accessibility rentals in Myrtle Beach', 'See the Myrtle Beach accessibility landing page.'),
      buildRelatedLink('/locations/charleston-sc/accessibility-rentals', 'Accessibility rentals in Charleston', 'See the Charleston accessibility landing page.'),
      buildRelatedLink('/rentals/beach-wheelchair-rentals', 'Beach wheelchair rentals', 'Go to the main beach wheelchair landing page.')
    ],
    footerCta: {
      title: 'Need a beach wheelchair or related beach access gear?',
      text:
        'Review the dedicated beach wheelchair page or choose your dates and move into the beach shopping flow.',
      links: [
        { href: '/rentals/beach-wheelchair-rentals', label: 'See Beach Wheelchair Rentals' },
        { href: '/checkout', label: 'Choose Your Dates', kind: 'secondary' }
      ]
    }
  }),
  makeRentalPage({
    slug: 'bundles',
    primaryKeyword: 'rental bundles Myrtle Beach SC',
    metaTitle: 'Rental Bundles for Myrtle Beach & Charleston Trips | QuickChoice Rentals',
    metaDescription:
      'Compare baby and beach rental bundles built for faster booking, simpler packing, and easier vacations in Myrtle Beach and Charleston, SC.',
    eyebrow: 'Bundle landing page',
    title: 'Rental Bundles for Myrtle Beach & Charleston Trips',
    shortTitle: 'Rental Bundles',
    cardMeta: 'Bundle category page',
    cardDescription:
      'Compare baby and beach bundle pages built around the strongest vacation rental combinations.',
    image: withBasePath('/rentals/visual/product-images/bundle/baby-basics.png'),
    intro: [
      'QuickChoice Rentals uses bundles to simplify booking for travelers who already know the type of trip they are planning. Instead of assembling a cart from scratch, guests can start with a grouped set that matches common family and beach needs.',
      'Bundle pages are especially useful for SEO and conversion because they line up with strong transactional searches while also making checkout faster.'
    ],
    heroNote: 'Bundle pages support both Myrtle Beach and Charleston rentals.',
    answerCards: [
      {
        title: 'What Bundles Do',
        text:
          'Bundles group the most common product combinations together so families can book faster with fewer decisions.'
      },
      {
        title: 'Who They Help',
        text:
          'They are a strong fit for guests planning around a clear need like sleep essentials, beach comfort, or basic family setup.'
      },
      {
        title: 'Why They Convert',
        text:
          'Bundle pages work well as landing pages because they combine search intent, pricing clarity, and easy booking paths.'
      }
    ],
    keyPoints: [
      'Supports baby and beach bundle themes.',
      'Strong place to capture “bundle” intent without creating filler.',
      'Useful internal-linking bridge between categories and product pages.'
    ],
    cardSections: [
      {
        title: 'Featured Bundle Pages',
        intro: 'These are the clearest, search-friendly bundle pages tied to real inventory.',
        cards: compact([
          buildRentalIntentCard('family-beach-bundle'),
          buildRentalIntentCard('sleep-essentials-bundle'),
          buildRentalIntentCard('baby-basics-bundle'),
          buildRentalIntentCard('car-safety-bundle')
        ])
      }
    ],
    contentSections: [
      {
        title: 'Why Bundle Pages Matter',
        paragraphs: [
          'Bundles improve the site in two ways at once: they capture transactional search intent for grouped rentals, and they make the shopping journey easier for users who do not want to compare every item individually.'
        ]
      },
      {
        title: 'What Types Of Bundles Are Most Useful',
        bullets: [
          'Baby basics bundles for quick family setup',
          'Sleep bundles for vacation nap and bedtime routines',
          'Travel-ready or car safety bundles for family mobility',
          'Beach bundles for shade, comfort, and transport'
        ]
      }
    ],
    faqs: [
      {
        question: 'Why book a rental bundle instead of individual items?',
        answer:
          'Bundles reduce decision fatigue, keep the booking path shorter, and often reflect the product combinations families need most often.'
      },
      {
        question: 'Do your bundles support both Myrtle Beach and Charleston trips?',
        answer:
          'Yes. The bundle pages on this site are written for the two core service areas: Myrtle Beach, SC and Charleston, SC.'
      }
    ],
    relatedLinks: [
      buildRelatedLink('/rentals/baby-gear', 'Baby gear rentals', 'Compare bundle pages with the full baby category.'),
      buildRelatedLink('/rentals/beach-gear', 'Beach gear rentals', 'Compare bundle pages with the full beach category.'),
      buildRelatedLink('/resources/what-to-rent-instead-of-bringing-on-vacation-with-a-baby', 'What to rent instead of bring', 'Read the support article about renting instead of overpacking.')
    ],
    footerCta: {
      title: 'Ready to book a bundle?',
      text:
        'Choose your dates, then compare the bundle page that best matches your trip.',
      links: [
        { href: '/checkout', label: 'Choose Your Dates' },
        { href: '/category/baby', label: 'Browse Shopping Categories', kind: 'secondary' }
      ]
    }
  }),
  makeRentalPage({
    slug: 'crib-rentals',
    primaryKeyword: 'crib rental Myrtle Beach SC',
    metaTitle: 'Crib Rentals in Myrtle Beach & Charleston, SC | QuickChoice Rentals',
    metaDescription:
      'Rent a crib for your Myrtle Beach or Charleston stay with local delivery from QuickChoice Rentals.',
    eyebrow: 'High-intent baby rental page',
    title: 'Crib Rentals in Myrtle Beach & Charleston',
    shortTitle: 'Crib Rentals',
    cardMeta: 'Product-intent page',
    cardDescription:
      'Compare crib rental options for Myrtle Beach and Charleston family stays.',
    image: withBasePath('/rentals/visual/product-images/crib.webp'),
    primaryProductId: 'baby-cribs',
    intro: [
      'QuickChoice Rentals offers crib rentals for Myrtle Beach and Charleston stays. This page exists because crib rental searches are among the strongest local-intent family terms, and the answer guests need is usually simple: can I get a clean, dependable crib delivered for my trip?',
      'The page keeps that answer clear while also linking to related baby gear pages like pack n play rentals, stroller rentals, and baby sleep bundles.'
    ],
    heroNote: 'QuickChoice Rentals serves Myrtle Beach and Charleston only.',
    answerCards: [
      {
        title: 'What This Page Covers',
        text:
          'This page focuses on crib rentals as a dedicated search topic for families traveling to Myrtle Beach or Charleston.'
      },
      {
        title: 'Who It Is For',
        text:
          'It is for parents and grandparents who want a more familiar sleep setup without bringing a full crib from home.'
      },
      {
        title: 'Why Crib Rentals Matter',
        text:
          'Sleep setup has an outsized effect on family travel. A dedicated crib page helps searchers and AI systems match the need quickly.'
      }
    ],
    keyPoints: [
      'Primary target: crib rental Myrtle Beach SC and crib rental Charleston SC.',
      'Built around real inventory and direct delivery language.',
      'Links to sleep bundles and related baby gear pages.'
    ],
    cardSections: [
      {
        title: 'Crib Rental Details',
        intro: 'Use the product page for item details, then move into dates and checkout when you are ready.',
        cards: compact([
          buildProductCard('baby-cribs'),
          buildRentalIntentCard('sleep-essentials-bundle'),
          buildRentalIntentCard('pack-and-play-rentals')
        ])
      }
    ],
    contentSections: [
      {
        title: 'Who Crib Rentals Are Best For',
        bullets: [
          'Families staying multiple nights and wanting a more traditional sleep setup',
          'Guests who do not want to travel with full-size sleep gear',
          'Trips where predictable nap or bedtime routines matter'
        ]
      },
      {
        title: 'Why This Page Is Built Separately',
        paragraphs: [
          'Crib rental is a clear, high-intent product search on its own. Giving it a dedicated landing page makes the site easier to understand for users, search engines, and AI assistants generating recommendations.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Do you offer crib rentals in Myrtle Beach, SC?',
        answer:
          'Yes. QuickChoice Rentals offers crib rentals in Myrtle Beach, SC.'
      },
      {
        question: 'Do you offer crib rentals in Charleston, SC?',
        answer:
          'Yes. QuickChoice Rentals also offers crib rentals in Charleston, SC.'
      }
    ],
    relatedLinks: [
      buildRelatedLink('/rentals/baby-gear', 'Baby gear rentals', 'See the full baby gear category.'),
      buildRelatedLink('/rentals/pack-and-play-rentals', 'Pack n play rentals', 'Compare crib rentals with a more flexible sleep option.'),
      buildRelatedLink('/locations/myrtle-beach-sc/baby-gear-rentals', 'Myrtle Beach baby gear rentals', 'See the location-specific baby gear page.')
    ],
    footerCta: {
      title: 'Need a crib for your trip?',
      text:
        'Choose your dates first, then view the crib details or move into the baby category.',
      links: [
        { href: '/checkout', label: 'Choose Your Dates' },
        { href: '/product/baby-cribs', label: 'View Crib Details', kind: 'secondary' }
      ]
    }
  }),
  makeRentalPage({
    slug: 'stroller-rentals',
    primaryKeyword: 'stroller rental Myrtle Beach SC',
    metaTitle: 'Stroller Rentals in Myrtle Beach & Charleston, SC | QuickChoice Rentals',
    metaDescription:
      'Compare stroller rental options for Myrtle Beach and Charleston trips, including single and double stroller choices.',
    eyebrow: 'High-intent baby rental page',
    title: 'Stroller Rentals in Myrtle Beach & Charleston',
    shortTitle: 'Stroller Rentals',
    cardMeta: 'Product-intent page',
    cardDescription:
      'Compare stroller rental options for Myrtle Beach and Charleston family travel.',
    image: withBasePath('/rentals/visual/product-images/single-jogging-stroller.png'),
    intro: [
      'QuickChoice Rentals offers stroller rentals for Myrtle Beach and Charleston trips, including single and double options that help families move more comfortably through a vacation.',
      'Stroller rental pages matter because they capture one of the most common family travel searches while also giving guests a clear next step into the shopping flow.'
    ],
    heroNote: 'QuickChoice Rentals serves Myrtle Beach and Charleston only.',
    answerCards: [
      {
        title: 'What This Page Covers',
        text:
          'This page groups stroller rental intent into one place so families can compare single and double options quickly.'
      },
      {
        title: 'Who It Is For',
        text:
          'It is for families who want easier movement during outings, travel days, and everyday vacation errands.'
      },
      {
        title: 'Why It Matters',
        text:
          'A stroller is one of the most-used pieces of gear on many trips, which makes it a strong transactional search target.'
      }
    ],
    keyPoints: [
      'Primary target: stroller rental Myrtle Beach SC and stroller rental Charleston SC.',
      'Multiple stroller options make the page stronger than a thin single-city mention.',
      'Connected to baby mobility and travel-ready bundle pages.'
    ],
    cardSections: [
      {
        title: 'Stroller Rental Options',
        intro: 'Compare the stroller product details that best match your group size and travel style.',
        cards: compact([
          buildProductCard('baby-single-jogging-stroller'),
          buildProductCard('baby-double-jogging-stroller'),
          buildProductCard('baby-tandem-double-stroller'),
          buildBundleCard('bundle-baby-mobility')
        ])
      }
    ],
    contentSections: [
      {
        title: 'When Stroller Rentals Make Sense',
        bullets: [
          'Trips where bringing a stroller is inconvenient',
          'Families who need room back in the car or luggage',
          'Vacations that include frequent outings, walks, or errands'
        ]
      }
    ],
    faqs: [
      {
        question: 'Do you offer stroller rentals in Myrtle Beach and Charleston?',
        answer:
          'Yes. QuickChoice Rentals offers stroller rentals in both Myrtle Beach, SC and Charleston, SC.'
      },
      {
        question: 'Do you have more than one stroller option?',
        answer:
          'Yes. The catalog includes multiple stroller options, including single and double models.'
      }
    ],
    relatedLinks: [
      buildRelatedLink('/rentals/baby-gear', 'Baby gear rentals', 'See the full baby gear category.'),
      buildRelatedLink('/rentals/car-safety-bundle', 'Car safety bundle', 'Compare stroller rentals with a travel-ready family bundle.'),
      buildRelatedLink('/resources/what-baby-gear-to-rent-for-a-beach-vacation', 'What baby gear to rent for a beach vacation', 'Read the family travel planning guide.')
    ],
    footerCta: {
      title: 'Need a stroller for your trip?',
      text:
        'Choose your dates and then compare the stroller details that fit your family best.',
      links: [
        { href: '/checkout', label: 'Choose Your Dates' },
        { href: '/category/baby', label: 'Shop Baby Gear', kind: 'secondary' }
      ]
    }
  }),
  makeRentalPage({
    slug: 'pack-and-play-rentals',
    primaryKeyword: 'pack and play rental Myrtle Beach SC',
    metaTitle: 'Pack and Play Rentals in Myrtle Beach & Charleston | QuickChoice Rentals',
    metaDescription:
      'Rent a pack and play for your Myrtle Beach or Charleston trip with local delivery from QuickChoice Rentals.',
    eyebrow: 'High-intent baby rental page',
    title: 'Pack and Play Rentals in Myrtle Beach & Charleston',
    shortTitle: 'Pack and Play Rentals',
    cardMeta: 'Product-intent page',
    cardDescription:
      'See pack and play rental options for Myrtle Beach and Charleston stays.',
    image: withBasePath('/rentals/visual/product-images/packnplay.png'),
    primaryProductId: 'baby-pack-n-play',
    intro: [
      'QuickChoice Rentals offers pack and play rentals for Myrtle Beach and Charleston stays. This page is designed for travelers who want a flexible sleep-and-play option without overpacking.',
      'Pack n play rentals often win on convenience, which makes this a useful product-specific landing page for both search and conversion.'
    ],
    heroNote: 'QuickChoice Rentals serves Myrtle Beach and Charleston only.',
    answerCards: [
      {
        title: 'What This Page Covers',
        text:
          'This page focuses on pack and play rentals as a dedicated family travel search topic.'
      },
      {
        title: 'Who It Is For',
        text:
          'It is for families who want a portable, flexible option for sleep and play during a trip.'
      },
      {
        title: 'Why It Matters',
        text:
          'Pack and play searches are highly transactional because families usually know they need one before arrival.'
      }
    ],
    keyPoints: [
      'Primary target: pack and play rental Myrtle Beach SC and Charleston SC.',
      'Useful comparison page alongside crib and sleep bundle pages.',
      'Built around a single real inventory item.'
    ],
    cardSections: [
      {
        title: 'Pack and Play Details',
        intro: 'Review the product details and compare related sleep-focused pages.',
        cards: compact([
          buildProductCard('baby-pack-n-play'),
          buildRentalIntentCard('crib-rentals'),
          buildRentalIntentCard('sleep-essentials-bundle')
        ])
      }
    ],
    contentSections: [
      {
        title: 'When a Pack and Play Rental Is a Good Fit',
        bullets: [
          'Trips that need a flexible sleep setup',
          'Families that want one compact item instead of a heavier sleep system',
          'Travelers comparing crib vs. pack n play options'
        ]
      }
    ],
    faqs: [
      {
        question: 'Do you offer pack and play rentals in Myrtle Beach, SC?',
        answer:
          'Yes. QuickChoice Rentals offers pack and play rentals in Myrtle Beach, SC.'
      },
      {
        question: 'Do you offer pack and play rentals in Charleston, SC?',
        answer:
          'Yes. QuickChoice Rentals also offers pack and play rentals in Charleston, SC.'
      }
    ],
    relatedLinks: [
      buildRelatedLink('/rentals/crib-rentals', 'Crib rentals', 'Compare a pack n play with a crib rental.'),
      buildRelatedLink('/rentals/sleep-essentials-bundle', 'Sleep essentials bundle', 'See the sleep-focused bundle page.'),
      buildRelatedLink('/resources/how-to-choose-between-crib-bassinet-and-pack-and-play-rentals', 'Crib vs. bassinet vs. pack n play', 'Read the sleep setup comparison guide.')
    ],
    footerCta: {
      title: 'Need a pack and play for your trip?',
      text:
        'Choose your dates first, then review the pack and play details or compare nearby sleep pages.',
      links: [
        { href: '/checkout', label: 'Choose Your Dates' },
        { href: '/product/baby-pack-n-play', label: 'View Pack n Play Details', kind: 'secondary' }
      ]
    }
  }),
  makeRentalPage({
    slug: 'high-chair-rentals',
    primaryKeyword: 'high chair rental Myrtle Beach SC',
    metaTitle: 'High Chair Rentals in Myrtle Beach & Charleston | QuickChoice Rentals',
    metaDescription:
      'Compare high chair and booster seat rentals for Myrtle Beach and Charleston family trips.',
    eyebrow: 'High-intent baby rental page',
    title: 'High Chair Rentals in Myrtle Beach & Charleston',
    shortTitle: 'High Chair Rentals',
    cardMeta: 'Product-intent page',
    cardDescription:
      'Compare high chair and booster seat rental options for Myrtle Beach and Charleston.',
    image: withBasePath('/rentals/visual/product-images/high-chair-tray.png'),
    intro: [
      'QuickChoice Rentals offers high chair rentals for Myrtle Beach and Charleston trips, plus a booster seat option for families who need a lighter feeding setup.',
      'High chair pages help rank for one of the most common meal-time rental searches while keeping the path to conversion obvious.'
    ],
    heroNote: 'QuickChoice Rentals serves Myrtle Beach and Charleston only.',
    answerCards: [
      {
        title: 'What This Page Covers',
        text:
          'This page covers high chair and booster-seat-style meal-time rentals for family vacations.'
      },
      {
        title: 'Who It Is For',
        text:
          'It is for parents who want to make feeding easier at the vacation rental without traveling with bulky seat gear.'
      },
      {
        title: 'Why It Matters',
        text:
          'Meal-time equipment is easy to overlook until arrival, which is why high chair searches are often high-intent.'
      }
    ],
    keyPoints: [
      'Primary target: high chair rental Myrtle Beach SC and Charleston SC.',
      'Includes both full high chair and booster-seat-style options.',
      'Ties closely to baby basics and family travel pages.'
    ],
    cardSections: [
      {
        title: 'Meal-Time Rental Options',
        intro: 'Compare the feeding setup that best fits your travel needs.',
        cards: compact([
          buildProductCard('baby-high-chair-tray'),
          buildProductCard('baby-booster-seat-tray'),
          buildRentalIntentCard('baby-basics-bundle')
        ])
      }
    ],
    contentSections: [
      {
        title: 'Why High Chair Rentals Convert Well',
        paragraphs: [
          'High chair searches are highly practical. Guests already know they need help with meal-time logistics, so a page that answers the what, where, and how clearly is more likely to convert than a generic category listing.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Do you offer high chair rentals in Myrtle Beach and Charleston?',
        answer:
          'Yes. QuickChoice Rentals offers high chair rentals in Myrtle Beach, SC and Charleston, SC.'
      },
      {
        question: 'Do you offer a booster seat rental too?',
        answer:
          'Yes. The site also lists a booster seat option for families who want a more compact feeding setup.'
      }
    ],
    relatedLinks: [
      buildRelatedLink('/rentals/baby-basics-bundle', 'Baby basics bundle', 'See a bundle that includes meal-time essentials.'),
      buildRelatedLink('/rentals/baby-gear', 'Baby gear rentals', 'See the full baby category.'),
      buildRelatedLink('/resources/what-to-rent-instead-of-bringing-on-vacation-with-a-baby', 'What to rent instead of bring', 'Read the baby travel planning guide.')
    ],
    footerCta: {
      title: 'Need a high chair for your trip?',
      text:
        'Choose your dates, then compare the feeding options that fit your family best.',
      links: [
        { href: '/checkout', label: 'Choose Your Dates' },
        { href: '/category/baby', label: 'Shop Baby Gear', kind: 'secondary' }
      ]
    }
  }),
  makeRentalPage({
    slug: 'beach-chair-rentals',
    primaryKeyword: 'beach chair rentals Myrtle Beach SC',
    metaTitle: 'Beach Chair Rentals in Myrtle Beach & Charleston | QuickChoice Rentals',
    metaDescription:
      'Compare beach chair rental options for Myrtle Beach and Charleston trips, including chair-and-umbrella combinations.',
    eyebrow: 'High-intent beach rental page',
    title: 'Beach Chair Rentals in Myrtle Beach & Charleston',
    shortTitle: 'Beach Chair Rentals',
    cardMeta: 'Product-intent page',
    cardDescription:
      'Compare beach chair rental options for Myrtle Beach and Charleston vacations.',
    image: withBasePath('/rentals/visual/product-images-beach/beach-chair.png'),
    intro: [
      'QuickChoice Rentals offers beach chair rentals for Myrtle Beach and Charleston trips, including a chair-and-umbrella combination for guests who want a simpler all-in-one setup.',
      'Beach chair rentals are one of the clearest transactional beach search topics, which makes this page an important part of the site’s local SEO structure.'
    ],
    heroNote: 'QuickChoice Rentals serves Myrtle Beach and Charleston only.',
    answerCards: [
      {
        title: 'What This Page Covers',
        text:
          'This page focuses on beach chair rental intent, including standalone chair rentals and chair-plus-umbrella options.'
      },
      {
        title: 'Who It Is For',
        text:
          'It is for travelers who want a more comfortable beach day without packing oversized seating.'
      },
      {
        title: 'Why It Matters',
        text:
          'Beach chair rentals are frequently searched by guests who already know they want a simpler setup as soon as they reach the coast.'
      }
    ],
    keyPoints: [
      'Primary target: beach chair rentals Myrtle Beach SC and Charleston SC.',
      'Includes both chair-only and chair-with-umbrella options.',
      'Links directly into bundles and beach category pages.'
    ],
    cardSections: [
      {
        title: 'Beach Chair Rental Options',
        intro: 'Compare the chair setup that matches your beach day.',
        cards: compact([
          buildProductCard('beach-chair'),
          buildProductCard('beach-chair-umbrella'),
          buildRentalIntentCard('family-beach-bundle')
        ])
      }
    ],
    contentSections: [
      {
        title: 'Why Beach Chair Rentals Matter',
        paragraphs: [
          'Beach chairs are a classic example of an item guests would rather use than transport. A dedicated page makes it easier for searchers to confirm availability and move toward booking.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Do you offer beach chair rentals in Myrtle Beach, SC?',
        answer:
          'Yes. QuickChoice Rentals offers beach chair rentals in Myrtle Beach, SC.'
      },
      {
        question: 'Do you offer beach chair rentals in Charleston, SC?',
        answer:
          'Yes. QuickChoice Rentals also offers beach chair rentals in Charleston, SC.'
      }
    ],
    relatedLinks: [
      buildRelatedLink('/rentals/umbrella-rentals', 'Umbrella rentals', 'Compare chairs with shade-focused rentals.'),
      buildRelatedLink('/rentals/family-beach-bundle', 'Family beach bundle', 'See a bundle that includes chairs and umbrella support.'),
      buildRelatedLink('/rentals/beach-gear', 'Beach gear rentals', 'See the full beach rental category.')
    ],
    footerCta: {
      title: 'Need beach chairs for your trip?',
      text:
        'Choose your dates, then compare chair options or bundle your beach setup together.',
      links: [
        { href: '/checkout', label: 'Choose Your Dates' },
        { href: '/category/beach', label: 'Shop Beach Gear', kind: 'secondary' }
      ]
    }
  }),
  makeRentalPage({
    slug: 'umbrella-rentals',
    primaryKeyword: 'beach umbrella rentals Myrtle Beach SC',
    metaTitle: 'Beach Umbrella Rentals in Myrtle Beach & Charleston | QuickChoice Rentals',
    metaDescription:
      'Rent beach umbrellas for Myrtle Beach and Charleston trips with local delivery from QuickChoice Rentals.',
    eyebrow: 'High-intent beach rental page',
    title: 'Beach Umbrella Rentals in Myrtle Beach & Charleston',
    shortTitle: 'Umbrella Rentals',
    cardMeta: 'Product-intent page',
    cardDescription:
      'Compare beach umbrella rental options for Myrtle Beach and Charleston stays.',
    image: withBasePath('/rentals/visual/product-images-beach/umbrella.png'),
    intro: [
      'QuickChoice Rentals offers beach umbrella rentals for Myrtle Beach and Charleston trips. Umbrella searches tend to come from guests who want comfort, shade, and a more usable beach setup without packing large gear.',
      'This page keeps the offer explicit and internally linked to related chair and wagon pages so the path from research to booking stays short.'
    ],
    heroNote: 'QuickChoice Rentals serves Myrtle Beach and Charleston only.',
    answerCards: [
      {
        title: 'What This Page Covers',
        text:
          'This page focuses on beach umbrella rental intent for shade and comfort during a vacation.'
      },
      {
        title: 'Who It Is For',
        text:
          'It is for travelers who want a more comfortable beach setup without bringing full-size shade gear.'
      },
      {
        title: 'Why It Matters',
        text:
          'Shade equipment is one of the most practical high-intent beach search terms, which makes it a strong landing page topic.'
      }
    ],
    keyPoints: [
      'Primary target: beach umbrella rentals Myrtle Beach SC and Charleston SC.',
      'Strong companion page to beach chair and wagon rentals.',
      'Supports beach bundle comparisons.'
    ],
    cardSections: [
      {
        title: 'Umbrella Rental Options',
        intro: 'Review umbrella-focused options and related pages.',
        cards: compact([
          buildProductCard('beach-umbrella'),
          buildProductCard('beach-chair-umbrella'),
          buildRentalIntentCard('family-beach-bundle')
        ])
      }
    ],
    contentSections: [
      {
        title: 'When Umbrella Rentals Are Most Useful',
        bullets: [
          'Trips where shade matters for longer beach days',
          'Families traveling with kids who need a more comfortable setup',
          'Guests who want a practical beach-day add-on with minimal packing'
        ]
      }
    ],
    faqs: [
      {
        question: 'Do you offer beach umbrella rentals in Myrtle Beach and Charleston?',
        answer:
          'Yes. QuickChoice Rentals offers beach umbrella rentals in Myrtle Beach, SC and Charleston, SC.'
      },
      {
        question: 'Can I pair umbrella rentals with chairs?',
        answer:
          'Yes. The site also includes a beach chair with umbrella option and related bundle pages.'
      }
    ],
    relatedLinks: [
      buildRelatedLink('/rentals/beach-chair-rentals', 'Beach chair rentals', 'Pair umbrella rentals with chair rentals.'),
      buildRelatedLink('/rentals/beach-wagon-rentals', 'Beach wagon rentals', 'Add easier gear transport to your setup.'),
      buildRelatedLink('/rentals/beach-gear', 'Beach gear rentals', 'See the full beach gear category.')
    ],
    footerCta: {
      title: 'Need beach shade for your trip?',
      text:
        'Choose your dates and then review umbrella details or combine them with other beach essentials.',
      links: [
        { href: '/checkout', label: 'Choose Your Dates' },
        { href: '/category/beach', label: 'Shop Beach Gear', kind: 'secondary' }
      ]
    }
  }),
  makeRentalPage({
    slug: 'beach-wagon-rentals',
    primaryKeyword: 'beach wagon rentals Myrtle Beach SC',
    metaTitle: 'Beach Wagon Rentals in Myrtle Beach & Charleston | QuickChoice Rentals',
    metaDescription:
      'Compare beach wagon and beach cart rentals for Myrtle Beach and Charleston trips with local delivery.',
    eyebrow: 'High-intent beach rental page',
    title: 'Beach Wagon Rentals in Myrtle Beach & Charleston',
    shortTitle: 'Beach Wagon Rentals',
    cardMeta: 'Product-intent page',
    cardDescription:
      'Compare beach wagon and beach cart rentals for Myrtle Beach and Charleston vacations.',
    image: withBasePath('/rentals/visual/product-images-beach/beach-wagon.png'),
    intro: [
      'QuickChoice Rentals offers beach wagon rentals for Myrtle Beach and Charleston trips, along with a beach cart option for guests who want easier transport across the day.',
      'Transport-focused beach pages are especially useful because they answer a very practical search need and work well with chairs, umbrellas, and accessibility rentals.'
    ],
    heroNote: 'QuickChoice Rentals serves Myrtle Beach and Charleston only.',
    answerCards: [
      {
        title: 'What This Page Covers',
        text:
          'This page focuses on beach wagon and transport-oriented rental intent.'
      },
      {
        title: 'Who It Is For',
        text:
          'It is for guests who want fewer trips to the sand and an easier way to move beach-day essentials.'
      },
      {
        title: 'Why It Matters',
        text:
          'Transport gear becomes more valuable as family gear, coolers, and comfort items add up.'
      }
    ],
    keyPoints: [
      'Primary target: beach wagon rentals Myrtle Beach SC and Charleston SC.',
      'Also supports searches for beach cart rentals.',
      'Strong complement to umbrella, chair, and accessibility pages.'
    ],
    cardSections: [
      {
        title: 'Transport-Focused Rental Options',
        intro: 'Compare wagon and cart details based on how much gear you expect to move.',
        cards: compact([
          buildProductCard('beach-wagon'),
          buildProductCard('beach-cart'),
          buildRentalIntentCard('beach-wheelchair-rentals')
        ])
      }
    ],
    contentSections: [
      {
        title: 'Why Wagon Rentals Matter',
        paragraphs: [
          'Beach wagon and cart searches are usually about convenience and energy. A good transport option can make the rest of the beach setup much easier to manage, which is why this page supports both direct conversion and related internal links.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Do you offer beach wagon rentals in Myrtle Beach and Charleston?',
        answer:
          'Yes. QuickChoice Rentals offers beach wagon rentals in Myrtle Beach, SC and Charleston, SC.'
      },
      {
        question: 'Do you also offer a beach cart rental?',
        answer:
          'Yes. The site includes a beach cart option as part of the beach transport lineup.'
      }
    ],
    relatedLinks: [
      buildRelatedLink('/rentals/beach-chair-rentals', 'Beach chair rentals', 'Build out the rest of your beach setup.'),
      buildRelatedLink('/rentals/umbrella-rentals', 'Umbrella rentals', 'Add shade to a transport-focused setup.'),
      buildRelatedLink('/rentals/beach-wheelchair-rentals', 'Beach wheelchair rentals', 'See the accessibility-focused page.')
    ],
    footerCta: {
      title: 'Need easier beach transport?',
      text:
        'Choose your dates and then compare the wagon and cart options that fit your trip.',
      links: [
        { href: '/checkout', label: 'Choose Your Dates' },
        { href: '/category/beach', label: 'Shop Beach Gear', kind: 'secondary' }
      ]
    }
  }),
  makeRentalPage({
    slug: 'beach-wheelchair-rentals',
    primaryKeyword: 'beach wheelchair rentals Myrtle Beach SC',
    metaTitle: 'Beach Wheelchair Rentals in Myrtle Beach & Charleston | QuickChoice Rentals',
    metaDescription:
      'Explore beach wheelchair rentals for Myrtle Beach and Charleston trips with clear local service-area language.',
    eyebrow: 'High-intent accessibility rental page',
    title: 'Beach Wheelchair Rentals in Myrtle Beach & Charleston',
    shortTitle: 'Beach Wheelchair Rentals',
    cardMeta: 'Accessibility product page',
    cardDescription:
      'See beach wheelchair rental options for Myrtle Beach and Charleston travelers.',
    image: withBasePath('/rentals/visual/product-images-beach/beach-wheelchair.png'),
    primaryProductId: 'beach-wheelchair',
    intro: [
      'QuickChoice Rentals offers beach wheelchair rentals for Myrtle Beach and Charleston trips. This page is a core SEO priority because beach wheelchair searches are high-intent, highly local, and extremely clarity-dependent.',
      'The language on the page is intentionally direct: QuickChoice Rentals rents beach wheelchairs, serves Myrtle Beach and Charleston, and supports the trip with related beach access gear where it makes sense.'
    ],
    heroNote: 'QuickChoice Rentals serves Myrtle Beach and Charleston only.',
    answerCards: [
      {
        title: 'What This Page Covers',
        text:
          'This page focuses on beach wheelchair rentals as the site’s main accessibility-led search topic.'
      },
      {
        title: 'Who It Is For',
        text:
          'It is for travelers and families planning beach access with more confidence and less uncertainty.'
      },
      {
        title: 'Why It Matters',
        text:
          'Beach wheelchair searches are highly specific and need direct answers, which makes this one of the most important AI-readable pages on the site.'
      }
    ],
    keyPoints: [
      'Primary target: beach wheelchair rentals Myrtle Beach SC and Charleston SC.',
      'Strong local search and accessibility visibility value.',
      'Connected to accessibility category pages and location pages.'
    ],
    cardSections: [
      {
        title: 'Beach Wheelchair Rental Details',
        intro: 'Review the primary beach wheelchair listing and related accessibility pages.',
        cards: compact([
          buildProductCard('beach-wheelchair'),
          buildRentalIntentCard('accessibility-equipment'),
          buildBundleCard('bundle-beach-access')
        ])
      }
    ],
    contentSections: [
      {
        title: 'Why A Dedicated Beach Wheelchair Page Matters',
        paragraphs: [
          'Accessibility rental searches need more precision than most beach gear searches. A direct, clearly structured page improves relevance for both users and AI-generated search answers.'
        ]
      },
      {
        title: 'What Else Can Support The Trip',
        bullets: [
          'Beach carts for additional transport support',
          'Umbrellas for more comfortable beach setups',
          'Accessibility-focused bundle combinations'
        ]
      }
    ],
    faqs: [
      {
        question: 'Do you offer beach wheelchair rentals in Myrtle Beach, SC?',
        answer:
          'Yes. QuickChoice Rentals offers beach wheelchair rentals in Myrtle Beach, SC.'
      },
      {
        question: 'Do you offer beach wheelchair rentals in Charleston, SC?',
        answer:
          'Yes. QuickChoice Rentals also offers beach wheelchair rentals in Charleston, SC.'
      }
    ],
    relatedLinks: [
      buildRelatedLink('/rentals/accessibility-equipment', 'Accessibility equipment rentals', 'See the broader accessibility-focused category page.'),
      buildRelatedLink('/locations/myrtle-beach-sc/accessibility-rentals', 'Myrtle Beach accessibility rentals', 'See the Myrtle Beach accessibility landing page.'),
      buildRelatedLink('/locations/charleston-sc/accessibility-rentals', 'Charleston accessibility rentals', 'See the Charleston accessibility landing page.')
    ],
    footerCta: {
      title: 'Need a beach wheelchair for your trip?',
      text:
        'Choose your dates first, then review the beach wheelchair details or compare the accessibility pages for your location.',
      links: [
        { href: '/checkout', label: 'Choose Your Dates' },
        { href: '/product/beach-wheelchair', label: 'View Beach Wheelchair Details', kind: 'secondary' }
      ]
    }
  }),
  makeRentalPage({
    slug: 'family-beach-bundle',
    primaryKeyword: 'family beach bundle rentals Myrtle Beach SC',
    metaTitle: 'Family Beach Bundle Rentals in Myrtle Beach & Charleston | QuickChoice Rentals',
    metaDescription:
      'See the family beach bundle rental page for Myrtle Beach and Charleston trips, built around chairs, umbrella, and wagon comfort.',
    eyebrow: 'Bundle-intent page',
    title: 'Family Beach Bundle Rentals in Myrtle Beach & Charleston',
    shortTitle: 'Family Beach Bundle',
    cardMeta: 'Bundle-intent page',
    cardDescription:
      'See a family beach bundle built around chairs, umbrella, and wagon-friendly transport.',
    image: withBasePath('/rentals/visual/product-images-beach/bunndle/beach-day-set.png'),
    intro: [
      'QuickChoice Rentals uses this page to target travelers who want a family beach bundle instead of booking every item one by one. The featured setup is the Beach Day Set, which combines the core beach-day basics families search for most often.',
      'It is a strong fit for guests who want faster booking and a more complete beach setup from the start.'
    ],
    heroNote: 'QuickChoice Rentals serves Myrtle Beach and Charleston only.',
    answerCards: [
      {
        title: 'What This Bundle Covers',
        text:
          'The featured family beach bundle is centered on chairs, umbrella coverage, and wagon transport for a simpler beach day.'
      },
      {
        title: 'Who It Is For',
        text:
          'It is for families and beach travelers who want the basics grouped together instead of selected one at a time.'
      },
      {
        title: 'Why It Matters',
        text:
          'Bundle intent often signals strong readiness to book, which makes this a valuable transactional landing page.'
      }
    ],
    keyPoints: [
      'Primary target: family beach bundle rentals Myrtle Beach SC and Charleston SC.',
      'Maps cleanly to an existing beach bundle in inventory.',
      'Supports category, product, and location pages with strong internal links.'
    ],
    cardSections: [
      {
        title: 'Featured Family Beach Bundle',
        intro: 'Review the bundle details and compare the nearby beach setup pages.',
        cards: compact([
          buildBundleCard('bundle-beach-day'),
          buildRentalIntentCard('beach-chair-rentals'),
          buildRentalIntentCard('umbrella-rentals')
        ])
      }
    ],
    contentSections: [
      {
        title: 'Why Family Beach Bundles Convert',
        paragraphs: [
          'A family beach bundle works because the items belong together. Guests often need chairs, shade, and transport at the same time, so the bundle reduces friction and helps the landing page feel more actionable.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is included in the family beach bundle?',
        answer:
          'The featured family beach bundle uses the Beach Day Set, which includes two beach chairs, one umbrella, and one beach wagon.'
      },
      {
        question: 'Can I book the family beach bundle for Myrtle Beach or Charleston?',
        answer:
          'Yes. The page is written to support family beach bundle searches in Myrtle Beach, SC and Charleston, SC.'
      }
    ],
    relatedLinks: [
      buildRelatedLink('/rentals/beach-gear', 'Beach gear rentals', 'See the broader beach gear category.'),
      buildRelatedLink('/rentals/beach-chair-rentals', 'Beach chair rentals', 'Compare the chair-focused page.'),
      buildRelatedLink('/rentals/umbrella-rentals', 'Umbrella rentals', 'Compare the shade-focused page.')
    ],
    footerCta: {
      title: 'Need a ready-made beach setup?',
      text:
        'Choose your dates and then review the family beach bundle details or jump into the beach category.',
      links: [
        { href: '/checkout', label: 'Choose Your Dates' },
        { href: '/bundle/bundle-beach-day', label: 'View Bundle Details', kind: 'secondary' }
      ]
    }
  }),
  makeRentalPage({
    slug: 'sleep-essentials-bundle',
    primaryKeyword: 'sleep essentials bundle rentals Myrtle Beach SC',
    metaTitle: 'Sleep Essentials Bundle Rentals | QuickChoice Rentals',
    metaDescription:
      'See the sleep essentials bundle rental page for Myrtle Beach and Charleston family trips.',
    eyebrow: 'Bundle-intent page',
    title: 'Sleep Essentials Bundle Rentals in Myrtle Beach & Charleston',
    shortTitle: 'Sleep Essentials Bundle',
    cardMeta: 'Bundle-intent page',
    cardDescription:
      'See the sleep bundle page built around bassinet, pack n play, slumber pod, and noise machine.',
    image: withBasePath('/rentals/visual/product-images/bundle/baby-sleep-set.png'),
    intro: [
      'QuickChoice Rentals uses this page to capture sleep essentials bundle intent for families who care most about naps, bedtimes, and keeping routines more stable during a trip.',
      'The featured bundle is the Baby Sleep Set, which brings together a bassinet, pack n play, slumber pod, and noise machine.'
    ],
    heroNote: 'QuickChoice Rentals serves Myrtle Beach and Charleston only.',
    answerCards: [
      {
        title: 'What This Bundle Covers',
        text:
          'The sleep essentials bundle focuses on practical bedtime and nap support instead of a mixed set of unrelated items.'
      },
      {
        title: 'Who It Is For',
        text:
          'It is for families whose top priority is keeping sleep more manageable during a trip.'
      },
      {
        title: 'Why It Matters',
        text:
          'Sleep-focused bundles match a very real family travel need, which makes them useful for both ranking and conversion.'
      }
    ],
    keyPoints: [
      'Primary target: sleep essentials bundle rentals.',
      'Maps directly to the Baby Sleep Set already in inventory.',
      'Supports crib and pack n play pages with relevant internal links.'
    ],
    cardSections: [
      {
        title: 'Featured Sleep Bundle',
        intro: 'Review the bundle details and compare nearby sleep pages.',
        cards: compact([
          buildBundleCard('bundle-baby-sleep'),
          buildRentalIntentCard('crib-rentals'),
          buildRentalIntentCard('pack-and-play-rentals')
        ])
      }
    ],
    contentSections: [
      {
        title: 'Why Sleep Bundles Matter',
        paragraphs: [
          'Sleep problems can shape the entire trip. A clear, dedicated bundle page helps families solve that problem faster and gives search engines a more answer-ready page to surface.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is included in the sleep essentials bundle?',
        answer:
          'The featured sleep essentials bundle uses the Baby Sleep Set, which includes a bassinet, pack n play, slumber pod, and noise machine.'
      }
    ],
    relatedLinks: [
      buildRelatedLink('/rentals/crib-rentals', 'Crib rentals', 'Compare the bundle with a crib-specific page.'),
      buildRelatedLink('/rentals/pack-and-play-rentals', 'Pack n play rentals', 'Compare the bundle with the pack n play page.'),
      buildRelatedLink('/resources/how-to-choose-between-crib-bassinet-and-pack-and-play-rentals', 'Sleep setup comparison guide', 'Read the crib, bassinet, and pack n play guide.')
    ],
    footerCta: {
      title: 'Need a sleep-focused setup?',
      text:
        'Choose your dates and then review the sleep bundle details or compare the related sleep pages.',
      links: [
        { href: '/checkout', label: 'Choose Your Dates' },
        { href: '/bundle/bundle-baby-sleep', label: 'View Bundle Details', kind: 'secondary' }
      ]
    }
  }),
  makeRentalPage({
    slug: 'baby-basics-bundle',
    primaryKeyword: 'baby basics bundle rentals Myrtle Beach SC',
    metaTitle: 'Baby Basics Bundle Rentals | QuickChoice Rentals',
    metaDescription:
      'See the baby basics bundle rental page for Myrtle Beach and Charleston family travel.',
    eyebrow: 'Bundle-intent page',
    title: 'Baby Basics Bundle Rentals in Myrtle Beach & Charleston',
    shortTitle: 'Baby Basics Bundle',
    cardMeta: 'Bundle-intent page',
    cardDescription:
      'See the baby basics bundle page built around crib, high chair, and bath tub essentials.',
    image: withBasePath('/rentals/visual/product-images/bundle/baby-basics.png'),
    intro: [
      'QuickChoice Rentals uses this page to target baby basics bundle searches with a straightforward family setup page. The featured bundle combines a crib, high chair, and bath tub for travelers who want the core pieces handled quickly.',
      'It works well as a landing page because the bundle maps neatly to a common family travel question: what do we need at the rental right away?'
    ],
    heroNote: 'QuickChoice Rentals serves Myrtle Beach and Charleston only.',
    answerCards: [
      {
        title: 'What This Bundle Covers',
        text:
          'The baby basics bundle focuses on the foundational items families often want in place first.'
      },
      {
        title: 'Who It Is For',
        text:
          'It is for parents and grandparents who want a simple, efficient family setup without building a cart from scratch.'
      },
      {
        title: 'Why It Matters',
        text:
          'Basic family bundles often convert well because they match practical travel planning, not abstract browsing.'
      }
    ],
    keyPoints: [
      'Primary target: baby basics bundle rentals.',
      'Maps directly to the Baby Basics Set already in inventory.',
      'Connects naturally to crib and high chair pages.'
    ],
    cardSections: [
      {
        title: 'Featured Baby Basics Bundle',
        intro: 'Review the bundle details and compare the related family setup pages.',
        cards: compact([
          buildBundleCard('bundle-baby-basics'),
          buildRentalIntentCard('crib-rentals'),
          buildRentalIntentCard('high-chair-rentals')
        ])
      }
    ],
    contentSections: [
      {
        title: 'Why The Basics Bundle Works',
        paragraphs: [
          'Families often want the same core needs covered first: sleep, feeding, and bath-time logistics. This page makes that grouping explicit and easy to understand.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is included in the baby basics bundle?',
        answer:
          'The featured baby basics bundle uses the Baby Basics Set, which includes a crib, high chair with tray, and bath tub.'
      }
    ],
    relatedLinks: [
      buildRelatedLink('/rentals/baby-gear', 'Baby gear rentals', 'See the full baby gear category.'),
      buildRelatedLink('/rentals/crib-rentals', 'Crib rentals', 'Compare the bundle with the crib-specific page.'),
      buildRelatedLink('/rentals/high-chair-rentals', 'High chair rentals', 'Compare the bundle with the meal-time page.')
    ],
    footerCta: {
      title: 'Need the basics covered quickly?',
      text:
        'Choose your dates and then review the baby basics bundle details or shop the full baby category.',
      links: [
        { href: '/checkout', label: 'Choose Your Dates' },
        { href: '/bundle/bundle-baby-basics', label: 'View Bundle Details', kind: 'secondary' }
      ]
    }
  }),
  makeRentalPage({
    slug: 'car-safety-bundle',
    primaryKeyword: 'car safety bundle rentals Myrtle Beach SC',
    metaTitle: 'Car Safety Bundle Rentals | QuickChoice Rentals',
    metaDescription:
      'See the car safety bundle rental page for Myrtle Beach and Charleston family travel.',
    eyebrow: 'Bundle-intent page',
    title: 'Car Safety Bundle Rentals in Myrtle Beach & Charleston',
    shortTitle: 'Car Safety Bundle',
    cardMeta: 'Bundle-intent page',
    cardDescription:
      'See the travel-ready family bundle page built around car seat, stroller, and pack n play support.',
    image: withBasePath('/rentals/visual/product-images/bundle/travel-ready-set.png'),
    intro: [
      'QuickChoice Rentals uses this page to target car safety bundle intent with the closest real-inventory fit: the Travel Ready Set. It includes an infant car seat plus other practical travel-day gear like a pack n play, stroller, and monitor.',
      'The page stays honest about the bundle contents while still speaking to the searchers who are trying to solve car-seat-and-travel logistics quickly.'
    ],
    heroNote: 'QuickChoice Rentals serves Myrtle Beach and Charleston only.',
    answerCards: [
      {
        title: 'What This Bundle Covers',
        text:
          'The bundle centers on travel-ready family gear, including an infant car seat and nearby essentials for the rest of the trip.'
      },
      {
        title: 'Who It Is For',
        text:
          'It is for families who want a travel-focused bundle instead of booking a car seat and other core items separately.'
      },
      {
        title: 'Why It Matters',
        text:
          'Travel and car safety questions are highly practical, so this bundle page creates a clearer booking path for that intent.'
      }
    ],
    keyPoints: [
      'Primary target: car safety bundle rentals.',
      'Uses the existing Travel Ready Set rather than inventing a new bundle.',
      'Supports stroller, pack n play, and baby gear pages.'
    ],
    cardSections: [
      {
        title: 'Featured Travel-Ready Bundle',
        intro: 'Review the travel-ready bundle details and compare the nearby travel pages.',
        cards: compact([
          buildBundleCard('bundle-baby-travel-safety'),
          buildRentalIntentCard('stroller-rentals'),
          buildRentalIntentCard('pack-and-play-rentals')
        ])
      }
    ],
    contentSections: [
      {
        title: 'Why This Bundle Page Exists',
        paragraphs: [
          'Families searching for travel-ready or car-safety-oriented rentals usually want a faster route to the right essentials. This page creates that path without overstating what is inside the bundle.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is included in the car safety bundle page?',
        answer:
          'The page is built around the Travel Ready Set, which includes an infant car seat, pack n play, single stroller, and one camera monitor.'
      }
    ],
    relatedLinks: [
      buildRelatedLink('/rentals/stroller-rentals', 'Stroller rentals', 'Compare the bundle with stroller options.'),
      buildRelatedLink('/rentals/pack-and-play-rentals', 'Pack and play rentals', 'Compare the bundle with the pack n play page.'),
      buildRelatedLink('/rentals/baby-gear', 'Baby gear rentals', 'See the broader baby category.')
    ],
    footerCta: {
      title: 'Need a travel-ready family setup?',
      text:
        'Choose your dates and then review the travel-ready bundle details or compare the nearby baby travel pages.',
      links: [
        { href: '/checkout', label: 'Choose Your Dates' },
        { href: '/bundle/bundle-baby-travel-safety', label: 'View Bundle Details', kind: 'secondary' }
      ]
    }
  })
];

const rentalPagesBySlug = Object.fromEntries(rentalPages.map(page => [page.slug, page]));

function buildResourcePage(config) {
  return {
    ...config,
    path: `/resources/${config.slug}`
  };
}

const resourcePages = [
  buildResourcePage({
    slug: 'what-baby-gear-to-rent-for-a-beach-vacation',
    primaryKeyword: 'what baby gear to rent for a beach vacation',
    metaTitle: 'What Baby Gear to Rent for a Beach Vacation | QuickChoice Rentals',
    metaDescription:
      'See which baby gear rentals matter most for a beach vacation and which pages to compare first.',
    title: 'What Baby Gear to Rent for a Beach Vacation',
    image: withBasePath('/rentals/visual/product-images/crib.webp'),
    intro: [
      'For most beach vacations with a baby, the best rentals are the gear that changes the trip immediately: sleep gear, stroller gear, meal-time gear, and a few comfort-focused add-ons.',
      'This guide helps families narrow that list down and then move toward the right transactional rental pages.'
    ],
    cardSections: [
      {
        title: 'Start With These Rental Pages',
        intro: 'These pages cover the baby gear decisions that matter most for a coastal family trip.',
        cards: compact([
          buildRentalIntentCard('crib-rentals'),
          buildRentalIntentCard('stroller-rentals'),
          buildRentalIntentCard('pack-and-play-rentals'),
          buildRentalIntentCard('high-chair-rentals')
        ])
      }
    ],
    contentSections: [
      {
        title: 'The Most Important Categories',
        bullets: [
          'Sleep gear such as crib or pack n play rentals',
          'Stroller rentals for outings and everyday movement',
          'High chair rentals for easier meal-time routines',
          'Beach gear if the trip includes repeated shoreline visits'
        ]
      },
      {
        title: 'How To Decide',
        paragraphs: [
          'Start with the items that are hardest to pack and most likely to affect your day immediately. Sleep and stroller choices usually come first, followed by feeding support and beach-day comfort gear.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What baby gear should I rent first for a beach vacation?',
        answer:
          'Most families start with sleep gear like a crib or pack n play, then add stroller and meal-time support based on the trip.'
      }
    ],
    relatedLinks: [
      buildRelatedLink('/rentals/baby-gear', 'Baby gear rentals', 'See the full baby gear category.'),
      buildRelatedLink('/locations/myrtle-beach-sc/baby-gear-rentals', 'Myrtle Beach baby gear rentals', 'See the Myrtle Beach baby gear page.'),
      buildRelatedLink('/locations/charleston-sc/baby-gear-rentals', 'Charleston baby gear rentals', 'See the Charleston baby gear page.')
    ]
  }),
  buildResourcePage({
    slug: 'family-packing-checklist-for-myrtle-beach-vacations',
    primaryKeyword: 'family packing checklist Myrtle Beach vacation',
    metaTitle: 'Family Packing Checklist for Myrtle Beach Vacations | QuickChoice Rentals',
    metaDescription:
      'Use this Myrtle Beach family packing checklist to decide what to bring and what to rent locally.',
    title: 'Family Packing Checklist for Myrtle Beach Vacations',
    image: withBasePath('/rentals/visual/carosel-images/myrtle1.webp'),
    intro: [
      'A Myrtle Beach family packing checklist should help you decide which items must travel with you and which ones are easier to rent locally.',
      'This guide keeps the list focused on the most common family trip categories and links directly to the rental pages that can reduce overpacking.'
    ],
    cardSections: [
      {
        title: 'Helpful Myrtle Beach Rental Pages',
        intro: 'Use these pages when the packing list starts feeling too large.',
        cards: compact([
          buildRelatedLocationTopicCard('myrtle-beach-sc', 'baby-gear-rentals'),
          buildRelatedLocationTopicCard('myrtle-beach-sc', 'beach-gear-rentals'),
          buildRelatedLocationTopicCard('myrtle-beach-sc', 'accessibility-rentals')
        ])
      }
    ],
    contentSections: [
      {
        title: 'Pack These First',
        bullets: [
          'Clothing and toiletries',
          'Daily essentials you prefer to keep with you',
          'Any small comfort items your child relies on'
        ]
      },
      {
        title: 'Consider Renting These Instead',
        bullets: [
          'Cribs or pack n plays',
          'Strollers',
          'High chairs',
          'Beach chairs, umbrellas, wagons, and beach wheelchairs'
        ]
      }
    ],
    relatedLinks: [
      buildRelatedLink('/locations/myrtle-beach-sc', 'Myrtle Beach rentals', 'See the main Myrtle Beach rental landing page.'),
      buildRelatedLink('/rentals/family-beach-bundle', 'Family beach bundle', 'See a ready-made beach setup page.'),
      buildRelatedLink('/rentals/baby-gear', 'Baby gear rentals', 'See the full baby gear category.')
    ]
  }),
  buildResourcePage({
    slug: 'family-packing-checklist-for-charleston-trips',
    primaryKeyword: 'family packing checklist Charleston trip',
    metaTitle: 'Family Packing Checklist for Charleston Trips | QuickChoice Rentals',
    metaDescription:
      'Use this Charleston family packing checklist to decide what to bring and what to rent locally.',
    title: 'Family Packing Checklist for Charleston Trips',
    image: withBasePath('/rentals/visual/carosel-images/charleston2.webp'),
    intro: [
      'A Charleston family packing checklist should help you keep the trip lighter while still covering the most important family needs.',
      'This guide points families toward the rental pages that can replace the bulkiest items on the list.'
    ],
    cardSections: [
      {
        title: 'Helpful Charleston Rental Pages',
        intro: 'Use these pages when you want a lighter travel load without giving up the essentials.',
        cards: compact([
          buildRelatedLocationTopicCard('charleston-sc', 'baby-gear-rentals'),
          buildRelatedLocationTopicCard('charleston-sc', 'beach-gear-rentals'),
          buildRelatedLocationTopicCard('charleston-sc', 'accessibility-rentals')
        ])
      }
    ],
    contentSections: [
      {
        title: 'Pack These First',
        bullets: [
          'Clothing and toiletries',
          'Daily essentials you want to keep close during travel',
          'Any must-have comfort items for the child'
        ]
      },
      {
        title: 'Consider Renting These Instead',
        bullets: [
          'Cribs or pack n plays',
          'Strollers',
          'High chairs',
          'Beach chairs, umbrellas, wagons, and beach wheelchairs'
        ]
      }
    ],
    relatedLinks: [
      buildRelatedLink('/locations/charleston-sc', 'Charleston rentals', 'See the main Charleston rental landing page.'),
      buildRelatedLink('/rentals/family-beach-bundle', 'Family beach bundle', 'See a ready-made beach setup page.'),
      buildRelatedLink('/rentals/baby-gear', 'Baby gear rentals', 'See the full baby gear category.')
    ]
  }),
  buildResourcePage({
    slug: 'how-to-choose-between-crib-bassinet-and-pack-and-play-rentals',
    primaryKeyword: 'crib vs bassinet vs pack and play rentals',
    metaTitle: 'How to Choose Between Crib, Bassinet, and Pack and Play Rentals',
    metaDescription:
      'Compare crib, bassinet, and pack and play rentals for vacation travel with a baby.',
    title: 'How to Choose Between Crib, Bassinet, and Pack and Play Rentals',
    image: withBasePath('/rentals/visual/product-images/bassinet.png'),
    intro: [
      'Families usually compare crib, bassinet, and pack n play rentals for one reason: they want the simplest sleep option that still fits the child and the trip.',
      'This guide helps break down the decision and links directly to the related transactional pages.'
    ],
    cardSections: [
      {
        title: 'Compare These Sleep Pages',
        intro: 'Use these pages to move from research into the right rental decision.',
        cards: compact([
          buildRentalIntentCard('crib-rentals'),
          buildRentalIntentCard('pack-and-play-rentals'),
          buildBundleCard('bundle-baby-sleep'),
          buildProductCard('baby-bassinet')
        ])
      }
    ],
    contentSections: [
      {
        title: 'Choose a Crib If',
        bullets: [
          'You want a more traditional sleep setup',
          'The trip is longer and sleep consistency matters',
          'You prefer a dedicated sleep space over portability'
        ]
      },
      {
        title: 'Choose a Bassinet If',
        bullets: [
          'You are traveling with a younger baby',
          'You want a compact bedside option',
          'The child still fits the age and weight range'
        ]
      },
      {
        title: 'Choose a Pack and Play If',
        bullets: [
          'You want flexibility and portability',
          'You prefer a sleep-and-play option',
          'You want a compact rental decision'
        ]
      }
    ],
    relatedLinks: [
      buildRelatedLink('/rentals/crib-rentals', 'Crib rentals', 'See the dedicated crib page.'),
      buildRelatedLink('/rentals/pack-and-play-rentals', 'Pack and play rentals', 'See the dedicated pack n play page.'),
      buildRelatedLink('/rentals/sleep-essentials-bundle', 'Sleep essentials bundle', 'See the sleep-focused bundle page.')
    ]
  }),
  buildResourcePage({
    slug: 'what-to-rent-instead-of-bringing-on-vacation-with-a-baby',
    primaryKeyword: 'what to rent instead of bringing on vacation with a baby',
    metaTitle: 'What to Rent Instead of Bringing on Vacation with a Baby',
    metaDescription:
      'See which baby and beach items are easiest to rent instead of packing for vacation.',
    title: 'What to Rent Instead of Bringing on Vacation with a Baby',
    image: withBasePath('/rentals/visual/product-images/high-chair-tray.png'),
    intro: [
      'When traveling with a baby, the smartest rentals are usually the items that take up the most space and are used the most once you arrive.',
      'This page helps families identify those items and connects them to the strongest transactional rental pages on the site.'
    ],
    cardSections: [
      {
        title: 'Best Pages to Compare First',
        intro: 'These are the rental pages most likely to replace bulky packing items.',
        cards: compact([
          buildRentalIntentCard('crib-rentals'),
          buildRentalIntentCard('stroller-rentals'),
          buildRentalIntentCard('high-chair-rentals'),
          buildRentalIntentCard('family-beach-bundle')
        ])
      }
    ],
    contentSections: [
      {
        title: 'Best Items to Rent Instead of Pack',
        bullets: [
          'Cribs or pack n plays',
          'Strollers',
          'High chairs',
          'Beach chairs, umbrellas, and wagons'
        ]
      }
    ],
    relatedLinks: [
      buildRelatedLink('/rentals/baby-gear', 'Baby gear rentals', 'See the full baby category.'),
      buildRelatedLink('/rentals/beach-gear', 'Beach gear rentals', 'See the full beach category.'),
      buildRelatedLink('/resources/what-baby-gear-to-rent-for-a-beach-vacation', 'What baby gear to rent for a beach vacation', 'Read the family beach guide.')
    ]
  }),
  buildResourcePage({
    slug: 'best-beach-gear-for-families-traveling-with-kids',
    primaryKeyword: 'best beach gear for families traveling with kids',
    metaTitle: 'Best Beach Gear for Families Traveling with Kids | QuickChoice Rentals',
    metaDescription:
      'Compare the beach gear rentals that matter most for families traveling with kids.',
    title: 'Best Beach Gear for Families Traveling with Kids',
    image: withBasePath('/rentals/visual/product-images-beach/beach-chair-umbrella.png'),
    intro: [
      'The best beach gear for families usually comes down to comfort, shade, transport, and access. This guide helps families focus on the rental items that improve the day most quickly.',
      'It also links directly to the transactional pages that support real booking decisions.'
    ],
    cardSections: [
      {
        title: 'Compare These Beach Rental Pages',
        intro: 'These are the beach pages most likely to solve practical family travel problems.',
        cards: compact([
          buildRentalIntentCard('beach-chair-rentals'),
          buildRentalIntentCard('umbrella-rentals'),
          buildRentalIntentCard('beach-wagon-rentals'),
          buildRentalIntentCard('beach-wheelchair-rentals')
        ])
      }
    ],
    contentSections: [
      {
        title: 'Most Useful Categories',
        bullets: [
          'Chairs for comfort and longer beach stays',
          'Umbrellas for shade and heat relief',
          'Wagons or carts for transport',
          'Beach wheelchairs for improved shoreline access when needed'
        ]
      }
    ],
    relatedLinks: [
      buildRelatedLink('/rentals/beach-gear', 'Beach gear rentals', 'See the full beach gear category.'),
      buildRelatedLink('/locations/myrtle-beach-sc/beach-gear-rentals', 'Myrtle Beach beach gear rentals', 'See the Myrtle Beach beach gear page.'),
      buildRelatedLink('/locations/charleston-sc/beach-gear-rentals', 'Charleston beach gear rentals', 'See the Charleston beach gear page.')
    ]
  })
];

const resourcePagesBySlug = Object.fromEntries(resourcePages.map(page => [page.slug, page]));

function buildRelatedLocationTopicCard(locationSlug, topicSlug) {
  const page = getLocationTopicPage(locationSlug, topicSlug);
  if (!page) return null;

  return {
    title: page.title,
    href: page.path,
    description: page.intro[0],
    imageUrl: serviceLocations[locationSlug]?.image,
    imageAlt: page.title,
    meta: page.primaryKeyword,
    linkLabel: 'Explore this page'
  };
}

export const homePageContent = {
  answerCards: [
    {
      title: 'What QuickChoice Rentals Is',
      text:
        'QuickChoice Rentals is a local vacation rental delivery service for baby gear, beach gear, and beach wheelchair rentals.'
    },
    {
      title: 'Where We Deliver',
      text:
        'QuickChoice Rentals serves Myrtle Beach, SC and Charleston, SC. Those are the two active service areas across this site.'
    },
    {
      title: 'Who It Is For',
      text:
        'The service is built for vacationing families, beach travelers, grandparents hosting family visits, and guests who want a lighter packing list.'
    }
  ],
  popularPages: compact([
    buildRentalIntentCard('baby-gear'),
    buildRentalIntentCard('beach-gear'),
    buildRentalIntentCard('accessibility-equipment'),
    buildRentalIntentCard('family-beach-bundle'),
    buildRentalIntentCard('crib-rentals'),
    buildRentalIntentCard('beach-wheelchair-rentals')
  ]),
  locations: Object.values(serviceLocations).map(location => ({
    title: `${location.name} rentals`,
    href: `/locations/${location.slug}`,
    description: location.summary,
    imageUrl: location.image,
    imageAlt: `${location.name} rental delivery`,
    meta: location.shortName,
    linkLabel: 'See location page'
  })),
  resourceCards: compact([
    {
      title: 'What baby gear to rent for a beach vacation',
      href: '/resources/what-baby-gear-to-rent-for-a-beach-vacation',
      description: 'A planning guide that points families toward the most useful baby rental pages.',
      imageUrl: withBasePath('/rentals/visual/product-images/crib.webp'),
      imageAlt: 'Baby gear planning guide',
      meta: 'Resource',
      linkLabel: 'Read guide'
    },
    {
      title: 'Family packing checklist for Myrtle Beach vacations',
      href: '/resources/family-packing-checklist-for-myrtle-beach-vacations',
      description: 'A Myrtle Beach checklist for deciding what to bring and what to rent.',
      imageUrl: withBasePath('/rentals/visual/carosel-images/myrtle1.webp'),
      imageAlt: 'Myrtle Beach packing checklist guide',
      meta: 'Resource',
      linkLabel: 'Read guide'
    },
    {
      title: 'Family packing checklist for Charleston trips',
      href: '/resources/family-packing-checklist-for-charleston-trips',
      description: 'A Charleston checklist for lighter family travel and better rental planning.',
      imageUrl: withBasePath('/rentals/visual/carosel-images/charleston2.webp'),
      imageAlt: 'Charleston packing checklist guide',
      meta: 'Resource',
      linkLabel: 'Read guide'
    }
  ])
};

export const faqPageFaqs = [
  {
    question: 'What can I rent for my trip?',
    answer:
      'You can rent baby gear, beach gear, beach wheelchairs, and a few bundled setups for an easier trip.'
  },
  {
    question: 'Where does QuickChoice Rentals deliver?',
    answer:
      'We currently deliver in Myrtle Beach and Charleston.'
  },
  {
    question: 'How does delivery work?',
    answer:
      'We deliver to your stay before or at arrival and pick everything up when your trip ends.'
  },
  {
    question: 'Are items cleaned between rentals?',
    answer:
      'Yes. Items are sanitized and inspected between rentals.'
  },
  {
    question: 'When should I book my rentals?',
    answer:
      'Earlier is usually better, especially around busy travel dates. Booking ahead gives you the best chance of getting what you need.'
  },
  {
    question: 'Do I need dates before checkout?',
    answer:
      'Yes. Dates are required before checkout so pricing and availability line up with your trip.'
  }
];

export function getRentalPage(slug) {
  return rentalPagesBySlug[slug] || null;
}

export function getAllRentalPages() {
  return rentalPages;
}

export function getLocationPage(slug) {
  const location = serviceLocations[slug];
  if (!location) return null;

  return {
    ...location,
    path: `/locations/${location.slug}`,
    primaryKeyword: `${location.shortName} baby gear rentals`,
    eyebrow: `${location.shortName} vacation rental delivery`,
    title: `Rental Delivery in ${location.name}`,
    intro: [
      location.summary,
      location.travelContext
    ],
    heroNote: 'QuickChoice Rentals serves Myrtle Beach and Charleston only.',
    cardSections: [
      {
        title: `Popular ${location.shortName} Rental Pages`,
        intro: 'Start with the category pages most likely to match a real vacation need.',
        cards: compact([
          buildRelatedLocationTopicCard(location.slug, 'baby-gear-rentals'),
          buildRelatedLocationTopicCard(location.slug, 'beach-gear-rentals'),
          buildRelatedLocationTopicCard(location.slug, 'accessibility-rentals')
        ])
      },
      {
        title: `Popular ${location.shortName} Product Pages`,
        intro: 'These product-intent pages align with some of the strongest local searches.',
        cards: compact([
          buildRentalIntentCard('crib-rentals'),
          buildRentalIntentCard('stroller-rentals'),
          buildRentalIntentCard('beach-chair-rentals'),
          buildRentalIntentCard('beach-wheelchair-rentals')
        ])
      }
    ],
    relatedLinks: [
      buildRelatedLink('/rentals', 'Rentals overview', 'See the site-wide rentals hub.'),
      buildRelatedLink('/rentals/bundles', 'Rental bundles', 'Compare bundle pages for faster booking.'),
      buildRelatedLink('/resources', 'Resources', 'Read planning guides that support the transactional pages.')
    ],
    footerCta: {
      title: `Ready to book rentals in ${location.shortName}?`,
      text:
        'Choose your dates first, then compare the category or product pages that best match your trip.',
      links: [
        { href: '/checkout', label: 'Choose Your Dates' },
        { href: '/rentals', label: 'See Rental Pages', kind: 'secondary' }
      ]
    }
  };
}

export function getAllLocationPages() {
  return Object.keys(serviceLocations).map(slug => getLocationPage(slug)).filter(Boolean);
}

export function getLocationTopicPage(locationSlug, topicSlug) {
  const location = serviceLocations[locationSlug];
  const definition = locationTopicDefinitions[topicSlug];
  if (!location || !definition) return null;

  const page = definition.getPage(location);

  return {
    ...page,
    path: `/locations/${locationSlug}/${topicSlug}`,
    location,
    topicSlug,
    label: definition.label
  };
}

export function getAllLocationTopicPages() {
  return Object.keys(serviceLocations).flatMap(locationSlug =>
    Object.keys(locationTopicDefinitions)
      .map(topicSlug => getLocationTopicPage(locationSlug, topicSlug))
      .filter(Boolean)
  );
}

export function getResourcePage(slug) {
  return resourcePagesBySlug[slug] || null;
}

export function getAllResourcePages() {
  return resourcePages;
}

export function getAllIndexablePaths() {
  return [
    '/',
    '/rentals',
    ...rentalPages.map(page => page.path),
    ...getAllLocationPages().map(page => page.path),
    ...getAllLocationTopicPages().map(page => page.path),
    '/resources',
    ...resourcePages.map(page => page.path),
    '/faq',
    '/how-it-works',
    '/contact'
  ];
}
