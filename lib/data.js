import { withBasePath } from '@/lib/paths';

export const categories = [
  { id: 'baby', name: 'Baby Gear' },
  { id: 'beach', name: 'Beach Gear' }
];

export const locations = [
  { id: 'charleston', name: 'Charleston' },
  { id: 'myrtle-beach', name: 'Myrtle Beach' }
];

const categoryImageById = {
  baby: withBasePath('/rentals/visual/carosel-images/crib.png'),
  beach: withBasePath('/rentals/visual/carosel-images/myrtle1.webp')
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
  'beach-chair': withBasePath('/rentals/visual/product-images-beach/beach-chair.png'),
  'beach-chair-umbrella': withBasePath('/rentals/visual/product-images-beach/beach-chair-umbrella.png'),
  'beach-umbrella': withBasePath('/rentals/visual/product-images-beach/umbrella.png'),
  'beach-spikeball': withBasePath('/rentals/visual/product-images-beach/spikeball.png'),
  'beach-wagon': withBasePath('/rentals/visual/product-images-beach/beach-wagon.png'),
  'beach-cart': withBasePath('/rentals/visual/product-images-beach/beach-cart.png'),
  'beach-cornhole': withBasePath('/rentals/visual/product-images-beach/cornhole.png'),
  'beach-towel': withBasePath('/rentals/visual/product-images-beach/beach-towel.png'),
  'beach-wheelchair': withBasePath('/rentals/visual/product-images-beach/beach-wheelchair.png'),
  'beach-tent': withBasePath('/rentals/visual/product-images-beach/tent.png')
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
  'beach-chair': 'BOSSIN portable folding beach chair with an adjustable backrest for laid-back shore days.',
  'beach-chair-umbrella': 'Backpack beach chair with an umbrella, storage pockets, and cup holder for all-in-one comfort.',
  'beach-umbrella': 'Premium 8-foot beach umbrella with expansive shade, UPF 50+ protection, and a deep sand anchor.',
  'beach-spikeball': 'Spikeball Weekender Set for fast-paced beach games with friends and family.',
  'beach-wagon': 'Collapsible utility wagon for hauling beach gear, groceries, and sports equipment.',
  'beach-cart': 'Beach cart with big wheels, insulated cooler bag, and holders for boards and umbrellas.',
  'beach-cornhole': 'Wooden cornhole set with boards and bean bags for family beach games.',
  'beach-towel': 'Soft velour stripe beach and pool towel set for drying off after surf and swims.',
  'beach-wheelchair': 'Beach wheelchair with swivel wheels for easier sand access and shoreline mobility.',
  'beach-tent': 'Pop-up beach tent with UV protection and ventilation panels for comfortable, shaded days on the sand.'
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
  'baby-noise-machine': 'https://www.walmart.com/ip/sound-machine-White/16751008625',
  'beach-chair': '',
  'beach-chair-umbrella': '',
  'beach-umbrella': '',
  'beach-spikeball': '',
  'beach-wagon': '',
  'beach-cart': '',
  'beach-cornhole': '',
  'beach-towel': '',
  'beach-wheelchair': '',
  'beach-tent': ''
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
  ],
  'beach-chair': [
    'No assembly required; simply unfold the chair in seconds for immediate use.',
    'Padded shoulder straps make carrying easier for the beach, camping, concerts, and sporting events.',
    'Adjusts to 5 comfortable positions for sunbathing, reading, or napping.'
  ],
  'beach-chair-umbrella': [
    'Includes a towel rack, cup holder, and large storage pockets for personal items, drinks, and ice.',
    'Offers multi-angle seat and armrest adjustments with 5 or 6 recline positions and a rear towel bar.',
    'Lightweight build with adjustable backpack straps and quick setup for easy transport.'
  ],
  'beach-umbrella': [
    'Premium Construction: Meticulously selected materials include a lightweight aluminum pole, flexible fiberglass ribs, a solid zinc alloy tilt mechanism, and the largest integrated sand anchor.',
    'Expansive Shade: Features a massive 8-foot canopy, the largest in its class for portable umbrellas, providing an extensive shaded area.',
    'Superior UV Protection: The canopy boasts a special silver-coated interior lining for certified UPF 50+ defense, blocking 98% of harmful UV rays.',
    'Enhanced Stability: Engineered with an extra-large sand anchor for deep, secure foundation and a double-vented canopy to reduce wind pressure.',
    'Effortless Setup: Designed for quick assembly, allowing users to set up the umbrella and enjoy shade in under 60 seconds.',
    'Durable & Lightweight: Constructed with a robust, rust-proof aluminum pole and flexible fiberglass ribs for strength without added weight, ideal for salty air.',
    'All-Weather Fabric: The canopy features a PA waterproof coating for rain resistance and enhanced tear resistance against transport and windy conditions.'
  ],
  'beach-spikeball': [
    'Compact Spikeball Weekender Set designed for beach, backyard, and travel play.',
    'Quick setup makes it easy to start a game with friends and family.',
    'Item shown is representative; model or color may vary.'
  ],
  'beach-wagon': [
    'Collapsible wagon cart for camping, beach days, picnics, shopping, sports, and groceries.',
    'Portable utility design helps move heavier loads with less effort.',
    'Item shown is representative; model or color may vary.'
  ],
  'beach-cart': [
    'Beach cart with big sand wheels for easier rolling across soft terrain.',
    'Includes an insulated cooler bag plus holders for a boogie board and umbrella.',
    'Wide-wheel wagon design helps carry beach-day essentials in one trip.'
  ],
  'beach-cornhole': [
    'Includes 2 wooden boards and 8 bean bags for a full cornhole setup.',
    '10-piece family game set that is easy to pack for outdoor gatherings.',
    'Designed for all-ages play at the beach, park, or backyard.'
  ],
  'beach-towel': [
    'Ben Kaufman Joey Velour Stripe Beach and Pool Towel set.',
    'Cotton construction is soft, absorbent, and sized at 32 in x 62 in.',
    '4-pack makes it easy to outfit families or groups for the beach.'
  ],
  'beach-wheelchair': [
    'Beach wheelchair with swivel wheels for smoother turning and shoreline access.',
    'Designed to improve mobility across sandy terrain.',
    'Item shown is representative; model or color may vary.'
  ],
  'beach-tent': [
    'Quick pop-up setup with no poles or stakes required — ready in seconds.',
    'UPF 50+ sun protection canopy blocks harmful UV rays for all-day comfort.',
    'Ventilation windows and open design keep airflow moving on hot beach days.'
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
  createProduct('beach-chair', 'Beach Chair', 'beach', 5.0),
  createProduct('beach-chair-umbrella', 'Beach Chair w/ Umbrella', 'beach', 8.0),
  createProduct('beach-umbrella', 'Beach Umbrella', 'beach', 7.0),
  createProduct('beach-wagon', 'Beach Wagon', 'beach', 8.0),
  createProduct('beach-cart', 'Beach Cart', 'beach', 8.0),
  createProduct('beach-towel', 'Beach Towel', 'beach', 2.0),
  createProduct('beach-wheelchair', 'Beach Wheelchair', 'beach', 50.0),
  createProduct('beach-spikeball', 'Spikeball', 'beach', 3.9),
  createProduct('beach-cornhole', 'Cornhole', 'beach', 7.0),
  createProduct('beach-tent', 'Beach Tent', 'beach', 15.0)
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
    imageUrl: withBasePath('/rentals/visual/product-images/bundle/baby-basics.png'),
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
    imageUrl: withBasePath('/rentals/visual/product-images/bundle/baby-sleep-set.png'),
    discountPercent: 10,
    description: 'Includes: Bassinet, pack n play, slumber pod, and noise machine.'
  },
  {
    id: 'bundle-baby-travel-safety',
    name: 'Travel Ready Set',
    categoryId: 'baby',
    items: [
      { productId: 'baby-car-seat-infant', qty: 1 },
      { productId: 'baby-pack-n-play', qty: 1 },
      { productId: 'baby-single-jogging-stroller', qty: 1 },
      { productId: 'baby-1-camera-monitor', qty: 1 }
    ],
    pricePerDay: 40.5,
    imageUrl: withBasePath('/rentals/visual/product-images/bundle/travel-ready-set.png'),
    discountPercent: 10,
    description: 'Includes: Infant car seat, pack n play, single stroller, and one camera monitor.'
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
    imageUrl: withBasePath('/rentals/visual/product-images/bundle/baby-mobility-set.png'),
    discountPercent: 10,
    description: 'Includes: Single stroller, booster seat tray, and bouncy seat.'
  },
  {
    id: 'bundle-beach-day',
    name: 'Beach Day Set',
    categoryId: 'beach',
    items: [
      { productId: 'beach-chair', qty: 2 },
      { productId: 'beach-umbrella', qty: 1 },
      { productId: 'beach-wagon', qty: 1 }
    ],
    pricePerDay: 22.5,
    imageUrl: withBasePath('/rentals/visual/product-images-beach/bunndle/beach-day-set.png'),
    discountPercent: 10,
    description: 'Includes: Two beach chairs, one umbrella, and one beach wagon.'
  },
  {
    id: 'bundle-beach-shade',
    name: 'Beach Comfort Set',
    categoryId: 'beach',
    items: [
      { productId: 'beach-chair-umbrella', qty: 2 },
      { productId: 'beach-umbrella', qty: 1 },
      { productId: 'beach-towel', qty: 2 }
    ],
    pricePerDay: 22.5,
    imageUrl: withBasePath('/rentals/visual/product-images-beach/bunndle/beach-comfort-set.png'),
    discountPercent: 10,
    description: 'Includes: Two beach chairs with umbrellas, one extra umbrella, and two towels.'
  },
  {
    id: 'bundle-beach-play',
    name: 'Beach Play Set',
    categoryId: 'beach',
    items: [
      { productId: 'beach-towel', qty: 2 },
      { productId: 'beach-spikeball', qty: 1 },
      { productId: 'beach-cornhole', qty: 1 }
    ],
    pricePerDay: 11.6,
    imageUrl: withBasePath('/rentals/visual/product-images-beach/bunndle/beach-play-set.png'),
    discountPercent: 10,
    description: 'Includes: Two towels, spikeball, and cornhole.'
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
    imageUrl: withBasePath('/rentals/visual/product-images-beach/bunndle/beach-access.png'),
    discountPercent: 10,
    description: 'Includes: Beach wheelchair, cart, and umbrella.'
  }
];

export const categoryIntro = {
  baby: 'Clean baby gear rentals for Myrtle Beach and Charleston stays, including cribs, strollers, pack n plays, and more.',
  beach: 'Beach gear rentals for Myrtle Beach and Charleston, including chairs, umbrellas, wagons, and beach wheelchair support.'
};
