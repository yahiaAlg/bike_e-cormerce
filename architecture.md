Exactly. If **e-commerce is the core**, then the architecture should be driven by the **shopping/buying journey**, while the cinematic brand pages support it—not the other way around.

For a motorcycle business, I would keep the front-end theme to this **essential e-commerce structure**:

# 🏍️ E-Commerce-First Front-End Tree

```text
motorcycle-ecommerce/
│
├── index.html
│   └── Home / Commercial Landing
│
├── shop.html
│   └── All Motorcycles / Rich Filters / Sorting
│
├── product.html
│   └── Motorcycle Product Details
│
├── configurator.html
│   └── Configure Motorcycle / Variants / Accessories
│
├── compare.html
│   └── Compare Selected Motorcycles
│
├── cart.html
│   └── Shopping Cart
│
├── checkout.html
│   └── Checkout / Delivery / Payment
│
├── order-success.html
│   └── Order Confirmation
│
├── accessories.html
│   └── Accessories / Parts / Gear
│
├── accessory-product.html
│   └── Accessory Details
│
├── wishlist.html
│   └── Saved Products
│
├── account.html
│   └── Customer Dashboard
│
├── orders.html
│   └── Order History / Tracking
│
├── test-ride.html
│   └── Test Ride Booking
│
├── dealers.html
│   └── Dealer / Showroom Locator
│
├── support.html
│   └── FAQ / Customer Support
│
├── search.html
│   └── Global Search
│
└── 404.html
    └── Error Page
```

## The actual commercial flow

The most important thing is this:

```text
                         HOME
                           │
              ┌────────────┼────────────┐
              ↓            ↓            ↓
             SHOP      ACCESSORIES    SEARCH
              │            │
              ↓            ↓
          PRODUCT       ACCESSORY
           DETAILS       DETAILS
              │
       ┌──────┼────────┐
       ↓      ↓        ↓
   CONFIGURE COMPARE WISHLIST
       │
       ↓
      CART
       │
       ↓
    CHECKOUT
       │
       ↓
 ORDER SUCCESS
       │
       ↓
    ACCOUNT
       │
       ↓
 ORDERS / TRACKING
```

That's an **e-commerce architecture**, with the motorcycle brand experience sitting around it.

---

# The pages I would consider truly necessary

If you want to make the theme **lean**, I'd reduce it to **12 pages**:

| Page                     | Purpose                 |
| ------------------------ | ----------------------- |
| `index.html`             | Commercial homepage     |
| `shop.html`              | Motorcycle catalog      |
| `product.html`           | Motorcycle product page |
| `configurator.html`      | Configure motorcycle    |
| `accessories.html`       | Accessories catalog     |
| `accessory-product.html` | Accessory details       |
| `cart.html`              | Cart                    |
| `checkout.html`          | Checkout                |
| `order-success.html`     | Purchase confirmation   |
| `account.html`           | Customer account        |
| `orders.html`            | Orders/tracking         |
| `support.html`           | Support/FAQ             |

Then treat these as **secondary functionality** rather than mandatory standalone pages:

```text
compare
wishlist
search
test-ride
dealers
```

They can initially be implemented as overlays/modals or lightweight pages.

---

# 🛒 But I'd make `shop.html` MUCH more powerful

This should be the commercial heart of the website.

```text
SHOP
│
├── Motorcycles
│   ├── Enduro
│   ├── Trail
│   ├── Adventure
│   └── Performance
│
├── Accessories
│   ├── Batteries
│   ├── Chargers
│   ├── Protection
│   ├── Parts
│   └── Riding Gear
│
└── Featured / New / Best Sellers
```

And the actual interface:

