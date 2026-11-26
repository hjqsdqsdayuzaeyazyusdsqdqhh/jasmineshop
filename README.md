# JasmineShop

Moroccan home & lifestyle e-commerce — **Phase 2: brand identity & design system**.

Phase 2 is complete: the approved JasmineShop identity now runs through a finished
brand landing, responsive desktop/mobile headers, a full footer, and a set of
localized content pages. The commerce catalogue and product data remain reserved
for Phase 3.

> **Scope:** no products, no cart logic, no checkout, no Supabase and no Telegram
> yet. Navigation is fully wired: content pages are live, while the collection
> pages (`Nouveautés`, `Best-sellers`, `Idées cadeaux`) use a designed
> "selection in preparation" state and are marked `noindex` until Phase 3.

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
| `/[locale]`                    | Brand landing (hero, values, universes…)     |
| `/[locale]/boutique`           | The four JasmineShop universes              |
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
│  ├─ ui/                           # button, badge, container, arrow, headings
│  ├─ products/                     # reserved for Phase 3
│  └─ checkout/                     # reserved for later
├─ config/
│  ├─ site.ts
│  ├─ i18n.ts
│  ├─ navigation.ts                 # routes + primary navigation
│  └─ dictionaries/{fr,ar}.ts
├─ hooks/use-lock-body-scroll.ts
├─ lib/
│  ├─ seo.ts                        # localized page metadata helper
│  ├─ supabase/README.md            # future integration plan
│  └─ utils/                        # cn, cookies, currency/date formatting
├─ proxy.ts                         # locale detection (Next 16)
└─ types/index.ts
public/
├─ images/  icons/
└─ logo/jasmineshop-mark.svg
```

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
- Content pages indexed; prepared collection pages, search, cart and wishlist
  `noindex`.
- Sitemap covers the indexable FR/AR content pages with language alternates.
- JSON-LD `Organization` + `WebSite`; security headers in `next.config.ts`.

Set `NEXT_PUBLIC_SITE_URL` in production.

---

## Environment

```dotenv
NEXT_PUBLIC_SITE_URL=https://jasmineshop.ma
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Supabase is **not installed or called** in Phase 2. The planned clients, types and
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

Browser checks against the production build:

- 30 localized routes crawled, **0 broken internal links**.
- 268 anchor checks, **0 broken anchors**.
- No horizontal overflow at 320 / 360 / 390 / 768 / 1024 / 1280 / 1440 px.
- One `<h1>` on every page, no console errors.
- Mobile drawer interaction tested (focus, Escape, scroll lock, resize, locale
  switch); French LTR and Arabic RTL verified.

Lighthouse audit (`/fr`): **Accessibility 100 · Best Practices 100 · SEO 100**.

---

## Next phase

**Phase 3 — Catalogue & commerce content**

- Build the product/category data model, cards and detail pages.
- Replace prepared collection pages with the first real selection.
- Add product photography, prices, filtering and search results.
- Wire Supabase data, then cart and COD checkout.

Phase 2 deliberately stops before these features.
