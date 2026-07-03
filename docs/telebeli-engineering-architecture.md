# Telebeli — Engineering Architecture

**Phase:** 09 — Engineering documentation
**Prepared as:** Staff Frontend Engineer review
**Target:** Next.js 15 (App Router, React 19, Turbopack).
**Not code.** Architecture and rationale, precise enough to guide implementation.
**Locked to:** Phase 04 (motion tokens, interaction, a11y), Phase 05 (token system, DNA, themes), Phase 06 (component + token model), Phase 07 (landing page), Phase 08 (dashboard, realtime discipline, candor states).

---

## 0. Guiding principles & the dual-surface reality

Telebeli is **two applications in one repository, sharing one design system:**

- **Marketing** — mostly static, SEO-critical, fast LCP, minimal client JavaScript. Rendered as Server Components; motion and the call player are small client islands.
- **Dashboard** — realtime, data-dense, keyboard-first, auth-gated, per-user. Client-heavy by necessity (streams, tables, charts, drawers), on a Server-rendered shell.

The whole architecture flows from four rules:
1. **Server Components by default; client cost is deliberate.** JavaScript is spent only where interaction, state, or motion requires it.
2. **One token system, two render strategies.** The Phase 05/06 tokens and components are shared; only the rendering and data strategy differ per surface.
3. **The URL is the source of truth for shareable state** (time-range, scope, filters, a selected call), so Phase 08's saved views are just URLs.
4. **Honesty is enforced in code** — realtime connection state, error states, and empty states tell the truth (Phase 02/08 candor), and there is no fabricated data path.

---

## 1. Technology stack

- **Framework:** Next.js 15, App Router, React 19, TypeScript (strict). `next.config.ts`. Turbopack for dev.
- **Styling:** Tailwind CSS v4 (CSS-first `@theme`, native OKLCH), driving the Phase 05 token layer. No CSS-in-JS runtime.
- **Headless UI / a11y:** Radix UI primitives (Dialog, Menu, Tabs, Tooltip, Popover, etc.) as the accessible behavior layer under the Telebeli component skins — correct semantics and focus management for free.
- **Motion:** Framer Motion (`motion`/`motion/react`), used through `LazyMotion` + `MotionConfig` (see §13).
- **Server state (dashboard):** TanStack Query (React Query) as the cache, fed by the realtime layer.
- **Realtime:** a single WebSocket (SSE fallback) connection manager syncing into the Query cache.
- **URL state:** `nuqs` (typed searchParam state) for filters/time-range/scope.
- **Local/UI state:** Zustand for ephemeral cross-tree UI (command palette, drawer, shortcuts) — small and scoped.
- **Forms:** React Hook Form + Zod, submitted via Server Actions.
- **Fonts:** `next/font/local` (self-hosted variable fonts; tri-voice).
- **Charts:** a lightweight, tree-shakeable, SSR-safe charting lib (e.g., visx/D3-primitive or Recharts), dynamically imported (dashboard only).
- **Auth:** session via middleware + `auth()` (provider-agnostic); dashboard gated.
- **Testing:** Vitest + React Testing Library, Playwright (e2e + axe), Storybook (+ visual regression).
- **Observability:** Vercel Speed Insights + Web Analytics; Sentry for errors.
- **Deploy:** Vercel (edge network, Brotli, image CDN); Node runtime for data routes, Edge for lightweight/geo.

**Why this stack:** it is the Vercel-native path — maximal static/RSC for marketing, a disciplined client layer for the dashboard, and no runtime styling tax. Radix keeps accessibility correct; TanStack + WebSocket is the proven realtime pattern; the token/motion layers are framework-agnostic so the design system holds.

---

## 2. Folder structure

Route groups separate the two surfaces cleanly; a shared design system and feature modules sit beside `app/`.

