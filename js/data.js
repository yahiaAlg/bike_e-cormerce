/* ===========================================================
   ARKO — PRODUCT DATA
   Shared demo data for motorcycles and accessories.
   Used by shop, product, configurator, compare, cart, etc.
=========================================================== */

const ARKO_DATA = {
  motorcycles: [
    {
      id: 'rvx',
      name: 'ARKO RVX',
      category: 'Enduro',
      price: 14450,
      oldPrice: null,
      rating: 4.8,
      reviewCount: 142,
      badge: 'Best Seller',
      availability: 'in-stock',
      colors: [
        { name: 'Volt Yellow', hex: '#F2E900' },
        { name: 'Stealth Black', hex: '#0B0B0B' },
        { name: 'Alpine White', hex: '#F4F3EF' },
        { name: 'Forest Green', hex: '#2d4a2b' }
      ],
      specs: { range: '120 km', power: '35 kW', weight: '112 kg', topSpeed: '130 km/h', battery: '4.2 kWh', chargeTime: '3.5 hr' },
      image: 'electric dirt bike studio yellow',
      description: 'The flagship electric enduro. Aircraft-grade aluminium chassis, instant torque, and a 30-second battery swap system. Built for terrain that doesn\'t forgive.',
      features: [
        'Liquid-cooled electric motor with 35 kW peak output',
        'Forged aluminium frame — 112 kg curb weight',
        'Hot-swappable 4.2 kWh battery pack',
        'Fully adjustable long-travel suspension',
        'Three ride modes: Trail, Road, Race',
        'Regenerative braking with descent control'
      ],
      variants: [
        { name: 'Battery', options: ['Standard (4.2 kWh)', 'Extended (6.0 kWh) +€1,200', 'Dual-Swap (2×4.2 kWh) +€2,400'] },
        { name: 'Suspension', options: ['Trail Tuned', 'Performance +€850', 'Competition +€1,400'] },
        { name: 'Wheels', options: ['Standard Spoked', 'Tubeless +€450', 'Pro-Track +€900'] }
      ],
      gallery: ['electric dirt bike front studio', 'dirt bike side profile studio', 'motorcycle suspension closeup detail', 'electric motorcycle wheel closeup', 'motorcycle rider action forest', 'dirt bike mud splash action'],
      accessories: ['fast-charger', 'protection-kit', 'extended-battery', 'riding-jacket', 'enduro-helmet'],
      related: ['rvx-pro', 'trail-s', 'adventure-x'],
      videoTrailer: 'motorcycle riding forest road trail wide'
    },
    {
      id: 'rvx-pro',
      name: 'ARKO RVX Pro',
      category: 'Enduro',
      price: 18900,
      oldPrice: null,
      rating: 4.9,
      reviewCount: 87,
      badge: 'New',
      availability: 'in-stock',
      colors: [
        { name: 'Volt Yellow', hex: '#F2E900' },
        { name: 'Racing Red', hex: '#c0392b' },
        { name: 'Stealth Black', hex: '#0B0B0B' }
      ],
      specs: { range: '150 km', power: '45 kW', weight: '118 kg', topSpeed: '145 km/h', battery: '6.0 kWh', chargeTime: '4 hr' },
      image: 'electric dirt bike studio yellow',
      description: 'The competition-grade RVX. More power, more range, more suspension travel. For riders who line up at the start gate.',
      features: [
        '45 kW competition motor with race mapping',
        '6.0 kWh extended battery pack',
        'Competition-grade long-travel suspension',
        'Reinforced subframe for jump landings',
        'Race telemetry and lap timing',
        'Quick-shift throttle mapping'
      ],
      variants: [
        { name: 'Battery', options: ['Extended (6.0 kWh)', 'Dual-Swap (2×6.0 kWh) +€2,400'] },
        { name: 'Suspension', options: ['Competition', 'Factory Race +€600'] },
        { name: 'Wheels', options: ['Pro-Track', 'Factory Race +€500'] }
      ],
      gallery: ['electric dirt bike front studio', 'dirt bike side profile studio', 'motorcycle suspension closeup detail', 'electric motorcycle wheel closeup', 'dirt bike wheelie action dust', 'enduro rider rocky terrain'],
      accessories: ['fast-charger', 'protection-kit', 'extended-battery', 'riding-jacket', 'enduro-helmet'],
      related: ['rvx', 'trail-s', 'adventure-x'],
      videoTrailer: 'dirt bike wheelie action dust'
    },
    {
      id: 'trail-s',
      name: 'ARKO Trail S',
      category: 'Trail',
      price: 11200,
      oldPrice: 12500,
      rating: 4.6,
      reviewCount: 203,
      badge: 'Sale',
      availability: 'in-stock',
      colors: [
        { name: 'Forest Green', hex: '#2d4a2b' },
        { name: 'Alpine White', hex: '#F4F3EF' },
        { name: 'Stealth Black', hex: '#0B0B0B' },
        { name: 'Sand Tan', hex: '#c4a882' }
      ],
      specs: { range: '100 km', power: '25 kW', weight: '105 kg', topSpeed: '110 km/h', battery: '3.6 kWh', chargeTime: '3 hr' },
      image: 'off road motorcycle rocky path',
      description: 'Lightweight trail machine. Approachable power, trail-tuned suspension, and all-day comfort for single-track and fire roads.',
      features: [
        '25 kW trail-tuned motor',
        '3.6 kWh swappable battery',
        'Trail-tuned suspension with 220 mm travel',
        'Upright touring ergonomics',
        'Two ride modes: Eco, Trail',
        'Dual-purpose tyres included'
      ],
      variants: [
        { name: 'Battery', options: ['Standard (3.6 kWh)', 'Extended (4.8 kWh) +€900'] },
        { name: 'Suspension', options: ['Trail Tuned', 'Performance +€650'] },
        { name: 'Wheels', options: ['Standard Spoked', 'Tubeless +€350'] }
      ],
      gallery: ['off road motorcycle rocky path', 'motorcycle forest trees light', 'dirt bike jump forest action', 'mountain trail motorcycle distance', 'electric dirt bike front studio', 'dirt bike side profile studio'],
      accessories: ['fast-charger', 'protection-kit', 'riding-jacket', 'enduro-helmet', 'trail-bag'],
      related: ['rvx', 'rvx-pro', 'adventure-x'],
      videoTrailer: 'mountain trail motorcycle distance'
    },
    {
      id: 'adventure-x',
      name: 'ARKO Adventure X',
      category: 'Adventure',
      price: 16750,
      oldPrice: null,
      rating: 4.7,
      reviewCount: 96,
      badge: null,
      availability: 'in-stock',
      colors: [
        { name: 'Sand Tan', hex: '#c4a882' },
        { name: 'Forest Green', hex: '#2d4a2b' },
        { name: 'Stealth Black', hex: '#0B0B0B' },
        { name: 'Alpine White', hex: '#F4F3EF' }
      ],
      specs: { range: '180 km', power: '30 kW', weight: '125 kg', topSpeed: '125 km/h', battery: '5.4 kWh', chargeTime: '4 hr' },
      image: 'mountain trail motorcycle distance',
      description: 'Long-range adventure machine. Go farther, carry more, and stay out past sunset with a 180 km range and touring-grade comfort.',
      features: [
        '30 kW adventure-tuned motor',
        '5.4 kWh long-range battery pack',
        'Touring windshield and hand guards',
        'Heated grips and seat',
        'Three ride modes: Eco, Tour, Sport',
        'Integrated pannier mounting points'
      ],
      variants: [
        { name: 'Battery', options: ['Long-Range (5.4 kWh)', 'Dual-Swap (2×5.4 kWh) +€2,400'] },
        { name: 'Suspension', options: ['Adventure Tuned', 'Performance +€750'] },
        { name: 'Wheels', options: ['Standard Spoked', 'Tubeless +€450', 'Pro-Track +€900'] }
      ],
      gallery: ['mountain trail motorcycle distance', 'motorcycle forest trees light', 'off road motorcycle rocky path', 'motorcycle riding forest road trail wide', 'electric dirt bike front studio', 'dirt bike side profile studio'],
      accessories: ['fast-charger', 'protection-kit', 'extended-battery', 'trail-bag', 'riding-jacket'],
      related: ['rvx', 'trail-s', 'rvx-pro'],
      videoTrailer: 'motorcycle riding forest road trail wide'
    },
    {
      id: 'urban-e',
      name: 'ARKO Urban E',
      category: 'Performance',
      price: 9800,
      oldPrice: null,
      rating: 4.5,
      reviewCount: 311,
      badge: null,
      availability: 'in-stock',
      colors: [
        { name: 'Alpine White', hex: '#F4F3EF' },
        { name: 'Stealth Black', hex: '#0B0B0B' },
        { name: 'Volt Yellow', hex: '#F2E900' }
      ],
      specs: { range: '90 km', power: '20 kW', weight: '98 kg', topSpeed: '100 km/h', battery: '3.0 kWh', chargeTime: '2.5 hr' },
      image: 'electric motorcycle battery closeup',
      description: 'Street-legal electric performance. Nimble, quick, and silent — the urban commuter that doesn\'t feel like one.',
      features: [
        '20 kW street motor',
        '3.0 kWh compact battery',
        'Street-legal lighting and indicators',
        'Short wheelbase for urban agility',
        'Two ride modes: City, Sport',
        'Regenerative braking'
      ],
      variants: [
        { name: 'Battery', options: ['Standard (3.0 kWh)', 'Extended (4.2 kWh) +€700'] },
        { name: 'Suspension', options: ['Street Tuned', 'Sport +€450'] },
        { name: 'Wheels', options: ['Street Cast', 'Sport Tubeless +€350'] }
      ],
      gallery: ['electric motorcycle battery closeup', 'electric dirt bike front studio', 'dirt bike side profile studio', 'motorcycle suspension closeup detail', 'electric motorcycle wheel closeup', 'motorcycle riding forest road trail wide'],
      accessories: ['fast-charger', 'riding-jacket', 'enduro-helmet', 'phone-mount'],
      related: ['rvx', 'trail-s', 'urban-e'],
      videoTrailer: 'motorcycle riding forest road trail wide'
    },
    {
      id: 'enduro-r',
      name: 'ARKO Enduro R',
      category: 'Enduro',
      price: 15200,
      oldPrice: null,
      rating: 4.8,
      reviewCount: 64,
      badge: 'New',
      availability: 'pre-order',
      colors: [
        { name: 'Racing Red', hex: '#c0392b' },
        { name: 'Volt Yellow', hex: '#F2E900' },
        { name: 'Stealth Black', hex: '#0B0B0B' }
      ],
      specs: { range: '130 km', power: '38 kW', weight: '110 kg', topSpeed: '135 km/h', battery: '4.5 kWh', chargeTime: '3.5 hr' },
      image: 'enduro rider rocky terrain',
      description: 'Hard enduro specialist. Reinforced for the toughest terrain, with competition-grade protection and a motor that never quits.',
      features: [
        '38 kW hard-enduro motor',
        '4.5 kWh reinforced battery pack',
        'Engine guard and skid plate included',
        'Competition-grade suspension',
        'Reinforced swingarm',
        'Three ride modes: Enduro, Trail, Race'
      ],
      variants: [
        { name: 'Battery', options: ['Standard (4.5 kWh)', 'Extended (6.0 kWh) +€1,000'] },
        { name: 'Suspension', options: ['Competition', 'Factory Race +€600'] },
        { name: 'Wheels', options: ['Pro-Track', 'Factory Race +€500'] }
      ],
      gallery: ['enduro rider rocky terrain', 'dirt bike jump forest action', 'off road motorcycle rocky path', 'motorcycle suspension closeup detail', 'electric dirt bike front studio', 'dirt bike mud splash action'],
      accessories: ['protection-kit', 'fast-charger', 'extended-battery', 'enduro-helmet', 'riding-jacket'],
      related: ['rvx', 'rvx-pro', 'trail-s'],
      videoTrailer: 'enduro rider rocky terrain'
    },
    {
      id: 'trail-l',
      name: 'ARKO Trail L',
      category: 'Trail',
      price: 9850,
      oldPrice: null,
      rating: 4.4,
      reviewCount: 178,
      badge: null,
      availability: 'in-stock',
      colors: [
        { name: 'Alpine White', hex: '#F4F3EF' },
        { name: 'Forest Green', hex: '#2d4a2b' },
        { name: 'Sand Tan', hex: '#c4a882' }
      ],
      specs: { range: '85 km', power: '18 kW', weight: '95 kg', topSpeed: '95 km/h', battery: '2.8 kWh', chargeTime: '2.5 hr' },
      image: 'motorcycle forest trees light',
      description: 'The lightweight entry point. Approachable power and forgiving ergonomics for new riders and weekend explorers.',
      features: [
        '18 kW beginner-friendly motor',
        '2.8 kWh lightweight battery',
        'Trail-tuned suspension with 200 mm travel',
        'Low seat height — 860 mm',
        'Two ride modes: Eco, Trail',
        'Lightest in the ARKO range'
      ],
      variants: [
        { name: 'Battery', options: ['Standard (2.8 kWh)', 'Extended (3.6 kWh) +€600'] },
        { name: 'Suspension', options: ['Trail Tuned', 'Performance +€450'] },
        { name: 'Wheels', options: ['Standard Spoked', 'Tubeless +€300'] }
      ],
      gallery: ['motorcycle forest trees light', 'off road motorcycle rocky path', 'dirt bike jump forest action', 'electric dirt bike front studio', 'dirt bike side profile studio', 'mountain trail motorcycle distance'],
      accessories: ['fast-charger', 'protection-kit', 'enduro-helmet', 'riding-jacket'],
      related: ['trail-s', 'rvx', 'urban-e'],
      videoTrailer: 'motorcycle forest trees light'
    },
    {
      id: 'adventure-l',
      name: 'ARKO Adventure L',
      category: 'Adventure',
      price: 13900,
      oldPrice: null,
      rating: 4.6,
      reviewCount: 52,
      badge: null,
      availability: 'pre-order',
      colors: [
        { name: 'Sand Tan', hex: '#c4a882' },
        { name: 'Stealth Black', hex: '#0B0B0B' },
        { name: 'Alpine White', hex: '#F4F3EF' }
      ],
      specs: { range: '160 km', power: '28 kW', weight: '120 kg', topSpeed: '120 km/h', battery: '5.0 kWh', chargeTime: '4 hr' },
      image: 'motorcycle riding forest road trail wide',
      description: 'The long-haul adventurer. 160 km of range, touring comfort, and the carrying capacity for multi-day rides into the unknown.',
      features: [
        '28 kW adventure motor',
        '5.0 kWh touring battery pack',
        'Adjustable touring windshield',
        'Heated grips standard',
        'Three ride modes: Eco, Tour, Sport',
        'Integrated 12V accessory outlet'
      ],
      variants: [
        { name: 'Battery', options: ['Touring (5.0 kWh)', 'Dual-Swap (2×5.0 kWh) +€2,200'] },
        { name: 'Suspension', options: ['Adventure Tuned', 'Performance +€650'] },
        { name: 'Wheels', options: ['Standard Spoked', 'Tubeless +€400'] }
      ],
      gallery: ['motorcycle riding forest road trail wide', 'mountain trail motorcycle distance', 'motorcycle forest trees light', 'off road motorcycle rocky path', 'electric dirt bike front studio', 'dirt bike side profile studio'],
      accessories: ['fast-charger', 'trail-bag', 'protection-kit', 'riding-jacket', 'phone-mount'],
      related: ['adventure-x', 'rvx', 'trail-s'],
      videoTrailer: 'mountain trail motorcycle distance'
    },
    {
      id: 'performance-rs',
      name: 'ARKO Performance RS',
      category: 'Performance',
      price: 21500,
      oldPrice: null,
      rating: 5.0,
      reviewCount: 38,
      badge: 'Limited',
      availability: 'pre-order',
      colors: [
        { name: 'Racing Red', hex: '#c0392b' },
        { name: 'Stealth Black', hex: '#0B0B0B' },
        { name: 'Volt Yellow', hex: '#F2E900' }
      ],
      specs: { range: '140 km', power: '50 kW', weight: '115 kg', topSpeed: '160 km/h', battery: '6.5 kWh', chargeTime: '4 hr' },
      image: 'dirt bike wheelie action dust',
      description: 'The halo bike. 50 kW of electric fury, competition-grade everything, and a limited production run of 200 units worldwide.',
      features: [
        '50 kW halo motor with race mapping',
        '6.5 kWh competition battery pack',
        'Factory race suspension',
        'Carbon fibre bodywork',
        'Race telemetry with data logging',
        'Limited edition numbered plaque'
      ],
      variants: [
        { name: 'Battery', options: ['Competition (6.5 kWh)'] },
        { name: 'Suspension', options: ['Factory Race'] },
        { name: 'Wheels', options: ['Factory Race'] }
      ],
      gallery: ['dirt bike wheelie action dust', 'electric dirt bike front studio', 'dirt bike side profile studio', 'motorcycle suspension closeup detail', 'electric motorcycle wheel closeup', 'enduro rider rocky terrain'],
      accessories: ['fast-charger', 'protection-kit', 'riding-jacket', 'enduro-helmet', 'extended-battery'],
      related: ['rvx-pro', 'rvx', 'enduro-r'],
      videoTrailer: 'dirt bike wheelie action dust'
    },
    {
      id: 'trail-xr',
      name: 'ARKO Trail XR',
      category: 'Trail',
      price: 12700,
      oldPrice: null,
      rating: 4.7,
      reviewCount: 89,
      badge: null,
      availability: 'in-stock',
      colors: [
        { name: 'Forest Green', hex: '#2d4a2b' },
        { name: 'Volt Yellow', hex: '#F2E900' },
        { name: 'Stealth Black', hex: '#0B0B0B' },
        { name: 'Alpine White', hex: '#F4F3EF' }
      ],
      specs: { range: '115 km', power: '28 kW', weight: '108 kg', topSpeed: '115 km/h', battery: '4.0 kWh', chargeTime: '3 hr' },
      image: 'dirt bike jump forest action',
      description: 'The cross-over trail bike. More power than the Trail S, lighter than the RVX — the sweet spot for serious weekend riders.',
      features: [
        '28 kW cross-over motor',
        '4.0 kWh swappable battery',
        'Performance trail suspension',
        'Three ride modes: Eco, Trail, Sport',
        'Tubeless-ready rims',
        'Reinforced swingarm'
      ],
      variants: [
        { name: 'Battery', options: ['Standard (4.0 kWh)', 'Extended (5.2 kWh) +€800'] },
        { name: 'Suspension', options: ['Performance', 'Competition +€550'] },
        { name: 'Wheels', options: ['Tubeless', 'Pro-Track +€600'] }
      ],
      gallery: ['dirt bike jump forest action', 'motorcycle forest trees light', 'off road motorcycle rocky path', 'electric dirt bike front studio', 'dirt bike side profile studio', 'dirt bike mud splash action'],
      accessories: ['fast-charger', 'protection-kit', 'enduro-helmet', 'riding-jacket', 'trail-bag'],
      related: ['trail-s', 'rvx', 'trail-l'],
      videoTrailer: 'dirt bike jump forest action'
    },
    {
      id: 'enduro-sport',
      name: 'ARKO Enduro Sport',
      category: 'Enduro',
      price: 13800,
      oldPrice: 15200,
      rating: 4.5,
      reviewCount: 121,
      badge: 'Sale',
      availability: 'in-stock',
      colors: [
        { name: 'Volt Yellow', hex: '#F2E900' },
        { name: 'Alpine White', hex: '#F4F3EF' },
        { name: 'Stealth Black', hex: '#0B0B0B' }
      ],
      specs: { range: '110 km', power: '32 kW', weight: '114 kg', topSpeed: '125 km/h', battery: '4.0 kWh', chargeTime: '3 hr' },
      image: 'dirt bike mud splash action',
      description: 'Sport enduro with everyday rideability. A balanced package for riders who want competition DNA in a street-legal package.',
      features: [
        '32 kW sport motor',
        '4.0 kWh swappable battery',
        'Sport-tuned suspension',
        'Street-legal lighting kit',
        'Three ride modes: Eco, Sport, Race',
        'Adjustable seat height'
      ],
      variants: [
        { name: 'Battery', options: ['Standard (4.0 kWh)', 'Extended (5.2 kWh) +€800'] },
        { name: 'Suspension', options: ['Sport Tuned', 'Competition +€500'] },
        { name: 'Wheels', options: ['Standard Spoked', 'Tubeless +€350'] }
      ],
      gallery: ['dirt bike mud splash action', 'electric dirt bike front studio', 'dirt bike side profile studio', 'motorcycle suspension closeup detail', 'enduro rider rocky terrain', 'dirt bike jump forest action'],
      accessories: ['fast-charger', 'protection-kit', 'riding-jacket', 'enduro-helmet'],
      related: ['rvx', 'enduro-r', 'trail-xr'],
      videoTrailer: 'dirt bike mud splash action'
    }
  ],

  accessories: [
    {
      id: 'fast-charger',
      name: 'ARKO Fast Charger',
      category: 'Chargers',
      price: 349,
      oldPrice: null,
      rating: 4.7,
      reviewCount: 256,
      badge: 'Best Seller',
      availability: 'in-stock',
      colors: [{ name: 'Black', hex: '#0B0B0B' }],
      specs: { power: '3.3 kW', compatibility: 'All ARKO models', weight: '1.2 kg', cable: '4 m' },
      image: 'electric motorcycle battery closeup',
      description: 'Charge any ARKO battery from 0 to 80% in under 90 minutes. Compact, weatherproof, and trail-ready.',
      features: ['3.3 kW output', 'Weatherproof IP67', '4 m cable', 'LED charge indicator', 'Universal ARKO compatibility'],
      gallery: ['electric motorcycle battery closeup', 'motorcycle suspension closeup detail', 'electric motorcycle wheel closeup']
    },
    {
      id: 'protection-kit',
      name: 'Engine Protection Kit',
      category: 'Protection',
      price: 289,
      oldPrice: 350,
      rating: 4.8,
      reviewCount: 174,
      badge: 'Sale',
      availability: 'in-stock',
      colors: [{ name: 'Black', hex: '#0B0B0B' }],
      specs: { material: 'Billet aluminium', weight: '2.1 kg', compatibility: 'RVX, RVX Pro, Enduro R', mounting: 'Bolt-on' },
      image: 'motorcycle suspension closeup detail',
      description: 'CNC-machined billet aluminium skid plate and frame guards. Protect your investment on the rocks.',
      features: ['CNC billet aluminium', 'Hard-anodised finish', 'Bolt-on installation', 'Compatible with RVX, RVX Pro, Enduro R', 'Includes all hardware'],
      gallery: ['motorcycle suspension closeup detail', 'electric motorcycle wheel closeup', 'electric dirt bike front studio']
    },
    {
      id: 'extended-battery',
      name: 'Extended Battery Pack',
      category: 'Batteries',
      price: 1450,
      oldPrice: null,
      rating: 4.9,
      reviewCount: 98,
      badge: null,
      availability: 'in-stock',
      colors: [{ name: 'Black', hex: '#0B0B0B' }],
      specs: { capacity: '6.0 kWh', weight: '14 kg', cells: '21700 lithium-ion', warranty: '3 years' },
      image: 'electric motorcycle battery closeup',
      description: 'The 6.0 kWh extended battery pack. 50% more range, same hot-swap convenience. Compatible with RVX and RVX Pro.',
      features: ['6.0 kWh capacity', '50% more range than standard', 'Hot-swappable', 'Integrated BMS', '3-year warranty'],
      gallery: ['electric motorcycle battery closeup', 'electric dirt bike front studio', 'dirt bike side profile studio']
    },
    {
      id: 'riding-jacket',
      name: 'ARKO Riding Jacket',
      category: 'Riding Gear',
      price: 425,
      oldPrice: null,
      rating: 4.6,
      reviewCount: 142,
      badge: 'New',
      availability: 'in-stock',
      colors: [
        { name: 'Black', hex: '#0B0B0B' },
        { name: 'Sand', hex: '#c4a882' },
        { name: 'Volt Yellow', hex: '#F2E900' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      specs: { material: 'Cordura + mesh', protection: 'CE Level 2', waterproof: 'Yes', weight: '1.8 kg' },
      image: 'motocross rider mud action',
      description: 'All-season riding jacket with CE Level 2 armour, waterproof membrane, and ventilation zones for trail and touring.',
      features: ['Cordura construction', 'CE Level 2 shoulder/elbow/back armour', 'Waterproof breathable membrane', 'Removable thermal liner', 'Ventilation zones'],
      gallery: ['motocross rider mud action', 'motorcycle rider action forest', 'dirt bike mud splash action']
    },
    {
      id: 'enduro-helmet',
      name: 'ARKO Enduro Helmet',
      category: 'Riding Gear',
      price: 389,
      oldPrice: null,
      rating: 4.8,
      reviewCount: 203,
      badge: 'Best Seller',
      availability: 'in-stock',
      colors: [
        { name: 'Volt Yellow', hex: '#F2E900' },
        { name: 'Stealth Black', hex: '#0B0B0B' },
        { name: 'Alpine White', hex: '#F4F3EF' }
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      specs: { material: 'Carbon composite', weight: '1.3 kg', certification: 'ECE 22.06', visor: 'Adjustable peak' },
      image: 'motocross rider mud action',
      description: 'Carbon composite enduro helmet with ECE 22.06 certification. Ultralight, well-ventilated, and built for the long ride.',
      features: ['Carbon composite shell', 'ECE 22.06 certified', '1.3 kg ultralight', 'Adjustable peak visor', 'Removable washable liner'],
      gallery: ['motocross rider mud action', 'motorcycle rider action forest', 'dirt bike wheelie action dust']
    },
    {
      id: 'trail-bag',
      name: 'Waterproof Trail Bag',
      category: 'Parts',
      price: 159,
      oldPrice: null,
      rating: 4.5,
      reviewCount: 87,
      badge: null,
      availability: 'in-stock',
      colors: [{ name: 'Black', hex: '#0B0B0B' }],
      specs: { capacity: '15 L', material: 'TPU waterproof', mounting: 'Quick-release', weight: '0.6 kg' },
      image: 'mountain trail motorcycle distance',
      description: '15-litre waterproof roll-top bag with quick-release mounting. Keep your gear dry on the longest rides.',
      features: ['15 L capacity', 'TPU waterproof construction', 'Quick-release mounting', 'Reflective accents', 'Fits all ARKO models'],
      gallery: ['mountain trail motorcycle distance', 'motorcycle riding forest road trail wide', 'off road motorcycle rocky path']
    },
    {
      id: 'phone-mount',
      name: 'ARKO Phone Mount',
      category: 'Parts',
      price: 79,
      oldPrice: null,
      rating: 4.4,
      reviewCount: 312,
      badge: null,
      availability: 'in-stock',
      colors: [{ name: 'Black', hex: '#0B0B0B' }],
      specs: { compatibility: 'All ARKO models', mounting: 'Handlebar', rotation: '360°', charging: 'Wireless Qi' },
      image: 'electric motorcycle wheel closeup',
      description: 'Secure handlebar phone mount with wireless charging. Navigate and charge on the go.',
      features: ['Universal phone compatibility', 'Wireless Qi charging', '360° rotation', 'Vibration dampening', 'Quick-release'],
      gallery: ['electric motorcycle wheel closeup', 'motorcycle suspension closeup detail', 'electric dirt bike front studio']
    },
    {
      id: 'sport-goggles',
      name: 'ARKO Sport Goggles',
      category: 'Riding Gear',
      price: 129,
      oldPrice: null,
      rating: 4.6,
      reviewCount: 156,
      badge: 'New',
      availability: 'in-stock',
      colors: [
        { name: 'Clear', hex: '#F4F3EF' },
        { name: 'Tinted', hex: '#444' },
        { name: 'Volt Yellow', hex: '#F2E900' }
      ],
      specs: { lens: 'Anti-fog polycarbonate', uv: 'UV400', foam: 'Triple-layer', weight: '180 g' },
      image: 'motocross rider mud action',
      description: 'Premium off-road goggles with anti-fog lens, triple-layer foam, and tear-off system compatibility.',
      features: ['Anti-fog polycarbonate lens', 'UV400 protection', 'Triple-layer face foam', 'Tear-off compatible', 'Wide field of vision'],
      gallery: ['motocross rider mud action', 'dirt bike wheelie action dust', 'motorcycle rider action forest']
    },
    {
      id: 'tubeless-kit',
      name: 'Tubeless Tyre Kit',
      category: 'Parts',
      price: 199,
      oldPrice: null,
      rating: 4.7,
      reviewCount: 64,
      badge: null,
      availability: 'in-stock',
      colors: [{ name: 'Black', hex: '#0B0B0B' }],
      specs: { compatibility: 'Tubeless-ready rims', includes: '2 tyres + sealant', tyre: 'Dual-sport', warranty: '2 years' },
      image: 'electric motorcycle wheel closeup',
      description: 'Complete tubeless conversion kit with dual-sport tyres and sealant. Run lower pressures without pinch flats.',
      features: ['2× dual-sport tubeless tyres', 'Tubeless sealant included', 'Compatible with ARKO tubeless rims', 'Puncture-resistant compound', '2-year warranty'],
      gallery: ['electric motorcycle wheel closeup', 'motorcycle suspension closeup detail', 'dirt bike side profile studio']
    },
    {
      id: 'chain-guard',
      name: 'Carbon Chain Guard',
      category: 'Protection',
      price: 119,
      oldPrice: null,
      rating: 4.5,
      reviewCount: 48,
      badge: null,
      availability: 'in-stock',
      colors: [{ name: 'Carbon', hex: '#222' }],
      specs: { material: 'Carbon fibre', weight: '120 g', compatibility: 'All ARKO models', finish: 'Glossy' },
      image: 'motorcycle suspension closeup detail',
      description: 'Real carbon fibre chain guard. Lightweight protection with a premium finish.',
      features: ['Real carbon fibre construction', 'Glossy UV-resistant finish', 'Bolt-on installation', 'Universal ARKO fitment', '120 g ultralight'],
      gallery: ['motorcycle suspension closeup detail', 'electric motorcycle wheel closeup', 'electric dirt bike front studio']
    },
    {
      id: 'battery-charger-dual',
      name: 'Dual Battery Charger',
      category: 'Chargers',
      price: 499,
      oldPrice: null,
      rating: 4.8,
      reviewCount: 73,
      badge: null,
      availability: 'in-stock',
      colors: [{ name: 'Black', hex: '#0B0B0B' }],
      specs: { power: '6.6 kW', compatibility: 'All ARKO models', ports: '2', weight: '2.5 kg' },
      image: 'electric motorcycle battery closeup',
      description: 'Charge two batteries simultaneously at 3.3 kW each. For riders who run dual-swap configurations.',
      features: ['Dual 3.3 kW outputs', 'Charge two packs simultaneously', 'Weatherproof IP67', 'LED status for each port', 'Universal ARKO compatibility'],
      gallery: ['electric motorcycle battery closeup', 'motorcycle suspension closeup detail', 'electric motorcycle wheel closeup']
    }
  ],

  reviews: {
    'rvx': [
      { author: 'Marcus T.', rating: 5, date: '2026-08-15', title: 'Game changer', body: 'I\'ve been riding enduro for 15 years. The RVX is the first electric that actually feels right on the trail. The torque is addictive and the silence is surreal.' },
      { author: 'Sara K.', rating: 5, date: '2026-07-22', title: 'Worth every euro', body: 'Battery swap takes literally 30 seconds. I did a 200 km day with one spare pack. No more waiting at charging stations.' },
      { author: 'Jens M.', rating: 4, date: '2026-07-01', title: 'Amazing but pricey', body: 'The bike itself is incredible. The price stings a bit, but you get what you pay for. Build quality is top notch.' },
      { author: 'Lena B.', rating: 5, date: '2026-06-18', title: 'Best purchase of 2026', body: 'Swapped from a gas bike and never looking back. The instant torque on technical climbs is a massive advantage.' }
    ],
    'rvx-pro': [
      { author: 'Erik V.', rating: 5, date: '2026-08-20', title: 'Competition ready', body: 'Raced my first enduro on the Pro and took 2nd. The power delivery is so controllable it feels like cheating.' },
      { author: 'Tom H.', rating: 5, date: '2026-07-10', title: 'Insane machine', body: '45 kW in a 118 kg package. This thing rips. The race mapping is no joke.' }
    ],
    'trail-s': [
      { author: 'Anna L.', rating: 5, date: '2026-08-01', title: 'Perfect first e-moto', body: 'Coming from mountain biking, the Trail S was the perfect step up. Approachable power and not intimidating.' },
      { author: 'Pavel D.', rating: 4, date: '2026-07-15', title: 'Great trail bike', body: 'Comfortable, light, and capable. The range is honest — I get about 95 km of mixed riding.' }
    ],
    'adventure-x': [
      { author: 'Klaus R.', rating: 5, date: '2026-08-10', title: 'Long-haul capable', body: 'Did 160 km in one day on a mix of road and trail. Still had 20 km left in the tank. The touring comfort is real.' },
      { author: 'Mia S.', rating: 4, date: '2026-07-28', title: 'Great adventurer', body: 'Heated grips are a must-have. The windshield could be a bit taller but overall excellent.' }
    ],
    'urban-e': [
      { author: 'David W.', rating: 5, date: '2026-08-25', title: 'Best commuter', body: 'Silent, quick, and cheap to run. I charge at work for free. The bike pays for itself.' },
      { author: 'Sophie M.', rating: 4, date: '2026-07-20', title: 'Fun city bike', body: 'Perfect for the city. Wish the range was a bit more for weekend trips.' }
    ],
    'enduro-r': [
      { author: 'Roberto F.', rating: 5, date: '2026-08-05', title: 'Built like a tank', body: 'The skid plate has already saved my frame twice. This bike eats rocks for breakfast.' }
    ],
    'trail-l': [
      { author: 'Nina P.', rating: 4, date: '2026-07-12', title: 'Great beginner bike', body: 'Light and easy to handle. Perfect for learning. The power is just right.' }
    ],
    'adventure-l': [
      { author: 'Hans G.', rating: 5, date: '2026-08-18', title: 'Touring monster', body: '160 km range is no joke. I did a 3-day trip through the Alps without range anxiety.' }
    ],
    'performance-rs': [
      { author: 'Marco V.', rating: 5, date: '2026-08-22', title: 'Worth the wait', body: 'Got number 47 of 200. This bike is a work of art. The carbon bodywork is stunning.' }
    ],
    'trail-xr': [
      { author: 'Felix K.', rating: 5, date: '2026-08-08', title: 'Sweet spot', body: 'More power than the Trail S, lighter than the RVX. This is the one to get.' }
    ],
    'enduro-sport': [
      { author: 'Greta H.', rating: 4, date: '2026-07-25', title: 'Street legal enduro', body: 'Love that I can ride to the trail, ride the trail, and ride home. All legal. Great all-rounder.' }
    ]
  },

  dealers: [
    { id: 'd1', name: 'ARKO Berlin Mitte', city: 'Berlin', country: 'Germany', address: 'Torstraße 112', phone: '+49 30 555 0101', lat: 52.52, lng: 13.40, hours: 'Mon–Sat 9:00–19:00' },
    { id: 'd2', name: 'ARKO Munich', city: 'Munich', country: 'Germany', address: 'Olympiapark 4', phone: '+49 89 555 0202', lat: 48.17, lng: 11.58, hours: 'Mon–Fri 9:00–18:00, Sat 10:00–16:00' },
    { id: 'd3', name: 'ARKO Amsterdam', city: 'Amsterdam', country: 'Netherlands', address: 'Prinsengracht 250', phone: '+31 20 555 0303', lat: 52.37, lng: 4.90, hours: 'Tue–Sat 10:00–18:00' },
    { id: 'd4', name: 'ARKO Milan', city: 'Milan', country: 'Italy', address: 'Via Tortona 31', phone: '+39 02 555 0404', lat: 45.46, lng: 9.19, hours: 'Mon–Sat 9:30–19:30' },
    { id: 'd5', name: 'ARKO Lyon', city: 'Lyon', country: 'France', address: 'Quai Saint-Vincent 8', phone: '+33 4 555 0505', lat: 45.76, lng: 4.85, hours: 'Mon–Sat 9:00–19:00' },
    { id: 'd6', name: 'ARKO Barcelona', city: 'Barcelona', country: 'Spain', address: 'Passeig de Gràcia 55', phone: '+34 93 555 0606', lat: 41.39, lng: 2.16, hours: 'Mon–Sat 10:00–20:00' },
    { id: 'd7', name: 'ARKO Stockholm', city: 'Stockholm', country: 'Sweden', address: 'Sveavägen 88', phone: '+46 8 555 0707', lat: 59.34, lng: 18.06, hours: 'Mon–Fri 10:00–19:00, Sat 10:00–16:00' },
    { id: 'd8', name: 'ARKO Lisbon', city: 'Lisbon', country: 'Portugal', address: 'Avenida da Liberdade 200', phone: '+351 21 555 0808', lat: 38.72, lng: -9.14, hours: 'Mon–Sat 10:00–19:00' }
  ],

  orders: [
    { id: 'ARK-2026-0847', date: '2026-08-20', status: 'delivered', total: 14899, items: [{ name: 'ARKO RVX', qty: 1, price: 14450 }, { name: 'Engine Protection Kit', qty: 1, price: 289 }], tracking: { carrier: 'ARKO Logistics', number: 'TRK-8847206', stages: [{ name: 'Order placed', date: '2026-08-20', done: true }, { name: 'Manufacturing', date: '2026-08-21', done: true }, { name: 'Quality check', date: '2026-08-23', done: true }, { name: 'Shipped', date: '2026-08-25', done: true }, { name: 'Out for delivery', date: '2026-08-28', done: true }, { name: 'Delivered', date: '2026-08-29', done: true }] } },
    { id: 'ARK-2026-0723', date: '2026-07-15', status: 'delivered', total: 425, items: [{ name: 'ARKO Riding Jacket', qty: 1, price: 425 }], tracking: { carrier: 'DHL Express', number: 'TRK-7723104', stages: [{ name: 'Order placed', date: '2026-07-15', done: true }, { name: 'Packed', date: '2026-07-15', done: true }, { name: 'Shipped', date: '2026-07-16', done: true }, { name: 'Delivered', date: '2026-07-18', done: true }] } },
    { id: 'ARK-2026-0912', date: '2026-09-01', status: 'shipped', total: 1599, items: [{ name: 'ARKO Enduro Helmet', qty: 1, price: 389 }, { name: 'ARKO Sport Goggles', qty: 1, price: 129 }, { name: 'Extended Battery Pack', qty: 1, price: 1450 }], tracking: { carrier: 'ARKO Logistics', number: 'TRK-9120045', stages: [{ name: 'Order placed', date: '2026-09-01', done: true }, { name: 'Packed', date: '2026-09-01', done: true }, { name: 'Shipped', date: '2026-09-02', done: true }, { name: 'Out for delivery', date: '2026-09-03', done: false }, { name: 'Delivered', date: '—', done: false }] } },
    { id: 'ARK-2026-0915', date: '2026-09-02', status: 'processing', total: 18900, items: [{ name: 'ARKO RVX Pro', qty: 1, price: 18900 }], tracking: { carrier: 'ARKO Logistics', number: 'TRK-9150067', stages: [{ name: 'Order placed', date: '2026-09-02', done: true }, { name: 'Manufacturing', date: '—', done: false }, { name: 'Quality check', date: '—', done: false }, { name: 'Shipped', date: '—', done: false }, { name: 'Delivered', date: '—', done: false }] } }
  ],

  faq: [
    { category: 'Orders & Delivery', items: [
      { q: 'How long does delivery take?', a: 'In-stock motorcycles are delivered within 5–7 business days. Pre-order models are estimated at 4–6 weeks. Accessories ship within 2–3 business days.' },
      { q: 'Can I track my order?', a: 'Yes. Once your order ships, you\'ll receive a tracking number via email. You can also track it from your account under Orders.' },
      { q: 'Do you ship internationally?', a: 'We currently ship across the EU, UK, Norway, and Switzerland. We\'re expanding to North America in early 2027.' },
      { q: 'How much does shipping cost?', a: 'Motorcycle delivery is free within the EU. Accessory orders under €100 cost €9.90; above €100, shipping is free.' }
    ]},
    { category: 'Battery & Charging', items: [
      { q: 'How does the battery swap work?', a: 'Our hot-swap system uses a single latch. Pull the spent pack, drop in a charged one — no tools required. The whole process takes about 30 seconds.' },
      { q: 'What\'s the battery lifespan?', a: 'ARKO batteries are rated for 1,500 charge cycles to 80% capacity. That\'s roughly 5–7 years of typical use. All batteries include a 3-year warranty.' },
      { q: 'Can I charge at home?', a: 'Yes. Every ARKO includes a standard home charger. The optional Fast Charger reduces charge time from 4 hours to 90 minutes.' },
      { q: 'Are the batteries waterproof?', a: 'Yes. All ARKO batteries are rated IP67 — sealed against mud, dust, and water immersion up to 1 m.' }
    ]},
    { category: 'Warranty & Service', items: [
      { q: 'What\'s covered by the warranty?', a: 'Every ARKO motorcycle includes a 2-year warranty on the bike and a 3-year warranty on the battery. This covers manufacturing defects but not normal wear or crash damage.' },
      { q: 'Where can I get my bike serviced?', a: 'At any ARKO dealer. We have 8 dealers across Europe and are expanding. Electric drivetrains require minimal service — mostly brake pads, tyres, and suspension setup.' },
      { q: 'Can I extend the warranty?', a: 'Yes. We offer extended coverage up to 5 years for €790. This can be added at purchase or within the first 90 days.' }
    ]},
    { category: 'Test Rides & Purchasing', items: [
      { q: 'Can I test ride before buying?', a: 'Absolutely. Book a test ride at any ARKO dealer. You\'ll need a valid motorcycle licence and to sign a waiver. Rides are 30–60 minutes.' },
      { q: 'Do you offer financing?', a: 'Yes. We partner with major European banks to offer 0% APR financing for up to 36 months on all motorcycles. Apply at checkout or at any dealer.' },
      { q: 'What\'s the return policy?', a: 'You have 14 days from delivery to return any ARKO product. Motorcycles must have less than 50 km on the odometer. Accessories must be unused and in original packaging.' },
      { q: 'Can I cancel a pre-order?', a: 'Yes, pre-orders can be cancelled for a full refund at any time before manufacturing begins. Once manufacturing starts, the deposit becomes non-refundable.' }
    ]}
  ]
};

/* Helpers */
function getProductById(id) {
  return ARKO_DATA.motorcycles.find(p => p.id === id) || ARKO_DATA.accessories.find(p => p.id === id);
}
function getMotorcycleById(id) { return ARKO_DATA.motorcycles.find(p => p.id === id); }
function getAccessoryById(id) { return ARKO_DATA.accessories.find(p => p.id === id); }
function getReviewsForProduct(id) { return ARKO_DATA.reviews[id] || []; }
function getRelatedProducts(ids) { return ids.map(id => getProductById(id)).filter(Boolean); }

/* Format price */
function formatPrice(price) {
  return '€' + price.toLocaleString('en-US');
}
