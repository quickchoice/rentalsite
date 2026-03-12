import { withBasePath } from '@/lib/paths';

export const categories = [
  { id: 'baby', name: 'Baby Equipment' },
  { id: 'beach', name: 'Beach Gear' }
];

export const locations = [
  { id: 'charleston', name: 'Charleston' },
  { id: 'myrtle-beach', name: 'Myrtle Beach' }
];

const categoryImageById = {
  baby: withBasePath('/rentals/visual/carosel-images/crib.png'),
  beach: withBasePath('/rentals/visual/carosel-images/peopleatbeach.webp')
};

const productImageById = {
  'baby-cribs': withBasePath('/rentals/visual/product-images/crib.webp'),
  'baby-bassinet': withBasePath('/rentals/visual/product-images/bassinet.png'),
  'baby-pack-n-play': withBasePath('/rentals/visual/product-images/packnplay.png'),
  'baby-2-camera-monitor': withBasePath('/rentals/visual/product-images/2cammonitor.png'),
  'baby-1-camera-monitor': withBasePath('/rentals/visual/product-images/1cammonitor.png'),
  'baby-slumberpod': withBasePath('/rentals/visual/product-images/slumberpod.png'),
  'baby-car-seat-booster': withBasePath('/rentals/visual/product-images/carseatbooster.png'),
  'baby-car-seat-infant': withBasePath('/rentals/visual/product-images/car-seat-infant.png'),
  'baby-car-seat-convertible': withBasePath('/rentals/visual/product-images/carseat-convertible-toddler.png'),
  'baby-high-chair-tray': withBasePath('/rentals/visual/product-images/high-chair-tray.png'),
  'baby-booster-seat-tray': withBasePath('/rentals/visual/product-images/booster-seat-tray.png'),
  'baby-single-jogging-stroller': withBasePath('/rentals/visual/product-images/single-jogging-stroller.png'),
  'baby-double-jogging-stroller': withBasePath('/rentals/visual/product-images/double-jogging-stroller.png'),
  'baby-tandem-double-stroller': withBasePath('/rentals/visual/product-images/double-tandem-stroller.png'),
  'baby-bouncy-seat': withBasePath('/rentals/visual/product-images/bouncy-seat.png'),
  'baby-swing': withBasePath('/rentals/visual/product-images/swing.png'),
  'baby-exersaucer': withBasePath('/rentals/visual/product-images/exersaucer.png'),
  'baby-gates': withBasePath('/rentals/visual/product-images/gate.png'),
  'baby-bath-tub': withBasePath('/rentals/visual/product-images/bathtub.png'),
  'baby-noise-machine': withBasePath('/rentals/visual/product-images/noise-machine.png'),
  'baby-welcome-kit': 'https://source.unsplash.com/1200x900/?baby,essentials,kit',
  'beach-classic-chair': 'https://source.unsplash.com/1200x900/?beach,chair',
  'beach-sun-shade': 'https://source.unsplash.com/1200x900/?beach,sun,shade',
  'beach-umbrella': 'https://source.unsplash.com/1200x900/?beach,umbrella',
  'beach-table': 'https://source.unsplash.com/1200x900/?beach,table',
  'beach-cart': 'https://source.unsplash.com/1200x900/?beach,cart',
  'beach-towel': 'https://source.unsplash.com/1200x900/?beach,towel',
  'beach-toys': 'https://source.unsplash.com/1200x900/?beach,toys',
  'beach-cargo-wagon': 'https://source.unsplash.com/1200x900/?cargo,wagon,beach',
  'beach-kids-wagon': 'https://source.unsplash.com/1200x900/?kids,wagon',
  'beach-wheelchair': 'https://source.unsplash.com/1200x900/?beach,wheelchair',
  'beach-spikeball': 'https://source.unsplash.com/1200x900/?spikeball,beach,game',
  'beach-corn-hole': 'https://source.unsplash.com/1200x900/?cornhole,beach,game'
};