```
app/
  (marketing)/                # static / PPR, SEO
    layout.tsx  page.tsx
    pricing/  security/  docs/  blog/  [legal]/
    sitemap.ts  robots.ts  opengraph-image.tsx
  (dashboard)/                # auth-gated, dynamic, realtime
    layout.tsx                # shell: sidebar, topbar, providers
    dashboard/
      overview/  live/  queue/  agents/  qa/
      analytics/  performance/  crm/  knowledge/
      settings/  integrations/  permissions/  notifications/
      calls/[id]/             # Conversation Timeline (full page)
      @modal/(.)calls/[id]/   # intercepting route → inspector drawer
      loading.tsx  error.tsx
  api/                        # route handlers (BFF), webhook, ws-auth
  global-error.tsx  not-found.tsx
components/                   # design system (see §10)
  ui/        # primitives (Button, Input, Badge, Table, ...)
  motion/    # animated wrappers (client)
  charts/    # chart primitives (client, lazy)
  marketing/ # landing sections (mostly RSC)
features/                    # feature modules (see §3)
hooks/                       # cross-cutting hooks (§11)
lib/                         # utils, api, ws, tokens, seo, motion (§12,13)
styles/globals.css           # @theme tokens (§7)
config/                      # site config, nav, flags
tests/  e2e/                 # Playwright, fixtures
```

**Why:** route groups yield separate bundles and separate rendering strategies without separate deployments; intercepting/parallel routes power the drawer natively (§4); everything shared lives outside `app/` so it is import-clean from both surfaces.

---

## 3. Feature structure

The dashboard is organized **feature-first** (feature-sliced), because each Phase 08 surface is a self-contained domain. Each feature module co-locates everything it owns:

```
features/live-calls/
  components/        # LiveTail, FacetRail, LiveControls
  hooks/             # useCallStream, useFacets
  api/               # queries, mutations (TanStack), zod schemas
  realtime/          # channel subscription + reconcilers
  types.ts  index.ts # public surface (barrel; nothing else imports internals)
```

Features: `live-calls`, `call-queue`, `agent-monitoring`, `conversation-timeline`, `qa`, `analytics`, `performance`, `crm`, `knowledge-base`, `agent-settings`, `integrations`, `permissions`, `notifications`, `search`, `command-palette`.

**Rules:** a feature exposes only its `index.ts` barrel; cross-feature use goes through public surfaces, never internals (prevents coupling). Shared, non-domain pieces live in `components/`/`hooks/`/`lib/`. Marketing is **section-first** (`components/marketing/*`) rather than feature-sliced, because it is a linear page, not a domain app.

**Why:** feature modules scale to a large dashboard team — clear ownership, no god-folders, and the New-Component Test (Phase 06) applies at the module boundary.

---

## 4. Server Components & Client Components (rendering model)

- **Default is Server.** Every file is an RSC unless it declares `"use client"`. Data fetching, secrets, and heavy logic stay on the server.
- **Client boundaries are pushed to the leaves.** A component becomes client only if it needs state, effects, event handlers, browser APIs, or motion. The boundary is placed as deep as possible so RSC payload stays large and JS stays small.
- **Marketing:** the hero **headline and copy are RSC** (this is the LCP — no JS on its critical path). The `CallPlayer`, `Reveal`/motion wrappers, `CommandPalette`, and pricing calculator are client islands, composed as `children` of RSC sections (so an RSC section can wrap animated client children without becoming client itself).
- **Dashboard:** the shell (sidebar, topbar, layout, auth) is RSC; most widgets are client (realtime/interaction). Server passes initial data as props; the client hydrates and subscribes.
- **Streaming:** `<Suspense>` boundaries stream slow data (analytics panels, tables) so the shell paints immediately; `loading.tsx` per segment gives instant skeletons.
- **Partial Prerendering (PPR, experimental in 15):** enabled per marketing route where a mostly-static page has a small dynamic hole (e.g., live "talk to the agent" availability) — static shell served from the edge, dynamic bit streamed.
- **The drawer via intercepting + parallel routes:** the Conversation Timeline lives at `calls/[id]` (a real, shareable, refresh-safe full page) and is intercepted into a `@modal` slot as the inspector drawer over the current surface — the native Next.js pattern, so a call detail is one URL that is both a drawer and a page.

