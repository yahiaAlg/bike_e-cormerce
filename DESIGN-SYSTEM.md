# ARKO — Design System Spec

Source of truth for visual identity, components, and interaction language
across the whole ARKO RVX e-commerce theme. Every new page (`shop.html`,
`product.html`, `configurator.html`, etc.) must be built **on top of** this
system, not around it. If a pattern you need isn't here, extend this file
in the same session you add the CSS — don't let the two drift apart.

Reference build: `index.html` + `css/base.css` + `js/main.js`.

---

## 1. Brand character

Premium, cinematic, electric-enduro motorcycle brand. Confident, minimal,
dark-mode-forward with a single high-voltage accent. Photography and motion
carry the emotion; UI chrome stays quiet, sharp-edged, and gets out of the
way. Under the cinematic surface, the product is unmistakably a
sophisticated e-commerce storefront — commerce is never sacrificed for
aesthetics.

**Tone words:** silent, torque, terrain, precision, field-ready, engineered.
Avoid: playful, rounded, pastel, soft-shadow SaaS aesthetics.

---

## 2. Design tokens (`:root` in `css/base.css`)

| Token | Value | Usage |
|---|---|---|
| `--ink` | `#0B0B0B` | Primary dark background / near-black text |
| `--charcoal` | `#151515` | Secondary dark surface (e.g. carousel stage bg) |
| `--charcoal-2` | `#1c1c1c` | Tertiary dark surface (battery bay bg) |
| `--bone` | `#F4F3EF` | Primary light background (body) |
| `--bone-2` | `#ebe9e2` | Secondary light surface |
| `--volt` | `#F2E900` | Brand accent — CTAs, active states, highlights |
| `--volt-dim` | `#c9c200` | Accent on light backgrounds (better contrast) |
| `--graphite` | `#A5A5A5` | Muted icon/arrow color |
| `--white` | `#FFFFFF` | Pure white (dark-section text, hover states) |
| `--line-dark` | `rgba(255,255,255,.14)` | Hairline borders on dark sections |
| `--line-light` | `rgba(11,11,11,.12)` | Hairline borders on light sections |
| `--ease` | `cubic-bezier(.16,.84,.44,1)` | Standard motion easing — use everywhere |
| `--container` | `1360px` | Max content width |

**Rules:**
- Never hardcode hex values in new CSS — always reference the token.
- `--volt` is a scarce resource: primary CTA, active/selected states, small
  accents (dots, icons, progress fills). Never use it as a large fill or
  body background — it reads as a warning color at scale.
- On light backgrounds, prefer `--volt-dim` for text (`--volt` fails
  contrast on `--bone`).
- New tokens (e.g. semantic colors for price, discount, in-stock/out-of-
  stock, star ratings) should be added here first, then to `:root`, so
  every future agent finds them in one place. Suggested additions for
  commerce pages:
  ```css
  --success:#2e7d32;   /* in stock, confirmed */
  --danger:#c0392b;    /* out of stock, errors, remove */
  --star:#F2E900;      /* rating stars — reuse volt */
  --card-bg:#ffffff;   /* product card surface on --bone */
  ```

---

## 3. Typography

**Font:** Manrope (weights 200–800), loaded via Google Fonts. System-font
fallback stack: `-apple-system, BlinkMacSystemFont, sans-serif`.

| Class | Size | Weight | Use |
|---|---|---|---|
| `.eyebrow` | `.72rem`, uppercase, `.14em` tracking | 700 | Section labels above a title (color: `--volt-dim`) |
| `.display-title` | `clamp(2.8rem,7.2vw,6.4rem)`, line-height `.96` | 800 | Hero / full-bleed section headlines |
| `.section-title` | `clamp(2.1rem,4.6vw,4rem)`, line-height `1.02` | 800 | Standard section headlines |
| `.body-l` | `clamp(1.05rem,1.6vw,1.3rem)`, line-height `1.55` | 400 | Lead paragraph copy (`color:#3c3c3c`; add `.on-dark` for `#c8c8c8`) |
| `.body-m` | `1rem`, line-height `1.6` | 400 | Standard body copy (`color:#555`; `.on-dark` → `#a9a9a9`) |
| `.mono-num` | inherits | 700 | Tabular numerals (prices, counters, stats) |

All headings/paragraphs have `margin:0` reset — spacing is controlled
explicitly by layout/utility classes, not browser defaults. New pages must
follow the same reset-then-explicit-spacing pattern.

**Letter-spacing convention:** display/section titles use *negative*
tracking (`-.02em` to `-.03em`); all-caps micro-labels (eyebrow, nav links,
button text) use *positive* tracking (`.06em`–`.16em`). Keep this contrast
— it's a signature of the system.

