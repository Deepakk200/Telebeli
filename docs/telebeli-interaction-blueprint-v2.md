# Telebeli — Interaction Blueprint (v2, deterministic)

**Objective:** Define behavior before visuals. This version is written to pass one test: **another designer can recreate every interaction from this document alone, without asking a question.** Every prior "about ~200ms" is now an exact value. Ranges are gone.

**Scope boundary (honest):** this specifies *interaction behavior* — timing, easing, triggers, states, input. It deliberately excludes *visual* values (color, spacing, type, exact sizing beyond accessibility minimums), which belong to the visual phase. "Recreate every interaction" = recreate every behavior; the pixels come later.

**Locked to prior phases:** the eleven beats and reader-facing headings (Phase 03 v2); the **watch · score · prove** spine; **calm conviction, not adrenaline**; candor and no-hype rules apply to motion.

---

## 1. Interaction Blueprint (master)

**Thesis:** interactions embody the product's promise — transparent, responsive, evidential. The site should feel the way running Telebeli feels: fast, inspectable, in control, honest.

**The two gates every interaction must pass** (fail both → cut):
- **Reason gate:** it enables a specific decision or understanding.
- **Teaching gate:** its motion teaches a specific product truth.

**The closed set.** Only what is specified here may move or respond. There is no "and maybe a subtle X." If a behavior isn't in this document, it doesn't ship.

**Banned interactions (never built, regardless of request):** scroll-jacking / scroll-speed override; scroll-snapping; parallax or ambient floating shapes; cursor trails / cursor-followers / tilt-on-mousemove; autoplay audio; count-up number tickers; multi-second cinematic hero reveals; word-by-word headline animation; infinite ambient motion with no state meaning; hover effects that shift layout; motion that blocks reading or delays input.

**Component index** (each specified below and in §6, mapped to Phase 03 beats):
Nav · ⌘K wayfinding · Hero CTAs · Beat entrances · Live-call demo (Beat 2) · Observability preview / dashboard (Beats 3–4) · Handoff artifact (Beat 5) · Reliability scrubber (Beat 6) · Case-study expander (Beat 7) · Candor disclosure (Beat 8) · Pricing calculator (Beat 9) · Booking + capture (Beat 10).

---

## 2. Navigation Behavior

**2.1 Top nav visibility (exact).**
- Rendered fixed. State = `full` while `scrollY ≤ 120px`.
- Transitions to `compact` when `scrollY > 120px`. Transition uses **`reconcile`** token (§4).
- Returns to `full` when either: `scrollY ≤ 120px`, **or** cumulative upward scroll ≥ `48px` within a `300ms` window. Down-scroll never forces `compact`→`full`.
- `compact` and `full` differ in presence/height only (a visual concern); the *behavioral* rule is the threshold logic above.

**2.2 Persistent CTA.** Exactly one CTA in nav ("Talk to our team"), present in both states, never duplicated by a competing call. Always focusable as the last nav item.

**2.3 Branch-exit wayfinding.** Three fixed entries — *Docs*, *Trust center*, *Pricing* — plus the CTA. Selecting a branch exit:
- Saves current `scrollY` to session before navigating.
- On return, restores that `scrollY` with no animation (jump, not scroll).

**2.4 ⌘K wayfinding (exact bindings).**
- Open: `Cmd+K` (mac) / `Ctrl+K` (win/linux), from anywhere. Also `/` when no text field is focused.
- On open: focus moves into the overlay's input; background inert; focus trapped.
- Typing filters the list of all beats + branch exits by label substring.
- `↑` / `↓` move highlight; wraps at ends. `Enter` navigates to the target and moves focus to that section's heading.
- Navigation scroll uses smooth behavior at `reconcile` timing; under reduced-motion it is an instant jump.
- `Esc` closes, restores focus to the element focused before open, and does not change scroll.

**2.5 Progress indicator.** A 1:1 map of scroll position (`width = scrollProgress%`). It tracks scroll directly with no independent easing or animation. It is orientation, not motion.

