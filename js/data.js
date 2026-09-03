/* ============================================================
   ARKO — data.js
   Central demo catalog. Every commerce page (shop, product,
   configurator, compare, cart, wishlist, accessories...) reads
   from window.ARKO.motorcycles / window.ARKO.accessories so
   numbers and names stay consistent across the whole theme.
   Images stay on the data-q resolver pattern from js/main.js —
   no <img src> is ever hardcoded from here.
============================================================ */
(function () {
  var MOTORCYCLES = [
    {
      id: "rvx",
      slug: "rvx",
      name: "RVX",
      category: "enduro",
      categoryLabel: "Enduro",
      tagline: "The original. The benchmark.",
      price: 14450,
      compareAtPrice: null,
      rating: 4.8,
      reviewCount: 214,
      isNew: false,
      isFeatured: true,
      availability: "in-stock",
      image: "electric dirt bike studio yellow",
      colors: [
        { name: "Volt Yellow", hex: "#F2E900" },
        { name: "Ink Black", hex: "#0B0B0B" },
        { name: "Bone White", hex: "#F4F3EF" }
      ],
      battery: [
        { id: "standard", label: "Standard 60Ah", priceDelta: 0, range: 180 },
        { id: "extended", label: "Extended 84Ah", priceDelta: 1200, range: 240 }
      ],
      specs: { power: 22, torque: 210, topSpeed: 132, range: 180, weight: 118, chargeTime: 2.1 }
    },
    {
      id: "rvx-pro",
      slug: "rvx-pro",
      name: "RVX Pro",
      category: "enduro",
      categoryLabel: "Enduro",
      tagline: "More torque. Less mercy.",
      price: 17900,
      compareAtPrice: null,
      rating: 4.9,
      reviewCount: 96,
      isNew: false,
      isFeatured: true,
      availability: "in-stock",
      image: "enduro rider rocky terrain",
      colors: [
        { name: "Ink Black", hex: "#0B0B0B" },
        { name: "Graphite", hex: "#4a4a4a" },
        { name: "Volt Yellow", hex: "#F2E900" }
      ],
      battery: [
        { id: "standard", label: "Standard 60Ah", priceDelta: 0, range: 175 },
        { id: "extended", label: "Extended 84Ah", priceDelta: 1350, range: 235 }
      ],
      specs: { power: 28, torque: 245, topSpeed: 148, range: 175, weight: 122, chargeTime: 2.3 }
    },
    {
      id: "rvx-trail",
      slug: "rvx-trail",
      name: "RVX Trail",
      category: "trail",
      categoryLabel: "Trail",
      tagline: "Built for the long single-track.",
      price: 12200,
      compareAtPrice: null,
      rating: 4.6,
      reviewCount: 158,
      isNew: false,
      isFeatured: false,
      availability: "in-stock",
      image: "motorcycle forest trees light",
      colors: [
        { name: "Bone White", hex: "#F4F3EF" },
        { name: "Ink Black", hex: "#0B0B0B" }
      ],
      battery: [
        { id: "standard", label: "Standard 54Ah", priceDelta: 0, range: 160 },
        { id: "extended", label: "Extended 76Ah", priceDelta: 1050, range: 210 }
      ],
      specs: { power: 18, torque: 175, topSpeed: 118, range: 160, weight: 109, chargeTime: 1.9 }
    },
    {
      id: "rvx-trail-s",
      slug: "rvx-trail-s",
      name: "RVX Trail S",
      category: "trail",
      categoryLabel: "Trail",
      tagline: "Sharper geometry, faster line changes.",
      price: 13650,
      compareAtPrice: null,
      rating: 4.5,
      reviewCount: 41,
      isNew: false,
      isFeatured: false,
      availability: "pre-order",
      image: "motorcycle riding forest road trail wide",
      colors: [
        { name: "Volt Yellow", hex: "#F2E900" },
        { name: "Graphite", hex: "#4a4a4a" }
      ],
      battery: [
        { id: "standard", label: "Standard 54Ah", priceDelta: 0, range: 165 },
        { id: "extended", label: "Extended 76Ah", priceDelta: 1100, range: 215 }
      ],
      specs: { power: 19, torque: 182, topSpeed: 122, range: 165, weight: 111, chargeTime: 1.9 }
    },
    {
      id: "rvx-adventure",
      slug: "rvx-adventure",
      name: "RVX Adventure",
      category: "adventure",
      categoryLabel: "Adventure",
      tagline: "One tank, no plan, further than you think.",
      price: 16300,
      compareAtPrice: null,
      rating: 4.7,
      reviewCount: 87,
      isNew: false,
      isFeatured: true,
      availability: "in-stock",
      image: "mountain trail motorcycle distance",
      colors: [
        { name: "Ink Black", hex: "#0B0B0B" },
        { name: "Bone White", hex: "#F4F3EF" },
        { name: "Graphite", hex: "#4a4a4a" }
      ],
      battery: [
        { id: "standard", label: "Standard 72Ah", priceDelta: 0, range: 210 },
        { id: "extended", label: "Long-Range 96Ah", priceDelta: 1600, range: 280 }
      ],
      specs: { power: 24, torque: 220, topSpeed: 138, range: 210, weight: 131, chargeTime: 2.6 }
    },
    {
      id: "rvx-adventure-lr",
      slug: "rvx-adventure-long-range",
      name: "RVX Adventure Long-Range",
      category: "adventure",
      categoryLabel: "Adventure",
      tagline: "The furthest an RVX has ever gone.",
      price: 18750,
      compareAtPrice: null,
      rating: 4.8,
      reviewCount: 33,
      isNew: false,
      isFeatured: false,
      availability: "pre-order",
      image: "off road motorcycle rocky path",
      colors: [
        { name: "Graphite", hex: "#4a4a4a" },
        { name: "Ink Black", hex: "#0B0B0B" }
      ],
      battery: [
        { id: "extended", label: "Long-Range 96Ah", priceDelta: 0, range: 280 },
        { id: "max", label: "Max-Range 110Ah", priceDelta: 1400, range: 320 }
      ],
      specs: { power: 24, torque: 220, topSpeed: 138, range: 280, weight: 138, chargeTime: 2.9 }
    },
    {
      id: "rvx-race",
      slug: "rvx-race",
      name: "RVX Race",
      category: "performance",
      categoryLabel: "Performance",
      tagline: "Homologated for the start line.",
      price: 21400,
      compareAtPrice: null,
      rating: 4.9,
      reviewCount: 19,
      isNew: false,
      isFeatured: false,
      availability: "out-of-stock",
      image: "dirt bike wheelie action dust",
      colors: [
        { name: "Volt Yellow", hex: "#F2E900" },
        { name: "Ink Black", hex: "#0B0B0B" }
      ],
      battery: [
        { id: "race", label: "Race 60Ah", priceDelta: 0, range: 140 }
      ],
      specs: { power: 36, torque: 275, topSpeed: 168, range: 140, weight: 104, chargeTime: 2.0 }
    },
    {
      id: "rvx-race-lite",
      slug: "rvx-race-lite",
      name: "RVX Race Lite",
      category: "performance",
      categoryLabel: "Performance",
      tagline: "Race chassis, road-legal lights.",
      price: 19900,
      compareAtPrice: 21900,
      rating: 4.7,
      reviewCount: 27,
      isNew: false,
      isFeatured: false,
      availability: "in-stock",
      image: "dirt bike jump forest action",
      colors: [
        { name: "Ink Black", hex: "#0B0B0B" },
        { name: "Volt Yellow", hex: "#F2E900" }
      ],
      battery: [
        { id: "standard", label: "Standard 60Ah", priceDelta: 0, range: 150 },
        { id: "extended", label: "Extended 84Ah", priceDelta: 1250, range: 205 }
      ],
      specs: { power: 32, torque: 260, topSpeed: 160, range: 150, weight: 110, chargeTime: 2.1 }
    },
    {
      id: "rvx-mini",
      slug: "rvx-mini",
      name: "RVX Mini",
      category: "enduro",
      categoryLabel: "Enduro",
      tagline: "Full-size feel, compact chassis.",
      price: 8900,
      compareAtPrice: null,
      rating: 4.4,
      reviewCount: 62,
      isNew: false,
      isFeatured: false,
      availability: "in-stock",
      image: "electric dirt bike front studio",
      colors: [
        { name: "Bone White", hex: "#F4F3EF" },
        { name: "Volt Yellow", hex: "#F2E900" }
      ],
      battery: [
        { id: "standard", label: "Standard 40Ah", priceDelta: 0, range: 120 }
      ],
      specs: { power: 12, torque: 120, topSpeed: 95, range: 120, weight: 92, chargeTime: 1.4 }
    },
    {
      id: "rvx-scout",
      slug: "rvx-scout",
      name: "RVX Scout",
      category: "trail",
      categoryLabel: "Trail",
      tagline: "The everyday trail companion.",
      price: 10750,
      compareAtPrice: null,
      rating: 4.6,
      reviewCount: 12,
      isNew: true,
      isFeatured: true,
      availability: "in-stock",
      image: "dirt bike side profile studio",
      colors: [
        { name: "Graphite", hex: "#4a4a4a" },
        { name: "Bone White", hex: "#F4F3EF" }
      ],
      battery: [
        { id: "standard", label: "Standard 48Ah", priceDelta: 0, range: 140 },
        { id: "extended", label: "Extended 64Ah", priceDelta: 900, range: 185 }
      ],
      specs: { power: 15, torque: 150, topSpeed: 108, range: 140, weight: 101, chargeTime: 1.7 }
    },
    {
      id: "rvx-summit",
      slug: "rvx-summit",
      name: "RVX Summit",
      category: "adventure",
      categoryLabel: "Adventure",
      tagline: "Altitude is just another trail.",
      price: 15500,
      compareAtPrice: null,
      rating: 4.5,
      reviewCount: 8,
      isNew: true,
      isFeatured: false,
      availability: "pre-order",
      image: "motorcycle forest silence mist",
      colors: [
        { name: "Ink Black", hex: "#0B0B0B" },
        { name: "Graphite", hex: "#4a4a4a" }
      ],
      battery: [
        { id: "standard", label: "Standard 72Ah", priceDelta: 0, range: 200 },
        { id: "extended", label: "Long-Range 96Ah", priceDelta: 1500, range: 265 }
      ],
      specs: { power: 21, torque: 205, topSpeed: 130, range: 200, weight: 128, chargeTime: 2.5 }
    },
    {
      id: "rvx-gt",
      slug: "rvx-gt",
      name: "RVX GT",
      category: "performance",
      categoryLabel: "Performance",
      tagline: "The halo model. Nothing above it.",
      price: 23200,
      compareAtPrice: null,
      rating: 5.0,
      reviewCount: 5,
      isNew: true,
      isFeatured: true,
      availability: "in-stock",
      image: "enduro motorcycle dirt trail forest",
      colors: [
        { name: "Ink Black", hex: "#0B0B0B" },
        { name: "Volt Yellow", hex: "#F2E900" },
        { name: "Graphite", hex: "#4a4a4a" }
      ],
      battery: [
        { id: "race", label: "Race 60Ah", priceDelta: 0, range: 145 },
        { id: "extended", label: "Extended 84Ah", priceDelta: 1400, range: 210 }
      ],
      specs: { power: 38, torque: 290, topSpeed: 175, range: 145, weight: 112, chargeTime: 2.0 }
    }
  ];

  var ACCESSORIES = [
    { id: "acc-battery-ext", name: "Extended Battery Pack 84Ah", category: "batteries", price: 1250, rating: 4.7, reviewCount: 44, availability: "in-stock", image: "electric motorcycle battery closeup" },
    { id: "acc-charger-fast", name: "Fast Home Charger", category: "chargers", price: 380, rating: 4.6, reviewCount: 71, availability: "in-stock", image: "electric motorcycle battery closeup" },
    { id: "acc-guard-kit", name: "Full Protection Guard Kit", category: "protection", price: 290, rating: 4.5, reviewCount: 58, availability: "in-stock", image: "motorcycle suspension closeup detail" },
    { id: "acc-helmet", name: "ARKO Enduro Helmet", category: "gear", price: 340, rating: 4.8, reviewCount: 112, availability: "in-stock", image: "motorcycle mechanic garage minimal" },
    { id: "acc-jacket", name: "ARKO Riding Jacket", category: "gear", price: 420, rating: 4.6, reviewCount: 39, availability: "pre-order", image: "motorcycle mechanic garage minimal" },
    { id: "acc-skid-plate", name: "Titanium Skid Plate", category: "parts", price: 210, rating: 4.4, reviewCount: 26, availability: "in-stock", image: "motorcycle suspension closeup detail" }
  ];

  window.ARKO = window.ARKO || {};
  window.ARKO.motorcycles = MOTORCYCLES;
  window.ARKO.accessories = ACCESSORIES;

  window.ARKO.getMotorcycle = function (id) {
    return MOTORCYCLES.find(function (m) { return m.id === id || m.slug === id; });
  };
  window.ARKO.getAccessory = function (id) {
    return ACCESSORIES.find(function (a) { return a.id === id; });
  };
  window.ARKO.formatPrice = function (n) {
    return "€" + Math.round(n).toLocaleString("en-US");
  };
})();
