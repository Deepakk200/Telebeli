# Telebeli — Design System (v2, systematized)

**Objective:** a reusable, scalable design system — not just an inventory. This version turns the Phase 06 components into a *governed* system: explicit token mapping, per-family usage guidelines, shared consistency contracts, a no-overlap proof, an extension model, and one system that serves **both the marketing site and the dashboard**.

**What changed from v1 (Phase 06):** v1 specified the components; v2 adds the system layers that make them reusable and scalable — Design Token Mapping, Usage Documentation, the five shared Consistency Contracts, the dual-surface model, and the de-duplication matrix. All tokens and behaviors remain locked to Phases 04–05; nothing is redefined.

**Inherits:** Phase 04 (motion/interaction/a11y), Phase 05 v2 (visual tokens + DNA), Phase 06 (per-component states — referenced, not repeated).

---

## 0. System architecture, consistency & scalability

### 0.1 Three-layer token architecture (referenced by everything)
`primitive → semantic → component`. Components reference **only** semantic or component tokens — never a raw primitive. Only **semantic** tokens flip between Light and Operations (dark) themes, so every component themes for free with zero component changes. (Full mapping in §16.)

### 0.2 Naming conventions
PascalCase components; intent-based variants (`primary/handoff/danger`, never "blue"); `sm/md/lg` sizes; fixed state vocabulary (`default/hover/focus/active/disabled/loading/empty/error/selected/open`); `leading/trailing` slots; component tokens `--component-role-variant`. Positive booleans. One convention, whole system.

### 0.3 The five Consistency Contracts (shared rules, obeyed by every member of a family)
These are the answer to "do buttons/cards/forms/tables/nav share rules?" — stated once, referenced by families below.

- **Button Interaction Contract:** one `primary` per view; activate on click/`Enter`/`Space`; `press` feedback (100ms); `loading` locks width + `aria-busy` + blocks re-submit; `disabled` reduces contrast (never hidden); 8px icon gap; ≥44px hit area. *Every button-like control obeys — CTA, icon button, button group, menu/select trigger.*
- **Card Spacing Contract:** interior `24` (dense/evidence `20`); header→body→footer rhythm `16/16`; `--r-md`; `--border-default` hairline; `e1` only when interactive/overlaid; no gradient/glow; hierarchy from type + space. *Every card variant obeys.*
- **Form Validation Contract:** visible `<label>` always (never placeholder-as-label); validate on blur; clear error on correction; preserve input on submit error; one primary submit; prevent double-submit; focus first invalid on submit; errors linked via `aria-describedby`+`aria-invalid`; capture-first (no dead end). *Every input and form obeys.*
- **Table Layout Contract:** header cells sortable = buttons with `aria-sort`; rows = records; mono for data; hairline separators (never shadows); sticky header on scroll; row hover = inspect, row click = detail; sort/reorder is instant (no row animation); status change via `reconcile`; compact → stacked record list; real `<table>` semantics. *Every table obeys — marketing evidence and dashboard alike.*
- **Navigation Unification Contract:** native scroll only; one persistent primary CTA; branch/route changes preserve scroll on return; current location always indicated; skip link is first focusable; ⌘K available with a keyboard; landmark roles; full keyboard operability. *Every nav surface obeys — top nav, dashboard sidebar/topbar, breadcrumbs, footer nav, tabs, command palette — all built on one `NavLink` primitive with one active-state and focus rule.*

### 0.4 Dual-surface model (marketing + dashboard from one system)
The same components serve both surfaces; what differs is a **`density` register** (Phase 05 §6: editorial-airy vs instrument-dense) and the **container** (narrative measure vs full-bleed). Tokens never change between surfaces; only register and variant do.

| Layer | Marketing site | Dashboard | Mechanism |
|---|---|---|---|
| Shared components | Button, Card, Table, Chart, Metric, Tabs, Dialog/Modal, Toast, Alert, Tooltip, Menu, Badge, Status, Forms, Search, Timeline, CallPlayer, Skeleton/Empty/Error | same | one library; `density` + `variant` flex |
| Surface-specific | Hero, Pricing, Testimonials, Integrations, FeatureCard, CandorPanel, Footer (full) | Sidebar, Topbar, Breadcrumb, FilterBar, StatCard, ChartCard, CallDetail | composition of shared primitives |
| Register | `airy` default | `dense` default | prop, not new component |