**2.6 Predictability rules.** Native scroll only. No behavior ever moves the viewport except: (a) an explicit anchor/⌘K navigation, (b) the "Watch a real call" CTA. Nothing scrolls the user automatically on load, on idle, or on hover.

---

## 3. Animation Rules

1. **Closed vocabulary.** All motion uses a token from §4. Nothing animates with a bespoke value.
2. **Trigger once.** Scroll-entrance motion fires a single time per element (IntersectionObserver, see §4.4) and never re-fires on scroll-back.
3. **State-change motion is mandatory and reserved.** Any change in system state (live→resolved, score set, handoff fired, tab switch) uses `reconcile`. Non-state visual changes do not use `reconcile`.
4. **Feedback is immediate.** Direct-manipulation feedback (`press`) begins within one frame of input; never debounced, never delayed.
5. **No motion may delay reading or input.** Content is legible and interactive at motion start, not only at motion end.
6. **Reduced-motion parity is not optional.** Under `prefers-reduced-motion: reduce`, every non-`instant` token resolves to `instant` (§4, §5). No information is conveyed by motion alone.
7. **The banned list (§1) overrides all.**

---

## 4. Motion Language (the reproducible core)

**4.1 Token table.** These are the only motions on the site. Durations in ms; easing as `cubic-bezier`.

| Token | Duration | Easing (cubic-bezier) | Transform | Opacity | Meaning | Applied to |
|---|---|---|---|---|---|---|
| `instant` | 0 | — | final state, no tween | flip | reduced-motion substitute; nothing to animate | RM mode; hard state flips |
| `press` | 100 | (0.2, 0, 0, 1) | scale 1 → 0.98 (press), → 1 (release) | — | "your action registered" | buttons, toggles, tab headers |
| `enter` | 240 | (0.0, 0, 0.2, 1) | translateY 16px → 0 | 0 → 1 | "a new answer / evidence arrived" | beat entrances; evidence reveals |
| `reconcile` | 180 | (0.4, 0, 0.2, 1) | position/size cross-tween | as needed | "system state changed" | live→resolved; score update; handoff; tab content; nav full↔compact |
| `exit` | 140 | (0.4, 0, 1, 1) | translateY 0 → −8px | 1 → 0 | "dismissed / leaving" | overlays closing; dismissals |
| `hover-reveal` | 120 (in) / 100 (out) | (0.0, 0, 0.2, 1) in / (0.4,0,1,1) out | none | 0 → 1 | "here is the evidence beneath" | hover/focus inspect overlays |

**4.2 Stagger (exact).** When multiple `enter` items convey a sequence (transcript turns, an evidence list): delay = `index × 40ms`, capped at 5 items (`index ≥ 5` → delay `0`, i.e., no further stagger). Stagger conveys causality; beyond 5 it becomes waiting, so it stops.

**4.3 Hover/focus reveal timing (exact).** Show delay: `0ms` on keyboard focus; `60ms` on pointer hover (prevents flicker on pass-through). Hide delay: `0ms`. Reveal never shifts layout (overlay only).

**4.4 Scroll-entrance trigger (exact).** IntersectionObserver, `threshold: 0`, `rootMargin: 0px 0px -15% 0px` — i.e., fires when the element's top passes 85% of viewport height. `enter` token. `unobserve` after first fire (once-only).

**4.5 The waveform rule (exact).** The waveform animates **only** while real audio `currentTime` is advancing (playing). On pause/stop/end → static frame. No audio → static. It is the one continuously-animating element, and only when it represents real, present activity.

---

## 5. Accessibility Rules (deterministic)

**5.1 Keyboard.**
- Everything operable pointer-free. Tab order === DOM order === reading order.
- First focusable element = "Skip to content" link.
- Bindings: `Space`/`Enter` activate; `Esc` closes overlays (returns focus to trigger); `←/→` move within tab groups and scrub the demo; `↑/↓` move within lists and ⌘K; `M` mutes demo; `Space` play/pause when demo focused; `Cmd/Ctrl+K` and `/` open wayfinding.
- No keyboard trap except intentional modals (⌘K, call-detail, booking), which trap focus and release on `Esc`/close.

