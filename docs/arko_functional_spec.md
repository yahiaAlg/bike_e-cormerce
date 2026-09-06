# Functional Specification

## ARKO — Electric Motorcycle E-Commerce Platform

### A Mini-Book Documenting the Storefront, Configurator, and Customer Account Experience

---

> **Document Type:** Functional Specification
> **Prepared By:** Digital Commerce & Product Consulting
> **Audience:** Product Owners, Backend/Platform Engineering, QA, Customer Support, Future Implementation Teams
> **Status:** Draft for Review — Reverse-Engineered from Existing Frontend Build
> **Version:** 1.0

---

## Table of Contents

1. [Introduction and Purpose](#1-introduction-and-purpose)
2. [Platform Overview](#2-platform-overview)
   - 2.1 The ARKO Brand and Catalog
   - 2.2 Current Implementation — A Frontend Prototype
   - 2.3 Site Map
3. [Core Domains of the Platform](#3-core-domains-of-the-platform)
   - 3.1 Catalog & Product Data
   - 3.2 Cart, Wishlist & Compare
   - 3.3 Configurator (Build-Your-Own)
   - 3.4 Checkout & Orders
   - 3.5 Account & Customer Profile
   - 3.6 Dealer Network, Test Rides & Service
   - 3.7 Financing & Insurance
   - 3.8 Support, Search & Content
4. [User Roles and Personas](#4-user-roles-and-personas)
5. [Global Navigation and Site-Wide Elements](#5-global-navigation-and-site-wide-elements)
6. [Main User Journeys and Operational Processes](#6-main-user-journeys-and-operational-processes)
7. [Cart, Pricing, and Promotions Logic](#7-cart-pricing-and-promotions-logic)
8. [Functional Data Model](#8-functional-data-model)
9. [Content and Informational Pages](#9-content-and-informational-pages)
10. [Notifications, Feedback, and Micro-Interactions](#10-notifications-feedback-and-micro-interactions)
11. [Consistency, Completeness, and Practicality Review](#11-consistency-completeness-and-practicality-review)
12. [Glossary of Key Terms](#12-glossary-of-key-terms)

---

## 1. Introduction and Purpose

### 1.1 Context

ARKO is presented as a direct-to-consumer electric motorcycle manufacturer: a European brand selling off-road and street-legal electric motorcycles (Enduro, Trail, Adventure, and Performance categories) alongside riding gear, batteries, chargers, and parts. The platform under specification is the customer-facing website through which prospective and existing riders research models, configure a build, purchase motorcycles and accessories, book test rides and service appointments, find dealers, apply conceptually for financing and insurance, and manage their post-purchase relationship with the brand (orders, garage, wishlist, preferences).

Unlike a typical functional specification written *before* a system exists, this document is written from a **working frontend build** — a full set of static pages with client-side logic — that already expresses, in detail, how the platform is meant to behave. The purpose of this document is to make that behavior explicit, complete, and unambiguous, so that it can be:

- Validated by product and design stakeholders against original intent.
- Handed to a backend/platform engineering team as the authoritative description of *what the system must do*, independent of the current client-side implementation.
- Used by QA to build test plans and acceptance criteria.
- Used as an onboarding document for anyone joining the project.

### 1.2 Purpose of This Document

This Functional Specification describes:

- The **catalog and commerce model**: what a motorcycle or accessory "is" in this system, and how it is presented, filtered, compared, and configured.
- The **customer journeys**: every path a visitor or registered customer can take, from first landing on the homepage to completing a purchase, tracking an order, or booking a service.
- The **rules governing carts, pricing, shipping, and promotions**.
- The **roles** the system currently distinguishes (or fails to distinguish) between different types of users.
- The **content and informational surfaces** (About, Stories, legal pages, support) that support the commerce experience.
- A **critical review** of the current implementation's consistency and completeness, flagging genuine gaps, bugs, and simplifications that a next implementation phase should resolve.

This document does **not** prescribe a technology stack, database schema, API design, or visual design system. It focuses on *what the platform does and should do functionally*, not on *how it is coded*. Where the current build's technical choices materially affect functional behavior (for example, the fact that the cart lives only in the visitor's browser), this is called out explicitly because it **is** a functional constraint today, not a technical implementation detail to be silently abstracted away.

### 1.3 Intended Audience

This specification is written for:

- **Product owners and brand stakeholders** who need a single source of truth for what the storefront does today.
- **Backend and platform engineers** who will build the real services (product catalog, cart, order management, authentication, payments, CRM) behind this frontend.
- **QA engineers** who need a functional baseline to write test cases against.
- **Customer support and operations staff** who need to understand what customers see and can do, in order to support them effectively.
- **Any future team** — including a future AI-assisted development session — picking up this project without having read the source code first.

### 1.4 Scope

This document covers the complete customer-facing experience as currently built, spanning 33 pages:

- Home, About, Stories (brand/content pages)
- Shop (motorcycle catalog), Product Detail, Accessories (catalog), Accessory Detail
- Configurator ("Build Your Own")
- Compare, Wishlist, Search
- Cart, Checkout, Order Success
- Account (profile, garage, orders, wishlist, preferences, addresses, support), Orders (list + detail + tracking)
- Test Ride booking, Service booking, Dealers directory
- Financing, Insurance
- Support (FAQ/Help Center), Contact
- Login, Register
- Terms, Privacy, 404

It covers front-of-house customer functionality only. It does not cover a merchant/admin back office, inventory or warehouse management, supplier or manufacturing systems, or internal CRM tooling — none of which exist in the current build and none of which are described here beyond noting, in Chapter 11, that they will be needed.

### 1.5 What This Document Is Not

This is not a UI style guide, not a component library reference, and not a technical architecture document. Visual design (colors, typography, spacing), animation behavior (scroll reveals, transitions), and markup structure are deliberately omitted except where they carry functional meaning (for example, a sticky purchase bar appearing only after scrolling is a functional behavior worth documenting; the exact CSS that produces it is not).

---

## 2. Platform Overview

### 2.1 The ARKO Brand and Catalog

ARKO's catalog, as currently modeled, consists of two product families:

**Motorcycles (11 models)** spanning four categories:

| Category | Models |
|---|---|
| Enduro | RVX, RVX Pro, Enduro R, Enduro Sport |
| Trail | Trail S, Trail L, Trail XR |
| Adventure | Adventure X, Adventure L |
| Performance | Urban E, Performance RS |

Prices range from €9,800 (Urban E) to €21,500 (Performance RS, a limited edition of 200 units). Each model carries a rich set of attributes: category, price (and optional strikethrough "old price" for sale items), star rating and review count, a merchandising badge (Best Seller, New, Sale, Limited), an availability state (in-stock or pre-order), a set of color options with hex swatches, a technical specification block (range, power, weight, top speed, battery capacity, charge time), a marketing description, a bulleted feature list, a set of configurable variant groups (Battery, Suspension, Wheels — each with priced upgrade options), a photo gallery, a list of recommended accessories, a list of related models, and an associated video trailer reference.

**Accessories (12 items)** spanning five categories: Riding Gear (jackets, helmets, goggles), Chargers, Batteries, Protection, and Parts. Accessories share most of the same attribute shape as motorcycles (price, rating, badge, availability, colors, specs, description, features, gallery) but additionally may carry a **Sizes** attribute (used by jackets and helmets) and do not carry variant groups, related-model lists, or accessory-of-accessory recommendations.

Supporting catalog data includes: a dealer directory (8 dealers across 7 European countries), a customer review set (keyed per product), a small set of demo orders (used to populate the account and order-tracking experience), and a categorized FAQ set (4 categories, ~15 questions) that powers both the Support page and answers surfaced elsewhere in the site.

### 2.2 Current Implementation — A Frontend Prototype

It is important to state plainly, for anyone using this document to plan further work: **the current build is a static, client-rendered frontend with no backend.** This has direct functional consequences that this specification treats as first-class facts about "what the system currently does," not as things to gloss over:

- All product, dealer, review, order, and FAQ data is **hardcoded** in a single JavaScript data file. There is no database and no content-management capability — adding, editing, or removing a product today means editing code.
- The **cart, wishlist, compare list, and recently-viewed list** are stored in the visitor's browser (`localStorage`) and are **not** synced to any account or server. Clearing browser data, switching browsers, or switching devices loses this state entirely, even for a "logged in" user.
- **Login, registration, checkout, test-ride booking, service booking, and contact forms all simulate success** — there is no real authentication, no real payment processing, and no email is actually sent. Every one of these flows ends in a client-side toast message and/or redirect that *looks* like a completed transaction but persists nothing beyond the current browser session's local storage.
- **Order history, dealer list, and reviews are static demo content** — placing an "order" through checkout does not add anything to the Orders page; the Orders page always shows the same four pre-written demo orders regardless of what a visitor purchases.

This specification describes the **intended functional behavior** implied by this build — i.e., what a production version of this platform should do — while flagging in Chapter 11 exactly where today's implementation is a simulation rather than the real thing.

### 2.3 Site Map

| Area | Pages |
|---|---|
| Brand & Content | Home (`index.html`), About (`about.html`), Stories (`stories.html`) |
| Motorcycle Catalog | Shop (`shop.html`), Product Detail (`product.html`) |
| Accessory Catalog | Accessories (`accessories.html`), Accessory Detail (`accessory-product.html`) |
| Build & Compare | Configurator (`configurator.html`), Compare (`compare.html`) |
| Personal Lists | Wishlist (`wishlist.html`), Search (`search.html`) |
| Commerce | Cart (`cart.html`), Checkout (`checkout.html`), Order Success (`order-success.html`) |
| Account | Account (`account.html`), Orders (`orders.html`) |
| Ownership Services | Test Ride (`test-ride.html`), Service (`service.html`), Dealers (`dealers.html`) |
| Money | Financing (`financing.html`), Insurance (`insurance.html`) |
| Help | Support (`support.html`), Contact (`contact.html`) |
| Auth | Login (`login.html`), Register (`register.html`) |
| Legal & Errors | Terms (`terms.html`), Privacy (`privacy.html`), 404 (`404.html`) |

Every page shares a common header (with a mega-menu under "Motorcycles"), footer, mobile navigation drawer, and toast-notification system, described in Chapter 5.

---

## 3. Core Domains of the Platform

### 3.1 Catalog & Product Data

This is the foundational domain: the master list of motorcycles and accessories the platform can sell, browse, filter, sort, and display. It underpins the Shop, Accessories, Product Detail, Accessory Detail, Search, Compare, Configurator, and Home pages, and is the data every other domain (cart, wishlist, compare, orders) references by product ID.

Two important functional traits of this domain today:

- **A single lookup surface.** Any part of the site can resolve a product by ID regardless of whether it is a motorcycle or an accessory (a "get me this product" operation that checks both lists). This matters because the cart, wishlist, and compare lists store bare product IDs and rely on this unified lookup to render themselves.
- **Cross-references between products.** Motorcycles list their own recommended accessories and related motorcycles by ID. This is what drives the "You May Also Need" and "Related Models" sections on detail pages, and the accessory shortlist inside the Configurator.

### 3.2 Cart, Wishlist & Compare

Three parallel, lightweight "collections" a visitor builds while browsing:

- **Cart** — items the visitor intends to buy, each with a quantity and a set of selected options (color, upgrades, size). Persists across pages within the same browser.
- **Wishlist** — a flat list of product IDs (motorcycles and/or accessories) a visitor wants to save for later, with no quantity or options attached.
- **Compare** — a list of up to 4 **motorcycle** IDs (accessories are not comparable) used to generate a side-by-side specification table.

A fourth, smaller collection — **Recently Viewed** — silently records up to the last 8 distinct products a visitor has opened a detail page for, without any user-facing management screen in the current build.

All four collections live in browser local storage under distinct keys and are visible, via small numeric badges, on the cart/wishlist/compare icons in the header from any page.

### 3.3 Configurator (Build-Your-Own)

A guided, six-step build flow: choose a base model, choose a color, choose a battery, choose a suspension tune, choose a wheel type, and optionally add accessories — with a running visual preview and an itemized, live-updating price summary at every step. The end result of a configuration is a single cart line item whose "options" bundle captures the chosen color and every priced upgrade, so the cart and checkout can treat a configured motorcycle exactly like any other cart item.

### 3.4 Checkout & Orders

A four-step linear checkout (Information → Delivery → Payment → Review) that walks a visitor from an existing cart to a placed order, followed by an order-confirmation page. A separate, parallel **Orders** domain (list + detail + shipment tracking) lets a customer review past purchases — in the current build, this is a fixed set of demo orders rather than a live history tied to what was actually purchased (see 2.2 and Chapter 11).

### 3.5 Account & Customer Profile

A tabbed account area covering: profile details, a "Garage" of owned motorcycles (VIN, warranty status, service-due indicator), recent orders, wishlist, marketing/notification preferences, saved addresses, and a shortcut panel into Support. Login and Registration are the entry points into this area.

### 3.6 Dealer Network, Test Rides & Service

Three closely related domains supporting the physical, in-person side of the business: a searchable dealer directory with a simplified map view, a test-ride booking form (model + dealer + date/time + rider details), and a service-appointment booking form (service tier + owned bike + dealer/date/time). Both booking flows end in a confirmation state but do not currently create any record the customer can later see in their Account.

### 3.7 Financing & Insurance

Two informational/marketing domains that let a prospective buyer understand payment-plan and protection-plan options before or during purchase. Financing includes a live monthly-payment calculator; Insurance presents three tiered protection plans with a feature-comparison layout. Neither is wired into the actual Checkout flow today — a customer cannot, for instance, actually attach a financing plan or an insurance tier to an order being placed (see Chapter 11).

### 3.8 Support, Search & Content

The remaining domains round out the experience: a categorized, searchable FAQ/Help Center with a contact form; a dedicated Contact page with department routing; a global product Search; and content pages (Home, About, Stories) that carry brand narrative, and don't have transactional logic beyond linking back into the catalog.

---

## 4. User Roles and Personas

The current build does not implement role-based access control — every visitor, logged in or not, sees the same pages and the same controls. Functionally, however, the experience is designed around three distinct personas, and a production implementation is expected to enforce the boundaries between them properly.

### 4.1 Guest Visitor

**Who they are:** Anyone browsing the site without signing in. This is the default and only state the current build actually enforces.

**What they can do:**
- Browse, filter, sort, and search the full catalog.
- View product details, specifications, and reviews.
- Use the Configurator to build a motorcycle.
- Add items to Cart, Wishlist, and Compare (all stored locally in their browser).
- Complete Checkout and reach an Order Success page.
- Book a test ride or a service appointment.
- Browse dealers, financing plans, and insurance plans.
- Use Support/FAQ and Contact.
- Attempt to reach the Account or Orders pages — in the current build these render regardless of authentication state, which is a gap flagged in Chapter 11.

**What they should not be able to do (intended, not currently enforced):** View another person's account, order history, garage, or saved addresses; check out with a saved payment method or saved address (since none exists for a guest).

### 4.2 Registered Customer

**Who they are:** A visitor who has created an account (Register) or signed in (Login). In production, this identity should persist the customer's cart, wishlist, orders, garage, addresses, and preferences server-side, replacing the guest's browser-local storage.

**What they can additionally do:**
- View and edit their Profile (name, email, phone, date of birth).
- View their **Garage** — motorcycles they own, with VIN, warranty status, and service-due indicators.
- View real Order history and shipment tracking tied to purchases they actually made.
- Manage saved Addresses and a default shipping address, used to prefill Checkout.
- Manage notification/marketing Preferences and interface Language.
- Have their Wishlist and Cart persist across devices, not just the current browser.

### 4.3 Dealer / Service Staff (Implied, Not Built)

**Who they are:** Staff at one of ARKO's physical dealer locations who would need to see and manage test-ride bookings and service appointments made against their specific dealer.

**Current state:** No such interface exists. Test-ride and service bookings vanish into a client-side toast message; no dealer-facing system receives them. This role is named here because the *customer-facing* booking forms (6.12, 6.13) clearly imply a receiving system on the other end, and any real implementation needs one even though it is out of scope for this document to specify in detail.

### 4.4 Role Summary Table

| Capability | Guest | Registered Customer | Dealer Staff (not built) |
|---|---|---|---|
| Browse catalog, search, compare | ✅ | ✅ | — |
| Use Configurator | ✅ | ✅ | — |
| Cart / Wishlist (device-local) | ✅ | ✅ (should be account-linked) | — |
| Checkout / place order | ✅ | ✅ | — |
| View own order history | ❌ (no identity to attach it to) | ✅ | — |
| Manage Garage, Addresses, Preferences | ❌ | ✅ | — |
| Book test ride / service | ✅ (submits booking) | ✅ (submits booking) | Would receive & manage bookings |
| View/manage dealer bookings | ❌ | ❌ | Intended, not built |

---

## 5. Global Navigation and Site-Wide Elements

Every page in the platform shares the same header, footer, mobile menu, and feedback mechanisms. These are described once here rather than repeated in every journey below.

### 5.1 Header and Mega-Menu

The header is present on every page and includes:

- **Logo**, linking Home.
- **Home** link.
- **Motorcycles** — a hover/click-triggered mega-menu with three columns:
  - *By Category*: Enduro, Trail, Adventure, Performance, and a "View All" link — each pre-filtering the Shop page to that category via a URL parameter.
  - *Featured*: direct links to the RVX, RVX Pro, and Performance RS product pages, plus a link into the Configurator.
  - *Tools*: Compare Models, Book a Test Ride, Find a Dealer.
- **Accessories**, **Configurator**, **Dealers**, **Support** — top-level links.
- **Right-hand icon cluster**: Search, Account, Wishlist (with count badge), Compare (with count badge), Cart (with count badge), and a prominent "Build" call-to-action button linking to the Configurator.
- The header **compresses its padding** once the visitor scrolls more than 60px down the page, keeping it usable without taking excessive vertical space.

### 5.2 Mobile Navigation

Below a responsive breakpoint, the icon cluster and mega-menu collapse behind a hamburger button. Tapping it opens a full-screen (or drawer) menu listing every primary section (Home, Motorcycles, Accessories, Configurator, Financing, Compare, Test Ride, Dealers, About, Stories, Support, Contact, Account) plus two shortcut buttons at the bottom (Cart, Wishlist). The hamburger icon animates into an "X" while the menu is open.

### 5.3 Footer

Present on every page, organized into:

- **Brand column**: logo, one-line brand statement, social links (Instagram, YouTube, Facebook, X).
- **Motorcycles column**: category links + Configurator.
- **Shop column**: Accessories (overall + by category: Riding Gear, Chargers, Parts), Financing, Insurance.
- **Company column**: About, Stories, Find a Dealer, Contact, Book a Service.
- **Newsletter column**: an email-capture form that, on submit, shows a "Subscribed!" confirmation toast — no actual subscription is persisted anywhere in the current build.
- **Bottom bar**: copyright line, Privacy, Terms, Contact, and Sign In links.

### 5.4 Toast Notifications

A shared, lightweight notification mechanism used throughout the site to confirm actions without navigating away: "Added to cart", "Added to wishlist", "Removed from wishlist", "Compare list is full (max 4)", "Item removed", "Promo applied: 10% off", "Invalid promo code", "Subscribed!", "Message sent! We'll respond within 24 hours.", and similar. Toasts appear (typically bottom or top of viewport, stacking if more than one is active), auto-dismiss after roughly 3 seconds, and carry one of three visual treatments — default, success, or error — chosen by the triggering action.

**Functional rule:** any state-changing action a visitor takes anywhere on the site (adding/removing from cart, wishlist, or compare; applying a promo code; submitting a form) must produce a toast confirming what happened. Silent state changes are treated as a defect.

### 5.5 Quick View Modal

From any product grid (Shop, Accessories, Search results, Related/You-May-Also-Need sections), an "eye" icon on a product card opens a **Quick View** modal without leaving the current page: a two-column overlay showing the product image, category, name, rating, description, price, three key spec chips (range/power/weight when applicable), and two actions — Add to Cart (closes the modal) and Full Details (navigates to the full product page). The modal closes via an explicit close button or by clicking outside its bounds.

### 5.6 Product Card (Shared Component Behavior)

Because it recurs across Shop, Accessories, Search, Wishlist, Related Products, and Home, the product card's interactive behavior is worth specifying once:

- Clicking the card body (outside its buttons) navigates to the product's detail page.
- A hover/persistent action cluster on the image offers: toggle Wishlist (heart), toggle Compare (compare icon), and Quick View (eye) — each of which stops the click from also navigating to the detail page.
- The card displays: merchandising badge (if any), category, name, star rating with review count, one or two key specs, a color-swatch row (if the product has colors), an availability tag (In Stock / Pre-Order / Out of Stock), current price with a struck-through original price when on sale, an "Add to Cart" button, and a "View" link.
- Wishlist and Compare toggle buttons reflect active/inactive state immediately (no page reload) and independently of whether the visitor is logged in.

---

## 6. Main User Journeys and Operational Processes

### 6.1 Browsing and Filtering the Motorcycle Catalog

**Entry points:** "Motorcycles" nav link, mega-menu category links, homepage "Choose Your Weapon" and category tiles, footer links.

**Process:**
1. The Shop page loads the full 11-model catalog and renders it as a grid of product cards.
2. A filter sidebar lets the visitor narrow the results by:
   - **Category** (checkboxes: Enduro, Trail, Adventure, Performance), each showing a live count of matching models.
   - **Price Range** (a single slider capping the maximum price, from €9,000 to €22,000).
   - **Minimum Range** (radio buttons: 50+ km, 100+ km, 150+ km).
   - **Availability** (checkboxes: In Stock, Pre-Order — both checked by default).
   - **Color** (clickable swatches built dynamically from every color used across the catalog).
3. A toolbar above the grid shows a live result count, a sort selector (Featured, Price Low–High, Price High–Low, Highest Rated, Longest Range), and a grid/list view toggle.
4. Every filter change re-renders the grid immediately (no "Apply" button) and updates the result count.
5. If a category link elsewhere on the site (mega-menu, footer, homepage tile) points to the Shop page with a category parameter in the URL, that category is pre-checked on load.
6. If no motorcycle matches the current filter combination, an empty state replaces the grid with a message and a "Clear Filters" action.
7. "Clear All Filters" resets every control (category, price, range, availability, colors, sort) back to its default state and re-renders the full, unfiltered catalog.

**Business rule:** filters are combined with AND logic across filter groups (category AND price AND range AND availability AND color) and OR logic within a group (any checked category, any clicked color).

### 6.2 Browsing and Filtering the Accessory Catalog

Functionally a smaller mirror of 6.1: a grid of the 12 accessories, filterable by Category (Riding Gear, Chargers, Batteries, Protection, Parts, each with a live count) and Price Range (€50–€2,000 slider), with an In Stock toggle, a sort selector (Featured, Price Low–High, Price High–Low, Highest Rated), and the same "Clear All Filters" and empty-state behavior as the motorcycle catalog. Accessories do not offer a Minimum Range or Color filter, since range is not a meaningful attribute for most accessories and color is a less decisive purchase factor here.

### 6.3 Viewing a Product Detail Page (Motorcycle or Accessory)

**Entry points:** any product card's "View" link or card body, Quick View's "Full Details," search results, related-product sections, direct links from the mega-menu.

**Process:**
1. The page reads the product ID from the URL and looks it up across both motorcycles and accessories.
2. Viewing the page silently records the product into the visitor's Recently Viewed list (capped at 8, most recent first, no duplicates).
3. The page renders: a main gallery image with a strip of clickable thumbnails (clicking a thumbnail swaps the main image, no page reload); category, name, star rating with review count, description, price (with struck-through old price if on sale); a row of spec "chips" for the most important attributes; a color-swatch selector (if applicable) that updates a visible color-name label; for accessories with sizes, a size selector; for motorcycles, a set of variant groups (Battery, Suspension, Wheels), each rendered as a row of selectable option pills showing any price add-on; a quantity stepper (+/−, minimum 1); and three primary actions — **Add to Cart**, **Buy Now**, and **Save** (wishlist toggle).
4. Below the main panel, a tabbed section presents **Specifications** (a full key/value table of every spec attribute), **Features** (the bulleted feature list with checkmark icons), **Reviews** (see 6.4), and — for motorcycles only — **Shipping & Returns** (static delivery, returns, and warranty policy text).
5. A **Related Models** (motorcycles) or **You May Also Need** (accessories) grid follows, sourced from the product's own `related` list, falling back to a generic set of other motorcycles if none is defined.
6. Once the visitor scrolls past roughly 600px, a **sticky purchase bar** appears at the bottom of the viewport, repeating the product name, availability, price, and Add to Cart / Buy Now actions so a purchase decision is always one tap away regardless of scroll position.
7. **Add to Cart** adds the current quantity, selected color, and every selected variant's price delta to the Cart and shows a confirmation toast, without leaving the page.
8. **Buy Now** performs the same add-to-cart action and then immediately navigates to Checkout.
9. **Save** toggles the product's wishlist membership and confirms via toast; it does not change the button's own visual state in the current build (see Chapter 11).

### 6.4 Reading and Understanding Reviews

Within the Reviews tab of a product detail page:

1. An average-rating summary shows the mean star rating (computed from actual review records where available, falling back to the product's own headline rating if there are none) alongside the total review count.
2. A breakdown bar chart shows, for each star value from 5 down to 1, what share of reviews fall into that bucket.
3. Below the summary, every individual review is listed with the reviewer's initial (as an avatar), name, date, star rating, a title, and a body paragraph.
4. A "Write a Review" button is present but, in the current build, only confirms via toast that review submission is a demo feature — no review is actually recorded or displayed.

### 6.5 Building a Custom Motorcycle (Configurator)

**Entry points:** "Build" CTA in the header, "Build Your Own" mega-menu link, homepage CTAs, or a deep link that pre-selects a specific base model (used by "Build Your Own" links elsewhere in the site).

**Process — a six-step guided build, with a live summary panel that updates after every choice:**

1. **Choose Your Model** — a clickable list of all 11 motorcycles with category, key specs, and price. Selecting a model resets and repopulates every subsequent step for that model's specific options, and updates the build preview image.
2. **Choose Your Color** — every color available for the selected model, defaulting to the first.
3. **Battery** — the model's Battery variant options (e.g., Standard vs. Extended vs. Dual-Swap), each showing "Included" or a "+€X" price delta, defaulting to the first (base) option.
4. **Suspension** — the model's Suspension variant options, same pattern.
5. **Wheels** — the model's Wheel variant options, same pattern.
6. **Accessories & Packages** — a multi-select list of the accessories recommended for the selected model specifically (not the full accessory catalog); each can be toggled on/off independently and its price is additive.

Throughout, the **summary panel** lists every selected line item (base model, color, battery, suspension, wheels, each selected accessory) with its price contribution, and a running total. Two final actions:

- **Add to Cart** — bundles every priced selection (excluding the base color, which is free) into a single cart line item's option set and confirms via toast. Selecting a model is mandatory; attempting to add to cart before choosing one shows an error toast and takes no action.
- **Buy Now** — performs the same bundling, then navigates to Checkout.

**Business rule:** a configured build is represented in the cart identically to a plain product purchase with variant selections made on the product page — the cart and checkout have no awareness that an item came from the Configurator versus the product page.

### 6.6 Comparing Models Side by Side

**Entry points:** "Compare" nav/mega-menu link, the compare icon in the header (with its count badge), the compare toggle on any motorcycle product card, and a "Compare" action from the Wishlist.

**Process:**
1. The Compare page shows four slots. Filled slots show the model's image, name, price, and a "Remove" action; empty slots invite the visitor to add a model.
2. An "Add Model to Compare" button opens a dropdown of every motorcycle **not already** in the comparison, each showing its name and price; selecting one adds it (unless the list is already at its 4-model cap, in which case an error toast explains the limit).
3. Once at least one model is selected, a comparison table renders one column per selected model and one row per attribute: Category, Price, Range, Power, Weight, Top Speed, Battery, Charge Time, Rating, Reviews, Availability, and Colors (rendered as swatches).
4. **Any row where the values differ across the selected models is visually highlighted**, drawing the eye to the meaningful differentiators rather than making the visitor scan every cell.
5. Each column header repeats the model's image, name, price, and a "View" link to its full product page; the bottom row of the table offers an "Add to Cart" button per column.
6. "Clear All" empties every slot and returns the page to its empty state.

**Business rule:** Compare is scoped to motorcycles only; accessories cannot be added to a comparison, and the compare toggle does not appear on accessory product cards or detail pages in the same way it does for motorcycles.

### 6.7 Managing the Wishlist

**Entry points:** wishlist icon in the header (with count badge), the heart toggle on any product card or product detail page, mega-menu/footer/mobile-menu links.

**Process:**
1. The Wishlist page lists every saved product (motorcycles and accessories together) as cards showing image, category, name, rating, price, and three actions: **Move to Cart**, **Compare** (motorcycles only, functionally), and **Remove**.
2. **Move to Cart** adds one unit of the item to the cart with no options selected, removes it from the wishlist, and confirms via toast — a one-step conversion from "saved for later" to "ready to buy."
3. A "Move All to Cart" bulk action performs the same conversion for every item on the list in one step.
4. Removing an item updates the count badge in the header immediately.
5. An empty wishlist shows a message and a "Browse Motorcycles" call to action.

**Business rule:** the wishlist stores bare product IDs — it does not remember a previously chosen color, size, or variant configuration. Moving a configurable item to the cart from the wishlist always uses default options; the visitor must revisit the product page or Configurator to customize it further.

### 6.8 Adding to Cart and Managing the Cart

**Entry points:** Add to Cart from a product card, product detail page, accessory detail page, Configurator, or Quick View modal; the cart icon in the header (with count badge).

**Adding an item:**
1. Every add-to-cart action supplies a product ID, a quantity, and an options object (color, size, and/or a list of priced upgrades).
2. The cart identifies a line item by the **combination** of product ID and its exact options — adding the same product with the same options increases the existing line's quantity; adding it with a *different* color, size, or upgrade set creates a **new, separate line item**, even though both lines point at the same underlying product.

**Viewing and editing the cart (Cart page):**
1. Each line item shows the product image, name, category, a human-readable summary of its selected options (color, and each upgrade with its price delta), a quantity stepper (+/−, floor of 1 — decrementing at 1 has no effect), a remove (trash) action, and the line's total price (unit price, including option deltas, multiplied by quantity).
2. An order summary panel shows: item count, Subtotal (sum of every line total), Shipping (see 7.2), a promo-code input and Apply button, a Discount line (hidden until a valid code is applied), and a grand Total.
3. "Continue Shopping" returns to the Shop page; "Clear Cart" empties the cart entirely (no confirmation dialog in the current build).
4. "Proceed to Checkout" navigates into the Checkout flow.
5. An empty cart shows a message and a "Browse Motorcycles" call to action instead of the summary layout.
6. Payment-brand icons (Visa, Mastercard, PayPal, generic card) and a "Secure checkout" lock indicator are shown for reassurance, without implying any specific payment integration is wired up yet.

### 6.9 Checkout Process

**Entry point:** "Proceed to Checkout" from Cart, "Buy Now" from a product page or Configurator, or a direct link — always operating on whatever is currently in the visitor's cart.

**A four-step linear flow, tracked by a stepper at the top of the page (each completed step is marked distinctly from the current and upcoming steps):**

1. **Information** — first name, last name, email, phone (all required). "Continue to Delivery" advances to step 2.
2. **Delivery** — a delivery address form (street, city, postal code, country selector limited to the seven countries ARKO currently ships to), plus a choice of delivery method: **Standard Delivery** (5–7 business days, free) or **Express Delivery** (2–3 business days, €49) — exactly one selectable at a time. "Back" returns to step 1; "Continue to Payment" advances to step 3.
3. **Payment** — a choice of payment method: **Credit/Debit Card** (with card number, expiry, and CVC fields shown inline), **PayPal**, or **Bank Transfer (SEPA)** — exactly one selectable at a time, plus an optional "save payment method for future orders" checkbox (checked by default). "Back" returns to step 2; "Review Order" advances to step 4.
4. **Review** — an itemized list of every cart line (image, name, quantity, line price) with a grand total, and a read-only summary of the delivery address. "Back" returns to step 3; "Place Order" finalizes the purchase.

**Throughout all four steps**, a persistent order-summary sidebar recalculates and displays: each cart line with its quantity and price, a Subtotal, Shipping, VAT (computed at 19%), and a Total — visible regardless of which step the visitor is on, so the running cost is never hidden.

**Placing the order:**
1. Clicking "Place Order" clears the cart and navigates to the Order Success page.
2. **Business rule (intended):** placing an order should create a persistent order record — visible afterward in the visitor's Order history if they are signed in, or retrievable via an order-confirmation email/reference if they are a guest — carrying the exact items, options, quantities, prices, chosen delivery method, payment method, and delivery address captured during the four steps above.

**Navigating away or reloading mid-checkout:** the current build does not persist in-progress checkout form data; leaving the page or refreshing loses anything typed so far, and returns the visitor to step 1 on their next visit to Checkout. A production implementation should decide deliberately whether to persist partial checkout state (e.g., in a session) rather than silently discarding it.

### 6.10 Order Confirmation

Immediately after placing an order, the visitor lands on a celebratory **Order Success** page: a success icon, a confirmation heading, an order number, a short reassurance message, and a set of "what happens next" steps (e.g., confirmation email, manufacturing/preparation, shipping, delivery) presented as a simple sequence. From here the visitor can return home or continue browsing. The order number shown here is what the visitor should be able to reference later when tracking their order or contacting support.

### 6.11 Viewing Order History and Tracking a Shipment

**Entry points:** "Orders" link from the mobile menu or Account sidebar, "View All Orders" from the Account Orders section.

**Order list:**
1. Orders are listed newest-relevant-first, each showing order ID, placement date, a status badge (Processing, Shipped, Delivered), a compact list of items with quantities, and action buttons that depend on status: **Details** always; **Track** for Processing/Shipped orders; **Reorder** for Delivered orders (currently a demo-only stub via toast).
2. A filter control lets the visitor narrow the list to a specific status, or view all orders.
3. Selecting "Details" replaces the list with a full breakdown: every item with image, quantity, and price; the order total; and the delivery address used for that order.
4. Selecting "Track" replaces the list with a **shipment timeline**: an ordered sequence of stages (which vary by order — e.g., Order Placed → Manufacturing → Quality Check → Shipped → Out for Delivery → Delivered), each marked done or pending, with the carrier name and tracking number shown at the top, and the order's item list repeated below the timeline for context.
5. "Back to Orders" from either detail view returns to the filtered list.

**Business rule (intended):** an order's status and tracking stages should update automatically as fulfillment progresses (ideally reflecting real carrier data), and a customer should only ever see their own orders. In the current build, the order set is fixed demo data unrelated to anything actually purchased through Checkout — this is flagged as a critical gap in Chapter 11.

### 6.12 Booking a Test Ride

**Entry points:** "Book a Test Ride" mega-menu/footer/mobile-menu links, "Test Ride" CTAs on dealer cards, homepage "Ride Before You Decide" section.

**Process:**
1. A single-page form collects: motorcycle model (a select of seven in-stock/pre-order highlights, not necessarily the full 11-model catalog), dealer (a select of all 8 dealers), preferred date (a date picker whose minimum selectable date is tomorrow — same-day bookings are not offered), preferred time (a select of fixed half-day time slots), first name, last name, email, phone, motorcycle licence number, and a waiver-acknowledgment checkbox.
2. A sidebar explains what to expect during the test ride, why to consider riding electric, and how to get further help.
3. Submitting with any required field empty shows an error toast and does not proceed.
4. Submitting a complete form shows a success toast naming the chosen model and dealer, then replaces the form with a confirmation panel restating the model, date, time, and dealer, plus a note that a confirmation email has been sent, and a link back Home.

**Business rule (intended):** a submitted booking should be received by the selected dealer (see 4.3) and should check real appointment availability for that dealer, date, and time rather than accepting any combination unconditionally as the current build does.

### 6.13 Booking a Service Appointment

**Entry point:** "Book a Service" footer link, "Book Service" action from a Garage entry in Account.

**Process:**
1. The visitor selects a **Service Type** from three tiers, each shown as a selectable card with an icon, short description, and fixed price: **Routine Check** (€89 — brakes, tyres, software), **Battery Service** (€129 — health check and cell balancing), and **Major Service** (€249 — full inspection and tune).
2. A form then collects: their motorcycle (a select of all 11 models), preferred date (minimum tomorrow, mirroring the test-ride rule), and presumably a dealer/time selection consistent with the test-ride pattern.
3. Submitting shows a success toast and confirmation ("Service booked! Confirmation sent to your email.") and replaces the form with a confirmation panel and a link to the Account page.

**Business rule (intended):** as with test rides, a real implementation must route this booking to the chosen dealer's actual service schedule, and should ideally pre-select the correct model automatically for a signed-in customer who books from their own Garage entry.

### 6.14 Finding a Dealer

**Entry points:** "Dealers" nav link, "Find a Dealer" footer/mega-menu links, dealer/service booking flows.

**Process:**
1. The page lists all 8 dealers as cards: name, full address, phone, and opening hours, plus two actions per card — **Test Ride** (links to the Test Ride form) and **Directions** (opens the address in Google Maps in a new tab).
2. A search box filters the dealer list live by matching the visitor's input against dealer name, city, or country (case-insensitive, substring match).
3. A simplified map view plots each (filtered) dealer as a pin, positioned using a linear projection of its latitude/longitude onto the visible map area — sufficient for a rough "where in Europe" overview, not a precise interactive map with zoom/pan.
4. Clicking a dealer card highlights it (visually distinguishing the selected dealer) without navigating away.
5. If no dealer matches the search term, an empty state explains that nothing matched and invites a different search term.

**Business rule (intended):** the dealer directory should be backed by a real, maintainable list (dealers open, close, and change hours) and the map should support standard interactive map behaviors (zoom, pan, clustering) once real geographic tooling is integrated.

### 6.15 Exploring Financing

**Entry points:** "Financing" footer/mobile-menu link, FAQ answers referencing financing, Checkout's implied but not-yet-wired financing option (see Chapter 11).

**Process:**
1. Three financing plans are presented side by side — **12, 24, and 36 months**, all at **0% APR** — each listing its benefits (no interest, no early-repayment fee, instant approval; the 24-month plan additionally offers a €0-down option) and an "Apply Now" action (currently a demo-only toast). The 24-month plan is visually marked as the most popular option.
2. A four-step "How It Works" explainer walks through: choosing a bike, applying at checkout, signing digitally, and paying monthly.
3. A **Monthly Payment Calculator** lets the visitor pick a specific motorcycle model (by price) from a dropdown, enter a down payment amount, and choose a term length (12/24/36 months); it then computes and displays the vehicle price, down payment, amount financed, and resulting monthly payment (amount financed ÷ term, rounded), recalculating live as any input changes. A down payment greater than the vehicle price is capped at the vehicle price.
4. A financing-specific FAQ accordion answers eligibility, down-payment, and early-repayment questions.

**Business rule (intended):** financing should be selectable and applied during actual Checkout (see 7.1 and Chapter 11), with a real credit-decision integration behind "Apply Now," rather than existing only as a standalone educational/marketing page.

### 6.16 Exploring Insurance

**Entry point:** "Insurance" footer link, FAQ answers referencing insurance.

**Process:**
1. Four feature highlights introduce the value proposition: battery cover, charging-damage cover, instant digital claims, and EU-wide coverage.
2. Three tiered plans are compared: **Essential** (€19/month — liability, theft, fire/natural disaster only), **Comprehensive** (€39/month, marked as the featured/popular option — adds battery degradation cover and accidental damage with a €250 excess), and **Premium** (€59/month — adds €0-excess accidental damage and up to €1,500 of helmet/gear cover). Each tier explicitly shows which features are included (checkmark) versus excluded (cross) relative to the tier above it.
3. Each plan has a "Get a Quote" action (currently a demo-only toast).
4. A closing banner highlights that insurance can be bundled at Checkout with a 3-months-free incentive, and links back to the Shop.

**Business rule (intended):** as with financing, insurance should be selectable and bundled during actual Checkout, with a real underwriting/quoting integration behind "Get a Quote" — today it exists purely as an educational/marketing surface.

### 6.17 Managing the Account

**Entry point:** "Account" icon in the header, Account link in the mobile menu.

The Account page is a single-page, tab-switching experience (no full page reloads between tabs) with a sidebar of seven sections:

1. **Profile** — a form pre-filled with the customer's first/last name, email, phone, and date of birth; "Save Changes" confirms via toast.
2. **My Garage** — a card per owned motorcycle showing its image, name, a generated VIN, a "Warranty Active" chip, and a "Service Due" chip with a distance threshold; each card offers "View Details" (product page) and "Book Service" actions. An "Add a Motorcycle" action links to the Shop (intended to eventually register a purchased or externally-owned bike to the account).
3. **Orders** — the customer's three most recent orders (mirroring the Orders page's order-card layout), with a "View All Orders" link into the full Orders page.
4. **Wishlist** — every wishlisted product as a compact row (image, name, price, "View" link); shows a "browse motorcycles" prompt if empty.
5. **Preferences** — three notification toggles (product updates/news — on by default, order notifications — on by default, promotional offers — off by default) and an interface language selector (English, Deutsch, Français, Italiano, Español); "Save Preferences" confirms via toast.
6. **Addresses** — a list of saved addresses, each marked with a "Default" chip where applicable, with Edit/Remove actions (currently demo-only toasts) and an "Add New Address" action (also demo-only).
7. **Support** — quick links into the Help Center, dealer finder, and test-ride booking, for a customer who lands in their account looking for help.

**Business rule (intended):** every value shown here (profile fields, garage bikes, orders, wishlist, addresses, preferences) should be the real, persisted data belonging to the signed-in customer. In the current build all of it — including the profile fields themselves — is hardcoded demo content ("John Doe") regardless of who is "logged in," which is addressed in Chapter 11.

### 6.18 Signing In and Registering

**Login:**
1. A form collects email and password, with a show/hide toggle on the password field, a "Remember me" option, and a "Forgot password?" link.
2. Submitting shows a "Signing in..." toast and, after a short delay, redirects to the Account page — there is no real credential check; any input succeeds.

**Register:**
1. A form collects the fields needed to create an account (name, email, password, confirm password, and presumably a terms-acceptance checkbox), with the same password show/hide affordance.
2. As the visitor types a password, a **strength meter** evaluates it against four criteria (length ≥ 8, contains an uppercase letter, contains a digit, contains a special character) and reflects the score as a colored bar and a label ranging from "Too weak" through "Strong."
3. Submitting checks that the password and confirmation match, showing an error toast and halting if they don't; otherwise it shows a "Account created! Welcome to ARKO." success toast and redirects to the Account page after a short delay.

**Business rule (intended):** both flows must be backed by real authentication (credential verification, password hashing, session/token issuance, uniqueness checks on registration) before any of the account-linked domains in this document (persisted cart, real order history, saved addresses) can function as intended. Today, both flows are pure UI simulations.

### 6.19 Searching the Site

**Entry points:** the search icon in the header, direct navigation to the Search page with a query parameter.

**Process:**
1. If the page loads with a query already present (e.g., from a link elsewhere), that query is applied immediately and results render on load; otherwise, a set of "quick link" suggestions is shown in place of results.
2. As the visitor types into the search field (or presses Enter), matching is performed by substring search, case-insensitive, against each product's name, category, and description, across **both** motorcycles and accessories.
3. A filter control (All / Motorcycles / Accessories) narrows which product type's matches are included.
4. A live result count is shown, and matches render using the same shared product-card component used everywhere else in the site (see 5.6) — meaning search results are immediately actionable (add to cart, wishlist, compare, quick view) without opening each product individually.
5. An empty query clears results and shows the quick-link suggestions again; a query with no matches shows an empty state.

**Business rule (intended):** search should scale to a real, indexed product catalog (with ranking, typo-tolerance, and possibly synonym handling) rather than an in-memory substring scan — acceptable for ~23 products today, not for a growing catalog.

### 6.20 Getting Support

**Support / Help Center:**
1. A search box at the top filters FAQ content live.
2. Below it, category cards (Orders & Delivery, Battery & Charging, Warranty & Service, Test Rides & Purchasing) act as jump links, scrolling the page to that category's questions.
3. The FAQ itself is an accordion — clicking a question expands its answer in place, and multiple questions can be open simultaneously.
4. Searching filters visible categories and questions to those whose question text, answer text, or category name matches (case-insensitive substring); if nothing matches, an empty state is shown.
5. A contact form at the bottom of the page allows a visitor whose question wasn't answered to reach out directly, confirming submission via toast ("Message sent! We'll respond within 24 hours.") and clearing the form — no message is actually transmitted or stored in the current build.

**Contact page:**
1. A separate, dedicated page for reaching ARKO offers department routing (a set of selectable tabs — e.g., Sales, Support, Press, Partnerships — exactly one active at a time) alongside a contact form (name, email, subject, message).
2. Submitting behaves identically to the Support page's contact form: a confirmation toast, form reset, and no real message delivery today.

**Business rule (intended):** both contact touchpoints should route their submissions to a real ticketing/CRM system, ideally tagged with the selected department, so a human can follow up within the promised 24-hour window.

---

## 7. Cart, Pricing, and Promotions Logic

This chapter makes explicit the arithmetic and business rules governing what a customer is actually charged, since these rules are currently expressed only as scattered lines of client-side code across the Cart and Checkout pages.

### 7.1 Price Composition of a Line Item

A cart line item's **unit price** is the sum of:

- The product's base price.
- The price of every selected **upgrade** in its options (variant selections from the product page or Configurator — e.g., an extended battery, a performance suspension tune).

A line's **total price** is its unit price multiplied by its quantity. A product's **color** and, for accessories, **size** selections do not themselves add to price in the current catalog — only entries explicitly flagged as priced upgrades do.

The **cart subtotal** is the sum of every line's total price.

### 7.2 Shipping Rules

A single, simple threshold rule applies on both the Cart summary and the Checkout summary: **orders with a subtotal over €1,000 ship free; orders at or under €1,000 incur a flat €49 shipping charge.** This is distinct from the Express Delivery option offered during Checkout step 2 (also €49, but for faster transit rather than as a subtotal-based shipping fee) — the current build's Cart-page shipping figure does not change based on which delivery method the visitor later selects in Checkout, since the delivery-method choice happens after the Cart page's totals are already shown. A production implementation should reconcile these two €49 figures into one coherent shipping model (e.g., free/standard/express, independent of order value; or value-based free shipping that also lets a customer *upgrade* to paid express) rather than having two similarly priced but functionally separate shipping charges.

### 7.3 Promo Codes

The Cart page supports a single, hardcoded promotional code: **`ARKO10`**, which applies a flat **10% discount on the subtotal** (rounded to the nearest whole currency unit) and updates the discount line and grand total in place. Any other non-empty input is rejected with an "Invalid promo code" error toast; leaving the field empty and clicking Apply does nothing.

**Business rule (intended):** promo codes should be validated against a real, manageable set of active codes (with rules such as expiry dates, minimum-order thresholds, product/category restrictions, single-use-per-customer limits, and stacking rules), not a single hardcoded string.

### 7.4 Tax / VAT

Checkout applies a flat **19% VAT** to the subtotal. This is calculated and displayed as its own line in the Checkout order summary, distinct from Shipping.

**Business rule (intended):** VAT should be calculated based on the destination country selected in the Delivery step (rates vary by EU member state) rather than a single flat rate, and should be added to, not subtracted from, the order total — see 11.3.4 for a documented defect in the current build's total calculation.

### 7.5 Cart Persistence and Cross-Page Consistency

- The cart, once populated, persists across every page within the same browser via local storage, and is read fresh by every page that displays or acts on it (Cart, Checkout, header badge).
- The cart is **cleared** automatically the moment an order is placed in Checkout.
- A **promo code applied on the Cart page is not carried into Checkout** — the discount exists only in that page's on-screen state and is not part of the persisted cart, so a visitor who applies `ARKO10` on the Cart page and proceeds to Checkout will see the discount disappear from the totals. A production implementation must persist an applied promo/discount as part of the cart (or the in-progress order) so it survives navigation and is honored at Checkout and in the final order record.
- Removing the last item from the cart via the Cart page's controls correctly returns it to the empty-cart state; there is no minimum-order-value gate preventing checkout with a very small cart.

---

## 8. Functional Data Model

This chapter describes, in functional terms, the entities the platform manipulates and the attributes each one needs — independent of how they end up stored. It is intended as a starting brief for whoever designs the real database/API schema.

### 8.1 Motorcycle

| Attribute | Description |
|---|---|
| ID | Unique, URL-safe identifier (e.g., `rvx`) |
| Name | Display name (e.g., "ARKO RVX") |
| Category | One of Enduro, Trail, Adventure, Performance |
| Price | Current selling price |
| Old Price | Optional; when present, displayed struck through to indicate a sale |
| Rating | Headline star rating (used as a fallback when no reviews exist yet) |
| Review Count | Number of reviews backing the headline rating |
| Badge | Optional merchandising label: Best Seller, New, Sale, Limited |
| Availability | In Stock or Pre-Order |
| Colors | List of {name, hex} pairs |
| Specs | Key/value technical attributes: range, power, weight, top speed, battery capacity, charge time |
| Image | Primary listing image reference |
| Description | Marketing paragraph |
| Features | Ordered list of feature bullets |
| Variants | Named option groups (Battery, Suspension, Wheels), each a list of options with an optional price delta |
| Gallery | Ordered list of detail-page image references |
| Accessories | List of accessory IDs recommended for this model (drives Configurator step 6 and detail-page cross-sell) |
| Related | List of other motorcycle IDs to feature as "Related Models" |
| Video Trailer | Reference to a hero/trailer video asset |

### 8.2 Accessory

Shares Name, Price, Old Price, Rating, Review Count, Badge, Availability, Colors, Specs, Image, Description, Features, and Gallery with Motorcycle, plus:

| Attribute | Description |
|---|---|
| Category | One of Riding Gear, Chargers, Batteries, Protection, Parts |
| Sizes | Optional list of available sizes (used by jackets, helmets) |

Accessories do not carry Variants, Accessories (no accessory-of-accessory upsell), Related, or Video Trailer.

### 8.3 Cart Line Item

| Attribute | Description |
|---|---|
| Key | Composite identity: product ID + serialized options, used to distinguish otherwise-identical products configured differently |
| Product ID | Reference to a Motorcycle or Accessory |
| Quantity | Integer, minimum 1 |
| Options | Selected color, selected size (accessories), and a list of {name, price} upgrade selections |
| Added At | Timestamp, for potential "recently added" sorting or cart-abandonment logic |

### 8.4 Order

| Attribute | Description |
|---|---|
| ID | Human-readable order reference (e.g., `ARK-2026-0847`) |
| Date | Order placement date |
| Status | Processing, Shipped, or Delivered |
| Total | Final charged amount |
| Items | List of {name, quantity, price} at time of purchase |
| Delivery Address | The address the order was shipped to |
| Tracking | Carrier name, tracking number, and an ordered list of shipment stages, each with a name, a date (or placeholder if not yet reached), and a done/pending flag |

**Note:** a complete order record, in production, must additionally capture the customer identity (or guest contact details), the exact options selected per item (not just its name), the payment method used, any applied promo code/discount, and the VAT and shipping figures actually charged — all of which the current demo `Order` records omit.

### 8.5 Dealer

| Attribute | Description |
|---|---|
| ID | Unique identifier |
| Name | Display name (e.g., "ARKO Berlin Mitte") |
| City / Country | Location |
| Address | Street address |
| Phone | Contact number |
| Latitude / Longitude | Used to plot the dealer on the map view |
| Hours | Human-readable opening hours |

### 8.6 Review

| Attribute | Description |
|---|---|
| Product ID | Which product the review belongs to |
| Author | Display name |
| Rating | 1–5 stars |
| Date | Review date |
| Title | Short headline |
| Body | Review text |

### 8.7 FAQ Entry

| Attribute | Description |
|---|---|
| Category | One of Orders & Delivery, Battery & Charging, Warranty & Service, Test Rides & Purchasing |
| Question | The FAQ question text |
| Answer | The FAQ answer text |

### 8.8 Booking (Test Ride / Service) — Not Yet Persisted

Neither booking type is currently stored as a record anywhere, but both journeys (6.12, 6.13) clearly imply the shape such a record needs: a booking type (test ride or service), the customer's contact details, the motorcycle model or owned-bike reference, the chosen dealer, the chosen date and time, a status (requested/confirmed/completed/cancelled), and — for service bookings — the selected service tier and its price.

---

## 9. Content and Informational Pages

Not every page in the platform is transactional. A set of brand, narrative, and legal pages exist to build trust, tell the ARKO story, and satisfy compliance obligations. They carry little to no interactive logic of their own, but they are enumerated here because a functional spec that only covers commerce flows would understate what the platform actually promises a visitor.

### 9.1 Homepage

The homepage is a scroll-driven marketing sequence rather than a dashboard: a full-bleed hero ("Terrain That Doesn't Forgive") leading into a "Choose Your Weapon" fleet showcase (a curated subset of the motorcycle grid, using the same shared product card as the Shop page), a "Find Your Category" section linking each of the four categories into a pre-filtered Shop view, a flagship spotlight on the RVX, an "Essential Accessories" teaser linking into the Accessories catalog, a "Ride Before You Decide" call to action into Test Ride booking, a rider-testimonials/stories section, and a Compare Models teaser. Every section ultimately funnels the visitor toward the Shop, Configurator, Compare, or Test Ride pages — the homepage itself sells nothing directly.

### 9.2 About

A brand-storytelling page: a mission statement, a "By the Numbers" stats row (model count, dealer count, riders worldwide, and a CO2-per-km figure used to underscore the electric positioning), a set of brand values (Electric First, Built to Last, Zero Compromise), a company timeline from founding (2021) through the present day, a leadership team grid, and a closing call to action back into the Shop. Entirely static content with no data-driven or interactive behavior.

### 9.3 Stories / Journal

A magazine-style content hub ("ARKO Journal") presenting longer-form articles — e.g., a feature titled "200 Kilometers in Silence: A Day on the ARKO Adventure X." In the current build this is static demonstration content; a production version would need a real content-management capability behind it (authoring, publishing, categorization) if the brand intends to actually operate this as an ongoing journal.

### 9.4 Legal Pages (Terms, Privacy)

Standard e-commerce legal documents, each broken into numbered, anchor-linked sections:

- **Terms of Service** covers acceptance of terms, definitions, use of the website, accounts, orders and purchases, pricing and payment, delivery, returns and refunds, warranty, and test-ride-specific terms.
- **Privacy Policy** covers the introduction, data collected, how data is used, data sharing, data security, customer rights, cookies, data retention, and children's privacy, plus a change-log section.

These pages are purely informational; the functional spec's only obligation here is to ensure their content stays consistent with what the rest of the platform actually does — for example, the returns policy stated here (14 days, motorcycles under 50 km) must match what Support/FAQ tells customers (6.20), which it currently does.

### 9.5 404 (Not Found) Page

A branded error page ("This Trail Has No End") shown for any unmatched route, with a short explanation and a link back to a working part of the site. No functional logic beyond routing to it when no other page matches.

---

## 10. Notifications, Feedback, and Micro-Interactions

Beyond the shared toast mechanism already described in 5.4, several smaller feedback patterns recur across the platform and are worth codifying as consistent rules any new page or flow should follow:

### 10.1 Inline State Feedback

Several forms provide feedback that lives on the page itself rather than in a toast:

- The **Register** page's password-strength meter recalculates on every keystroke, reflecting a 0–4 score across four criteria (minimum length, uppercase letter, digit, special character) as both a filling color bar and a text label.
- The **Financing** calculator recalculates every displayed figure (financed amount, monthly payment) immediately on any input change — model, down payment, or term — with no explicit "Calculate" step.
- The **Shop** and **Accessories** filter sidebars recalculate the result grid and result count immediately on any filter change, with no "Apply Filters" step.
- The **Compare** table highlights any row where selected models' values differ, rather than requiring the visitor to spot differences unaided.

**Rule of thumb:** wherever a visitor's input can be evaluated instantly and cheaply (arithmetic, filtering, matching), the platform should reflect the result immediately rather than requiring an explicit submit action — reserving toasts and page transitions for actions with real consequence (adding to cart, placing an order, submitting a booking).

### 10.2 Success-State Takeovers

Three flows — Test Ride booking, Service booking, and (via full navigation) Checkout — respond to successful submission not merely with a toast but by **replacing the form itself** with a confirmation panel (success icon, restated details, and a next-step link), making it visually unambiguous that the action is complete and preventing an accidental duplicate submission via a still-visible submit button.

### 10.3 Empty States

Every list-like view in the platform defines an explicit empty state rather than showing a blank area: empty Cart, empty Wishlist, empty Compare, no Shop/Accessories results, no Search results, no Dealer matches, no FAQ matches, no Orders matching a filter. Each empty state pairs a short explanatory message with a single clear recovery action (e.g., "Browse Motorcycles," "Clear Filters"). Any new listing surface added to the platform should follow this same pattern rather than leaving a bare, unexplained empty area.

### 10.4 Badges and Counters

The header's Wishlist, Compare, and Cart icons each carry a small numeric badge reflecting the current count in that collection. Badges are hidden entirely (not shown as "0") when their collection is empty, and update immediately — without a page reload — the moment the underlying collection changes anywhere on the site.

### 10.5 Scroll-Responsive Elements

Two behaviors respond to scroll position specifically: the header compresses once the visitor scrolls past ~60px (5.1), and a product detail page's sticky purchase bar appears only once the visitor scrolls past ~600px (6.3) — surfacing the purchase controls again once the visitor has scrolled far enough that the original, page-top purchase controls are no longer visible.

---

## 11. Consistency, Completeness, and Practicality Review

### 11.1 Purpose of This Review

A functional specification is only useful if it is honest about where the system it describes falls short of its own stated intentions. This chapter examines the current build critically — checking whether its different parts agree with each other, whether every common customer scenario is actually handled, and whether the platform as it stands is a sound foundation to build a real backend against. Every issue below was found by tracing the actual logic in the current build, not hypothesized.

### 11.2 Consistency Check — Does the Platform Hold Together?

**Holds together well:**
- The shared product-card component (5.6), header/footer (5.1–5.3), and toast system (5.4) behave identically everywhere they appear, which keeps the browsing experience coherent across Shop, Accessories, Search, Wishlist, and Related-product sections.
- The cart, wishlist, and compare badges update consistently and immediately from any page, because every page reads the same underlying local-storage-backed store.
- Pricing display (formatted with the € symbol and thousands separators) is applied identically everywhere a price appears.
- The four-step Checkout stepper's visual state (complete / active / upcoming) stays correctly synchronized with the visitor's actual position in the flow.

**Does not hold together — see 11.3 for details:** VAT arithmetic, promo-code persistence across pages, order-history/account data versus actual purchases, and the product-image lookup used inside Orders.

### 11.3 Identified Defects and Inconsistencies

These are concrete, verifiable issues in the current build, each significant enough that a next implementation phase should treat it as a fix, not a preference.

#### 11.3.1 Checkout Total Subtracts VAT Instead of Adding It

The Checkout order summary computes VAT at 19% of the subtotal and displays it as its own line — correctly labeled and correctly calculated as an amount — but the **grand total is computed as `subtotal + shipping − VAT`** rather than `subtotal + shipping + VAT`. The displayed VAT line therefore silently reduces what the customer is shown as owing instead of adding to it. This is a straightforward arithmetic defect, not a design choice, and must be corrected before any real payment is charged against this total.

#### 11.3.2 Promo Discount Does Not Survive the Cart → Checkout Transition

As noted in 7.5, a promo code applied on the Cart page exists only in that page's local, transient state. Because Checkout independently recomputes its own summary from the cart's raw contents, a discount the customer just saw applied disappears the moment they proceed to Checkout, with no message explaining why. This is the kind of inconsistency that erodes trust at exactly the moment a customer is about to pay.

#### 11.3.3 Order-to-Product Image Lookup Is Fragile and Frequently Wrong

The Orders and Account pages, needing to show a thumbnail for each historical order line, attempt to re-derive a product ID from the order's stored item **name** (lower-casing it, stripping a leading "arko " if present, and replacing spaces with hyphens). This happens to work for order lines whose stored name both starts with "ARKO" and slugifies to exactly the product's real catalog ID (e.g., "ARKO RVX" → `rvx`, "ARKO Riding Jacket" → `riding-jacket`) — but it silently fails whenever an accessory's display name doesn't follow that pattern. For example, "Engine Protection Kit" (no "ARKO" prefix in its stored name) slugifies to `engine-protection-kit`, which does not exist in the catalog — the real ID is `protection-kit` — so no image resolves and a placeholder block is shown instead; the same happens for "Extended Battery Pack," which slugifies to `extended-battery-pack` against a real ID of `extended-battery`. **Order records must store the actual product ID at time of purchase**, not rely on reverse-engineering it from a display name.

#### 11.3.4 Checkout Review Step Shows a Hardcoded Delivery Address

Step 4 of Checkout ("Review") always displays the same fixed name and Berlin address, regardless of what the customer actually entered in Steps 1 and 2. The Information and Delivery forms do not currently feed their entered values into the Review step or into the eventual order record. This must be wired end-to-end before Checkout can be considered functionally complete.

#### 11.3.5 "Save" (Wishlist) Button on the Product Detail Page Has No Visual Active State

Unlike the wishlist heart on a product card (5.6), which visibly toggles active/inactive, the "Save" button on the full Product Detail page (6.3) confirms the action via toast but does not change its own appearance to reflect that the product is now wishlisted — so a customer revisiting a product page has no at-a-glance way to tell whether it's already saved.

#### 11.3.6 No Real Authentication, and No Route Protection

Login and Register accept any input and simulate success unconditionally (6.18). More significantly, **Account and Orders are reachable directly by anyone, signed in or not** — there is no check gating these pages behind an authenticated session. In production, both pages must require authentication, and every value they render must be scoped to the authenticated identity, not shared demo content.

#### 11.3.7 Placing an Order Does Not Affect Order History

Completing Checkout clears the cart and shows a success page (6.9, 6.10), but does not create any record reflected in Orders or Account → Orders, which always show the same four fixed demo orders. A customer who buys something today, tomorrow, and next week would see an identical Orders page after each purchase. This is the single most important functional gap to close, since it breaks the core promise of an e-commerce order history.

#### 11.3.8 Financing and Insurance Are Not Actually Selectable at Checkout

Both the Financing page's "Apply Now" and the Insurance page's "bundled at Checkout, 3 months free" promise (6.15, 6.16) imply these should be attachable to an order in progress. Checkout today has no step, field, or option for choosing a financing plan or an insurance tier — both exist purely as standalone marketing/educational pages, disconnected from the transaction they are meant to support.

#### 11.3.9 Cart, Wishlist, and Compare Are Device-Local, Not Account-Linked

Because these collections live in browser local storage (2.2, 3.2), a customer who adds items on their phone and later opens the site on their laptop — even while "signed in" on both — sees two completely different carts. Production behavior should merge or replace local state with server-persisted, account-linked state upon login, and keep them in sync thereafter.

#### 11.3.10 Two Independent, Similarly-Priced Shipping Charges Don't Reconcile

The Cart page's shipping figure (free above €1,000, otherwise a flat €49) and the Checkout Delivery step's Express option (also €49, for faster transit) are computed independently and never reconciled (7.2). A customer with a €1,200 cart sees "Free" shipping on the Cart page, then is offered a €49 "Express Delivery" upgrade at Checkout — which is a reasonable *product* decision, but the current code does not actually make Express Delivery override or add to the Cart-page shipping figure in the Checkout total; the Checkout summary's Shipping line is still driven solely by the €1,000 subtotal threshold, regardless of which delivery method radio button is selected. Express Delivery is visually selectable but has no effect on the total charged.

#### 11.3.11 Every "Submission" Is a Simulation

Newsletter sign-up (footer), Support and Contact forms, Test Ride booking, and Service booking all show a success toast and/or confirmation panel, but none of them transmits data anywhere persistent — no email is sent, no CRM ticket is created, no booking is stored for a dealer to see. This is acceptable for a demo but is, functionally, the largest category of "looks done, isn't done" work remaining before launch.

#### 11.3.12 Compare Excludes Accessories Entirely

Helmets, jackets, and other gear have enough comparable attributes (material, protection rating, weight, price) that customers would plausibly want to compare them the same way they compare motorcycles, but the Compare feature (6.6) is hardcoded to motorcycles only. Worth a deliberate product decision on whether to extend it, rather than leaving it as an unexplained limitation.

#### 11.3.13 "Write a Review" Has No Effect

The Reviews tab's "Write a Review" button (6.4) only shows a toast stating that review submission is a demo feature. No new review can actually be added, meaning the review dataset can never grow through real customer activity.

#### 11.3.14 Test Ride and Service Bookings Don't Check Real Availability

Both booking forms (6.12, 6.13) enforce only that the date is no earlier than tomorrow; they do not check the selected dealer's actual hours, existing bookings, or capacity for that date/time, so two customers could freely "book" the same dealer at the same slot with no conflict detection.

### 11.4 Completeness Check — Are Common Customer Scenarios Covered?

| Customer Scenario | Covered Today? |
|---|---|
| Browse motorcycles by category, price, range, availability, color | ✅ Fully functional |
| Compare up to 4 motorcycles side by side | ✅ Functional (motorcycles only, see 11.3.12) |
| Save items to revisit later | ✅ Functional, device-local (see 11.3.9) |
| Build a fully custom motorcycle | ✅ Fully functional |
| Add a configured build to cart and check out | ✅ Functional, subject to 11.3.1–11.3.4 |
| Apply a discount code | ⚠️ Works on Cart, lost by Checkout (11.3.2) |
| Pay the correct, fully-taxed total | ❌ VAT arithmetic defect (11.3.1) |
| See the address they entered reflected in order review | ❌ Hardcoded address shown instead (11.3.4) |
| Return later and see their real order history | ❌ Static demo orders only (11.3.7) |
| Track a real shipment | ❌ No real order created to track (11.3.7) |
| Attach financing or insurance to a purchase | ❌ Not wired into Checkout (11.3.8) |
| Sign in and have their cart follow them across devices | ❌ Local-storage only (11.3.9) |
| Book a test ride or service appointment | ⚠️ Submits, but not received by any dealer system (11.3.11, 11.3.14) |
| Leave a product review | ❌ No-op ("demo feature") (11.3.13) |
| Contact support and get a real response | ❌ No message is actually transmitted (11.3.11) |
| Find a dealer and get directions | ✅ Fully functional |
| Search the catalog | ✅ Fully functional at current catalog size |
| Manage account profile, addresses, preferences | ❌ Renders fixed demo data regardless of who's "logged in" (11.3.6) |

### 11.5 Practicality Review — Is This a Sound Foundation?

**Strengths worth preserving:**
- The **information architecture is sound.** Every domain a motorcycle e-commerce brand needs — catalog, configurator, cart/checkout, account, dealer network, financing, insurance, support — is represented and cross-linked sensibly. A backend team has a clear, complete map of what to build services for.
- The **customer-facing interaction patterns are consistent** (5.6, 10.1–10.5): shared product cards, shared toast system, shared empty-state pattern, shared stepper pattern. This consistency should be preserved, not re-invented, as real data replaces mock data.
- The **functional data model (Chapter 8) is close to sufficient** as a first-pass schema brief — most entities need only a handful of additions (persisted options on order lines, actual product IDs on order lines, booking records) rather than a redesign.
- The **pricing and filtering logic, aside from the specific defects in 11.3, is otherwise coherent** and would translate cleanly into a real backend's business logic layer.

**What stands between this and a production launch:**
- A real backend for authentication, catalog management, cart/order persistence, and payment processing — none of which exists today.
- Correcting the specific arithmetic and data-flow defects in 11.3, several of which (11.3.1, 11.3.4) would cause customers to be shown incorrect charges or incorrect shipping information if launched as-is.
- Turning every currently-simulated submission (bookings, contact forms, newsletter signup, reviews) into one that actually reaches a system capable of acting on it.
- Deciding, deliberately, whether and how Financing and Insurance become real, selectable line items within Checkout rather than standalone marketing pages.

### 11.6 Recommendations for the Next Implementation Phase

1. **Stand up authentication and account persistence first.** Nearly every other gap (cart sync, real order history, real garage/addresses) depends on having a real, authenticated customer identity to attach data to.
2. **Fix the two calculation defects (11.3.1, 11.3.2) before any real payment integration is connected** — charging a customer an incorrect total, even briefly during testing, is a serious and avoidable risk.
3. **Wire Checkout's Information and Delivery steps into both the Review step and the final order record** (11.3.4), and have order creation actually populate Orders/Account (11.3.7) — this single change closes the most customer-visible gap in the platform.
4. **Store real product IDs (and full selected options) on every order line item**, retiring the name-based slug lookup entirely (11.3.3).
5. **Build the receiving side of Test Ride and Service bookings** — at minimum, a queue a dealer can see and act on, with basic availability/conflict checking (11.3.11, 11.3.14).
6. **Decide and implement how Financing and Insurance attach to a real order** (11.3.8), including what "apply" and "get a quote" actually trigger.
7. **Replace hardcoded catalog, dealer, FAQ, and review data with a manageable content source** (even a simple admin-editable database is a major step up from code edits), so the business can add products, dealers, and FAQ content without an engineering deploy.
8. **Re-platform Cart/Wishlist/Compare from local-storage-only to account-linked, server-persisted state** once authentication exists (11.3.9), with local storage retained only as an offline/guest fallback that merges into the account on login.
9. **Write functional test cases directly from Chapter 6 of this document** — every numbered process step is, in effect, an acceptance criterion — so that QA coverage tracks this specification rather than the current code's incidental behavior.

---

## 12. Glossary of Key Terms

| Term | Definition |
|---|---|
| **Accessory** | A non-motorcycle catalog item: riding gear, chargers, batteries, protection, or parts. |
| **Availability** | A product's purchasability state: In Stock or Pre-Order. |
| **Badge** | A merchandising label on a product (Best Seller, New, Sale, Limited) used to draw attention in listings. |
| **Cart Line Item** | One entry in the cart, uniquely identified by a product plus its exact selected options. |
| **Compare** | The side-by-side specification comparison feature, limited to up to 4 motorcycles at a time. |
| **Configurator** | The guided, six-step "Build Your Own" flow for assembling a custom motorcycle configuration. |
| **Dealer** | A physical ARKO retail/service location. |
| **Garage** | The section of a customer's Account listing the motorcycles they own. |
| **Line Total** | A cart line's unit price (base price plus upgrades) multiplied by its quantity. |
| **Option (Cart)** | A selected color, size, and/or set of priced upgrades attached to a cart line item. |
| **Product Card** | The shared, reusable visual and interactive unit used to represent a product in any grid across the site. |
| **Promo Code** | A code entered at Cart to apply a discount; only `ARKO10` (10% off subtotal) is currently supported. |
| **Quick View** | A modal overlay showing key product details without leaving the current page. |
| **Recently Viewed** | A silently maintained list of up to the last 8 distinct products a visitor has viewed. |
| **Related Products** | The curated set of other motorcycles (or accessories) a product's detail page recommends alongside it. |
| **Service Tier** | One of three fixed-price maintenance packages: Routine Check, Battery Service, Major Service. |
| **Shipping Threshold** | The €1,000 subtotal above which standard shipping becomes free. |
| **Sticky Purchase Bar** | The purchase-action bar that appears at the bottom of a product page once the visitor has scrolled past the main purchase controls. |
| **Toast** | A short-lived, non-blocking on-screen message confirming the result of an action. |
| **Tracking Stage** | One step in an order's shipment timeline (e.g., Order Placed, Shipped, Delivered), each marked done or pending. |
| **Upgrade** | A priced option within a variant group (e.g., an extended battery) that adds to a product's base price. |
| **Variant Group** | A named set of configurable options for a motorcycle — Battery, Suspension, or Wheels — each with its own priced choices. |
| **VAT** | Value-Added Tax, applied at a flat 19% of subtotal during Checkout in the current build (see 11.3.1 for a known calculation defect). |
| **Wishlist** | A flat, unqualified list of saved product IDs a visitor intends to revisit or purchase later. |

---

_End of Document_

---

> **Document Version:** 1.0
> **Specification Type:** Functional — Reverse-Engineered from the Existing ARKO Frontend Build
> _This document should be reviewed against actual product intent by ARKO stakeholders, and the defects in Chapter 11 triaged and prioritized, before being used as a backend implementation brief._