---

## 4. Layout

- `.container-x` — the only horizontal content wrapper. `max-width: var(--container)` (1360px), centered, fluid side padding via `clamp(20px,4vw,64px)`. Use this instead of Bootstrap's `.container` for anything matching the established rhythm.
- Bootstrap 5 is loaded **grid-only** (`bootstrap-grid.min.css`) — use its `row`/`col-*` classes for internal grids where a CSS Grid isn't already defined, but all spacing/typography/color utility classes are custom (Bootstrap's are not loaded).
- `.section` — vertical rhythm unit: `padding: clamp(90px,12vw,150px) 0`. Modifiers: `.on-dark` (ink bg, white text), `.on-charcoal` (charcoal bg, white text). Every new full-width content block should be a `.section` variant, not a bespoke padding value.
- Section-specific grids (e.g. `.intro-grid`, `.model-grid`) are bespoke two-column CSS Grid layouts defined per-section — this is the expected pattern for new page-specific layouts too: define a named `-grid` class scoped to that section rather than reusing a generic grid everywhere.

---

## 5. Buttons

Three variants, all sharing base layout (`inline-flex`, `16px 30px` padding, `.82rem` uppercase bold label, `.08em` tracking, **square corners — no `border-radius` anywhere in this system**):

| Class | Look | Hover | Use |
|---|---|---|---|
| `.btn-volt` | Volt fill, ink text | Lift `-3px` + fill turns white | Primary commerce CTA (Add to Cart, Buy Now, Reserve, Checkout) |
| `.btn-ghost` | Transparent, white text, `rgba(255,255,255,.4)` border | Lift `-3px` + border turns solid white | Secondary CTA on dark/media sections |
| `.btn-line` | No box, ink text, bottom border only, icon shifts right on hover | Trailing icon (`bx-right-arrow-alt`) translates `+6px` | Tertiary / "read more" / in-context links |

**New button needs for commerce pages** (quantity steppers, icon-only wishlist/compare toggles, filter chips) should be added as new classes in this section of `css/base.css` (or a new `css/ecommerce.css` — see §10), following the same no-radius, uppercase-label, `--ease` transition convention. Do not introduce a rounded-corner button anywhere — it breaks the system.

---

## 6. Navigation

`.nav` — fixed, transparent over the hero, transitions to `.is-scrolled` (blurred ink background, tighter padding, hairline bottom border) once scrolled past 80px (driven by `ScrollTrigger` in `js/main.js`, not CSS alone — see §9).

- `.nav-logo` — wordmark + `.dot` (6px volt circle).
- `.nav-links` — underline-on-hover/active via `::after` width transition.
- `.nav-cta` — filled volt button, compact padding, used for the single highest-priority action (currently "Reserve"). **On commerce pages this slot should become cart/account iconography** — see §10 mega-menu note.
- `.nav-burger` / `.mobile-menu` — full-screen ink takeover below 860px, large link list, slides in via `transform: translateY()`.

**Extending for e-commerce:** the architecture doc calls for a mega-menu (`SHOP → Motorcycles / Accessories / Discover`) plus search, wishlist, and cart icons in `.nav-right`. Build this as new markup/CSS reusing `.nav`, `.nav-links`, `.nav-cta` as the base — do not fork the nav into a second unrelated component. A cart icon should carry a small volt badge (item count) — new class, e.g. `.nav-cart-count`, token-driven.

---

## 7. Imagery & media

- **Every raster image uses the `data-q` pattern**, resolved at runtime by the image module in `js/main.js`:
  ```html
  <img data-q="keyword phrase,width,height" alt="Descriptive alt text">
  ```
  The module maps the keyword to a verified `images.unsplash.com` CDN path and falls back to a generated placeholder SVG (dark gradient + volt center dot) if the keyword isn't in the map or the image fails to load. `loading="lazy"` is applied automatically (except elements explicitly marked eager, like the hero image).
- **New pages must extend the `MEDIA` object** in `js/main.js` with new keyword → Unsplash-ID entries for motorcycle catalog shots, accessory shots, dealer photos, avatars, etc., rather than hardcoding `<img src="...">` anywhere. This keeps every image swappable in one place before real campaign photography is dropped in.
- Media containers almost always pair an `object-fit:cover` image with a dark gradient overlay (`::after`) for text legibility — see `.hero-media::after`, `.cine-media::after`, `.final-media::after`, `.h-panel-media::after`. New full-bleed media sections should follow the same overlay gradient pattern (dark-to-transparent, direction matched to where the text sits).
- `[data-reveal-img] img` and `.hero-media img` start scaled to `1.12`–`1.18` and animate down to `1` on load/scroll (Ken-Burns-style settle) — see §9.

