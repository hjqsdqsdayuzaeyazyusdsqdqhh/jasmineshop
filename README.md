# JasmineShop

Moroccan home & lifestyle e-commerce — **Phase 3: first real product & COD order flow**.

The approved Phase 2 identity is unchanged. Phase 3 adds the first official
product, a centralized catalogue entry, a five-photo gallery, a localized
product page and a cash-on-delivery order flow.

> **Scope:** one product only. The COD form validates the customer details, sends
> the order to the JasmineShop Telegram group and shows a success confirmation;
> there is no order database or payment gateway yet. Collection pages
> (`Nouveautés`, `Best-sellers`, `Idées cadeaux`) still use their designed
> "selection in preparation" state and remain `noindex`.

---

## Stack

| Area       | Choice                                 |
| ---------- | -------------------------------------- |
| Framework  | Next.js 16.4.6 (App Router, Turbopack) |
| UI         | React 19.3.1                           |
| Language   | TypeScript 5.9 (strict)                |
| Styling    | Tailwind CSS 4.3 + CSS tokens          |
| Icons      | Lucide React                           |
| Linting    | ESLint 9 + `eslint-config-next`        |
| Deployment | Vercel                                 |
| Backend    | Supabase-ready (not installed yet)     |

## Requirements

- Node.js **20.9+** (`.nvmrc` points to Node 22)
- npm 10+

## Getting started

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. The proxy redirects to `/fr` or `/ar`.

### Scripts

| Command             | Purpose                             |
| ------------------- | ----------------------------------- |
| `npm run dev`       | Development server with Turbopack   |
| `npm run build`     | Production build (also type-checks) |
| `npm run start`     | Serve the production build          |
| `npm run lint`      | ESLint (flat config)                |
| `npm run typecheck` | `tsc --noEmit`                      |

---

## Routes

| Route (FR / AR)                | Page                                        |
| ------------------------------ | ------------------------------------------- |
| `/[locale]`                    | Brand landing (hero, values, product, universes…) |
| `/[locale]/boutique`           | The four JasmineShop universes              |
| `/[locale]/produit/[slug]`     | Product page, gallery & COD order           |
| `/[locale]/nouveautes`         | New arrivals — prepared collection          |
| `/[locale]/best-sellers`       | Best-sellers — prepared collection          |
| `/[locale]/idees-cadeaux`      | Gift ideas — prepared collection            |
| `/[locale]/notre-histoire`     | Brand story & values                        |
| `/[locale]/contact`            | Contact details                             |
| `/[locale]/faq`                | Delivery, payment, returns & order FAQ      |
| `/[locale]/legal`              | Legal, privacy & cookie information         |
| `/[locale]/recherche`          | Search shell with query state               |
| `/[locale]/favoris`            | Wishlist empty state                        |
| `/[locale]/panier`             | Cart empty state                            |

Every header, mobile drawer and footer link resolves to a live localized page or
to a `mailto:` / `tel:` link. The prepared collection pages are intentionally
`noindex`; they are excluded from the sitemap until Phase 3.

---

## Structure