This is the core scalability proof: adding the dashboard required **no new primitives** — only new *compositions* of existing ones.

### 0.5 Extension model (how to add without overlap)
Before any new component is created, it must pass **the New-Component Test:** *does an existing component, in a new variant or composition, already do this job?* If yes, extend (add a variant/slot); a new component is created only when the **job is genuinely distinct** (see §0.6). New components must: reuse the shared contracts, map to semantic tokens, declare their distinct job, and add no overlap. This test is what keeps the system from sprawling as it grows.

### 0.6 No-overlap / de-duplication matrix
Each component has one job and one job only; near-neighbors are disambiguated here so nothing duplicates.

| Component | Its one job | Not to be confused with |
|---|---|---|
| Badge | static label of a record's state/category | Status (live/dynamic), Tag (removable/selectable) |
| Status | a **live**, changing state (the only pulsing element) | Badge (static) |
| Pill | a shape (999px), used only by Status dot | not a standalone component |
| Tag | removable/selectable metadata (filters, languages) | Badge (not interactive) |
| Dialog | a focused, dismissible task | Modal (blocking) |
| Modal | a blocking decision that must be resolved | Dialog (dismissible) |
| Alert | persistent, contextual in-page message | Toast (transient) |
| Toast | transient confirmation of an action | Alert (persistent) |
| Select | choose a **value** from a set | Menu (choose an action), Tabs (switch views) |
| Menu (Dropdown) | choose an **action** | Select (values) |
| Tabs | switch views of the **same** object | Menu, Select |
| Card | one standalone unit/record | Table row (one of many in a set) |
| Tooltip | brief non-interactive label | Popover/Menu (interactive) |
| CandorPanel | permanent, default-open honesty content | Alert (transient/system) |

---

## Component families

Each family below lists: Purpose · Variants · States · Behavior · Accessibility · Responsive · Motion · Spacing · Usage guidelines. Shared behavior is governed by the §0.3 contracts; families note only specifics. (Granular per-component states: Phase 06.)

### 1. Navigation Components — `Navbar` · `NavLink` · `NavMenu` · `Sidebar` · `Topbar` · `Breadcrumb` · `CommandPalette` · `Tabs`
- **Purpose:** wayfinding across both surfaces; predictable, unified, one-tap escape for the multi-visit committee.
- **Variants:** marketing `Navbar` (branch exits + CTA); dashboard `Sidebar` (sections) + `Topbar` (context, search, account) + `Breadcrumb`; `CommandPalette` (⌘K); `Tabs` (view switch); footer nav (§15).
- **States:** nav `full`/`compact` (scrollY 120px; re-full on up-scroll ≥48px/300ms); link `default/hover/current`; sidebar `expanded/collapsed`; item `active`.
- **Behavior / Motion:** Navigation Unification Contract (§0.3); full↔compact and sidebar collapse via `reconcile`; ⌘K via `enter`/`exit`.
- **Accessibility:** `<nav>` landmarks; `aria-current` for location; skip link first; keyboard-complete; ⌘K = `role="dialog"`+`listbox`.
- **Responsive:** top nav → menu sheet on compact; sidebar → off-canvas drawer on compact/medium; breadcrumbs truncate with a menu.
- **Usage guidelines:** **Do** build every nav surface on the shared `NavLink` (one active/focus rule). **Do** keep exactly one primary CTA. **Don't** hijack scroll, duplicate CTAs, or invent a second active-state style. Use `Tabs` for same-object views; use `Sidebar` for cross-section navigation — never mix the two roles.

### 2. Buttons — `Button` · `IconButton` · `ButtonGroup`
- **Purpose:** the unit of action; carries the Phase 02 CTA lexicon.
- **Variants (intent):** `primary/secondary/ghost/danger`; `IconButton` (labeled); `ButtonGroup` (segmented related actions). Sizes `sm/md/lg`.
- **States:** default/hover/focus/active/disabled/loading (Button Interaction Contract §0.3).
- **Behavior/Motion:** `press` on activate; loading spinner is the one determinate loader.
- **Accessibility:** real `<button>`; `aria-busy` when loading; icon-only requires `aria-label`.
- **Responsive:** `lg` for hero CTAs; may go full-width on compact.
- **Spacing:** §0.3 size scale; 8px icon gap.
- **Usage guidelines:** **Do** use canonical CTA text ("Watch a real call," "Talk to our team," "Book a working session," "Request the security packet," "Send me this estimate"). **Do** limit to one `primary` per view. **Don't** use `danger` for anything non-destructive, invent new colors, or stack competing CTAs.