---

## 8. Core components inventory

Components already built in the reference page — reuse the markup +
class structure exactly when a new page needs the same pattern:

| Component | Classes | Notes |
|---|---|---|
| Hero (full-bleed, media + gradient) | `.hero`, `.hero-media`, `.hero-content`, `.hero-kicker`, `.hero-title`, `.hero-sub`, `.hero-actions`, `.hero-foot`, `.scroll-cue` | Title uses split-line markup (`.line > span`) for the load-in reveal animation |
| Stat row | `.stat-row`, `.stat-num`, `.stat-label`, `.counter` | Numbers count up on scroll via `js/main.js` |
| Tag list | `.model-tags` | Small dot-prefixed inline list — reusable for feature/spec bullet lists |
| Icon bullet list | `.battery-list` (pattern) | `<i class="bx ...">` + text, volt icon color |
| Pinned horizontal scroll | `.h-scroll-section`, `.h-scroll-pin`, `.h-track`, `.h-panel`, `.h-progress` | GSAP ScrollTrigger pin+scrub; desktop-only, becomes a native swipe strip ≤860px |
| Image carousel | `.carousel-section`, `.carousel-stage`, `.c-slide`, `.c-dot`, `.c-arrow` | Cross-fade + scale transition, dot + arrow + keyboard nav |
| Row list w/ hover reveal | `.tech-rows`, `.tech-row`, `.tech-idx`, `.tech-name`, `.tech-arrow` | Index/label/description/arrow grid; arrow slides right + row gets inset padding on hover — good base for an accordion/FAQ or spec-list pattern |
| Full-bleed CTA | `.final-cta`, `.final-media`, `.final-content`, `.final-actions` | Same shape as hero but shorter (92vh) |
| Footer | `.footer`, `.footer-top`, `.footer-brand`, `.footer-col`, `.footer-social`, `.newsletter-form`, `.footer-bottom`, `.footer-legal` | 4-column grid → 2 col (≤1024px) → 1 col (≤860px) |
| Round icon button | `.cine-btn` | Circular, bordered, ink/transparent bg — reusable for any icon-only control (e.g. wishlist heart on a product card, if not using the flat wishlist pattern) |

---

## 9. Motion system (`js/main.js`)

Built on **GSAP 3.12.5 + ScrollTrigger**, loaded from CDN. All motion
respects `prefers-reduced-motion` (both via a CSS `@media` block that
zeroes transitions/animations and JS reduced-motion checks before applying
scroll-scrubbed effects).

**Standing patterns — reuse these attributes/classes on new pages instead
of writing new animation code:**

| Attribute/pattern | Effect | How it's driven |
|---|---|---|
| `[data-reveal]` | Fade + rise (`opacity:0, translateY(36px)` → visible) on scroll into view (`top 88%`) | Generic `ScrollTrigger` loop in `js/main.js` — just add the attribute to any element |
| `[data-reveal-img] img` | Image scales from `1.18` → `1` on scroll into view | Same generic loop |
| `.counter[data-target="N"]` | Counts up from 0 to `N` once, on scroll into view | `ScrollTrigger` + tweened object, `once:true` |
| `.hero-title .line span` | Per-line slide-up reveal on page load | Page-load timeline (`gsap.timeline`), not scroll-triggered |
| Pinned/scrubbed sections (battery swap, horizontal features, trail map) | Section pins in viewport while a scrubbed timeline plays tied to scroll progress | Bespoke `ScrollTrigger.create({pin:true, scrub:1, ...})` blocks — pattern to copy for any new "scrollytelling" moment (e.g. a configurator build-up sequence), but don't overuse; reserve for one or two genuine hero moments per page |

**Standard easing:** `--ease` (`cubic-bezier(.16,.84,.44,1)`) for CSS
transitions; GSAP tweens default to `power2.out`/`power3.out` for
enter, `power3.inOut` for the anchor `scrollTo` shim. Stay within this
small easing vocabulary — don't introduce bounce/elastic eases, they read
as off-brand.

**Hover/interaction motion is always small and fast:** buttons lift
`-2px`/`-3px`; icons translate `6px`–`8px`; nothing rotates, bounces, or
overshoots. Keep new component hover states within this range.

**New pages should NOT re-declare GSAP/ScrollTrigger registration** —
`gsap.registerPlugin(ScrollTrigger)` happens once in `js/main.js`. Page-
specific scripts (`js/shop.js`, `js/product.js`, etc.) can assume GSAP is
already loaded and registered, and should load `js/main.js` first.

