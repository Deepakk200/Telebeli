# Telebeli

Enterprise B2B AI voice-agent platform — marketing site + dashboard shell.
Built with **Next.js 16 (App Router, Turbopack)**, **React 19**, **Tailwind v4**,
and **shadcn/ui** (Radix). Light-first, token-driven marketing surface with a
single signature motif — a live **voice waveform** — and a dark "operations
mode" dashboard.

## Getting started

```bash
npm install
npm run dev              # Turbopack dev server on http://localhost:3000
npm run build            # production build (Turbopack)
npm run start            # serve the production build
npm run lint             # eslint
npm run typecheck        # tsc --noEmit
npm run test             # vitest unit project
npm run e2e              # Playwright end-to-end tests
npm run storybook        # Storybook on http://localhost:6006
```

Node **20.9+** required. Routes:

- `/` — marketing landing page (route group `(marketing)`)
- `/security` — security & trust page
- `/dashboard`, `/dashboard/{calls,agents,analytics,settings}` — dashboard
  (route group `(dashboard)`)

## Environment variables

**None required.** The app runs with zero configuration. The only environment
read is `process.env.VERCEL` (set automatically by Vercel) which gates
`@vercel/analytics` + `@vercel/speed-insights` so they never 404 locally.
There are no secrets in this repository; `.env*` is gitignored should any be
introduced later.

## The Twilio + OpenAI Realtime flow

The platform section (`src/components/landing/platform-capabilities.tsx`)
presents the product's call architecture as an SVG system diagram:

1. **Caller / User** — receives or answers a phone call.
2. **Twilio Voice** — handles the call on a Twilio number and streams call
   audio via Media Streams (WebSocket).
3. **Node.js + Express WebSocket bridge** — relays caller audio to OpenAI and
   assistant audio back to Twilio.
4. **OpenAI Realtime API** — processes caller audio, understands intent, and
   generates the assistant's voice response in real time.
5. **Storage / tools fan-out** — recordings, notes, summaries, and CRM tasks
   are saved when requested.

This repository is the **marketing site and dashboard shell** for that
product: the diagram documents the architecture, and the dashboard renders
labeled demo data. No live telephony backend, Twilio SDK, or OpenAI key is
part of this codebase — which is why no env vars are needed.

## Design system

Tokens live in `src/app/globals.css` under `@theme` (OKLCH throughout): a cool
lavender-white paper + near-navy ink **Light** palette (the marketing theme),
a blue→violet brand gradient for the headline accent and primary CTA, semantic
call-state colors (live/resolved/handoff/flag), hairline borders, a tight
4/8/12px radius scale, and fluid type + section-rhythm scales via `clamp()`.
`.dark` is a true second theme ("operations mode") used by the dashboard.

Type is a tri-voice system, self-hosted via `next/font`: **Poppins**
(marketing display, the hero LCP face), **Instrument Sans** (body/UI),
**JetBrains Mono** (evidence/metrics), with Source Serif 4 retained for
editorial use.

Motion is centralized in `src/lib/motion.ts` (easing
`cubic-bezier(0.16,1,0.3,1)`, durations 150/250/400ms) and composed from
primitives in `src/components/motion/` (`FadeIn`, `Reveal`, `Stagger`,
`Counter`). All reveal motion respects `prefers-reduced-motion`; the
above-the-fold hero entrance is pure CSS so it never blocks LCP on hydration.

## Dependencies — what and why

| Package | Why it's here |
|---|---|
| `next` / `react` / `react-dom` | Framework + runtime (16.2 / 19.2). |
| `typescript`, `@types/*` | Strict TS (`noUncheckedIndexedAccess`, `noImplicitOverride`). |
| `tailwindcss` + `@tailwindcss/postcss` | v4, CSS-first config via `@theme`. |
| `tw-animate-css` | shadcn's animation utilities (replaces `tailwindcss-animate`). |
| `clsx` + `tailwind-merge` + `class-variance-authority` | The `cn()` util + variant API shadcn is built on. |
| `radix-ui` | Primitive layer under the shadcn components (dialog, sheet, menu, …). |
| `lucide-react` | Icon set — the only icon library. |
| `motion` | Framer Motion (`motion/react`) — reveals + the `Counter` spring. |
| `next-themes` | Class-strategy theming (light marketing / dark operations). |
| `sonner` | Toasts. |
| `react-hook-form` + `zod` + `@hookform/resolvers` | The settings form + schema validation. |
| `@tanstack/react-query` | Async cache for dashboard data. |
| `@tanstack/react-table` | Headless, sortable calls table. |
| `recharts` | Call-volume + latency charts, kept out of the marketing bundle. |
| `date-fns` | Tree-shakeable relative timestamps in the calls table. |
| `schema-dts` | Typed JSON-LD (`Organization`, `SoftwareApplication`, `FAQPage`). |
| `@vercel/analytics` + `@vercel/speed-insights` | Mounted only when `VERCEL` is set, so there's no local 404. |

Note: `depcheck` flags `tw-animate-css`, `tailwindcss`, `@tailwindcss/postcss`,
and the Storybook addons as unused — all false positives (CSS `@import`,
PostCSS config, and `.storybook/main.ts` respectively).

## Verification

- `npm run typecheck`, `npm run lint`, `npm run build` — clean.
- `scripts/check-contrast.mjs` — WCAG AA contrast gate over the token palette.
- `scripts/check-bundle.mjs` — marketing-bundle budget check.
- Storybook (`npm run storybook`) with a11y + vitest addons; Playwright e2e
  with `@axe-core/playwright` accessibility assertions.