### 3. Cards — `Card` (+`content/feature/evidence/pricing/testimonial/metric` variants)
- **Purpose:** hold one coherent unit — a record, not a tile.
- **Variants:** by content type; `interactive` (whole card actionable). `density: airy|dense`.
- **States:** default/hover (interactive = reveal evidence, not lift-glow)/focus/selected/loading/empty/error.
- **Behavior/Motion:** `enter` on scroll-in (once); `hover-reveal` for evidence.
- **Accessibility:** one clear focusable action; no nested clickables; internal heading structure.
- **Responsive:** single column on compact; evidence cards prioritize key data.
- **Spacing:** Card Spacing Contract (§0.3).
- **Usage guidelines:** **Do** use a card for one standalone unit; use a Table for many comparable records. **Don't** put gradients, glows, or decorative icons on a card, or use a card as a generic feature-brag tile (removed in Phase 03).

### 4. Forms — `Form` · `Field` · `Input` · `Textarea` · `Select` · `Checkbox` · `Radio` · `Toggle` · `Slider` · `FieldError`
- **Purpose:** collect input honestly; never a dead end.
- **Variants:** field types above; `Field` = label+control+help/error wrapper.
- **States:** editing/validating(on blur)/submitting/success/error (Form Validation Contract §0.3).
- **Behavior/Motion:** blur validation; `reconcile` on checkbox/toggle/slider change; focus first invalid on submit.
- **Accessibility:** labels always; `aria-describedby`/`aria-invalid`; error summary for many errors; group with `fieldset/legend`; ≥44px targets.
- **Responsive:** single-column stack on compact; slider gets large thumb + typed fallback.
- **Spacing:** label→control 8px; control→help/error 4px; field→field 20/24.
- **Usage guidelines:** **Do** validate on blur, preserve input, capture-first (offer "send me this" even on abandon). **Don't** use placeholder as label, nag on keystroke, or gate a pricing estimate behind a "calculate" button (transparency is the point).

### 5. Tables — `Table` (+`compact/selectable`) · `Table.Row/Cell/HeaderCell`
- **Purpose:** the evidence surface — many comparable records (the calls list).
- **Variants:** `default/compact/selectable`; `density: dense` in dashboard.
- **States:** loading (skeleton rows)/empty (useful)/error/row-hover (inspect)/row-selected/sorted.
- **Behavior/Motion:** Table Layout Contract (§0.3); `reconcile` when a row's status updates; instant sort (no row animation).
- **Accessibility:** real table semantics, `scope`, `aria-sort`; sortable headers are buttons; keyboard row actions.
- **Responsive:** stacked record list on compact (key fields + tap-to-inspect), never a shrunk grid.
- **Spacing:** row height by `density`; cell padding `12/16`; hairline separators.
- **Usage guidelines:** **Do** use a Table for a set of comparable records; use Cards for a few standalone units. **Do** keep data in mono. **Don't** use shadows to separate rows, or animate rows on sort.

### 6. Charts — `Chart` (`Line/Area/Bar/Sparkline`)
- **Purpose:** show the shape of data honestly (volume, latency, score trend).
- **Variants:** line/area/bar/sparkline; `sparkline` embeds in Metric/row.
- **States:** loading/loaded/empty/error; point hover/focus reveals exact mono values.
- **Behavior/Motion:** `enter` draw-in once; `reconcile` on update; no looping, no 3D, no decorative gradient.
- **Accessibility:** text summary + accessible data-table equivalent; series distinguished by label/pattern, not color alone.
- **Responsive:** fewer ticks/labels on compact; legibility over prettiness.
- **Spacing:** consistent plot insets; axis labels in `label`/mono.
- **Usage guidelines:** **Do** show real or clearly-labeled demo data (candor). **Don't** fabricate figures, add chartjunk, or use a data-encoding gradient as decoration.

