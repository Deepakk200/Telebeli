# Build notes — strategy realignment

> `docs/research.md` and `docs/product.md` were not present in the repo at build
> time, so this pass worked from the strategy embedded in the punch-list (north
> star "voice AI you can see working"; pillars: reliability, handoff, visibility,
> self-serve enterprise power; non-goals: never headline latency or voice
> fidelity). Every invented number carries a `[verify]` comment in source.
> Baseline for comparison = the generic Retell/Synthflow "answer every call" page.

## Rubric advantage per section (≥2 dimensions vs baseline)

| Section | Beats baseline on |
|---|---|
| **Hero** (`hero.tsx` + `live-console.tsx`) | **Differentiation** — leads on "watch it working," not the category-generic "answer every call"; **Value clarity** — a live call→handoff console shows the product instead of describing it. |
| **Reliability** (`reliability.tsx`) | **Differentiation** — names the unspoken failure mode ("it doesn't break on call #5,000"); **Credibility** — concrete proof cards, no vanity latency stat. |
| **Handoff** (`handoff.tsx`) | **Value clarity** — an annotated warm-transfer artifact (transcript + intent + context); **Trust** — promotes the enterprise trust moment competitors bury as feature #4. |
| **Product tour** (`product-tour.tsx`) | **Proof** — shows the actual dashboard (live calls / transcripts / analytics), no demo wall; **Differentiation** — reinforces visibility, the memory-test claim. |
| **Pricing calculator** (`pricing-calculator.tsx`) | **Value clarity** — one honest number, billed by the second; **Trust** — transparency itself is the pitch, sourced from the published tiers. |
| **Security page** (`/security`) | **Trust** — plain-language certs, data handling, access, subprocessors; **Completeness** — a surface most self-serve competitors skip entirely. |

## Credibility guardrails applied (P0)
- Fabricated metrics (`128ms`, `99.98%`, `41M+`, `87%`) removed; reframed to
  visibility/reliability claims under an "Illustrative — pre-GA benchmarks" caption,
  each value `[verify]`-flagged. Latency dropped from the metrics band per non-goals.
- Fake customer logos replaced with an honest industry-category row (no invented
  names, no unsourced volume claim).
- Banned-copy sweep clean: `grep -rniE` of the ban list over `src` returns nothing
  ("seamless" removed from the hero).

## Verification (P3)
- `tsc --noEmit`, `eslint .`, `next build`, `depcheck` — all clean.
- Lighthouse (desktop `/`): Accessibility 100, Best Practices 100, SEO 100.
- CLS 0.00. LCP ~1.6s on a settled run (< 2.0s); the page DOM is large, so the
  Product Tour is a candidate for `next/dynamic` lazy-loading on slower networks.
- Reduced motion: the `prefers-reduced-motion` block in `globals.css` neutralizes
  `animate-enter` / `animate-wave` / `pulse-ring`; the live console renders its
  final static frame (guarded by `use-prefers-reduced-motion`).