const productShortDescriptionById = {
  'baby-cribs': 'Full-size sleep setup with a secure mattress for restful nights.',
  'baby-bassinet': 'Compact bedside sleeping option for newborns and early months.',
  'baby-pack-n-play': 'Portable sleep-and-play station that sets up in minutes.',
  'baby-2-camera-monitor': 'Dual-camera monitor to keep an eye on two sleep spaces.',
  'baby-1-camera-monitor': 'Simple video monitoring with clear day and night visibility.',
  'baby-slumberpod': 'Private blackout sleep pod that helps naps stay on schedule.',
  'baby-car-seat-booster': 'Travel-friendly booster seat for older children on the go.',
  'baby-car-seat-infant': 'Rear-facing infant seat with secure fit for early-stage travel.',
  'baby-car-seat-convertible': 'Convertible seat for growing toddlers with comfort and support.',
  'baby-high-chair-tray': 'Stable high chair with tray for easy mealtime seating.',
  'baby-booster-seat-tray': 'Clip-on style booster seat with tray for quick feeding setup.',
  'baby-single-jogging-stroller': 'Single jogging stroller with smooth handling over long walks.',
  'baby-double-jogging-stroller': 'Double jogging stroller built for siblings and extra room.',
  'baby-tandem-double-stroller': 'Tandem seating stroller that keeps two riders comfortable.',
  'baby-bouncy-seat': 'Calming bouncy seat for short rests and supervised downtime.',
  'baby-swing': 'Gentle swing motion to soothe babies between feeds and naps.',
  'baby-exersaucer': 'Activity center that supports upright play and sensory engagement.',
  'baby-gates': 'Safety gates for doorways and stairs to protect little explorers.',
  'baby-bath-tub': 'Infant bath tub designed for safe and easy bath routines.',
  'baby-noise-machine': 'White noise unit to help maintain nap and bedtime routines.',
  'baby-welcome-kit': 'Starter kit add-on for near-zero checkout testing.',
  'beach-classic-chair': 'Comfortable low-profile chair for relaxing in the sand.',
  'beach-sun-shade': 'Large shade canopy for cooler, longer beach days.',
  'beach-umbrella': 'Easy-open beach umbrella with reliable sun coverage.',
  'beach-table': 'Portable table for drinks, snacks, and small beach essentials.',
  'beach-cart': 'Rolling beach cart that makes transport easier over sand.',
  'beach-towel': 'Soft beach towel for drying off after ocean swims.',
  'beach-toys': 'Family-friendly beach toy set for digging, building, and play.',
  'beach-cargo-wagon': 'Cargo wagon with roomy storage for chairs, toys, and coolers.',
  'beach-kids-wagon': 'Kid-friendly wagon sized for lighter loads and easy pulling.',
  'beach-wheelchair': 'All-terrain beach wheelchair designed for sand mobility access.',
  'beach-spikeball': 'Fast-paced Spikeball set for beach games with friends and family.',
  'beach-corn-hole': 'Corn Hole board set for easy setup and all-ages beach play.'
};