```
src/
├─ app/
│  ├─ [locale]/
│  │  ├─ layout.tsx                 # localized root HTML, fonts, metadata
│  │  ├─ page.tsx                   # brand landing
│  │  ├─ boutique/page.tsx
│  │  ├─ produit/[slug]/page.tsx      # product gallery, specs, COD order
│  │  ├─ nouveautes/page.tsx
│  │  ├─ best-sellers/page.tsx
│  │  ├─ idees-cadeaux/page.tsx
│  │  ├─ notre-histoire/page.tsx
│  │  ├─ contact/page.tsx
│  │  ├─ faq/page.tsx
│  │  ├─ legal/page.tsx
│  │  ├─ recherche/page.tsx
│  │  ├─ favoris/page.tsx
│  │  ├─ panier/page.tsx
│  │  ├─ not-found.tsx
│  │  ├─ [...rest]/page.tsx
│  │  └─ opengraph-image.tsx
│  ├─ globals.css
│  ├─ icon.svg
│  ├─ manifest.ts
│  ├─ robots.ts
│  └─ sitemap.ts
├─ components/
│  ├─ common/                       # logo, flower, page hero, cards, states
│  ├─ home/                         # brand landing sections
│  ├─ layout/                       # announcement bar, header, menu, footer
│  ├─ ui/                           # button, badge, container, quantity, headings
│  ├─ product/                      # gallery, visual, placeholder, order form
│  └─ checkout/                     # reserved for later
├─ config/
│  ├─ site.ts
│  ├─ i18n.ts
│  ├─ navigation.ts                 # routes + primary navigation
│  └─ dictionaries/{fr,ar}.ts
├─ hooks/use-lock-body-scroll.ts
├─ data/products.ts                 # single source of truth for the catalogue
├─ lib/
│  ├─ seo.ts                        # localized page metadata helper
│  ├─ product-images.ts             # local photo availability check
│  ├─ supabase/README.md            # future integration plan
│  └─ utils/                        # cn, cookies, currency/date formatting
├─ proxy.ts                         # locale detection (Next 16)
└─ types/index.ts
public/
├─ images/products/chariot/          # 5 official product photos + source note
├─ images/  icons/
└─ logo/jasmineshop-mark.svg
```

---

## First product

**Chariot de rangement multifonctionnel** — `chariot-rangement-001`,
`/[locale]/produit/chariot-rangement-3-niveaux`, **230 DH**, in stock,
category **Maison & Rangement**.

- Matte black metal frame, two deep wire baskets, wooden top tray, four wheels.
- 76 × 29 × 42 cm; kitchen, living room, bedroom or office.
- Five local photos in `public/images/products/chariot/` (`main`, `gallery-2`,
  `gallery-3`, `gallery-4`, `detail`), with alt text in FR/AR.
- Interactive gallery, verified specification table, quantity selector and total.
- COD form: full name, Moroccan phone, city, full address, quantity and total,
  displayed directly next to the gallery. Payment is cash on delivery only.
  Submitting validates the fields, sends the order to the Telegram group
  (`TELEGRAM_CHAT_ID`) and confirms success with an order reference.
- Homepage: owner banner, then a **Nouveautés** product card linked to the order
  form.
- Mobile sticky order bar links back to the order form.
- Photos were supplied via the owner-provided Marjane Mall listing. Confirm usage
  rights before public commercial publication; see the folder README.

---

## Brand identity

### Wordmark

- **Jasmine** upright in **Instrument Serif**, **Shop** italic in burgundy.
- The five-petal **jasmine flower** is the brand symbol: header, footer, favicon,
  app icon, page ornaments and the `public/logo` asset.
- The wordmark is a real text component, so it stays sharp and accessible in both
  locales. A `.wordmark` rule keeps Instrument Serif on Arabic pages while
  Arabic display copy uses Cairo.

### Palette

| Role           | Token      | Hex       |
| -------------- | ---------- | --------- |
| Burgundy       | `wine-800` | `#7B1734` |
| Deep burgundy  | `wine-900` | `#521025` |
| Ivory          | `ivory-50` | `#FFFDF8` |
| White          | `white`    | `#FFFFFF` |
| Soft gold      | `gold-400` | `#C6A15B` |
| Dark text      | `ink`      | `#242124` |
| Light gray     | `mist`     | `#F5F5F5` |
| Rose accent    | `wine-600` | `#982B4D` |

### Typography

- **Instrument Serif** — headlines, logo, editorial quotes.
- **Manrope** — UI, navigation, body copy and numbers.
- **Cairo** — Arabic UI and display, with Arabic-specific line-height and spacing.

---

## Header & footer

### Announcement bar

Deep-burgundy band with ivory micro-copy, a gold hairline, and progressive
delivery / payment / returns messages across breakpoints. Fully FR/AR.

### Desktop header

