# NOVA Store

Independent Next.js App Router and TypeScript storefront foundation. The current phase provides `/fa` and `/en` localized foundation routes, request-aware locale selection, server-rendered Styled Components, theme and Query providers, and a Store-owned Axios client. Catalog, cart behavior, and production SEO are separate future phases.

## Requirements

- Bun 1.2.15
- Node.js 20.9 or later
- Owner-managed package installation: `bun install`

## Development

```powershell
Copy-Item .env.example .env.local
bun run dev
```

Open `http://localhost:3000`. The root route selects a locale with this order: explicit locale path, valid `NOVA_LOCALE` cookie, `Accept-Language`, then Persian (`fa`). Supported routes are `/fa` and `/en`. Locale preference cookies last one year.

Set `NEXT_PUBLIC_API_BASE_URL` to the public FakeStoreAPI origin. `SITE_URL` is used for origin-aware server metadata and defaults to the local URL only outside production. Production must provide its real site origin; no production domain is configured.

## Source map

- `src/app/[locale]`: localized server layout and foundation route.
- `src/i18n` and `src/dictionary`: next-intl routing, request setup, and fa/en messages.
- `src/components/styled-components-registry.tsx`: App Router style collection for SSR.
- `src/context` and `src/shared/styles`: theme context, tokens, and global styles.
- `src/shared/providers`: Query client and app provider boundaries.
- `src/api`: independent typed Axios client and API error mapping.
- `src/types` and `src/utils`: shared contracts and origin utility.

Persian uses Vazirmatn and English uses local Raleway weights 400, 600, and 700 once the approved font assets are present under `src/assets/fonts`. Font files were not available in this repository at the time of this foundation change, so the current CSS uses a system fallback. No NOVA logo asset is approved yet.

## Rendering and state

Localized pages and layouts remain Server Components. The Styled Components registry collects client component styles during server rendering. TanStack Query creates request-local server clients and reuses one browser client; route-specific prefetch and hydration belong to the catalog phase. Theme preference is stored in the non-sensitive `NOVA_THEME` cookie (`light`, `dark`, or `system`) for one year. A first visit renders Light and applies the OS theme after hydration when System is selected.

Run `bun run lint` for linting. Build, SSR refresh, locale negotiation, and hydration checks have not been run for this change.
