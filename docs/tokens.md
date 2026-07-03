# Token & Component Conventions

Single source of truth for how the design system is named and consumed.
Enforced by ESLint (see `eslint.config.mjs`): raw hex colors and raw-px
arbitrary values are banned in the token-only zones (`components/ui`,
`components/motion`, `lib`); `landing/` and `dashboard/` join as their
milestones rebuild them.

## Token layers

1. **Primitives** (`globals.css :root` / `.dark`) — the approved identity:
   `--paper` `--surface` `--sunken` `--ink` `--ink-muted` `--ink-faint`
   `--hairline` · `--accent` `--accent-ink` `--accent-wash` ·
   `--state-live` `--state-resolved` `--state-handoff` `--state-flag` ·
   `--border-subtle/default/strong` · `--r-0/sm/md/lg` · e1/e2/e3 shadows.
   Only this layer flips per theme (`.dark` = operations mode).
2. **Semantic layer** (shadcn names) — `--background` `--card` `--primary`
   `--muted` `--destructive` … resolve *from* primitives via `var()`.
   Components consume this layer (or primitive utilities), never raw values.
3. **Utilities** — Tailwind `@theme inline` maps both layers to classes:
   `bg-paper` `text-ink-muted` `border-hairline` `text-state-live`
   `shadow-subtle|elevated|floating` `rounded-sm|md|lg` `text-display…evidence`.

## Naming

- **Components:** PascalCase files export PascalCase components; one module =
  one barrel (no deep imports — `@/components/ui/icon`, never `…/icon/glyphs`).
- **Variants are intent, not appearance:** `primary | secondary | ghost |
  danger` (Button), `live | resolved | handoff | flag | neutral` (Badge) —
  never `blue` or `outline-ish`. Declared with **cva** + merged with **cn**;
  that pair is the standard variant helper.
- **Sizes:** `sm | md | lg` on the control scale (32/40/48). No off-scale
  one-offs.
- **State vocabulary:** `default / hover / focus / active / disabled /
  loading` for controls; `live / paused / resolved` for Status; call states
  use the evidence palette names.
- **Component tokens** (when a component needs its own): `--component-role-variant`
  (e.g. `--button-bg-primary`) — added only when a value is reused, never
  speculatively.

## Rules of consumption

- Color = information: neutrals + one accent + the four evidence states.
  A state color always ships with a text label (never color alone).
- Radius from `--r-*` only; full pill reserved for the Status dot.
- Depth: hairlines first; e1 only when interactive, e2 popover, e3 modal.
  No glow, anywhere, ever.
- Motion through `lib/motion.ts` tokens (`enter/reconcile/press/exit/hover-reveal`).
- Durations in ms and `calc()` expressions are fine; `[NNpx]` arbitraries and
  `#hex` are lint errors — reach for the scale or add a token instead.
