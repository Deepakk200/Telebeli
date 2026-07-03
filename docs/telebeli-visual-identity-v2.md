# Telebeli — Visual Identity System (v2)

**Objective:** a premium enterprise visual identity, recognizable without the logo. This version adds the layer the Approval Gate demands — the **signature elements (Visual DNA)** that make the UI unmistakably Telebeli — and consolidates the system into the eleven requested deliverables.

**What changed from v1:** v1 defined the *ingredients* of distinctiveness; it never declared the *fingerprints*. v2 names them (§0), proves the logo-removed gate, makes the type scale logic and composition balance explicit, and states the "not Synthflow" position directly. All tokens remain identical to v1 — this is a sharpening, not a redesign.

**Locked to prior phases:** Accountable Voice AI; **watch · score · prove**; calm conviction, not adrenaline; candor and restraint; Phase 04 motion timing is fixed and only dressed here.

---

## 0. Visual DNA — the signature elements

The identity rests on a small set of ownable fingerprints. Any two of these, seen together, should read as Telebeli with no logo present. This is the soul of the system; everything else serves it.

**DNA-1 — The annotated record (the primary signature).**
A precise horizontal **call timeline**: a hairline baseline carrying event markers — *live · resolved · handoff · flag* — with scores annotated in mono. It is the hero device, the section divider, the shape inside evidence cards, and the spine of the dashboard. It literally draws watch · score · prove. No one else in the category has it. If one element had to survive, this is it.

**DNA-2 — The event marker (the brand atom).**
A single small glyph — a filled node on a line — that appears **everywhere an event happens on the record** (a call resolved, a regression flagged, a human brought in). It is Telebeli's "bullet": a mark that always means *an event occurred, and here is its record*. Repeated at every scale, it becomes a recognizable atom.

**DNA-3 — Monospace as the voice of evidence.**
Every record — call IDs, scores, timestamps, latency, transcripts — is set in mono, inline within otherwise editorial pages. The sight of mono-tagged data threaded through serif-and-sans copy is a distinctive, repeatable tell.

**DNA-4 — Semantic violet = handoff, and only handoff.**
The category's decorative default color is reclaimed as a precise signal. That specific muted violet mark *always* means "a human was brought in," and appears nowhere else. Consistency of meaning becomes a visual fingerprint.

**DNA-5 — Warm paper, ink, and hairlines (light-first).**
Ink on warm off-white with a fine grain, organized by 1px hairlines rather than cards-and-shadows — a ruled, editorial-ledger surface. In a category of dark glowing gradients, being *warm, light, ruled, and matte* is itself recognizable.

**DNA-6 — Editorial serif headlines, sentence case.**
A transitional serif speaking in calm sentence case — the voice of a serious publication, not a shouty all-caps sans. Almost no AI-SaaS uses a serif; it reads instantly as "authored, not templated."

**The DNA rule:** every screen must carry **at least two DNA elements**. A screen with none is generic by definition and does not ship.

---

## 1. Typography

**Tri-voice system** — three families, one job each; the pairing is a signature (§0 DNA-3, DNA-6).
- **Editorial serif** — display/headlines/pull-quotes. Direction: Signifier / Tiempos / GT Sectra class.
- **Precise sans (not Inter/Geist)** — all UI and body. Direction: Söhne / ABC Diatype / Suisse Int'l class.
- **Technical mono** — all evidence (IDs, scores, timestamps, transcripts). Direction: Söhne Mono / Berkeley Mono class.

### Scale (base 16px) — hand-tuned, ~1.25–1.33 progression with optical correction
The scale is intentionally hand-set (a near-major-fourth progression, adjusted by eye at each step) rather than a rigid ratio — consistent in logic, editorial in feel.