**Why:** this keeps marketing near-zero-JS and SEO-perfect while giving the dashboard a rich client without shipping that client to marketing visitors. The intercepting-route drawer is the correct Next-native answer to Phase 08's "inspect without losing context."

---

## 5. State management

State is placed at its cheapest correct layer:

- **Server state (dashboard data):** TanStack Query. Query keys are derived from the URL (time-range, scope, filters) so views are shareable and cacheable. Mutations are Server Actions with optimistic updates reconciled by the realtime layer.
- **Realtime state:** one WebSocket connection manager (a provider at the dashboard root). Incoming events are **batched/throttled** (Phase 08) and reconciled into the Query cache (`queryClient.setQueryData`) — the cache is the single source of truth; components subscribe via queries and re-render on `reconcile`. Connection status (`live/reconnecting/paused/degraded`) is its own store, surfaced honestly.
- **URL state (shareable):** time-range, scope, active facets, selected call → `searchParams` via `nuqs`. RSC can read them; saved views are just URLs.
- **Ephemeral UI state:** Zustand slices for command-palette open, drawer, shortcut mode, mobile nav — small, cross-tree, non-persisted.
- **Form state:** React Hook Form + Zod, local to the form; submit via Server Action; success/error via the honest state components (Phase 06).
- **Marketing:** effectively no client state (RSC), except the calculator (local `useState`) and player (local).

**Why:** URL-first state gives Phase 08 saved views for free and keeps state serializable; TanStack + WebSocket is the battle-tested realtime shape; Zustand stays scoped to genuinely global UI so there is no global-store sprawl.

---

## 6. Realtime architecture

- **Transport:** a single authenticated WebSocket per session (SSE fallback where WS is blocked). One connection manager; features subscribe to channels (live calls, agent health, alerts).
- **Reconciliation:** events update the TanStack cache; UI animates via the `reconcile` motion token (§13). New rows prepend; state changes cross-fade within the semantic palette.
- **Batching:** updates coalesce over a short window (e.g., animation-frame or ~250ms) to prevent jitter, main-thread thrash, and screen-reader floods (§15).
- **Follow / Pause:** the operator controls the stream; paused freezes rendering while the buffer accumulates a "N new" affordance.
- **Degradation (candor):** on disconnect, status shows `reconnecting`; buffered events apply on reconnect; the UI never claims live when it isn't.
- **Backpressure & performance:** virtualized lists (see §14) consume the stream; off-main-thread parsing where heavy.

**Why:** a monitoring product's credibility is its realtime honesty and stability; batching + virtualization + honest status is what separates a real observability tool from a demo.

---

## 7. Design tokens

Three layers, in CSS custom properties (Tailwind v4 `@theme`), OKLCH throughout (Phase 05):

- **Primitive** (`--color-blue-500`, `--space-24`, `--radius-8`, `--dur-240`, `--ease-decelerate`, `--font-serif`) — raw, immutable.
- **Semantic** (`--accent`, `--ink`, `--surface`, `--paper`, `--hairline`, `--state-handoff`, `--elevation-1`, `--text-display`, `--transition-enter`) — meaning-mapped and **theme-aware**; the only layer that flips between Light and Operations.
- **Component** (`--button-primary-bg`, `--card-border`, `--input-focus-ring`) — local, mapping to semantics.

**Enforcement:** components reference only semantic/component tokens; a lint rule bans raw hex/px and primitive references in component styles. Tokens are the single source of truth; the motion tokens (§13) live here too so timing is never hardcoded.

**Why:** this is what makes the system themeable, consistent, and un-driftable (Phase 05 §15) — and it makes the Operations theme a data-attribute flip, not a re-skin.

---

## 8. Theme architecture

