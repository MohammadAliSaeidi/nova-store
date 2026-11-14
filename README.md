# NOVA Store

Independent Next.js App Router and TypeScript storefront. `/fa` and `/en` render the localized FakeStoreAPI catalog with server prefetch/hydration, local search/category/sort/pagination, and the header, hero, product cards, and footer. The catalog adds items to the persisted cart; `/fa/cart` and `/en/cart` show product rows, quantity controls, removal/clear actions, derived totals, and an empty state.

## Requirements

- Bun 1.2.15
- Node.js 20.9 or later
- Owner-managed package installation: `bun install`

## Development

```powershell
Copy-Item .env.example .env.local
bun run dev
```

Open `http://localhost:3000/fa` or `http://localhost:3000/en`. The locale prefix determines the page language. The language switch and active locale route write the selected locale to the one-year `NOVA_LOCALE` preference cookie after client hydration. The root proxy is configured to negotiate a locale from the saved preference or browser language; restart the dev server and verify this behavior before relying on it.

Set `NEXT_PUBLIC_API_BASE_URL` to the public FakeStoreAPI origin. `SITE_URL` is used for origin-aware server metadata and defaults to the local URL only outside production. Production must provide its real site origin; no production domain is configured.

## Source map

- `src/app/[locale]`: localized Server Component layout and catalog route; `src/app/robots.ts` and `src/app/sitemap.ts` generate crawler metadata.
- `src/i18n` and `src/dictionary`: next-intl routing, root-parameter request setup, and fa/en messages.
- `src/components/styled-components-registry.tsx`: App Router style collection for SSR.
- `src/components/storefront`: server shell/hero/footer, catalog browser, and header controls; `header-controls/` separates navigation, debounced search, theme/locale actions, and the cart badge.
- `src/context` and `src/shared/styles`: theme context, tokens, and global styles.
- `src/shared/providers`: request-local server and stable browser QueryClient providers.
- `src/api`: independent typed Axios client and API error mapping.
- `src/requests`: validated FakeStoreAPI request functions; query keys/options are colocated with their query hooks.
- `src/hooks`: TanStack Query observers, reusable URL query and single-parameter hooks, catalog control orchestration, debounced search, and reusable pagination behavior.
- `src/components/storefront/catalog-browser`: public catalog orchestrator and private category, product, sort, pagination, and error components; only the orchestrator is exported from its `index.ts`.
- `src/components/cart`: cart rows, summary, view and responsive cart styles.
- `src/shared/quantity-stepper.tsx`: accessible quantity control used by cart rows.
- `src/storage`: persisted cart product IDs and quantities with guarded updates and removal/clear actions.
- `src/types` and `src/utils`: product contracts, catalog/cart calculations and formatting, and origin utility.

The `/fa` route loads the local Vazirmatn Regular font from `src/assets/fonts` with `next/font/local`; `/en` currently uses the system fallback because the approved local Raleway weights (400, 600, and 700) have not been supplied. No NOVA logo asset is approved yet.

## Rendering and state

Localized pages and layouts remain Server Components. The Styled Components registry collects client component styles during server rendering. The catalog uses the same query-option factories for request-local server `QueryClient.query` calls and browser `useQuery` observers, then dehydrates successful data into a `HydrationBoundary`. API failures render translated errors with real retry actions; valid empty responses have separate empty states. Catalog search, category, sort, and page are represented by URL query parameters; search input updates `q` after a debounce, while category/sort/page changes create browser history entries. Filtering remains client-side over hydrated catalog data. The cart persists only product IDs and quantities, resolves details from the shared catalog query, and derives totals from integer cents. Its view keeps a local placeholder during rehydration, and its localized route is marked `noindex`. The `/fa` and `/en` home routes provide localized title/description, canonical and alternate-language links, and Open Graph metadata. `src/app/robots.ts` allows crawling and points to the sitemap; `src/app/sitemap.ts` lists only those two real public routes. `SITE_URL` supplies the metadata origin; production must configure its real origin. Theme preference is stored in the non-sensitive `NOVA_THEME` cookie (`light` or `dark`) for one year. A visit without a saved preference starts Light; the header toggle switches between Light and Dark without following OS preference. SEO output, cart hydration, API recovery, and responsive behavior remain runtime-unverified.

## Build and delivery status

Use `bun run lint` and `bun run build` for checks. The latest recorded production build passed on 2026-11-14 at 05:30 (+03:30), before the subsequent localized error/proxy changes. The earlier 03:31 cart build had failed prerendering; later build evidence supersedes that result, but the newest changes have not been built. The latest proxy/root-locale and localized 404 changes also need a dev-server restart and browser verification. Direct-route SSR, cart hydration/persistence, API retry, and responsive behavior remain runtime-unverified.

Vazirmatn is configured for `/fa`; local Raleway assets are still missing for `/en`, which uses a system fallback. The text NOVA mark and generic bag glyph are provisional UI, not an approved logo asset. Production must set `SITE_URL` to its real public origin. The challenge asks for actual development time; it was not recorded, so it is intentionally not estimated here. No screenshots are included yet.