| Token | Size | Line | Family | Weight | Tracking | Use |
|---|---|---|---|---|---|---|
| `display` | 56 | 1.05 | serif | 440 | −0.02em | hero, beat headlines |
| `h1` | 40 | 1.10 | serif | 440 | −0.015em | major headings |
| `h2` | 30 | 1.15 | serif | 460 | −0.01em | section headings |
| `h3` | 22 | 1.25 | sans | 560 | −0.005em | sub-heads, card titles |
| `lead` | 20 | 1.55 | sans | 420 | 0 | lead paragraphs |
| `body` | 16 | 1.60 | sans | 420 | 0 | default copy |
| `body-sm` | 14 | 1.55 | sans | 420 | 0 | secondary copy |
| `label` | 12 | 1.35 | sans | 560 | +0.06em, uppercase | eyebrows, meta |
| `evidence` | 13 | 1.50 | mono | 440 | 0 | records / data |

**Rules:** three weights per family maximum (sans 420/560/640; serif 440/540; mono 440/540); body measure capped at **66–72 characters**; **tabular lining numerals** for all data; sentence case headings; uppercase only for small `label` eyebrows; no gradient text, no text-shadow, no letter-spaced body.
**Review checks:** hierarchy is unambiguous (serif display → sans structure → mono evidence); readable (measure + AAA body contrast); enterprise (editorial + precise); scale consistent (one documented progression).

---

## 2. Spacing

**Base unit 4px.** Scale: `2 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128 · 160`.
- Vertical spacing snaps to an **8px baseline grid**; line-heights sit on it so pages feel *set*.
- **Rhythm by repetition:** the same few gaps recur; no bespoke spacing per section.
- **Section spacing (beat rhythm):** between beats `128` (expanded) / `96` (medium) / `80` (compact); major transitions `160`; within a beat `heading→body→evidence = 24 → 16 → 32`.
- Optical correction overrides math where perception disagrees.

---

## 3. Grid

- **12 columns, 24px gutter** (expanded). Narrative uses a centered **measure**, not the full grid.
- **Containers:** text `720` · content `1120` · wide/evidence `1320` (max px). Full-bleed permitted **only** for evidence surfaces.
- **Page margins:** `24` (compact) / `48` (medium) / `64` (expanded), widening on very large screens rather than letting content sprawl.
- **Composition balance:** narrative is **left-anchored** to a single strong edge (editorial); centered layout is reserved for the hero and short standalone statements. Balance is **asymmetric**, achieved with whitespace and the horizontal timeline motif as an anchoring line — never mirror-symmetry for its own sake. **One dominant focal element per screen**; secondary content yields to it.

---

## 4. Color System

**Principle: color is information, not decoration** (§0 DNA-4/DNA-5). Neutral foundation; one scarce accent; a small semantic palette where color *means* a call state; saturation appears nowhere else.

### Foundation (warm neutrals — never pure black/white)
| Token | Light (OKLCH) | Role |
|---|---|---|
| `--paper` | `0.985 0.004 85` | page bg (with fine grain) |
| `--surface` | `0.995 0.003 85` | cards / raised |
| `--sunken` | `0.965 0.005 85` | wells, evidence rows |
| `--ink` | `0.22 0.01 55` | primary text |
| `--ink-muted` | `0.45 0.01 60` | secondary |
| `--ink-faint` | `0.60 0.008 60` | captions |
| `--hairline` | ink @ 10% | primary structure |

### Accent (one, scarce)
`--accent` `0.48 0.13 250` (ink-blue) — links, primary action, focus, selection. `--accent-ink` `0.38 0.14 250` pressed. `--accent-wash` accent @ 8%. **Used sparingly**; a page has few accent marks.

### Semantic evidence palette (muted, editorial — the only saturated colors)
`--state-live` calm amber · `--state-resolved` muted green · `--state-handoff` **muted violet (reclaimed, handoff only)** · `--state-flag` muted clay · missed = `--ink-muted`.

### Gradients
Banned as decoration. Permitted only for imperceptible surface warming and data-encoding in visualizations. Never text, hero, or glow.