### 7. Hero Components — `Hero` · `Hero.Actions` · `Hero.Media`
- **Purpose:** Beat 0 — understood in <5s; positioning line leads, growth line supports; embeds the proof device.
- **Variants:** marketing hero (with `CallPlayer`/`Timeline`); a lighter dashboard page-header uses `Topbar`/`PageHeader` instead (not this component).
- **States:** static headline (paints immediately, single `enter` settle).
- **Behavior/Motion:** primary CTA arms the demo; no autoplay; no scroll gimmick; one quiet settle only.
- **Accessibility:** single `<h1>`; real CTA controls; demo reachable.
- **Responsive:** headline clamps 56→40→32; CTAs stack/full-width on compact.
- **Spacing:** generous (airy register); measure-capped subhead.
- **Usage guidelines:** **Do** lead with the positioning line and one primary CTA. **Don't** stagger the headline, autoplay audio, or add a bouncing scroll cue.

### 8. Dashboard Components — `Dashboard` · `StatCard` · `ChartCard` · `FilterBar` · `CallDetail` · `PageHeader` · `CallPlayer` · `Timeline`
- **Purpose:** the observability surface (Beats 3–4) — live calls, transcripts, scores; instrument-dense.
- **Variants:** `StatCard` (Metric variant), `ChartCard` (Card+Chart), `FilterBar`, `CallDetail` (Dialog), `Dashboard` (Tabs + Table + Metric + Chart).
- **States:** loading (skeletons)/loaded/empty/error; live→resolved reconcile; regression surfaces with a `flag` marker.
- **Behavior/Motion:** hover inspect, click detail; `reconcile` for state/regression; all data real or labeled demo.
- **Accessibility:** table semantics, live-region status, keyboard drill-in.
- **Responsive:** prioritized columns + tap-to-inspect on compact; full density on expanded.
- **Spacing:** dense register; hairline structure; mono data.
- **Usage guidelines:** **Do** compose from shared primitives (Card/Table/Chart/Metric/Tabs) — no new primitives. **Do** carry ≥2 DNA signatures (Timeline, event markers, mono, handoff-violet). **Don't** decorate; density is the credibility.

### 9. Dialogs — `Dialog` (`Dialog.Header/Body/Footer`)
- **Purpose:** a focused, dismissible task (booking, request packet, call detail).
- **Variants:** form dialog, detail dialog.
- **States:** opening/open/closing.
- **Behavior/Motion:** focus trapped; returns focus on close; `Esc`/click-outside closes; background inert; `enter`/`exit`.
- **Accessibility:** `role="dialog"`+`aria-modal`, labelled by title.
- **Responsive:** full-screen sheet on compact.
- **Spacing:** header/body/footer rhythm; footer actions right-aligned, one primary.
- **Usage guidelines:** **Do** use for tasks the user can abandon. **Don't** use a Dialog when a decision must be forced — that's a Modal (§10).

### 10. Modals — `Modal`
- **Purpose:** a **blocking** decision that must be resolved (e.g., destructive confirm).
- **Variants:** confirm, destructive-confirm (`danger` primary).
- **States:** open/closing.
- **Behavior/Motion:** blocks interaction until resolved; may require an explicit choice (not just `Esc`); `enter`/`exit`; permitted glass backdrop.
- **Accessibility:** `role="dialog"`+`aria-modal`; focus trapped; clear labelled actions.
- **Responsive:** centered; sheet on compact.
- **Spacing:** as Dialog.
- **Usage guidelines:** **Do** reserve for genuinely blocking decisions (rare). **Don't** use a Modal for anything the user could safely dismiss — prefer a Dialog to respect their flow.

### 11. Badges — `Badge` · `Status` · `Tag`
- **Purpose:** make record state legible; distinguish static (Badge), live (Status), interactive metadata (Tag).
- **Variants:** Badge (`live/resolved/handoff/flag/neutral`, `ScoreBadge` mono); Status (`dot`, `dot+label`); Tag (`static/removable/selectable`).
- **States:** Badge static; Status live (the only pulsing element, real-state-only); Tag default/hover/selected/removable.
- **Behavior/Motion:** Status `dot` pulses only when genuinely live; `reconcile` on state change.
- **Accessibility:** color never sole signal — always a text label; Tag ✕ is a labeled button; selectable Tag uses `aria-pressed`.
- **Responsive:** unchanged; wrap gracefully.
- **Spacing:** height 20px, padding-x 8px, `--r-sm` (Badge/Tag), pill only for Status dot.
- **Usage guidelines:** **Do** use Badge for static state, Status for live, Tag for filters. **Don't** pulse a Badge, or rely on color alone (handoff-violet always accompanies a "Handoff" label).