const productSourceUrlById = {
  'baby-cribs': 'https://www.walmart.com/ip/Graco-Olivia-3-in-1-Convertible-Baby-Crib-Driftwood/5318328830',
  'baby-bassinet': 'https://www.walmart.com/ip/Graco-SmartSense-Soothing-Baby-Bassinet-for-Newborns-and-Infants-Luna/5849182949',
  'baby-pack-n-play': 'https://www.walmart.com/ip/Graco-Pack-n-Play-Portable-Playard-Unisex-Kolb/767111182',
  'baby-2-camera-monitor': 'https://www.walmart.com/ip/Ebemate-Video-Baby-Monitor-Camera-2-Camera-2-8-LCD-Screen-Video-Audio-Glow-Night-Vision-2-Way-Talk-Audio-Cam-Baby-Monitoring-1200FT-Range-EBE28-2/1010488268',
  'baby-1-camera-monitor': 'https://www.walmart.com/ip/ebemate-Video-Baby-Monitor-Camera-with-2-8-LCD-Screen-Video-Audio-No-Glow-Night-Vision-2-Way-Talk-Audio-Cam-Baby-Monitoring-1200FT-Range-EBE28/14696821360',
  'baby-slumberpod': 'https://www.walmart.com/ip/SlumberPod-Original-Blackout-Sleep-Tent-Travel-Essential-Babies-Toddlers-Mini-Crib-Pack-N-Play-Cover-Sleep-Pod-Kids-Monitor-Pouch-Fan-Pouch-Blocks-95/2722382913',
  'baby-car-seat-booster': 'https://www.walmart.com/ip/Graco-Tranzitions-3-in-1-Harness-Booster-Car-Seat-Proof/5959693583',
  'baby-car-seat-infant': 'https://www.walmart.com/ip/Graco-SnugRide-Lite-LX-Infant-Car-Seat-Studio-1-Count/10757913624',
  'baby-car-seat-convertible': 'https://www.walmart.com/ip/Graco-TrioGrow-SnugLock-3-in-1-Convertible-Car-Seat-Warren-1-Count/5957984294',
  'baby-high-chair-tray': 'https://www.walmart.com/ip/Graco-Made2Grow-5-in-1-Infant-Toddler-High-Chair-Terrazo-17-55-lbs/5395472215',
  'baby-booster-seat-tray': 'https://www.walmart.com/ip/Upseat-Baby-Floor-Seat-Booster-Chair-for-Sitting-Up-with-Removable-Tray/682213655',
  'baby-single-jogging-stroller': 'https://www.walmart.com/ip/Graco-Ready2Jet-Compact-Infant-Toddler-Stroller-1-Count-Kingston/9583959861',
  'baby-double-jogging-stroller': 'https://www.walmart.com/ip/Baby-Trend-Navigator-Double-Jogging-Stroller-Europa/795830651',
  'baby-tandem-double-stroller': 'https://www.walmart.com/ip/OLAKIDS-Double-Stroller-Foldable-Baby-Tandem-Stroller-Djustable-Backrest-Canopy-Footrest-5-Point-Harness-Storage-Basket-Convertible-Compact-Lightweig/14790956650',
  'baby-bouncy-seat': 'https://www.walmart.com/ip/Bright-Starts-Playful-Paradise-Vibrating-Baby-Bouncer-Unisex-Newborn/1391415210',
  'baby-swing': 'https://www.walmart.com/ip/Bright-Starts-Playful-Paradise-Portable-Compact-Baby-Swing-with-Toys-Unisex-Newborn/111863909',
  'baby-exersaucer': 'https://www.walmart.com/ip/Smart-Steps-Bounce-N-Play-3-in-1-Activity-Center/774998457',
  'baby-gates': 'https://www.walmart.com/ip/Regalo-Extra-Wide-2-in-1-Stairway-and-Hallway-Baby-Safety-Gate-with-Mounting-Kit-Ages-6-to-24-Months/104319308',
  'baby-bath-tub': 'https://www.walmart.com/ip/The-First-Years-Sure-Comfort-Deluxe-Newborn-to-Toddler-Bathtub-Pink/14254249',
  'baby-noise-machine': 'https://www.walmart.com/ip/sound-machine-White/16751008625'
};

