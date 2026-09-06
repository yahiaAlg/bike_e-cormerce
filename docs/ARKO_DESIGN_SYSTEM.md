# ARKO — Design System Specification

> Version 1.0 — Direct-to-Consumer E-Commerce Platform (Django templates / Bootstrap 5 grid + custom theme)
> Colors, type, components, icons, and motion below are extracted directly from the built frontend (`css/theme.css`, `css/pages.css`, `js/main.js`). Template architecture and framework rules (Sections 8–10) map that visual language onto the Django implementation defined in the companion functional/app specs.

---

## 1. Design Philosophy

**Aesthetic direction:** Off-Road Editorial — a bold, high-contrast, motorsport-inspired consumer storefront. This is a marketing-forward commerce site, not operational software: every page is built to sell a feeling (instant torque, zero emissions, terrain that doesn't forgive) as much as a spec sheet. The palette pairs an ink-black brand voice with a single acid-yellow accent — volt communicates electric energy and urgency without borrowing the tension of red or the caution of amber.

**Core principles:**

- **Two-surface system, not dark-mode-only.** Brand and hero moments (nav, footer, hero, page headers, dark panels) run on `--ink` black; browsing, shopping, and content pages run on `--bone` off-white. The two surfaces alternate deliberately, section by section, rather than one mode governing the whole app.
- **One accent color only** (`--volt: #F2E900`). Reserved for primary CTAs, active states, price emphasis, star ratings, and the single dot in the logo — never used decoratively.
- **Sharp edges by default.** `border-radius: 0` everywhere — cards, buttons, inputs, images, badges. Roundness is reserved exclusively for circular elements that represent a point, a person, or a count: color/size swatches, avatars, stepper-step dots, notification badges, the success icon, the map pin. This contrast (sharp everywhere, round for a deliberate few) is a core visual signature, not an oversight.
- **Uppercase, letter-spaced micro-labels** as a recurring rhythm device: eyebrows, buttons, filter headings, badges, form labels all share the same uppercase-small-caps treatment, tying disparate pages together.
- **Full-bleed imagery and motion-driven storytelling on marketing pages** (hero, marquee, split layouts, testimonials) versus **dense, utilitarian layouts on commerce/account pages** (tables, forms, sidebars, steppers) — the aesthetic register shifts with the job the page is doing.
- **Motion is generous on marketing pages, fast and functional everywhere else.** Scroll-triggered reveals (GSAP) tell the brand story on Home/About/Stories; cart, checkout, and account pages use only fast (≤400ms) transform/opacity feedback. `prefers-reduced-motion` is respected globally.
- **A single typeface, carried entirely by weight and size.** Manrope (400–800) is used for everything — headings, body, buttons, labels, prices — rather than pairing a display font with a body font.

---

## 2. Color Palette

### Base Surfaces

| Token | Hex | Usage |
|---|---|---|
| `--ink` | `#0B0B0B` | Dark surface: nav, footer, hero overlay, page headers, dark panels (config summary, testride info card, support contact card) |
| `--charcoal` | `#151515` | Media placeholder background (product gallery, category card backdrop) behind lazy-loading images |
| `--charcoal-2` | `#1c1c1c` | Secondary dark surface, rarely used variant of charcoal |
| `--bone` | `#F4F3EF` | Default page background (light mode) |
| `--bone-2` | `#ebe9e2` | Chip background, table row hover, account nav-item hover |
| `--white` | `#FFFFFF` | Cards, form inputs, product images backdrop, modal box |

### Borders

| Token | Value | Usage |
|---|---|---|
| `--line-dark` | `rgba(255,255,255,.14)` | Dividers on dark surfaces (nav, footer, mega menu, config summary) |
| `--line-light` | `rgba(11,11,11,.12)` | Dividers on light surfaces (cards, tables, forms, filters) — the default border color across nearly every component |

### Accent (Volt)

| Token | Value | Usage |
|---|---|---|
| `--volt` | `#F2E900` | Primary CTA background, active nav underline, price emphasis on dark panels, logo dot, active stepper/config-option state, notification badge |
| `--volt-dim` | `#c9c200` | Star fill color, eyebrow text on dark surfaces, icon accents (spec icons, dealer info icons) — a slightly deeper volt for use against light backgrounds where full volt would be too loud |

### Semantic Status Colors

| Token | Hex | Primary Usage |
|---|---|---|
| `--success` | `#2ecf6b` | In-stock availability, delivered order status, success toast icon, tracking stage "done", chip.success |
| `--warning` | `#f5a623` | Pre-order availability, processing order status, chip.warning |
| `--error` | `#e54848` | Out-of-stock availability, cancelled order status, sale badge, remove/delete actions, error toast, chip.error |
| `--info` | `#4a90d9` | Shipped order status, chip is not defined for info but the token exists for status badges |

### Neutral Text Ramp

Text grays are not tokenized as CSS variables — they're applied per-component from a consistent ramp. This table consolidates them for consistent reuse:

| Role | Representative Hex(es) | Usage |
|---|---|---|
| Primary on light | `var(--ink)` | Headings, prices, primary values |
| Primary on dark | `var(--white)` | Headings/values on ink panels |
| Body copy | `#333` – `#555` | Paragraph text, spec table labels, review body, testimonial quotes |
| Table / list cell | `#666` | Table cell text, body-m default |
| Muted label | `#999` | Category tags, counts, dates, hero-stat labels, nav-mega links, availability-adjacent captions |
| Muted strong | `#777` / `#767676` | Empty-state copy, footer legal text, descriptive sub-text |
| Placeholder / disabled | `#aaa` / `#ddd` | Input placeholders, empty star icons, empty-state icon |
| Secondary on dark | `#a9a9a9` / `#c8c8c8` / `#dcdcdc` | Secondary text and links on ink surfaces (footer, mega menu, testride info card) |

### Availability Status → Color Mapping (strictly enforced)

| Status | Class | Color |
|---|---|---|
| In Stock | `.product-card-availability.in-stock` | `--success` |
| Pre-Order | `.product-card-availability.pre-order` | `--warning` |
| Out of Stock | `.product-card-availability.out-stock` | `--error` |

### Order Status → Color Mapping (strictly enforced)

| Status | Class | Color |
|---|---|---|
| Delivered | `.order-status-badge.delivered` | `--success` |
| Shipped | `.order-status-badge.shipped` | `--info` |
| Processing | `.order-status-badge.processing` | `--warning` |
| Cancelled | `.order-status-badge.cancelled` | `--error` |

### Chip Variants

| Class | Background | Text |
|---|---|---|
| `.chip` (default) | `--bone-2` | `--ink` |
| `.chip.volt` | `--volt` | `--ink` |
| `.chip.dark` | `--ink` | `--white` |
| `.chip.success` | `--success` | `--white` |
| `.chip.warning` | `--warning` | `--white` |
| `.chip.error` | `--error` | `--white` |

---

## 3. Typography

### Font Stack

| Role | Family | Weights | Usage |
|---|---|---|---|
| Everything | **Manrope** (Google Fonts) | 400, 500, 600, 700, 800 | The single typeface for the entire platform — headings, body, buttons, labels, prices, forms |

```html
<!-- Required in <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
```

### Type Scale

| Element | Size | Weight | Letter-spacing | Notes |
|---|---|---|---|---|
| Eyebrow | `.72rem` | 700 | `.14em` | Uppercase, `--volt-dim` color |
| Display title (hero) | `clamp(2.8rem, 7.2vw, 6.4rem)` | 800 | `-.03em` | Line-height `.96` |
| Section title | `clamp(2.1rem, 4.6vw, 4rem)` | 800 | `-.02em` | Line-height `1.02` |
| Body large | `clamp(1.05rem, 1.6vw, 1.3rem)` | 400 | none | `#3c3c3c`; `.on-dark` variant `#c8c8c8` |
| Body medium | `1rem` | 400 | none | `#555`; `.on-dark` variant `#a9a9a9` |
| Product name (card) | `1.15rem` | 700 | none | — |
| Product name (detail page H1) | `2.2rem` | 800 | none | — |
| Price (card) | `1.35rem` | 800 | `-.01em` | Old price: `.85rem`, `#999`, strikethrough |
| Price (detail page) | `2.5rem` | 800 | none | Old price: `1.2rem`, `#999`, strikethrough |
| Summary total (cart/config/order) | `1.5rem` | 800 | none | Value highlighted in `--volt` on dark panels |
| Order success H1 | `2.5rem` | 800 | none | — |
| Error code (404) | `clamp(6rem, 15vw, 12rem)` | 800 | `-.04em` | — |
| Hero stat value | `2rem` | 800 | `-.02em` | Label below: `.78rem`, uppercase, `.08em`, `#999` |
| Form label | `.78rem` | 700 | `.04em` | Uppercase, `#444` |
| Button text | `.82rem` | 700 | `.08em` | Uppercase; `.btn-sm` = `.75rem`, `.btn-lg` = `.9rem` |
| Nav link | `.82rem` | 600 | `.03em` | 85% opacity, full on hover/active |
| Table header | `.78rem` | 700 (implicit via context) | `.06em` | Uppercase, `#888` |
| Table cell | `.92rem` | 400 | none | — |
| Badge / chip text | `.75rem` | 700 | `.04em` | Uppercase |
| `mono-num` utility | inherits | 700 | none | Tabular numerals — reserved for stat/countdown-style figures |

---

## 4. Spacing & Layout

### CSS Variables

```css
--container: 1360px;
--ease: cubic-bezier(.16, .84, .44, 1); /* the platform's signature transform easing */
```

### Border Radius Convention

**`border-radius: 0` by default, everywhere.** Cards, buttons, inputs, images, badges, modals — all sharp-edged. The only exceptions, applied deliberately as `50%`:

| Element | Why circular |
|---|---|
| Color/size swatches | Represents a discrete, selectable point |
| Review avatar, account avatar | Represents a person |
| Stepper step-num, config step-num, tracking stage-dot | Represents a position in a sequence |
| Nav badge counter (cart/wishlist/compare count) | Represents a count |
| Success icon (order confirmation) | Represents a completed state |
| Dealer map pin | Teardrop shape (`50% 50% 50% 0`, rotated `-45deg`) |

### Page Padding & Container

- Container: `.container-x` — `max-width: 1360px`, `padding: 0 clamp(20px, 4vw, 64px)`
- Section vertical padding: `.section` — `clamp(70px, 10vw, 130px)`; `.section.tight` — `clamp(50px, 6vw, 80px)`
- Page header (dark banner at top of interior pages): `100px 0 50px`
- Card internal padding: commonly `28px`–`32px` for standalone panels (filter sidebar, config-step, checkout-panel, cart-summary), `20px` for product-card body
- Grid gaps: `24px` (product grids, testimonial grid), `20px` (category grid, config-options), `30px`–`40px` (two-column page layouts)

### Grid Patterns by Page

| Page / Component | Columns |
|---|---|
| Shop / Accessories layout | `280px 1fr` (filter sidebar + results) |
| Product detail | `1.2fr 1fr` (gallery + info) |
| Configurator | `1fr 380px` (steps + sticky summary) |
| Cart | `1fr 380px` (items + sticky summary) |
| Checkout | `1fr 380px` (steps + sticky summary) |
| Account | `260px 1fr` (sticky sidebar + content) |
| Test Ride | `1fr 400px` (form + sticky info) |
| Dealers | `1fr 1fr` (list + map) |
| Category grid | `repeat(4, 1fr)` |
| Product / Accessory / Wishlist grid | `repeat(auto-fill, minmax(280px, 1fr))` |
| Testimonial grid | `repeat(3, 1fr)` |
| Compare slots | `repeat(4, 1fr)` |
| Support categories | `repeat(4, 1fr)` |
| Garage card | `160px 1fr` (image + details) |
| Cart line item | `120px 1fr auto` (image + details + price) |

### Responsive Breakpoints

| Breakpoint | Key changes |
|---|---|
| `1024px` | Footer columns 5→3; category grid 4→2; product-detail, testimonial-grid, split-layout, testride-layout collapse to single column; nav-mega narrows |
| `860px` | Nav links hidden behind burger menu; two-column page layouts (shop, cart, checkout, account, configurator, dealers, testride) collapse to one column; stepper labels hidden; filter sidebar becomes a full-screen overlay |
| `560px` | Footer to single column; shop-toolbar stacks vertically; hero-stats shrink; gallery thumbnails 6→4 columns; order-success-steps to single column |

`@media (prefers-reduced-motion: reduce)` — all `[data-reveal]`, `[data-reveal-img]`, and `.split-line` states resolve instantly to their final value; all `animation-duration` / `transition-duration` are forced to `.001ms`.

---

## 5. Component Library

### 5.1 Buttons

```css
.btn-volt, .btn-ghost, .btn-line, .btn-dark, .btn-outline {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 16px 30px; font-size: .82rem; font-weight: 700;
  letter-spacing: .08em; text-transform: uppercase;
  border: 1px solid transparent;
  transition: transform .5s var(--ease), background-color .35s ease, color .35s ease, border-color .35s ease;
}
.btn-volt   { background: var(--volt); color: var(--ink); }
.btn-volt:hover { transform: translateY(-3px); background: var(--white); }
.btn-ghost  { background: transparent; color: var(--white); border-color: rgba(255,255,255,.4); }
.btn-dark   { background: var(--ink); color: var(--white); }
.btn-outline{ background: transparent; color: var(--ink); border-color: var(--ink); }
.btn-outline:hover { background: var(--ink); color: var(--white); }
.btn-line   { background: transparent; border-bottom: 1px solid var(--ink); padding: 6px 0; }
.btn-line i { transition: transform .35s var(--ease); }
.btn-line:hover i { transform: translateX(6px); } /* arrow nudge */
```

| Variant | Usage |
|---|---|
| `.btn-volt` | Primary CTA — Add to Cart, Buy Now, Place Order, Build |
| `.btn-dark` | Secondary strong action, often paired with `.btn-volt` |
| `.btn-outline` | Tertiary action on light surfaces |
| `.btn-ghost` | Actions on dark surfaces (hero, page header) |
| `.btn-line` | Text link with animated arrow — "View all," "Learn more" |

Size modifiers: `.btn-sm` (`10px 20px`, `.75rem`), `.btn-lg` (`20px 40px`, `.9rem`), `.btn-block` (full width, centered).

### 5.2 Navigation (Header)

- Fixed header, `rgba(11,11,11,.92)` with `backdrop-filter: blur(14px)`, bottom border `--line-dark`. Padding compresses from `16px` to `10px` vertical once `window.scrollY > 60`.
- Nav links: underline grows `width: 0 → 100%` on hover/active via `::after`.
- **Mega menu** (`.nav-mega`): 3-column grid, `min-width: 520px`, appears on hover/focus-within of `.nav-mega-wrap`, fade + translateY(10px→0), `.3s ease`.
- **Right icon cluster**: Search, Account, Wishlist, Compare, Cart — each `.icon-link` with an optional circular `.badge` (volt background, count text) positioned top-right.
- **Mobile menu**: full-screen overlay, `transform: translateY(-100%) → 0`, `.6s var(--ease)`, links at `1.6rem/800`, burger icon morphs via `span` transforms.

### 5.3 Product Card

```css
.product-card { background: var(--white); border: 1px solid var(--line-light);
  transition: transform .4s var(--ease), box-shadow .4s ease; }
.product-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,.1); }
.product-card-media { aspect-ratio: 4/3; overflow: hidden; background: var(--charcoal); }
.product-card:hover .product-card-media img { transform: scale(1.06); }
.product-card-badge { position: absolute; top:12px; left:12px; background: var(--volt); color: var(--ink); }
.product-card-badge.dark { background: var(--ink); color: var(--white); }
.product-card-badge.sale { background: var(--error); color: var(--white); }
.product-card-actions { position: absolute; top:12px; right:12px; opacity: 0; transform: translateX(10px); }
.product-card:hover .product-card-actions { opacity: 1; transform: translateX(0); }
```

**Structure:** media (with badge + hover-revealed action cluster: wishlist/compare/quick-view, each a 36×36 `.pc-action-btn`) → body (category eyebrow → name → star rating + review count → spec chips → color swatches → availability tag → price row → Add to Cart / View CTA row).

`.pc-action-btn.active` (wishlisted/compared state): `background: var(--ink); color: var(--volt)`.

### 5.4 Forms & Filters

```css
.form-control, .form-select, .form-input {
  padding: 14px 16px; border: 1px solid var(--line-light);
  background: var(--white); font-size: .95rem; color: var(--ink);
  transition: border-color .3s ease;
}
.form-control:focus { border-color: var(--ink); outline: none; }
.form-label { font-size: .78rem; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; color: #444; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; } /* → 1fr at 860px */
```

**Filter sidebar** (`.filter-sidebar`): white card, `28px` padding, stacked `.filter-group` sections (each with a `22px`-padded bottom border divider). Checkboxes/radios show a live `.count` in muted gray. Color filters render as `28px` circular swatches with a `box-shadow: 0 0 0 2px var(--ink)` ring when `.active`.

**Toolbar** (`.shop-toolbar`): result count (bold count in `--ink`, rest in `#666`) + sort `<select>` + grid/list `.view-toggle` (active state: `--ink` background, white icon).

### 5.5 Badges, Chips & Pills

Covered in full in Section 2 (color mapping). Structurally:

```css
.chip { padding: 6px 14px; font-size: .75rem; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; }
.order-status-badge { padding: 5px 14px; font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; }
```

Both are sharp-edged (no border-radius) — pill/rounded badges are **not** part of this design language, unlike typical SaaS dashboards.

### 5.6 Rating Stars

```css
.stars .filled { color: var(--volt-dim); }
.stars .empty  { color: #ddd; }
```

Rendered via a shared helper (`starRating(rating, size)` in JS; should become a Django inclusion tag): 5 icons total, filled count = `Math.round(rating)`, filled uses `bxs-star`, empty uses `bx-star`. Default size `.85rem`; scales up via the `size` parameter for detail-page and review-summary contexts.

### 5.7 Modal / Quick View

```css
.modal-overlay { position: fixed; inset: 0; background: rgba(11,11,11,.8);
  opacity: 0; visibility: hidden; transition: opacity .3s ease, visibility .3s ease; }
.modal-overlay.is-open { opacity: 1; visibility: visible; }
.modal-box { max-width: 900px; transform: translateY(20px); transition: transform .4s var(--ease); }
.modal-overlay.is-open .modal-box { transform: translateY(0); }
```

Close button: `40×40px`, white, top-right absolute. Used exclusively for the Quick View product overlay (Section 5.6 of the functional spec).

### 5.8 Toast Notifications

```css
.toast-container { position: fixed; bottom: 24px; right: 24px; z-index: 3000; }
.toast { background: var(--ink); color: var(--white); padding: 16px 24px;
  transform: translateX(120%); transition: transform .4s var(--ease); max-width: 360px; }
.toast.show { transform: translateX(0); }
.toast i { color: var(--volt); }        /* default */
.toast.success i { color: var(--success); }
.toast.error i { color: var(--error); }
```

Icon by type: default `bx-check`, success `bx-check-circle`, error `bx-x-circle`. Auto-dismiss after **3000ms** (`.show` class removed), DOM node removed after a further **400ms** fade. Every state-changing action on the site must trigger a toast (see `tone_and_formatting`-level rule in Section 10).

### 5.9 Empty State & Skeleton Loading

```css
.empty-state { text-align: center; padding: 80px 20px; }
.empty-state i { font-size: 4rem; color: #ddd; margin-bottom: 20px; }
.empty-state h3 { font-size: 1.5rem; font-weight: 700; }
.empty-state p { color: #777; max-width: 400px; margin: 0 auto; }

.skeleton { background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200% 100%; animation: skeleton-loading 1.5s infinite; }
```

Used for empty Cart, Wishlist, Compare, Search, Dealer search, and FAQ search results (see functional spec Section 10.3). Skeleton loading is a defined utility, reserved for any async content-loading state introduced in the Django rebuild (the static prototype has no server round-trips to mask).

### 5.10 Accordion (FAQ)

```css
.accordion-header { display: flex; justify-content: space-between; padding: 20px 0; font-weight: 700; }
.accordion-header i { transition: transform .3s ease; }
.accordion-item.open .accordion-header i { transform: rotate(180deg); }
.accordion-body { max-height: 0; overflow: hidden; transition: max-height .4s var(--ease); }
.accordion-item.open .accordion-body { max-height: 600px; }
```

Chevron icon (`bx-chevron-down`) rotates 180° when open; body expands via `max-height`, not `height`, to allow the CSS transition without measuring content.

### 5.11 Footer

5-column grid (`1.4fr 1fr 1fr 1fr 1.2fr`) on `--ink`: Brand (logo + statement + social icons) / Motorcycles / Shop / Company / Newsletter. Social icons are **square** (`38×38px`, bordered, no radius — consistent with the sharp-edges rule). Newsletter input is borderless-inline inside a bordered wrapper with a volt submit button. Bottom bar: copyright + legal links, flex `space-between`, wraps on mobile.

### 5.12 Pagination

```css
.pagination button, .pagination a {
  min-width: 44px; height: 44px; border: 1px solid var(--line-light); background: var(--white);
  font-weight: 700; transition: all .3s ease;
}
.pagination .active, .pagination :hover { background: var(--ink); color: var(--white); border-color: var(--ink); }
```

### 5.13 Table

Two forms: a generic `.table` (order history, any tabular list) and a `.spec-table` (key/value product specifications, no header row, first column bold-labeled at 40% width). Row hover: `background: var(--bone)`. `.compare-table` is a specialized variant — see 5.17.

### 5.14 Stepper (Checkout Progress)

```css
.step-num { width: 36px; height: 36px; border-radius: 50%; border: 2px solid var(--line-light);
  color: #999; background: var(--white); transition: all .3s ease; }
.step.active .step-num  { border-color: var(--volt); background: var(--volt); color: var(--ink); }
.step.complete .step-num{ border-color: var(--success); background: var(--success); color: var(--white); }
.step-line { width: 50px; height: 2px; background: var(--line-light); }
.step.complete + .step-line { background: var(--success); }
```

Labels hide below `860px`, leaving just the numbered/colored dots and connecting lines — the one place in the design system a circular element carries a number rather than an icon.

---
