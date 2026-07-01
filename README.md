# TeleBeli

Enterprise B2B AI voice-agent platform — marketing site + dashboard shell.
Built with **Next.js 16 (App Router, Turbopack)**, **React 19**, **Tailwind v4**,
and **shadcn/ui** (new-york / Radix). Dark-first, token-driven, with a single
signature motif: a live **voice waveform** reused across the hero, section
dividers, agent cards, and empty states.

## Getting started

```bash
npm install
npm run dev      # Turbopack dev server on http://localhost:3000
npm run build    # production build (Turbopack)
npm run start    # serve the production build
npm run lint     # eslint (next lint was removed in 16)
```

Node **20.9+** required (built on 22/24). Routes:

- `/` — marketing landing page (route group `(marketing)`)
- `/dashboard`, `/dashboard/{calls,agents,analytics,settings}` — dashboard (route group `(dashboard)`)

## Design system

Tokens live in `src/app/globals.css` under `@theme` (OKLCH throughout):
one violet **primary**, a teal **brand-accent**, semantic color/radius/elevation
tokens, a 1.25 modular type scale (`text-display/h1/h2/h3/lead`), a 4px spacing
rhythm, and soft layered shadows. Dark mode is designed first. Every screen
consumes tokens — no magic hex or arbitrary spacing.

Motion is centralized in `src/lib/motion.ts` (easing `cubic-bezier(0.16,1,0.3,1)`,
durations 150/250/400ms) and composed from four primitives in
`src/components/motion/` (`FadeIn`, `Reveal`, `Stagger`, `Counter`). All reveal
motion is gated behind `prefers-reduced-motion`. Above-the-fold hero entrance is
pure CSS so it never blocks LCP on hydration.

## Dependencies — what and why

| Package | Why it's here |
|---|---|
| `next` / `react` / `react-dom` | Framework + runtime (16.2 / 19.2). |
| `typescript`, `@types/*` | Strict TS (`noUncheckedIndexedAccess`, `noImplicitOverride`). |
| `tailwindcss` + `@tailwindcss/postcss` | v4, CSS-first config via `@theme`. |
| `tw-animate-css` | shadcn's current animation utilities (replaces `tailwindcss-animate`). |
| `clsx` + `tailwind-merge` + `class-variance-authority` | The `cn()` util + variant API shadcn is built on. |
| `lucide-react` | Icon set — the only icon library. |
| `motion` | Framer Motion (`motion/react`). Reveal animations + the `Counter` spring (no separate count-up dep). |
| `lenis` | Smooth scroll — a capability `motion` doesn't provide; disabled under reduced-motion. |
| `next-themes` | Class-strategy dark mode, `defaultTheme="dark"`. |
| `sonner` | Toasts (replaces the deprecated shadcn `toast`). |
| `react-hook-form` + `zod` + `@hookform/resolvers` | The settings form + schema validation. |
| `@tanstack/react-query` | Async cache for dashboard data (calls table, charts). |
| `@tanstack/react-table` | Headless, sortable calls table. |
| `recharts` | Call-volume + latency charts — dynamically imported so it stays out of the marketing bundle. |
| `date-fns` | Tree-shakeable relative timestamps in the calls table. |
| `schema-dts` | Typed JSON-LD (`Organization`, `SoftwareApplication`, `FAQPage`). |
| `geist` | Geist Sans (UI) + Geist Mono (metrics/latency), self-hosted via `next/font`. |
| `@vercel/analytics` + `@vercel/speed-insights` | In root layout; mounted only on Vercel so there's no local 404. |

### Deferred libraries intentionally left out

- `gsap` — `motion` covered every animation; no timeline-heavy sequence needed.
- `three` / `@react-three/fiber` / `drei` — the waveform motif is pure CSS/SVG; WebGL would be ~500KB for no visible gain.
- `lottie-react` — no Lottie assets to ship.
- `@phosphor-icons/react` — lucide had every icon; running two sets is waste.
- `embla-carousel-react` — no carousel outside shadcn was needed.
- `next-sitemap` — the App Router native `sitemap.ts` / `robots.ts` are sufficient.

### Pruned vs. the original spec

- `zustand` — installed per spec, but no global client state was needed
  (local `useState` + react-query covered everything), so it was removed to keep
  `depcheck` clean.

## Verification

- `tsc --noEmit`, `eslint .`, `next build` — all clean, no warnings.
- `npx depcheck` — no unused dependencies.
- Lighthouse (desktop, `/`): **Accessibility 100 · Best Practices 100 · SEO 100**.
- **LCP 311ms · CLS 0.00** — no layout shift; hero paints without waiting on JS.
- Dashboard bundle is code-split from marketing (per-route chunks; recharts lazy).