```text
┌──────────────────────────────────────────────────────────────┐
│ SHOP                                                          │
│ Explore the machines.                                         │
├───────────────┬──────────────────────────────────────────────┤
│ FILTERS       │  12 MACHINES          SORT: Recommended      │
│               │                                               │
│ Category      │  ┌────────┐ ┌────────┐ ┌────────┐            │
│ □ Enduro      │  │        │ │        │ │        │            │
│ □ Trail       │  │ MOTOR  │ │ MOTOR  │ │ MOTOR  │            │
│ □ Adventure   │  │ CYCLE  │ │ CYCLE  │ │ CYCLE  │            │
│               │  │        │ │        │ │        │            │
│ Price         │  │ EXR    │ │ EXR PRO│ │ TRAIL  │            │
│ ───────────   │  │ €...   │ │ €...   │ │ €...   │            │
│               │  └────────┘ └────────┘ └────────┘            │
│ Range         │                                               │
│ ───────────   │  ┌────────┐ ┌────────┐ ┌────────┐            │
│               │  │        │ │        │ │        │            │
│ Power         │  │ MOTOR  │ │ MOTOR  │ │ MOTOR  │            │
│ ───────────   │  │        │ │        │ │        │            │
│               │  └────────┘ └────────┘ └────────┘            │
│ Battery       │                                               │
│ □ Standard    │                                               │
│ □ Extended    │                                               │
│               │                                               │
│ Availability  │                                               │
│ □ In stock    │                                               │
│ □ Pre-order   │                                               │
└───────────────┴──────────────────────────────────────────────┘
```

And crucially:

### Every product card should support

```text
IMAGE
   ↓
PRODUCT NAME
CATEGORY
RATING
PRICE
KEY SPECS
COLOR OPTIONS
AVAILABILITY

[♡] [COMPARE]

[ QUICK VIEW ]

[ EXPLORE → ]
```

---

# 🔥 Product page becomes the conversion engine

The product page should have:

```text
PRODUCT
│
├── Gallery
│   ├── Primary image
│   ├── Secondary images
│   ├── Detail images
│   ├── Lifestyle images
│   └── Trailer video
│
├── Product Information
│   ├── Name
│   ├── Rating
│   ├── Price
│   ├── Availability
│   └── Financing
│
├── Variant Selection
│   ├── Color
│   ├── Battery
│   ├── Suspension
│   └── Wheels
│
├── Accessories
│
├── Quantity
│
├── ADD TO CART
│
├── BUY NOW
│
├── Technical Specifications
│
├── Features
│
├── Reviews
│
├── Questions
│
├── Related Products
│
└── Recently Viewed
```

So the cinematic storytelling is still there, but **the shopping controls never disappear from the experience**.

---

# ⚙️ Configurator is part of commerce

I wouldn't treat the configurator as a separate "cool technology page."

It should directly feed the cart:

```text
PRODUCT
   ↓
CHOOSE COLOR
   ↓
CHOOSE BATTERY
   ↓
CHOOSE PERFORMANCE PACKAGE
   ↓
CHOOSE ACCESSORIES
   ↓
PRICE CALCULATION
   ↓
ORDER SUMMARY
   ↓
ADD CONFIGURATION TO CART
   ↓
CHECKOUT
```

For example:

> **RADIAN EXR**

Base price
`€ 9,999`

Extended Battery
`+ € 1,200`

Performance Suspension
`+ € 850`

Protection Kit
`+ € 350`

**TOTAL — € 12,399**

`ADD TO CART`

That's a genuine e-commerce configurator.

---

# 🧠 One more important distinction

I'd structure the website into **three layers**:

### 🛒 Commerce

```text
SHOP
PRODUCT
CONFIGURATOR
CART
CHECKOUT
ACCOUNT
ORDERS
```

### 🏍️ Brand

```text
HOME
TECHNOLOGY
OUR STORY
TRAILS
```

### 🛠️ Customer services

```text
TEST RIDE
DEALERS
SUPPORT
WARRANTY
```

But **Commerce is the dominant layer**.

So your main navigation could simply be:

```text
┌─────────────────────────────────────────────────────────────┐
│ LOGO                                                         │
│                                                             │
│ SHOP     MOTORCYCLES     ACCESSORIES     EXPERIENCE         │
│                                                             │
│                         SEARCH  ♡  🛒  PRE-ORDER             │
└─────────────────────────────────────────────────────────────┘
```

And I'd make **SHOP** the primary navigation item, with a rich mega-menu:

```text
SHOP
│
├── MOTORCYCLES
│   ├── All Motorcycles
│   ├── Enduro
│   ├── Trail
│   └── Adventure
│
├── ACCESSORIES
│   ├── Batteries
│   ├── Chargers
│   ├── Protection
│   └── Parts & Gear
│
└── DISCOVER
    ├── Compare
    ├── Find Your Ride
    └── New Arrivals
```

That gives you the right balance: **a premium cinematic motorcycle brand on the surface, but underneath it is unmistakably a sophisticated e-commerce storefront.**