---

## 10. Extending the system for e-commerce pages

The reference page has zero commerce UI (no cards, filters, price tags,
cart). These are net-new components. To keep the system cohesive as they're
built:

1. **New shared stylesheet:** `css/ecommerce.css`, loaded after
   `css/base.css` on every catalog/commerce page. Contains: product card,
   filter sidebar, price/rating display, badges (sale/new/pre-order/out-of-
   stock), quantity stepper, modal, toast, mini-cart drawer, empty/loading/
   error states, pagination. Do not duplicate tokens/type/buttons/nav here
   — those stay in `base.css` and are inherited.
2. **New shared script:** `js/ecommerce.js` (filtering, sorting, search,
   wishlist state, compare tray, cart state) — loaded after `js/main.js`.
   Keep cart/wishlist state in a small shared module (e.g.
   `localStorage`-backed) so it persists across the pages that need it
   (shop → product → cart → checkout → account).
3. **Demo data:** `js/data.js`, loaded before `js/ecommerce.js`. Central
   catalog objects (motorcycles + accessories) so every page references
   the same source instead of inventing inconsistent numbers.
4. **New components must derive their visual language from §2–§8**, not
   invent a new palette, radius, or type scale. Concretely:
   - Product cards: square corners, `--line-light` hairline border or
     subtle shadow (new token if needed, e.g. `--shadow-card`), price in
     `.mono-num`, category/eyebrow styling reused from `.eyebrow`.
   - Filters: checkboxes/ranges styled minimal + monochrome, active state
     uses `--volt`/`--volt-dim` only (no second accent color).
   - Badges (Sale/New/Pre-order/Out of stock): flat rectangles, uppercase
     micro-label like `.eyebrow`, color-coded via new semantic tokens
     (§2), never rounded pills.
   - Modals/toasts: ink or white surface (no glassmorphism beyond the
     existing `.nav.is-scrolled` blur), enter/exit motion using `--ease`
     and the same fade+rise pattern as `[data-reveal]`.
5. **Responsive breakpoints already established:** `1024px`, `860px`,
   `560px` (see §11). New components should hook into these same
   breakpoints rather than introducing new ones, so the whole site's
   responsive behavior stays synchronized.

---

## 11. Responsive breakpoints

| Breakpoint | Key changes |
|---|---|
| `≤1024px` | Two-column section grids collapse to one column; footer grid 4→2 columns |
| `≤860px` | Desktop nav links hidden, burger menu shown; stat rows collapse to 1 column; tech rows lose the arrow column; horizontal scroll section becomes a native swipeable strip; "Built for enduro" connected photos stack vertically and lose their SVG connector line; footer grid 2→1 column |
| `≤560px` | Hero footer stacks vertically; carousel header left-aligns; map caption text shrinks |

Mobile-first is the working assumption for any *new* component even though
the current CSS is written desktop-first with `max-width` overrides — match
the existing override style (base styles unprefixed, `@media (max-width:…)`
blocks layered after) so the whole stylesheet stays one consistent
authoring pattern.

---

## 12. Accessibility conventions already in place

- `:focus-visible` gets a 2px volt outline, offset 3px — do not remove or
  override this on new interactive elements.
- All icon-only buttons carry `aria-label` (see nav burger, carousel
  arrows, cine controls). Continue this for new icon-only controls
  (wishlist heart, compare toggle, quantity +/-, filter close, etc.).
- `prefers-reduced-motion: reduce` disables all animation/transition
  duration globally and neutralizes the reveal/scale transforms — any new
  bespoke GSAP timeline must be gated the same way the existing ones are
  (check `window.matchMedia('(prefers-reduced-motion: reduce)').matches`
  before wiring scrub/pin effects).

---

## 13. Do / Don't summary

**Do**
- Reuse `.container-x`, `.section`, existing type/button classes on every
  new page before writing anything new.
- Extend `MEDIA` in `js/main.js` for new imagery instead of hardcoding URLs.
- Keep all new colors as tokens in `:root`.
- Keep corners square, motion small and `--ease`-timed, accent color
  (`--volt`) scarce.
- Gate new scroll-driven effects behind reduced-motion checks.

**Don't**
- Don't introduce `border-radius` on buttons, cards, or badges.
- Don't add a second accent color — everything "active/selected/primary"
  routes through volt.
- Don't load Bootstrap's full CSS bundle — grid-only, as already set up.
- Don't fork nav/footer markup per page — one shared header/footer,
  included/duplicated verbatim across pages until a templating step
  exists.
- Don't hardcode image URLs — always go through the `data-q` resolver.