- **Two themes:** Light (default, marketing) and Operations (dark, dashboard default). Both are real token sets; only semantic tokens change.
- **Mechanism:** `data-theme="light|operations"` on `<html>`; `next-themes` manages selection and system preference. A tiny **blocking inline script** sets the attribute before paint to avoid FOUC/flash; `suppressHydrationWarning` on `<html>`. `color-scheme` set for native form/scrollbar theming.
- **Per-surface default:** marketing defaults Light; dashboard defaults Operations; user choice persists.
- **Grain & elevation** adapt by theme via semantic tokens (dark elevation uses surface-lightness, not shadow — Phase 05).

**Why:** SSR-safe theming with no flash is a Vercel table-stakes detail; a data-attribute + semantic-token model keeps theme switching instant and component-code-free.

---

## 9. Typography loading

Tri-voice, self-hosted via `next/font/local` (no external requests, no layout shift):

- **Serif (display)** — variable, subset to display glyphs; `font-display: swap`; **not preloaded aggressively** (used below the LCP text on some pages) — but on the landing hero (serif headline = LCP) it **is** preloaded.
- **Sans (UI/body)** — variable, Latin subset, **preloaded**, `swap`; this is the workhorse.
- **Mono (evidence)** — variable, subset; loaded where evidence appears (dashboard, pricing) — not preloaded on marketing above the fold.
- **CLS control:** `next/font` generates a size-adjusted fallback (metrics-matched) so the swap causes no layout shift; explicit `fallback` stacks defined.
- **Weights:** only the three-per-family weights the system uses (Phase 05) are shipped — no unused weights.

**Why:** self-hosting removes a render-blocking third party; metric-matched fallbacks hold CLS at 0; preloading only the critical face keeps the font budget lean while the serif headline still paints fast as LCP.

---

## 10. Component architecture

- **Layering (Phase 06):** primitives → composites → sections/widgets; each component maps to semantic/component tokens only.
- **Skin over headless:** Telebeli primitives skin Radix behavior (Dialog/Menu/Tabs/Tooltip/Popover) — the team owns visuals; Radix owns accessibility and focus.
- **RSC-first primitives:** static primitives (Badge, Card shell, Table markup) are RSC; only interactive ones (`Button` with press feedback, `Select`, `CommandPalette`) are client. A primitive splits into an RSC shell + a thin client control when only part is interactive.
- **Composition via `children`:** RSC sections wrap client islands as children, keeping the boundary minimal.
- **Variant model:** intent-based variants via a typed variant utility (CVA-style), driven by tokens.
- **The DNA components** (`Timeline`, `EventMarker`, `CallPlayer`, `Dashboard`) are first-class, versioned, and reused across marketing and dashboard (dual-surface).
- **Documentation:** every component lives in Storybook with all states (default/hover/focus/loading/empty/error) and both themes.

**Why:** headless + skin gives correctness with control; RSC-first primitives keep marketing light; Storybook makes the states/variants and the DNA testable and reviewable.

---

## 11. Hooks

Cross-cutting hooks (in `hooks/`) and feature hooks (in features). Representative catalog:

- `useReducedMotion`, `useCapability` (`hover`/`pointer` media queries → the Phase 04 tap-vs-hover swap), `useMediaQuery`.
- `useTheme` (wrapper over next-themes), `useHotkeys` / `useShortcut` (the Phase 08 shortcut map), `useCommandPalette`.
- `useRealtime` (subscribe to a channel), `useCallStream`, `useLiveStatus`.
- `useTimeRange`, `useScope`, `useFacets` (URL-synced via nuqs).
- `useAudioPlayer` (CallPlayer: play/scrub/mute, transcript sync, waveform data from an analyser — drives the real-audio-only animation).
- `useInView` (or Framer `useInView` with the 85%/once config), `useToast`, `useDrawer`.
- `useAnnounce` (throttled polite live-region announcer for realtime — §15).