**5.2 Focus indication.**
- Every focusable element shows a `:focus-visible` indicator. Never `outline: none` without an equivalent replacement.
- Indicator contrast ≥ `3:1` against adjacent colors; offset ≥ `2px` so it is never clipped. (Contrast/offset are accessibility requirements, stated behaviorally; the visual treatment is chosen in the visual phase within these constraints.)

**5.3 Reduced motion.** `prefers-reduced-motion: reduce` → all tokens except `instant` become `instant`; scroll-navigation becomes a jump; the demo shows the resolved transcript statically with working controls; the waveform renders a static frame. Behavior and information are unchanged — only movement is removed.

**5.4 Screen reader.**
- Reader-facing headings (Phase 03) are real `<h1>…<h2>` in order → the self-explaining skeleton is available non-visually.
- Demo transcript: real text in reading order in an `aria-live="polite"` region; each turn and the handoff are announced as they occur. Audio has synchronized captions, on by default.
- Live→resolved status change announced via polite live region. Score/regression reveals have text equivalents.
- Errors use `role="alert"` (assertive); loading uses `aria-busy="true"`; nothing meaningful is a bare `div`; all controls labeled.

**5.5 Targets & input.** Interactive targets ≥ `44×44px` (primary) / `24×24px` absolute minimum. No interaction depends on hover on touch devices (§7). No time-limited interaction without an extend/disable path.

---

## 6. State Specifications

Every component ships all applicable states. Triggers and behaviors are exact. Tone is plain and honest (states are a candor surface).

**6.1 Global state model.** `idle → loading → (loaded | empty | error)`; interactive components add `hover/focus`, `active/press`, `disabled`. Reduced-motion changes transitions to `instant`, never removes a state.

**6.2 Loading (exact triggers).**
- On data request start: render skeleton mirroring loaded shape immediately (0ms); set `aria-busy="true"`.
- Progressive: each datum renders the instant it resolves (no block-on-all).
- If load > `10s`: append a plain "Still working…" text (no spinner escalation).
- If load fails or > `30s`: → error state.
- No artificial delay is ever added for effect.

**6.3 Empty.** Trigger: a valid view with zero items (e.g., filtered calls). Behavior: one sentence stating why it's empty + exactly one action to fill it. Never a decorative illustration in place of guidance.

