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
| 1   | `shop.html`                                                                | ✅     | Filter sidebar (category/price/range/availability/rating), search, sort, pagination (9/page), quick-view modal, wishlist + compare toggles on cards. See handoff notes below. |
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

- [x] Header/nav with mega-menu (SHOP → Motorcycles / Accessories / Discover) —
      built directly into `index.html` and `shop.html` (verbatim block, see
      handoff note below). Icons: search, wishlist (badge), account, cart
      (badge), burger. `.nav-cta` "Reserve" button was removed from the nav
      per DESIGN-SYSTEM.md §6 — that slot is now commerce iconography.
- [x] Footer (already in base — reused as-is, with Menu column swapped for
      Shop/Support columns pointing at the new commerce pages)
- [x] Product card (`window.ARKO.motoCardHTML()` in `js/ecommerce.js`) —
      image, name, category, rating, price, key specs, color dots,
      availability, wishlist/compare icons, quick view, explore CTA
- [x] Filter sidebar (`shop.html`, styled via `css/ecommerce.css` §08)
- [x] Modal — quick view (`#qvScrim`/`#qvModal`/`#qvBody`, rendering logic in
      `js/ecommerce.js`: `window.ARKO.openQuickView(id)`). Compare tray is a
      separate persistent bottom bar, not a modal (`#compareTray`).
- [x] Toast (`window.ARKO.toast(msg, opts)` — add-to-cart, wishlist, compare,
      errors all wired)
- [x] Loading / empty / error states — `.state-block` used for the shop's
      "no results" state; `.skeleton` shimmer class exists in CSS but has no
      consumer yet (no page currently needs a loading skeleton — product.html
      probably will for the gallery/reviews).
- [x] Mini-cart drawer (`#cartDrawer`, fully wired: qty stepper, remove line,
      running total, checkout/view-cart CTAs)

## Bugfixes made while building shop.html (shared code, affects every page)

- `js/ecommerce.js`: `initProductCardActions()` was defined but never
  invoked from the `DOMContentLoaded` handler — wishlist/compare buttons on
  every product card were dead. Fixed by calling it alongside the other
  `init*()` calls.
- `js/ecommerce.js`: a stray `"` in the quick-view battery radio template
  literal would have produced malformed `<input>` markup. Fixed.
- `index.html`: the mega-menu/cart-drawer/search-overlay/compare-tray CSS in
  `css/ecommerce.css` had no corresponding HTML anywhere — `index.html`
  still shipped the pre-commerce nav (`Model/Technology/Enduro/Our Story` +
  a "Reserve" nav-cta, no cart/wishlist/search icons) and never loaded
  `css/ecommerce.css`, `js/data.js` or `js/ecommerce.js`. Retrofitted the
  full commerce header/overlays into `index.html` and added the missing
  `<link>`/`<script>` tags so the homepage and shop share one identical
  header — see DESIGN-SYSTEM.md §13 "Don't fork nav/footer markup per page".

## Demo data

- [x] Central `js/data.js` with 12 motorcycles + 6 accessories — already
      existed at the start of this session, shared across shop (and ready
      for product/configurator/compare/cart/wishlist).

## Handoff notes for the next page (`product.html`)

- **Reuse the header/overlay block verbatim** from `shop.html` lines 1–~150
  (nav + mega-menu + mobile-menu + search-overlay + cart-drawer +
  compare-tray + quick-view modal) and the footer block from the same file.
  Both are already wired for inner pages (logo/anchors point back to
  `index.html#...`). Don't hand-roll a new header.
- `product.html?id=<slug>` — read the slug from `location.search`, resolve
  via `window.ARKO.getMotorcycle(id)` (matches on `id` or `slug`, e.g.
  `rvx-gt` or `rvx-adventure-long-range`).
- Needed sections per the brief: primary/secondary media + trailer video +
  gallery (new `js/product.js`; consider a lightweight lightbox — no shared
  gallery component exists yet, build it as the new shared pattern and note
  it here for `accessory-product.html` to reuse), variant selection
  (color/battery — copy the color-dot + `qv-battery-options` pattern from
  quick view, but full-size, not in a modal), specs table, accessories
  upsell (pull from `window.ARKO.accessories`), ratings/reviews/comments
  (new demo review data — add a `reviews: [...]` array per motorcycle in
  `js/data.js` rather than inventing a separate reviews file), related/
  recent products (reuse `motoCardHTML`), sticky purchase CTA bar (new CSS,
  add to `css/ecommerce.css` §16 — follow the shop toolbar's sticky
  pattern), Add to Cart / Buy Now (Buy Now = `addToCart()` then redirect to
  `checkout.html`).
- Extend `MEDIA` in `js/main.js` if the gallery needs more angles per bike
  than the single existing keyword covers — add new `keyword: unsplash-id`
  entries rather than switching the image strategy.
- Do not duplicate cart/wishlist/compare logic — everything reads/writes
  through `window.ARKO.*` from `js/ecommerce.js`.