**Rules:** hooks are pure and typed; data hooks return TanStack Query results; UI hooks are side-effect-scoped and clean up. Hooks never hardcode motion timings or tokens — they read from the token/motion config.

**Why:** hooks encapsulate the tricky cross-cutting behaviors (realtime, capability detection, audio, announcements) so components stay declarative and the Phase 04 rules are enforced in one place.

---

## 12. Utilities

`lib/` holds framework-light utilities:

- `cn` (clsx + tailwind-merge), variant helpers.
- **Formatters** — duration, latency (mono), relative time, currency (tabular) — the "evidence" formatting layer.
- **API client** — typed BFF client (route handlers), Zod-validated responses.
- **WS client** — connection manager, channel subscriptions, batching.
- **Zod schemas** — shared request/response/entity schemas (single source of truth for types).
- **SEO helpers** — metadata builders, JSON-LD generators (§16).
- **Motion config** — the Phase 04 tokens as transition/variant presets (§13).
- **A11y helpers** — focus-scope helpers, id generation, live-region utilities.
- **Analytics wrapper** — thin, privacy-respecting event layer.
- **Feature flags / config** — `config/` for nav, site metadata, flags.

**Why:** utilities are pure, tree-shakeable, and typed; Zod-as-source-of-truth keeps client/server contracts honest (and supports the candor rule — validation, not assumption).

---

## 13. Animation architecture & Framer Motion architecture

**Animation architecture (strategy):**
- All motion derives from the **Phase 04 tokens** in `lib/motion.ts`: `enter` (240ms decelerate, translateY 16→0), `reconcile` (180ms), `press` (100ms), `exit` (140ms), `hover-reveal`. Components never hardcode timing/easing; they consume named presets.
- Motion is **off the LCP path** (hero headline is RSC/CSS, not Framer).
- Scroll reveals fire **once** at the 85% viewport threshold; state-change (`reconcile`) is the only place motion "spends craft," and only on real state changes.
- The **waveform animates only while real audio advances** — driven by `useAudioPlayer` + `useAnimationFrame` gated on `isPlaying`, never an idle loop.

**Framer Motion architecture (implementation):**
- Framer Motion is client-only → all animated wrappers carry `"use client"` and live in `components/motion/` (`Reveal`, `Stagger`, `Transition`), composed as children of RSC sections.
- **`LazyMotion` + `domAnimation`** feature bundle loaded once at a client boundary, using `m.*` components → the initial animation bundle is a fraction of the full library; `domMax` only where layout/drag animations are needed (dashboard).
- **`MotionConfig reducedMotion="user"`** at the client root → global reduced-motion; all tokens resolve to instant, honoring Phase 04 §5.3.
- **Scroll:** `whileInView` with `viewport={{ once: true, margin: "-15% 0px" }}`.
- **State change / realtime:** `layout` animations + `AnimatePresence` for list prepends and live→resolved transitions, but **gated by the realtime batcher** to avoid layout thrash; large virtualized lists disable layout animation and use the token cross-fade instead.
- **Variants centralized** in `lib/motion.ts` so every component animates identically.

**Why:** LazyMotion keeps the bundle small (marketing especially); centralizing tokens/variants makes motion consistent and re-timing impossible outside the config; gating realtime animation protects performance and honors the "no jitter" rule.

---

## 14. Performance strategy

Targets: **LCP < 2.0s, CLS 0, INP < 200ms** on marketing; a responsive, virtualized dashboard.

- **RSC-first, minimal client JS** (§4); marketing critical path is HTML + CSS + fonts, no framework JS for the hero.
- **Streaming + Suspense** so shells paint immediately; `loading.tsx` skeletons.
- **PPR** for static-shell-plus-dynamic-hole marketing routes.
- **Virtualization** for all long dashboard lists/tables (windowed rendering) so the live tail stays smooth at volume.
- **Realtime batching** (§6) to protect the main thread.
- **Bundle budgets** enforced in CI per route group; the heavy dashboard client never reaches marketing.
- **Web Vitals** monitored (Speed Insights); regressions block deploys.
- **Turbopack** dev; production build tree-shakes aggressively (LazyMotion, chart lib, icon set are all splittable).

