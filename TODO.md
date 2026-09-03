# ARKO RVX — E-Commerce Theme Build Tracker

Single source of truth for progress across sessions/agents. Update this file
at the end of every page before handing off.

## Shared design system (do not touch without updating this file)

- `css/base.css` — tokens, type scale, buttons, nav, hero, all section
  styles, footer, reveal utilities, responsive breakpoints, reduced-motion
  rules. Extracted verbatim from the original single-file `index.html`.
- `js/main.js` — combined interaction layer, concatenated **in original
  execution order** from the page's inline `<script>` blocks:
  1. Image module (`data-q` keyword → Unsplash CDN resolver + SVG fallback)
  2. Main (nav scroll state, mobile menu, hero load timeline, `[data-reveal]`
     / `[data-reveal-img]` scroll reveals, counters, parallax, battery-swap
     scrub, cine play/sound toggles, newsletter stub, smooth anchor scroll)
  3. Horizontal scroll features (pinned feature track)
  4. Trail map (SVG path draw + stage captions)
  5. Product carousel (slide/dot logic)
  6. ScrollToPlugin substitute + scrollTo shim (avoids extra GSAP CDN dep)
- External CDNs used everywhere: Bootstrap 5 grid-only, Boxicons, Google
  Fonts (Manrope), GSAP + ScrollTrigger.
- Image strategy: `<img data-q="keyword,width,height">` resolved at runtime
  by the image module. New pages should reuse this pattern and extend the
  `MEDIA` keyword map in `js/main.js` for any new photography needed
  (motorcycle catalog shots, accessory shots, dealer photos, etc.) rather
  than hardcoding new `<img src>` URLs.

## Status legend

✅ done · 🚧 in progress · ⬜ not started

## Pages

| #   | Page                                                                       | Status | Notes                                                                                                                                            |
| --- | -------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0   | Dismantle `index.html` → `css/base.css` + `js/main.js` + slim `index.html` | ✅     | Byte-identical CSS/JS extraction, no visual changes. Verified brace/paren balance.                                                               |
| 1   | `shop.html`                                                                | ⬜     | Catalog grid, filters (category/price/range/power/battery/availability), sorting, search, quick-view modal, wishlist + compare toggles on cards. |
| 2   | `product.html`                                                             | ⬜     | Gallery, trailer video, variants (color/battery/suspension/wheels), sticky purchase bar, specs, reviews, related/recent.                         |
| 3   | `configurator.html`                                                        | ⬜     | Step-based builder feeding a live price summary → Add to Cart.                                                                                   |
| 4   | `compare.html`                                                             | ⬜     | 2–4 motorcycle side-by-side spec table.                                                                                                          |
| 5   | `cart.html`                                                                | ⬜     | Line items w/ variants + accessories, qty, discount code, shipping estimate, summary, checkout CTA.                                              |
| 6   | `checkout.html`                                                            | ⬜     | Multi-step: info → delivery → payment → review.                                                                                                  |
| 7   | `order-success.html`                                                       | ⬜     | Order summary + next steps.                                                                                                                      |
| 8   | `accessories.html`                                                         | ⬜     | Filtered accessories/parts/gear catalog (reuses shop grid components).                                                                           |
| 9   | `accessory-product.html`                                                   | ⬜     | Accessory PDP (lighter version of product.html).                                                                                                 |
| 10  | `wishlist.html`                                                            | ⬜     | Saved items, move-to-cart/compare/remove.                                                                                                        |
| 11  | `account.html`                                                             | ⬜     | Dashboard: profile, garage, orders, preferences.                                                                                                 |
| 12  | `orders.html`                                                              | ⬜     | Order history + status timeline/tracking.                                                                                                        |
| 13  | `test-ride.html`                                                           | ⬜     | Booking flow (dealer + date/time picker).                                                                                                        |
| 14  | `dealers.html`                                                             | ⬜     | Dealer locator (list + map placeholder).                                                                                                         |
| 15  | `support.html`                                                             | ⬜     | FAQ accordion, help categories, contact form.                                                                                                    |
| 16  | `search.html`                                                              | ⬜     | Global search results + filters.                                                                                                                 |
| 17  | `404.html`                                                                 | ⬜     | Error page.                                                                                                                                      |

Secondary flows (`compare`, `wishlist`, `search`, `test-ride`, `dealers`)
are being built as full pages per the brief, but should also be reachable
as lightweight overlays from `shop.html`/`product.html` where noted.

## Shared components to extract/build as pages progress

- [ ] Header/nav with mega-menu (SHOP → Motorcycles / Accessories / Discover)
- [ ] Footer (already in base — reused as-is)
- [ ] Product card (image, name, category, rating, price, key specs, color
      dots, availability, wishlist/compare icons, quick view, explore CTA)
- [ ] Filter sidebar
- [ ] Modal (quick view, compare tray, etc.)
- [ ] Toast (add-to-cart, wishlist, errors)
- [ ] Loading / empty / error states
- [ ] Mini-cart drawer

## Demo data

- [ ] Central `js/data.js` with motorcycle + accessory catalog objects,
      shared across shop/product/configurator/compare/cart/wishlist so
      navigation and interactions are consistent. **Not created yet** —
      first real task for `shop.html`.

## Handoff notes for the next page (`shop.html`)

- Reuse `css/base.css` tokens/classes (`.btn-volt`, `.btn-ghost`, `.eyebrow`,
  `.section-title`, `.container-x`, nav/footer markup) — do not redefine.
- Add any shop-specific CSS in a new `css/shop.css` (or a shared
  `css/ecommerce.css` if components will be reused across catalog pages —
  recommended, since `accessories.html` needs the same grid/filter/card
  system).
- Add shop-specific JS in `js/shop.js`, loaded after `js/main.js`.
- Start `js/data.js` with ~8–12 demo motorcycles (id, name, category, price,
  colors, battery options, image keywords, rating, availability) since shop,
  product, configurator, compare, cart and wishlist all depend on it.