### 12. Tooltips — `Tooltip`
- **Purpose:** brief, supplemental, non-essential label on hover/focus.
- **Variants:** label tooltip only (interactive content → Popover/Menu).
- **States:** hidden/shown.
- **Behavior/Motion:** hover 60ms / focus 0ms; `Esc` dismiss; `hover-reveal`; never traps.
- **Accessibility:** `aria-describedby`; keyboard-reachable; never the sole source of critical info.
- **Responsive:** on touch, the described control exposes the info via tap-to-inspect instead.
- **Spacing:** compact padding; single line preferred.
- **Usage guidelines:** **Do** use for a short clarifier. **Don't** put actions, links, or essential-only information in a Tooltip.

### 13. Dropdowns — `Menu` (actions) · `Select` (values) · `MenuItem/Group/Separator`
- **Purpose:** compact choice — Menu for actions, Select for values (kept distinct per §0.6).
- **Variants:** Menu (`actions/context/nav`, with groups, separators, destructive items, shortcut hints in mono); Select (native on touch, listbox on desktop).
- **States:** closed/open/item-hover/item-focus/selected/disabled.
- **Behavior/Motion:** `↑↓` navigate, `Enter` activate, `Esc` close (return focus), click-outside close, viewport-aware position; `enter`/`exit`.
- **Accessibility:** Menu `role="menu"`; Select `role="listbox"`; trigger `aria-expanded`/`haspopup`; focus managed.
- **Responsive:** Select → native on touch; Menu anchors within viewport.
- **Spacing:** item height per size scale; group padding; hairline separators.
- **Usage guidelines:** **Do** use Select to pick a value, Menu to pick an action, Tabs to switch views. **Don't** blur these three roles into one control.

### 14. Pricing Components — `PricingSection` · `PlanCard` · `PricingCalculator`
- **Purpose:** transparent commercial clarity (Beat 9).
- **Variants:** `PlanCard` default/`highlighted` (one only); `PricingCalculator` (Sliders → live mono estimate → capture).
- **States:** calculator live-updates on input; estimate → email capture; enterprise plan → "Talk to our team."
- **Behavior/Motion:** no gated calculate button; `reconcile`/instant estimate update (no count-up).
- **Accessibility:** plans readable in order; calculator per Slider/Form contracts.
- **Responsive:** plans stack on compact; sliders thumb-sized + typed fallback.
- **Spacing:** Card Spacing Contract; price in mono.
- **Usage guidelines:** **Do** state "by the second, no hidden stack"; one highlighted plan. **Don't** inflate savings, hide the number, or add fake urgency.

### 15. Footer Components — `Footer` · `FooterColumn` · `FooterNav`
- **Purpose:** complete, honest site index + trust/company/legal (fixes Phase 01 dead links).
- **Variants:** full marketing footer; minimal app footer (dashboard).
- **States:** static.
- **Behavior:** every link resolves — no dead links, ever; includes "an initiative of Sagenex Group," status link, legal (DPA/Privacy/Terms).
- **Accessibility:** `<footer>` landmark; grouped nav lists (Navigation Unification Contract).
- **Responsive:** columns stack; accordion on compact optional.
- **Spacing:** generous top margin (major section rhythm); column gaps consistent.
- **Usage guidelines:** **Do** keep it complete and truthful (a trust signal). **Don't** ship a footer with a single dead link.

---

## 16. Design Token Mapping

Every component token resolves through **semantic → primitive**. Only the semantic layer themes (Light ↔ Operations). Components never touch primitives.

### 16.1 Layer definition
- **Primitive:** raw, immutable choices — `--color-blue-500`, `--space-24`, `--radius-8`, `--dur-240`, `--ease-decelerate`, `--font-serif`.
- **Semantic:** meaning + theme-aware — `--accent`, `--ink`, `--surface`, `--paper`, `--hairline`, `--state-handoff`, `--elevation-1`, `--text-display`, `--transition-enter`.
- **Component:** local mapping — `--button-primary-bg`, `--card-border`, `--input-focus-ring`.

### 16.2 Mapping (representative — the pattern applies system-wide)