### 14a. Code splitting
- Route-group boundaries create separate bundles (marketing vs dashboard).
- `next/dynamic` for heavy client leaves: `CallPlayer` (audio), charts, `CommandPalette`, dashboard widgets, the drawer.
- `LazyMotion` splits the animation features; the icon set is per-glyph tree-shakeable.
- `ssr: false` only where a component is truly browser-only (audio/canvas), never for content that must be indexed.

### 14b. Caching (Next.js 15 model)
- **Note the Next 15 default:** `fetch`, GET Route Handlers, and client router cache are **not cached by default** — caching is opt-in.
- **Marketing:** statically rendered (SSG) by default; ISR via `revalidate` for content that changes (blog, docs); `generateStaticParams` for known routes; full-route cache served from the edge.
- **Dashboard:** dynamic and per-user (async `cookies()` makes routes dynamic); data cached on the client via TanStack Query, not the RSC cache.
- **`staleTimes`** tuned for the client router cache; `cache: 'force-cache'` / `next.revalidate` only where a fetch is genuinely static.
- **Assets:** immutable, long-max-age, content-hashed via the CDN.

### 14c. Lazy loading
- Below-the-fold marketing sections and all dashboard heavy widgets load on demand (dynamic + Suspense).
- Images lazy by default (`next/image`); the player's audio streams on explicit play (no autoload).
- Intercepting-route drawer code loads on navigation.

### 14d. Asset optimization
- Custom monoline icons as **inline, tree-shakeable SVG components** (no icon-font, no full library) — only used glyphs ship.
- The paper **grain** as a tiny optimized texture or pure CSS, not a large PNG.
- Self-hosted fonts (§9); no render-blocking third parties.
- Brotli compression + edge caching via Vercel; minimal client dependencies on marketing.

### 14e. Image optimization
- `next/image` everywhere: AVIF/WebP, responsive `sizes`/srcset, `priority` only on a genuine LCP image (the landing LCP is text/player, so images are lazy), blur placeholders for product screenshots, `remotePatterns` locked down.
- Product-truth screenshots (Phase 05) exported at the right density and optimized; no stock photography pipeline.

---

## 15. Accessibility strategy

- **Radix behavior + semantic HTML:** correct roles, focus trap/return in dialogs/menus/drawer, keyboard operability everywhere. The reader-facing headings (Phase 03) are real `<h1>…<h2>` in order.
- **Keyboard-first (Phase 08):** the shortcut map, `⌘K` palette, and `j/k`/`/`/`?` are first-class; skip link is the first focusable element.
- **Realtime + screen readers (the critical detail):** live updates are **throttled and summarized** via `useAnnounce` into a polite live region ("3 new calls, 1 handoff") — never row-by-row; operators can mute announcements; only critical alerts use assertive.
- **Reduced motion:** `MotionConfig reducedMotion="user"` → all motion instant; realtime still updates without movement; waveform static.
- **Color independence:** status always carries a text label (handoff-violet + "Handoff"); charts ship a text summary + data-table equivalent; series distinguished by label/pattern.
- **Contrast & targets:** tokens meet AA/AAA in both themes; focus ring ≥3:1/≥2px; targets ≥44px.
- **CI enforcement:** axe run in Playwright on every key surface and in Storybook; violations fail the build.

**Why:** accessibility is an enterprise procurement gate and a brand value; the realtime-SR throttling is the one thing most dashboards get wrong, so it is designed in, not patched.

---

## 16. SEO strategy

(Marketing only; the dashboard is `noindex` and auth-gated.)