### Contrast
Body ≥ `7:1` (editorial legibility as trust); all text ≥ `4.5:1`; UI/large ≥ `3:1`; state colors tuned to meet contrast on their own surface in both modes.

### Dark mode strategy — "operations mode"
A true second theme, not an inversion: deep **warm slate** (`--paper 0.17 0.008 260`), soft paper-white ink (`0.94`), elevation by surface-lightness not shadow, accent lifted (`0.62 0.14 250`), state colors `~+0.1 L`. No pure black, no neon, **no glow**. Thematically the calm of a 24/7 night shift. Semantic tokens flip; components never change.

**Review checks:** palette is limited (neutrals + one accent + four semantic states); contrast is accessible and specified; accent is intentional and scarce; dark mode is a defined strategy, not an afterthought.

---

## 5. Elevation

**Depth model: paper and ink — no glow.** Surfaces lift like paper; separation is mostly hairline.

| Level | Use | Light shadow | Dark |
|---|---|---|---|
| `e0` | base surface | none — hairline separation | none |
| `e1` | raised/interactive card | `0 1px 2px ink/6%, 0 1px 1px ink/4%` | surface-lightness step + hairline |
| `e2` | popover, menu, ⌘K | `0 4px 12px ink/8%, 0 2px 4px ink/5%` | lightness step + `0 4px 12px black/30%` |
| `e3` | modal, call detail | `0 16px 40px ink/14%, 0 4px 8px ink/6%` | lightness step + `0 16px 40px black/45%` |

Shadows are warm-ink-tinted, short, soft. Depth **encodes meaning** (raised = interactive/overlaid; `--sunken` = record/well); if it doesn't encode meaning, the surface stays flat.

---

## 6. Borders

Hairlines are the **primary structural device** (§0 DNA-5) — the ledger/ruled aesthetic.
- `--border-subtle` ink @ 8% · `--border-default` ink @ 12% · `--border-strong` ink @ 20%.
- All render at **1px**, device-pixel-crisp. Tables and evidence rows separate by hairline, never shadow. Consistent everywhere; no mixing border weights within one component.

---

## 7. Radius

Tight scale — restraint reads premium and serious.
- `--r-0` 0 (tables, evidence rows, dividers) · `--r-sm` 4px (inputs, chips) · `--r-md` 8px (cards, media) · `--r-lg` 12px (modals).
- Full pill (`999px`) reserved **only** for status dots and the "live" indicator. **No 16–24px rounding** anywhere — that is the template look. Radius is applied consistently by component class, never ad hoc.

---

## 8. Visual Principles

1. **The thesis is the filter:** a *system of record for conversation* — editorial, instrument, evidence. If a screen looks like a generic AI SaaS, it is wrong regardless of individual merit.
2. **Two DNA elements minimum per screen** (§0). Distinctiveness is a requirement, not a hope.
3. **Color is information.** Saturation only where it means a call state or an action; decoration gets neutrals.
4. **Two density registers:** *editorial-airy* for narrative (whitespace as confidence — Mercury), *instrument-dense* for evidence (legible density as proof — Datadog). The page breathes where it tells a story and tightens where it shows data. Matching register to content is the core craft.
5. **Whitespace is active** — it groups, separates, paces; never filler to balance a layout.
6. **Composition is asymmetric and left-anchored** (§3), one focal element per screen.
7. **Restraint is the premium signal:** fewer weights, tighter radii, scarcer accent, quieter motion. When unsure, remove.
8. **Product truth over decoration:** the strongest visual is a real record; the weakest is a stock image.

**Anti-template / not-Synthflow (explicit).** The system bans every AI-SaaS tell — dark-violet mesh heroes, glass cards, Inter/Geist-as-identity, Lucide icons, gradient text, glow, pill-everything, stock headset photography, emoji. **Against Synthflow specifically:** where Synthflow presents a bright, sans-led, flow-builder SaaS surface, Telebeli is light-but-editorial, serif-led, ruled by hairlines, voiced in mono evidence, and organized around the annotated-record motif rather than node-graph builder visuals. The two could not be confused at a glance.