const productSpecsById = {
  'baby-cribs': [
    'Clean, arched 3-in-1 convertible crib design with easy-to-match styling.',
    'Mattress included.',
    'Tested and trusted for baby safety.'
  ],
  'baby-bassinet': [
    'Supports newborns to 5 months, up to 20 lb.',
    'Mesh sides with flat, firm sleep surface.',
    'Organic cotton bassinet mattress and sheet.'
  ],
  'baby-pack-n-play': [
    'Airy mesh panels on all sides for ventilation and visibility.',
    'Includes mesh storage pouch for wipes, toys, and essentials.',
    'Portable Graco Pack n Play setup for travel-ready use.'
  ],
  'baby-2-camera-monitor': [
    '2.8 inch HD screen with two cameras for multi-scene monitoring.',
    'Plug-and-play setup for fast use.',
    'Useful for baby, home, or pet monitoring.'
  ],
  'baby-1-camera-monitor': [
    'Two-way talk with local or remote communication.',
    'Real-time sound and video plus temperature detection.',
    'Includes soothing sounds, lullabies, and no-glow night vision.'
  ],
  'baby-slumberpod': [
    'Creates a dark, private sleep nook for easier room sharing.',
    'Breathable blackout fabric blocks 90%+ of light.',
    'Meets juvenile safety standards and has CO2 rebreathing assessment.'
  ],
  'baby-car-seat-booster': [
    '3-in-1 harness booster for toddler through youth.',
    'Lightweight and portable for active travel days.',
    'Open-loop belt guides help position seat belt correctly.'
  ],
  'baby-car-seat-infant': [
    'Lightweight infant seat at 7.2 lb for easier carrying.',
    'Level indicator helps reduce installation guesswork.',
    'Multi-position canopy for comfort and coverage.'
  ],
  'baby-car-seat-convertible': [
    '3-in-1 seat from rear-facing to highback booster stages.',
    'SnugLock tech can install in under one minute.',
    'No-rethread harness and headrest adjust together.'
  ],
  'baby-high-chair-tray': [
    'Fabrics made from 100% recycled materials.',
    '3-position recline for feeding comfort.',
    '2 front wheels for easy movement around home.'
  ],
  'baby-booster-seat-tray': [
    'Suitable for ages 4 months to 2 years (up to 30 lb).',
    'Includes removable tray for meals and play.',
    'Lightweight design with carry handle.'
  ],
  'baby-single-jogging-stroller': [
    'Self-standing compact fold and lightweight 13.2 lb frame.',
    'Removable belly bar doubles as carry handle.',
    'All-wheel suspension for smoother rides.'
  ],
  'baby-double-jogging-stroller': [
    'Parent tray with dual cup holders and storage.',
    'Individual ratcheting shade canopy for each seat.',
    'Remote release for locking front swivel wheel.'
  ],
  'baby-tandem-double-stroller': [
    'Supports two children, each seat up to 33 lb.',
    'Adjustable seat recline ranges for newborn/toddler comfort.',
    'Shock-absorbing wheels and one-step rear brake system.'
  ],
  'baby-bouncy-seat': [
    'Includes 3 spinning toys and removable toy bar.',
    'Soothing vibrations help calm baby.',
    'Adjustable 3-point harness with non-slip feet.'
  ],
  'baby-swing': [
    'Lightweight and foldable for storage or travel.',
    'Toy bar with two interactive toys.',
    'Deep seat with two recline positions and 5-point harness.'
  ],
  'baby-exersaucer': [
    'Bouncing board with three adjustable height settings.',
    '360-degree rotating seat for broader view and motion.',
    'Removable toy package designed for ages 4-15 months.'
  ],
  'baby-gates': [
    '2-in-1 use for stairs, doorways, and hallways.',
    'Adjustable and removable for storage when needed.',
    'Durable all-metal design with hardware-mount kit.'
  ],
  'baby-bath-tub': [
    'Includes infant sling for early bath support.',
    'Mesh sling helps with newborn comfort and stability.',
    'Deep ergonomic tub supports growing babies.'
  ],
  'baby-noise-machine': [
    '16 soothing sounds including piano and nature options.',
    'Designed for stress relief and relaxation.',
    'Helps create a calmer sleep environment.'
  ]
};

const createProduct = (id, name, categoryId, pricePerDay) => ({
  id,
  name,
  categoryId,
  pricePerDay,
  imageUrl: productImageById[id] ?? categoryImageById[categoryId],
  sourceUrl: productSourceUrlById[id] || '',
  shortDescription: productShortDescriptionById[id] ?? `${name} cleaned and ready for your stay.`,
  longDescription:
    `${productShortDescriptionById[id] ?? `${name} cleaned and ready for your stay.`} ` +
    `${categoryId === 'baby' ? 'Great for stress-free family travel.' : 'Perfect for easy beach-day setup.'} ` +
    'Each rental is sanitized, delivered, and picked up at your checkout date.',
  specs: productSpecsById[id] ?? ['Professionally sanitized', 'Delivery + pickup included', 'Vacation-ready setup']
});