Sticky ivory glass header: wordmark, five primary destinations, search, language
dropdown, favourites and a filled burgundy cart. Active pages receive a fine gold
underline; hover states use light gray `#F5F5F5`.

### Mobile header

68px header with hamburger, centred wordmark and cart/search. The portaled drawer
contains numbered serif navigation, search/favourites pills, an inline FR/AR
switcher and a contact card. It locks page scroll, traps focus, closes on Escape
and on desktop resize, and restores focus to the hamburger.

### Footer

Deep-burgundy footer with brand lockup, tagline, description, language switcher,
four link groups (shop, help, house, contact), payment/trust notes, legal links
and copyright. All links point to existing pages or mail/phone actions.

---

## Internationalization & RTL

- Supported locales: **`fr` (default)** and **`ar`**.
- Every page lives under `/[locale]`; the root layout is
  `src/app/[locale]/layout.tsx` so `<html lang dir>` is server-rendered.
- `src/proxy.ts` (Next.js 16 replacement for middleware) redirects using the
  `JS_LOCALE` cookie, `Accept-Language` (`ar-*`) and a French fallback.
- Logical CSS properties (`ms-`, `me-`, `start-`, `end-`) keep the header, drawer,
  cards, footer and prose correctly mirrored.
- Typed dictionaries: Arabic must implement every French key. Metadata, OG locale,
  canonical URLs and `hreflang` are localized.
- LTR phone and email values are isolated with `dir="ltr"` inside RTL layouts.

---

## SEO & metadata

- Per-page localized titles, descriptions, canonical URLs and `hreflang`.
- Dynamic 1200×630 Open Graph image, Twitter card, robots directives.
- Content pages and the product page are indexed; prepared collection pages,
  search, cart and wishlist are `noindex`.
- Sitemap covers the indexable FR/AR content pages and both product URLs with
  language alternates.
- JSON-LD `Organization` + `WebSite`; the product page adds `Product` + `Offer`.
  Security headers live in `next.config.ts`.

Set `NEXT_PUBLIC_SITE_URL` in production.

---

## Environment

```dotenv
NEXT_PUBLIC_SITE_URL=https://jasmineshop.ma
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=-5334669783
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

`TELEGRAM_BOT_TOKEN` is server-only. The group chat ID lives in
`src/config/telegram.ts` (`-5334669783`) and can be overridden with
`TELEGRAM_CHAT_ID`. Create a bot with **@BotFather**, add it to the group, then
set the token locally and on Vercel. Send a test with:

```bash
npm run test:telegram
```

Without the token, the order form shows a sending error instead of a false
success.

> After adding or changing an environment variable, **redeploy** the project.
> Vercel only injects environment variables into new deployments.

Supabase is **not installed or called** yet. The planned clients, types and
security rules live in `src/lib/supabase/README.md`.

---

## Deploy to Vercel

1. Import the repository in Vercel.
2. Keep the default Next.js build command (`npm run build`).
3. Add `NEXT_PUBLIC_SITE_URL`.
4. Deploy. The app is static except the search page, OG image, catch-all 404 and
   locale proxy.

---

## Quality gates

```bash
npm run lint       # ✓ no errors
npm run typecheck  # ✓ no errors
npm run build      # ✓ production build
```

Browser checks:

- Phase 2: 30 localized routes crawled, **0 broken internal links**, 268 anchor
  checks, no horizontal overflow at 320–1440 px, one `<h1>` per page.
- Phase 3 product page: 5 photos load, gallery switching works, 230 DH unit price
  and correct quantity totals, COD validation messages, Telegram delivery and
  success confirmation, no console errors, Arabic RTL without horizontal
  overflow.

Lighthouse audit (`/fr`): **Accessibility 100 · Best Practices 100 · SEO 100**.

---

## Next phase

**Phase 4 — Real orders & catalogue growth**

- Persist COD orders (Supabase or server action) and notify the team.
- Add more products to `src/data/products.ts` and real collection listings.
- Replace placeholder collection pages and wire search/filtering.
- Keep product photos owned by the house; confirm rights for every visual.