---

## 9. Motion Principles

Motion **timing is locked in Phase 04** (exact durations, curves, triggers); this defines only its visual character, and may not change timing.
- **Physics: paper and ink.** Short travel, decelerate on arrival, **no bounce, no overshoot, no elastic** (bounce reads as hype).
- **Enter** (240ms, decelerate): a small upward settle + fade, as if a line of the record was just written.
- **Reconcile** (180ms): the sacred one — a call moving *live → resolved*, a score appearing, a handoff firing, rendered as a quiet, exact state change (the marker slides to place; status cross-fades within the semantic palette). The only place motion craft is spent, because state-change *is* the observability story.
- **Feedback** (press, 100ms): a subtle immediate depression — ink pressed to paper.
- **The waveform** is the sole continuously-animating element, and only while real audio advances.
- **Everything else is still.** No idle motion, parallax, or drift. Stillness is the resting state of a record. Reduced-motion replaces all with instant, legible changes; no information lives in motion alone.

---

## 10. Iconography

A **custom monoline system — never an off-the-shelf library** (the stock set is a template tell).
- Drawn on a **24px grid**, **2px keyline** safe area, **1.75px stroke**, geometric, minimal rounded terminals (precise, not bubbly), consistent optical weight.
- A restrained core set (~40–60 glyphs); two-color only where an icon carries state (a handoff icon may use `--state-handoff`).
- A dedicated **annotation family** (timeline node, event marker, score tag, handoff, escalate, inspect) drawn to match the signature motif (§0 DNA-1/DNA-2).
- Icons are meaning, never ornament; none appears merely to decorate a heading.

---

## 11. Illustration Guidelines

- **Illustration is diagrammatic, not decorative.** No blobs, mascots, or gradient spot-art. The only illustration is **schematic** — call flows, the annotated timeline, an escalation path — drawn in the monoline icon system. Technical-editorial, like a well-made manual.
- **Photography is product truth first.** The best image is a real screenshot of the real dashboard. If photography is used, it is **documentary and restrained** — real operations environments, muted grade — never the stock "smiling agent in a headset." No people-as-props.
- **Rule:** if an image carries no information or truth, it does not ship. Decoration is not a reason for an image to exist.

---

## Approval Gate — logo removed, still recognizably Telebeli?

Strip the wordmark and describe what remains on a representative screen:

- A **warm, light, matte, grain-textured** surface — not the dark glowing gradient of the category.
- A **horizontal annotated timeline** with **event markers** and mono-set scores — a shape no competitor uses (DNA-1, DNA-2).
- **Monospace records threaded through serif-and-sans** editorial copy (DNA-3, DNA-6).
- Exactly one **muted violet mark**, and it means *handoff* — nowhere else (DNA-4).
- **Hairline-ruled structure** rather than cards-and-shadows (DNA-5).

No other voice-AI or AI-SaaS product presents that combination — most present the opposite (dark, glowing, sans, gradient, rounded). **A viewer familiar with the brand would identify it from these signatures alone. Gate passed.**

The standard this sets: **any screen that would be unidentifiable without the logo is under-built** — it is missing its DNA and must be reworked until at least two signatures are present and legible.

---

## Governance

1. **Two DNA elements minimum, every screen.** The logo-removed test is a shipping criterion, not a nicety.
2. **The annotated record and the event marker are protected assets** — used precisely, never redrawn ad hoc, never decorative.
3. **Semantic color discipline holds:** violet = handoff only; saturation = meaning only.
4. **One scale each** — type, spacing, radius, elevation, border. No off-scale values; components reference semantic tokens only.
5. **Motion character may not change Phase 04 timing.**
6. **Restraint and product-truth over decoration**, always.

*If the identity could belong to any AI company, it belongs to none. Telebeli should be knowable in the dark — by its record, its markers, its mono, and its calm.*