**6.4 Error (guides recovery).** Trigger: request/submit failure. Behavior: `role="alert"` with three parts in plain words — what happened, why (if known), and the retry action. User input is preserved. The user is never blamed. Never a bare spinner or silent failure (this would contradict the product's own promise).

**6.5 Success.** Trigger: successful submit/action. Behavior: immediate, quiet confirmation naming the concrete outcome ("Sent to you@company — check your inbox"). Persists until next interaction; no confetti, no auto-dismiss race.

**6.6 Offline / degraded.** Trigger: demo audio unavailable or live-agent busy. Behavior: honest fallback to the recorded call / static transcript with a one-line reason. Mirrors the product's own graceful-degradation ethos.

**6.7 Per-component state triggers.**

| Component | idle | hover/focus | active | loading | empty | error | success |
|---|---|---|---|---|---|---|---|
| Call row (Beats 3–4) | shows summary | reveals evidence overlay (`hover-reveal`) | opens detail modal | skeleton row | "No calls match this filter — clear filters" | inline "Couldn't load — Retry" | n/a |
| Score chip (Beat 4) | shows score | reveals rubric overlay | — | skeleton chip | n/a | "Score unavailable" | n/a |
| Handoff tag (Beat 5) | shows tag | reveals passed context | — | — | n/a | n/a | reconcile on fire |
| Candor disclosure (Beat 8) | **open by default** | — | expand detail | — | n/a | n/a | n/a |
| Pricing calc (Beat 9) | shows estimate | slider focus ring | live update on `input` | n/a | n/a | typed-value validation on blur | "Estimate sent to …" |
| Booking (Beat 10) | CTA | focus | opens scheduler/form | submit spinner on the button only | n/a | preserve input + retry | plain confirmation |
| Demo player (Beat 2) | ready, paused | control focus | play/pause/scrub | "Connecting…" (honest) | n/a | fallback to recording (6.6) | resolved state |

---

## 7. Responsive Interaction Guide

**7.1 Breakpoints (exact).** `compact < 640px` · `medium 640–1024px` · `expanded ≥ 1024px`. Layout adapts across these; *interaction* adapts by **capability**, not width (below).

**7.2 Capability queries (the real triggers).**
- `(hover: hover) and (pointer: fine)` → **hover-to-inspect enabled** (desktop/mouse).
- `(hover: none) or (pointer: coarse)` → **tap-to-inspect**: every hover-reveal becomes an explicit tap that toggles an expand/collapse; nothing is locked behind hover.
- `(prefers-reduced-motion: reduce)` → `instant` everywhere (§5.3).
- Keyboard is assumed always available: ⌘K and all key bindings are registered regardless of breakpoint.

**7.3 Translation table (exact behavior per pattern).**

| Interaction | Expanded (mouse) | Compact/Touch | Rationale |
|---|---|---|---|
| Inspect evidence | hover reveals overlay (`hover-reveal`, 60ms) | tap toggles expand/collapse in place | parity of understanding; different gesture |
| Call detail | click → modal | tap → full-screen sheet; `Esc`/back closes | thumb-reachable; native dismiss |
| Candor disclosure (Beat 8) | open by default; hover not required | open by default; tap to expand detail | candor unchanged across devices |
| Pricing sliders | drag or arrow keys | large thumb targets (≥44px) + typed input fallback | precision on touch |
| Demo controls | full control bar; keyboard | controls in lower-reach zone; `44px` targets | one-hand phone use |
| ⌘K | primary fast-nav | available with keyboard; nav menu is the touch equivalent | not all touch has a keyboard |
| Nav | full↔compact by scroll (§2.1) | compact by default; menu for branch exits | screen economy |

**7.4 Cross-device rule.** Parity of *understanding and information* is required on every device; parity of *gesture* is not. No content, evidence, or state is reachable on one device and not another.

---

## Approval Gate — can another designer recreate every interaction without asking?

A second designer now has, without a single range to resolve:

- **Exact motion tokens** — durations (0/100/120/140/180/240ms), easing curves (explicit cubic-beziers), transforms (16px, −8px, scale 0.98), and opacity, each with a fixed meaning and fixed usage (§4).
- **Exact triggers** — scroll entrance at 85% viewport, fire-once via `unobserve`; hover show-delay 60ms / focus 0ms; nav thresholds 120px and 48px/300ms; stagger 40ms capped at 5 (§2, §4).
- **Exact key bindings** — every shortcut named (§5.1).
- **Exact capability rules** — `hover/pointer/prefers-reduced-motion` media queries decide interaction mode, not guesswork (§7.2).
- **Exact breakpoints** — 640 / 1024 (§7.1).
- **Exact state triggers** — loading at 0ms, "still working" at 10s, error at 30s/fail; empty/error/success content rules; per-component state table (§6).
- **Exact accessibility values** — tab order rule, focus contrast ≥3:1 / offset ≥2px, target ≥44px, live-region politeness levels, reduced-motion substitution (§5).

**What remains a choice is only visual** (color, spacing, type) — deliberately out of scope per "behavior before visuals." Within interaction, there is no undefined value. **A designer can rebuild every behavior from this document alone. Gate passed.**

---

## Governance

1. **No range ships.** If a spec ever reintroduces "about" or "~", it is not done — replace it with a token or a number.
2. **The token table is the single source of motion truth** (§4). Components reference tokens; they never invent values.
3. **`reconcile` is reserved for real state change** and is the one place motion craft is spent.
4. **Reduced-motion, keyboard, and capability parity are acceptance criteria**, checked before any component is "done."
5. **The banned list holds** regardless of trend or stakeholder pressure.
6. **Honesty in states is non-negotiable** — a product that promises "never fail in silence" cannot have a silent or dishonest loading, empty, or error state.

*Behavior is defined. The next phase may dress it — it may not redefine it.*