export const products = [
  createProduct('baby-cribs', 'Cribs', 'baby', 14.0),
  createProduct('baby-bassinet', 'Bassinet', 'baby', 12.0),
  createProduct('baby-pack-n-play', 'Pack n Play', 'baby', 12.0),
  createProduct('baby-2-camera-monitor', '2 Camera Monitor', 'baby', 14.0),
  createProduct('baby-1-camera-monitor', 'One Camera Video Monitor', 'baby', 9.0),
  createProduct('baby-slumberpod', 'SlumberPod', 'baby', 9.0),
  createProduct('baby-car-seat-booster', 'Car Seat - Booster', 'baby', 12.0),
  createProduct('baby-car-seat-infant', 'Car Seat - Infant', 'baby', 12.0),
  createProduct('baby-car-seat-convertible', 'Car Seat - Convertible / Toddler', 'baby', 12.0),
  createProduct('baby-high-chair-tray', 'High Chair w/Tray', 'baby', 9.0),
  createProduct('baby-booster-seat-tray', 'Booster Seat w/Tray', 'baby', 6.0),
  createProduct('baby-single-jogging-stroller', 'Single Jogging Stroller', 'baby', 12.0),
  createProduct('baby-double-jogging-stroller', 'Double Jogging Stroller', 'baby', 14.0),
  createProduct('baby-tandem-double-stroller', 'Tandem Double Stroller', 'baby', 14.0),
  createProduct('baby-bouncy-seat', 'Bouncy Seat', 'baby', 7.0),
  createProduct('baby-swing', 'Swing', 'baby', 11.0),
  createProduct('baby-exersaucer', 'Exersaucer', 'baby', 8.0),
  createProduct('baby-gates', 'Gates', 'baby', 8.0),
  createProduct('baby-bath-tub', 'Bath Tub', 'baby', 4.0),
  createProduct('baby-noise-machine', 'Noise Machine', 'baby', 2.0),
  createProduct('baby-welcome-kit', 'Welcome Kit (Test Item)', 'baby', 0.5),
  createProduct('beach-classic-chair', 'Classic Beach Chair', 'beach', 5.0),
  createProduct('beach-sun-shade', 'Sun Shade', 'beach', 16.0),
  createProduct('beach-umbrella', 'Beach Umbrella', 'beach', 7.0),
  createProduct('beach-table', 'Beach Table', 'beach', 3.0),
  createProduct('beach-cart', 'Beach Cart', 'beach', 8.0),
  createProduct('beach-towel', 'Beach Towel', 'beach', 2.0),
  createProduct('beach-toys', 'Beach Toys', 'beach', 6.0),
  createProduct('beach-cargo-wagon', 'Cargo Wagon', 'beach', 8.0),
  createProduct('beach-kids-wagon', 'Kids Wagon', 'beach', 8.0),
  createProduct('beach-wheelchair', 'Beach Wheelchair', 'beach', 40.0),
  createProduct('beach-spikeball', 'Spikeball', 'beach', 3.9),
  createProduct('beach-corn-hole', 'Corn Hole', 'beach', 7.0)
];