| Component token | → Semantic | → Primitive (Light) | Themes? |
|---|---|---|---|
| `--button-primary-bg` | `--accent` | `blue 0.48 0.13 250` | yes |
| `--button-primary-fg` | `--on-accent` | `paper 0.985…` | yes |
| `--button-primary-bg-hover` | `--accent-ink` | `blue 0.38…` | yes |
| `--button-secondary-border` | `--border-default` | `ink @12%` | yes |
| `--card-bg` | `--surface` | `0.995…` | yes |
| `--card-border` | `--border-default` (`--hairline`) | `ink @10–12%` | yes |
| `--card-radius` | `--r-md` | `8px` | no |
| `--card-pad` | `--space-24` | `24px` | no |
| `--card-elevation` | `--elevation-1` | `0 1px 2px ink/6%` | yes (dark→lightness) |
| `--input-border` | `--border-default` | `ink @12%` | yes |
| `--input-focus-ring` | `--accent` | `blue…` | yes |
| `--input-error` | `--state-flag` | muted clay | yes |
| `--row-separator` | `--hairline` | `ink @10%` | yes |
| `--row-hover-bg` | `--accent-wash` | `accent @8%` | yes |
| `--badge-handoff` | `--state-handoff` | muted violet | yes |
| `--status-live` | `--state-live` | calm amber | yes |
| `--metric-value-font` | `--text-evidence` | `mono 13/1.5` | no |
| `--transition-enter` | `--dur-240`/`--ease-decelerate` | `240ms`/cubic-bezier | no |

**Rule:** if a component needs a value, it defines a component token that maps to a semantic token. A component that references a primitive or a hex directly fails review. This single rule is what makes the system themeable, consistent, and impossible to drift into a generic template one careless value at a time.

---

## 17. Usage Documentation

### 17.1 Composition patterns (how components combine)
- **Form** = `Form` › `Field`(`Input`/`Select`/`Slider`) › `Button`(primary submit) › `Toast`(success)/`ErrorState`(failure).
- **Dashboard** = `Tabs` › (`Table` + `StatCard` + `ChartCard`) › row-`hover-reveal` › `Dialog`(CallDetail) › `CallPlayer` + `Timeline`.
- **Pricing** = `PricingSection` › `PlanCard`×N (one `highlighted`) + `PricingCalculator`(`Slider`→`Metric`→capture `Form`).
- **Proof** = `CallPlayer` + `Timeline` + `Transcript`, feeding the `Dashboard` (a played call becomes an inspectable record).
- **CTA pattern per beat:** use the Phase 02 lexicon; one primary per surface; enterprise → "Talk to our team," curiosity → "Watch a real call."

### 17.2 When-to-use decision guides (resolving the common ambiguities)
- **Card vs Table:** one standalone unit → Card; many comparable records → Table.
- **Dialog vs Modal:** dismissible task → Dialog; forced decision → Modal.
- **Alert vs Toast:** persistent contextual message → Alert; transient confirmation → Toast.
- **Select vs Menu vs Tabs:** pick a value → Select; pick an action → Menu; switch views of one object → Tabs.
- **Badge vs Status vs Tag:** static state → Badge; live state → Status; interactive metadata → Tag.
- **Tooltip vs Popover:** brief label → Tooltip; interactive content → Popover.

### 17.3 Do / Don't (system-wide)
- **Do** reference semantic tokens; reuse a variant before inventing a component; carry ≥2 DNA signatures on any surface; ship loading/empty/error for every data component; keep one primary action per view; keep data in mono.
- **Don't** hardcode a value; duplicate an existing job; use color as the sole signal; fabricate a metric or logo; add decorative motion; blur a component's single role.

### 17.4 Contribution & governance
1. Run the **New-Component Test** (§0.5) before creating anything; extend > add.
2. New components declare their **distinct job** (add a row to the §0.6 matrix) and reuse the relevant **Consistency Contract**.
3. Map to **semantic tokens** only (§16); no primitives, no hex.
4. Ship all applicable **states** (loading/empty/error included) and **reduced-motion** parity.
5. Prove **dual-surface** fit (register/variant, not a fork) or justify surface-specificity.
6. Every data-backed or claim-bearing component honors **candor** (real/labeled data, sourced metrics, real testimonials, no invented logos).

*The system is reusable because every component obeys shared contracts and semantic tokens; it is scalable because new needs are met by composition and variants, not by new primitives; and it stays Telebeli because the DNA and candor are built into the parts, not painted on after.*