- **Metadata API:** `generateMetadata` per route; title/description/canonical. **Resolve the canonical domain** (telebeli.ai vs telebeli.com) with redirects — a hard prerequisite.
- **Real headings:** the Phase 03 reader-facing headings are semantic `<h1>/<h2>` in order — the approval-gate skeleton doubles as the SEO outline. Critical copy is server-rendered (RSC), never client-only.
- **Structured data:** JSON-LD for Organization, Product, and FAQ (the FAQ beat) via typed generators.
- **`sitemap.ts` / `robots.ts`:** generated; dashboard disallowed.
- **Dynamic OG images:** `opengraph-image.tsx` via `ImageResponse` (next/og) — per-page social cards, on brand.
- **Core Web Vitals:** the RSC/static/PPR strategy keeps them green, which is itself ranking-relevant.
- **Comparison/alternative content (Phase 01):** static, indexable pages where the category shops.

**Why:** SEO for this buyer is won on fast, server-rendered, well-structured pages plus the comparison content — all of which the RSC-first architecture delivers natively.

---

## 17. Error boundaries

- **Segment `error.tsx`:** per marketing section and per dashboard widget/feature, so a single failing panel degrades gracefully without taking the page down.
- **`global-error.tsx`:** last-resort full-app boundary.
- **`not-found.tsx`:** honest 404s, on brand.
- **Query error boundaries:** TanStack error/retry states rendered through the Phase 06 `ErrorState` (what happened · why · retry; input preserved; never blames the user).
- **Realtime degraded state:** the connection manager surfaces `reconnecting/degraded` honestly (candor).
- **Reporting:** Sentry with source maps; errors are logged, and the UI still guides recovery.

**Why:** a product that promises "never fail in silence" cannot fail silently in its own UI; per-segment boundaries + honest recovery states make failure legible and non-catastrophic (Phase 02/04/08).

---

## 18. Testing strategy

- **Unit/component:** Vitest + React Testing Library — logic, hooks, component states (including empty/error/loading), token/variant correctness.
- **E2E:** Playwright — critical journeys (marketing scroll-to-demo-to-CTA; dashboard investigate-a-call; live-tail follow/pause; command palette; drawer via intercepting route).
- **Accessibility:** axe in Playwright + Storybook on every key surface; keyboard-path and focus-management tests; reduced-motion behavior asserted.
- **Visual regression:** Storybook + a visual-diff service on the DNA components and both themes — catches drift from the Phase 05 identity.
- **Contract:** Zod schemas validate API/WS payloads in tests; realtime reconcilers tested against fixture streams.
- **Guardrails as tests (candor):** assertions that no fabricated-metric path exists; that error/empty/loading states render; that the reader-headings-only outline still reads (the approval gate) via a snapshot of the heading tree.
- **Type + lint:** `tsc --noEmit`, ESLint 9 (incl. the token/raw-value ban rule), in CI.
- **CI pipeline:** typecheck → lint → unit → build → e2e/axe → visual; bundle-budget and Web-Vitals checks gate the deploy.

**Why:** the tests encode the invariants every prior phase established — accessibility, honest states, visual DNA, and the token discipline — so the system stays true as it grows.

---

## Governance — engineering invariants

1. **Server by default; client on purpose.** Every `"use client"` is justified by state, effect, browser API, or motion.
2. **Tokens only.** No raw hex/px in components; motion only from the Phase 04 config; lint-enforced.
3. **URL is truth for shareable state;** the realtime cache is truth for live data; Zustand only for ephemeral UI.
4. **Realtime is honest and batched;** connection state is always visible; SR announcements are throttled.
5. **No fabricated data path;** every data component ships loading/empty/error; errors guide recovery.
6. **Marketing stays light** (RSC/static/PPR, minimal JS, fonts and images optimized); the dashboard client never leaks to it.
7. **A11y and Web-Vitals gates block deploys.**

*The architecture should feel the way the product promises: fast where it must be seen, honest where it must be trusted, and calm under real load — a Server-first marketing site and a realtime observability dashboard, built from one token system, on Next.js 15.*