export const bundles = [
  {
    id: 'bundle-baby-basics',
    name: 'Baby Basics Set',
    categoryId: 'baby',
    items: [
      { productId: 'baby-cribs', qty: 1 },
      { productId: 'baby-high-chair-tray', qty: 1 },
      { productId: 'baby-bath-tub', qty: 1 }
    ],
    pricePerDay: 24.3,
    imageUrl: withBasePath('/rentals/visual/product-images/babybundle.png'),
    discountPercent: 10,
    description: 'Includes: Crib, high chair with tray, and bath tub essentials.'
  },
  {
    id: 'bundle-baby-sleep',
    name: 'Baby Sleep Set',
    categoryId: 'baby',
    items: [
      { productId: 'baby-bassinet', qty: 1 },
      { productId: 'baby-pack-n-play', qty: 1 },
      { productId: 'baby-slumberpod', qty: 1 },
      { productId: 'baby-noise-machine', qty: 1 }
    ],
    pricePerDay: 31.5,
    imageUrl: withBasePath('/rentals/visual/product-images/babybundle.png'),
    discountPercent: 10,
    description: 'Includes: Bassinet, pack n play, slumber pod, and noise machine.'
  },
  {
    id: 'bundle-baby-travel-safety',
    name: 'Travel Safety Set',
    categoryId: 'baby',
    items: [
      { productId: 'baby-car-seat-infant', qty: 1 },
      { productId: 'baby-car-seat-booster', qty: 1 },
      { productId: 'baby-car-seat-convertible', qty: 1 }
    ],
    pricePerDay: 32.4,
    imageUrl: withBasePath('/rentals/visual/product-images/babybundle.png'),
    discountPercent: 10,
    description: 'Includes: Infant, booster, and convertible/toddler car seats.'
  },
  {
    id: 'bundle-baby-mobility',
    name: 'Baby Mobility Set',
    categoryId: 'baby',
    items: [
      { productId: 'baby-single-jogging-stroller', qty: 1 },
      { productId: 'baby-booster-seat-tray', qty: 1 },
      { productId: 'baby-bouncy-seat', qty: 1 }
    ],
    pricePerDay: 22.5,
    imageUrl: withBasePath('/rentals/visual/product-images/babybundle.png'),
    discountPercent: 10,
    description: 'Includes: Single stroller, booster seat tray, and bouncy seat.'
  },
  {
    id: 'bundle-beach-day',
    name: 'Beach Day Set',
    categoryId: 'beach',
    items: [
      { productId: 'beach-classic-chair', qty: 2 },
      { productId: 'beach-umbrella', qty: 1 },
      { productId: 'beach-cargo-wagon', qty: 1 }
    ],
    pricePerDay: 22.5,
    imageUrl: withBasePath('/rentals/visual/product-images/beachbundle.png'),
    discountPercent: 10,
    description: 'Includes: Two classic beach chairs, one umbrella, and one cargo wagon.'
  },
  {
    id: 'bundle-beach-shade',
    name: 'Beach Shade Set',
    categoryId: 'beach',
    items: [
      { productId: 'beach-sun-shade', qty: 1 },
      { productId: 'beach-umbrella', qty: 1 },
      { productId: 'beach-table', qty: 1 }
    ],
    pricePerDay: 23.4,
    imageUrl: withBasePath('/rentals/visual/product-images/beachbundle.png'),
    discountPercent: 10,
    description: 'Includes: Sun shade, beach umbrella, and beach table.'
  },
  {
    id: 'bundle-beach-play',
    name: 'Beach Play Set',
    categoryId: 'beach',
    items: [
      { productId: 'beach-towel', qty: 2 },
      { productId: 'beach-toys', qty: 1 },
      { productId: 'beach-spikeball', qty: 1 },
      { productId: 'beach-corn-hole', qty: 1 }
    ],
    pricePerDay: 18.8,
    imageUrl: withBasePath('/rentals/visual/product-images/beachbundle.png'),
    discountPercent: 10,
    description: 'Includes: Towels, beach toys, spikeball, and corn hole.'
  },
  {
    id: 'bundle-beach-access',
    name: 'Beach Access Set',
    categoryId: 'beach',
    items: [
      { productId: 'beach-wheelchair', qty: 1 },
      { productId: 'beach-cart', qty: 1 },
      { productId: 'beach-umbrella', qty: 1 }
    ],
    pricePerDay: 49.5,
    imageUrl: withBasePath('/rentals/visual/product-images/beachbundle.png'),
    discountPercent: 10,
    description: 'Includes: Beach wheelchair, cart, and umbrella.'
  }
];

export const categoryIntro = {
  baby: 'Full baby gear list for your stay, cleaned and delivery-ready.',
  beach: 'Beach gear plus mobility options, ready for sand and boardwalk use.'
};
