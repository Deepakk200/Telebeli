# Telebeli — Engineering Execution Handbook

**Role:** Principal TPM · Principal Product Designer · Staff Frontend Architect · Engineering Director
**Input:** Phases 01–09 (final, approved). This document does not redesign, contradict, or extend them — it converts them into an execution plan.
**Goal:** ship the production-ready flagship redesign at Stripe/Linear/Vercel/Datadog/OpenAI craft, visually unique, on Next.js 15.
**Team assumption:** ~10 frontend engineers, 1 design partner, 1 QA/a11y specialist.

---

# SECTION 1 — Project Summary

## Overall implementation strategy
**Foundation-first, then vertical slices, top-to-bottom, with the two hardest things de-risked early.** We build the token/theme/motion/component/CI foundation once (M01), stand up the shared shell (M02), then implement the marketing page as a sequence of shippable, reviewable vertical slices that follow the Phase 07 scroll narrative (M03–M11). The full enterprise dashboard (M12) proceeds in parallel-capable form once the foundation lands, because it is the largest and most technically distinct surface. We finish with three global hardening milestones — Performance (M13), Accessibility (M14), and Production QA (M15) — that run as cross-cutting gates.

Every milestone is a **vertical slice**: real components, real states (loading/empty/error), real a11y, real responsive, behind its review gates — never a "visual shell now, wire later." This keeps quality continuous rather than back-loaded.

## Why this order is optimal
1. **Foundation unblocks everything.** Tokens, themes, typography, motion config, primitives, and CI are prerequisites for every surface; building them first prevents rework and drift.
2. **The shared shell (nav/palette/shortcuts) is needed by every page and by the dashboard**, so it comes second.
3. **The page is built in scroll order** because each milestone then maps to one Phase 07 beat, letting stakeholders review the *emotional curve and narrative* incrementally — the review matches the experience.
4. **The Live Demo (M04) is pulled early** even though it's beat 2: it is the pivotal proof asset *and* the highest technical risk (audio sync, real-time UI). De-risking it early protects the schedule.
5. **Reuse compounds down the page:** the CallPlayer (M04), evidence surfaces and EventMarker (M05), and the Timeline (M06) are built once and reused by the Dashboard Preview (M07) and the real dashboard (M12).
6. **The dashboard (M12) follows the marketing spine** because it is the biggest, most complex block and benefits from a proven foundation and component library; it can be staffed in parallel by a sub-team.
7. **Global hardening is last** because performance, accessibility, and QA are measured against the whole system — but their *standards* are enforced continuously via CI from M01.

## Major engineering risks
- **Realtime at volume** (Phase 08/09): WebSocket jitter, screen-reader flooding, and list performance. Mitigation: batching, virtualization, honest connection status, `useAnnounce` throttling — designed in M12, verified in M14.
- **CallPlayer audio/transcript sync** and the real-audio-only waveform. Mitigation: de-risk in M04; analyser + `useAnimationFrame` gated on `isPlaying`.
- **RSC/Client boundary discipline** — accidental client bloat leaking to marketing. Mitigation: boundary rules in M01, bundle budgets in CI.
- **Next.js 15 caching model** (uncached-by-default). Mitigation: explicit caching decisions per route in M13; documented in standards.
- **Theme flash & the intercepting-route drawer** edge cases. Mitigation: no-flash inline script (M01); drawer built and tested in M12.
- **Motion performance / reduced-motion parity.** Mitigation: LazyMotion + `MotionConfig` in M01; parity tests in M14.

## Major design risks
- **Drift into generic AI-template** — the primary brand risk. Mitigation: the Phase 05 DNA rule (≥2 signatures per surface) and the anti-template manifesto are review-gate criteria on every milestone.
- **Candor violations** — fabricated metrics/logos/testimonials creeping in. Mitigation: content/candor audit is a gate on every content milestone and a CI check in M15.
- **Density vs legibility** on evidence surfaces. Mitigation: the two-register discipline (Phase 05 §6) is a visual-review criterion.
- **Typography CLS/licensing.** Mitigation: metric-matched fallbacks + self-hosting in M01.
- **Decorative-motion creep.** Mitigation: the Phase 04 banned-list and "every animation teaches" test are UX-review criteria.
- **Brand inconsistency across 15 milestones and two surfaces.** Mitigation: the Brand Consistency Review gate on every milestone + visual regression in M15.

## Quality gates
No milestone proceeds until it passes **seven review gates** (Section 5): Visual, UX, Accessibility, Performance, Code, Responsive, Brand Consistency. In parallel, **CI gates** run on every PR: typecheck, ESLint 9 (incl. the raw-token ban), unit tests, axe, bundle budgets, and Web-Vitals thresholds. Content milestones add a **candor gate** (no fabricated data; the Phase 03 headings-only approval-gate snapshot must still pass). Nothing merges to `main` that fails a gate; nothing ships that regresses Core Web Vitals.

---

# SECTION 2 — Milestone Roadmap

> Complexity scale: S / M / L / XL. Task counts sum to 162 (Section 4).

**Milestone 01 — Foundation**
- **Purpose:** the shared substrate — Next.js 15 app, tokens, themes, typography, motion, primitives, CI.
- **Business value:** enables every later milestone; prevents rework/drift; sets the craft bar.
- **Engineering goal:** a themeable, tokenized, tested primitive library and pipeline.
- **Deliverables:** app scaffold, 3-layer tokens (Phase 05), light/operations themes, tri-voice fonts, motion config (Phase 04), primitive set + Storybook, CI.
- **Dependencies:** none.
- **Complexity:** XL. **Tasks:** 18.

**Milestone 02 — Navigation**
- **Purpose:** the unified nav system across both surfaces.
- **Business value:** predictable wayfinding; the persistent conversion path; keyboard credibility.
- **Engineering goal:** Navbar, NavLink, command palette, shortcuts, footer shell.
- **Deliverables:** Navbar (full/compact), branch exits, ⌘K, shortcut system + cheatsheet, skip link, mobile nav.
- **Dependencies:** M01.
- **Complexity:** L. **Tasks:** 9.

**Milestone 03 — Hero**
- **Purpose:** Beat 0 — the frame; understood in <5s; RSC LCP.
- **Business value:** the stay/go decision; positioning in one line.
- **Engineering goal:** RSC hero, CTAs, entrance, media slot.
- **Deliverables:** hero section, copy, CTAs, Sagenex microtrust, responsive.
- **Dependencies:** M01, M02.
- **Complexity:** M. **Tasks:** 7.

**Milestone 04 — Live AI Demo**
- **Purpose:** Beat 2 — the pivotal proof (real call, watchable).
- **Business value:** the highest-converting asset; turns claim into experience.
- **Engineering goal:** CallPlayer with real audio, synced transcript, timeline, handoff, a11y.
- **Deliverables:** CallPlayer, audio hook, real-audio waveform, captions/live-region, live variant, degrade states.
- **Dependencies:** M01, M03.
- **Complexity:** XL. **Tasks:** 11.

**Milestone 05 — Problem & Solution Story**
- **Purpose:** Beats 1,3,4,5 — recognition + visibility + scoring + handoff.
- **Business value:** understanding of the wound and the differentiated mechanism.
- **Engineering goal:** narrative sections + evidence surfaces + EventMarker + hover-inspect grammar.
- **Deliverables:** four sections, calls-evidence table, score/rubric, regression flag, handoff artifact, scroll transitions.
- **Dependencies:** M01, M04.
- **Complexity:** L. **Tasks:** 12.

**Milestone 06 — Workflow Timeline**
- **Purpose:** the DNA-1 Timeline signature + Beat 6 reliability.
- **Business value:** the recognizable brand device; the reliability answer.
- **Engineering goal:** Timeline component (all variants) + reliability section.
- **Deliverables:** Timeline (hero/inline/detail/mini), self-writing reconcile, text-equivalent, reliability section, connective thread.
- **Dependencies:** M01, M04, M05.
- **Complexity:** L. **Tasks:** 8.

**Milestone 07 — Dashboard Preview**
- **Purpose:** the consolidated marketing observability preview (live/transcripts/scores).
- **Business value:** shows the product, no demo wall.
- **Engineering goal:** tabbed DashboardPreview reusing M05 surfaces + charts.
- **Deliverables:** preview shell + tabs, marketing Chart primitive + accessible equivalents, labeled-demo realtime illusion, responsive.
- **Dependencies:** M01, M05, M06.
- **Complexity:** L. **Tasks:** 9.

**Milestone 08 — Integrations & Proof**
- **Purpose:** Beat 7 legitimacy + the Integrations section.
- **Business value:** institutional trust; "wired into your stack."
- **Engineering goal:** proof/Sagenex section, IntegrationGrid, real-only testimonial.
- **Deliverables:** proof section, Testimonial/CaseStudy (candor-gated), IntegrationGrid, category-placeholder logic.
- **Dependencies:** M01, M02.
- **Complexity:** M. **Tasks:** 8.

**Milestone 09 — Security**
- **Purpose:** Beat 8 — compliance & the candor moment + /security page.
- **Business value:** clears the compliance veto; the largest trust deposit.
- **Engineering goal:** CandorPanel (open by default), security capture, security page.
- **Deliverables:** compliance section, CandorPanel, "Request the security packet" flow, /security, attestable-only copy.
- **Dependencies:** M01, M02.
- **Complexity:** M. **Tasks:** 8.

**Milestone 10 — Pricing**
- **Purpose:** Beat 9 — transparent pricing + calculator.
- **Business value:** removes the cost-surprise fear; captures high-intent modelers.
- **Engineering goal:** PricingCalculator (live estimate, capture) + plan cards.
- **Deliverables:** pricing section, calculator + sliders + typed fallback, plan cards, capture, routing.
- **Dependencies:** M01, M02.
- **Complexity:** M. **Tasks:** 9.

**Milestone 11 — Invitation & Footer**
- **Purpose:** Beat 10 conversion + the full footer.
- **Business value:** the ask; the no-dead-end capture; enterprise completeness.
- **Engineering goal:** invitation section + scheduler + champion kit + footer.
- **Deliverables:** invitation section, primary scheduler/Dialog, champion kit, capture, footer + legal pages, exit-intent.
- **Dependencies:** M01, M02, M04.
- **Complexity:** M. **Tasks:** 8.

**Milestone 12 — Enterprise Dashboard**
- **Purpose:** the full Phase 08 product (18 surfaces + shell + realtime + drawer).
- **Business value:** the product itself; the demonstrable "watch·score·prove"; the sales unblocker (SSO/RBAC/audit shown).
- **Engineering goal:** the complete observability dashboard on real data patterns.
- **Deliverables:** shell, global controls, realtime layer, drawer, all 18 surfaces, palette/shortcuts, states, responsive, operations theme.
- **Dependencies:** M01, M02, M05, M06, M07.
- **Complexity:** XL. **Tasks:** 30.

**Milestone 13 — Performance**
- **Purpose:** hit Core Web Vitals and bundle targets.
- **Business value:** speed = trust and ranking; craft parity with Vercel/Linear.
- **Engineering goal:** LCP/CLS/INP, code splitting, caching, assets, budgets.
- **Deliverables:** perf passes across surfaces, caching config, image/asset optimization, Web-Vitals gate.
- **Dependencies:** M03–M12.
- **Complexity:** L. **Tasks:** 8.

**Milestone 14 — Accessibility**
- **Purpose:** full WCAG-grade a11y, including realtime hazards.
- **Business value:** procurement requirement; brand value; risk reduction.
- **Engineering goal:** keyboard, focus, reduced-motion, SR semantics, realtime throttling, contrast.
- **Deliverables:** a11y audit + fixes across surfaces, axe CI, realtime SR verification.
- **Dependencies:** M03–M12.
- **Complexity:** L. **Tasks:** 8.

**Milestone 15 — Production QA**
- **Purpose:** launch readiness.
- **Business value:** a flawless, provable, on-brand launch.
- **Engineering goal:** visual regression, e2e, SEO, canonical domain, security, candor audit, rollback rehearsal.
- **Deliverables:** full QA suites green, SEO/OG/sitemap, domain resolution, security review, launch runbook.
- **Dependencies:** M01–M14.
- **Complexity:** L. **Tasks:** 9.

---

# SECTION 3 — Dependency Graph

```
M01 Foundation ─┬─────────────────────────────────────────────────────────────┐
                │                                                               │
                ▼                                                               │
            M02 Navigation ─┬── M03 Hero ── M04 Live AI Demo ─┬─ M05 Story ─┬─ M06 Timeline ─┬─ M07 Dashboard Preview
                            │                                 │             │                │
                            ├── M08 Integrations & Proof      │             │                │
                            ├── M09 Security                  │             │                │
                            ├── M10 Pricing                   │             │                │
                            └── M11 Invitation & Footer ◄─────┘ (needs M04)  │                │
                                                                             ▼                ▼
                                              M12 Enterprise Dashboard ◄── (needs M01,M02,M05,M06,M07)
                                                                             │
                 (all page + dashboard milestones complete) ──► M13 Performance ──► M14 Accessibility ──► M15 Production QA
```

**Explicit rules (no ambiguity):**
- **M01 blocks all.** Nothing starts until Foundation passes its gates.
- **M02 blocks M03–M12** (shared shell + palette used everywhere).
- **M03 → M04 → M05 → M06 → M07** is a strict chain (reuse compounds: CallPlayer → evidence surfaces + EventMarker → Timeline → Preview).
- **M08, M09, M10** depend only on M01+M02 and may run in **parallel** with the M03–M07 chain (independent page sections).
- **M11** depends on M01, M02, **and M04** (reuses CallPlayer + capture).
- **M12** depends on M01, M02, M05 (evidence surfaces), M06 (Timeline), M07 (preview patterns). May be staffed by a parallel sub-team once its deps land.
- **M13, M14, M15** are strictly sequential and **require all preceding feature milestones complete**; they are global gates, run last.

---

# SECTION 4 — Task Index

162 atomic tasks, grouped by milestone (the group header states the Milestone field). Duration: S≈0.5d, M≈1d, L≈2d, XL≈3d. Complexity: S/M/L/XL. Dependencies reference Task IDs (or "—").

### Milestone 01 — Foundation
| ID | Task | Dependency | Dur | Cx |
|---|---|---|---|---|
| T001 | Next.js 15 scaffold (App Router, TS strict, Turbopack, next.config.ts) | — | M | M |
| T002 | Route groups (marketing)/(dashboard) + base layouts | T001 | S | S |
| T003 | Tailwind v4 + @theme integration | T001 | S | S |
| T004 | Primitive tokens (OKLCH color/space/radius/dur/ease/font) | T003 | M | M |
| T005 | Semantic token layer (light + operations) | T004 | M | M |
| T006 | Component-token conventions + lint rule (ban raw hex/px) | T005 | M | M |
| T007 | Theme architecture (next-themes, data-theme, no-flash script) | T005 | M | M |
| T008 | Typography loading (next/font tri-voice, subsets, fallback metrics) | T004 | M | M |
| T009 | Motion config module (Phase 04 tokens → presets/variants) | T004 | M | M |
| T010 | LazyMotion + MotionConfig reducedMotion root | T009 | S | M |
| T011 | cn util + variant utility (CVA-style) | T003 | S | S |
| T012 | Formatters (duration/latency/date/currency, tabular) | T001 | S | S |
| T013 | Zod schema base + typed API client scaffold | T001 | M | M |
| T014 | Custom monoline icon system (tree-shakeable SVG) | T003 | M | M |
| T015 | Primitives batch 1 (Button, Link, Icon, Badge, Status, Tag) | T006,T009 | L | M |
| T016 | Primitives batch 2 (Input, Textarea, Select, Checkbox/Radio/Toggle, Slider, Tooltip) | T015 | L | L |
| T017 | Storybook + primitive stories (states/variants/both themes) | T015 | M | M |
| T018 | CI pipeline (typecheck, ESLint9, unit, build, axe, bundle, vitals) | T001 | L | L |

### Milestone 02 — Navigation
| ID | Task | Dependency | Dur | Cx |
|---|---|---|---|---|
| T019 | Navbar (full/compact scroll states) | T015 | M | M |
| T020 | NavLink primitive + active-state (unification contract) | T015 | S | S |
| T021 | Branch-exit wayfinding + scroll-preserve | T019 | M | M |
| T022 | Persistent CTA integration | T019 | S | S |
| T023 | Command palette (⌘K) shell + navigation | T016 | L | L |
| T024 | Keyboard shortcut system + cheatsheet (?) | T023 | M | M |
| T025 | Skip link + landmark structure | T002 | S | S |
| T026 | Mobile nav sheet (Dialog/off-canvas) | T019 | M | M |
| T027 | Footer nav shell (structure) | T020 | S | S |

### Milestone 03 — Hero
| ID | Task | Dependency | Dur | Cx |
|---|---|---|---|---|
| T028 | Hero layout + RSC headline (LCP, no-JS path) | T008 | M | M |
| T029 | Hero copy integration (Phase 07 §2) | T028 | S | S |
| T030 | Hero CTAs (primary arms demo, secondary) | T015,T028 | S | S |
| T031 | Hero entrance (CSS settle, not Framer) | T028 | S | S |
| T032 | Eyebrow + Sagenex microtrust | T028 | S | S |
| T033 | Hero media slot (CallPlayer placeholder) | T028 | S | S |
| T034 | Hero responsive (clamp scale, CTA stacking) | T028 | S | S |

### Milestone 04 — Live AI Demo
| ID | Task | Dependency | Dur | Cx |
|---|---|---|---|---|
| T035 | CallPlayer shell (controls, layout) | T016 | M | M |
| T036 | useAudioPlayer hook (play/pause/scrub/mute) | T035 | L | L |
| T037 | Waveform (real-audio-only via analyser + rAF) | T036 | L | L |
| T038 | Transcript stream + sync (causal order, stagger) | T036 | L | L |
| T039 | Timeline-mini linkage in player | T038 | M | M |
| T040 | Status live→resolved reconcile + handoff event | T038 | M | M |
| T041 | Captions + live-region transcript (a11y) | T038 | M | M |
| T042 | Reduced-motion static resolved state | T037,T038 | S | M |
| T043 | "Talk to it yourself" live variant (consent + disclosure) | T036 | L | L |
| T044 | Error/offline degrade to recording | T035 | M | M |
| T045 | CallPlayer keyboard controls (space/←→/M) | T035 | M | M |

### Milestone 05 — Problem & Solution Story
| ID | Task | Dependency | Dur | Cx |
|---|---|---|---|---|
| T046 | Recognition (Beat 1) section + copy (near-static) | T028 | M | S |
| T047 | Visibility (Beat 3) section framing + copy | T046 | M | S |
| T048 | Marketing calls-evidence table + hover-inspect (reusable) | T016 | L | L |
| T049 | Scoring (Beat 4) section + score chip/rubric reveal | T048 | M | M |
| T050 | Regression flag reveal (reconcile, labeled demo) | T049 | M | M |
| T051 | Handoff (Beat 5) section + handoff artifact (violet) | T016 | M | M |
| T052 | Handoff context reveal + Avatar | T051 | S | S |
| T053 | Story scroll transitions / open-loop wiring | T047,T049,T051 | M | M |
| T054 | EventMarker component (DNA-2) | T014 | M | M |
| T055 | Evidence hover-reveal grammar (shared) | T048 | M | M |
| T056 | Story sections responsive (dense↔stacked) | T053 | M | M |
| T057 | Story sections a11y (headings/focus/labels) | T053 | M | M |

### Milestone 06 — Workflow Timeline
| ID | Task | Dependency | Dur | Cx |
|---|---|---|---|---|
| T058 | Timeline component (hero/inline/detail/mini variants) | T054 | L | L |
| T059 | Timeline annotations + mono | T058 | M | M |
| T060 | Timeline self-writing reconcile (real-play only) | T058,T036 | M | L |
| T061 | Timeline text-equivalent event list (a11y) | T058 | M | M |
| T062 | Reliability (Beat 6) section + copy (no fake metric) | T058 | M | S |
| T063 | Reliability optional run-scrubber (labeled) | T062 | M | M |
| T064 | Timeline as connective visual thread across beats | T058 | M | M |
| T065 | Timeline responsive + reduced-motion | T058 | M | M |

### Milestone 07 — Dashboard Preview
| ID | Task | Dependency | Dur | Cx |
|---|---|---|---|---|
| T066 | DashboardPreview shell (tabs: Live/Transcripts/Scores) | T048 | M | M |
| T067 | Live tab (reuses calls table) | T066,T048 | S | S |
| T068 | Transcripts tab | T066 | M | M |
| T069 | Scores/Analytics tab + marketing Chart primitive | T066 | L | L |
| T070 | Chart accessible equivalents (summary + data table) | T069 | M | M |
| T071 | Browser-chrome frame + app.telebeli.ai label | T066 | S | S |
| T072 | Preview tab reconcile transitions | T066 | S | M |
| T073 | Preview realtime illusion (labeled demo, honest) | T067 | M | M |
| T074 | Preview responsive (prioritized columns / tap-inspect) | T066 | M | M |

### Milestone 08 — Integrations & Proof
| ID | Task | Dependency | Dur | Cx |
|---|---|---|---|---|
| T075 | Proof/legitimacy (Beat 7) section + Sagenex endorsement | T015 | M | S |
| T076 | Testimonial/CaseStudyCard (real-only, candor gate) | T015 | M | M |
| T077 | IntegrationGrid + IntegrationItem (marketing) | T015 | M | M |
| T078 | "Bring your own / SIP" integrations content | T077 | S | S |
| T079 | Category-placeholder logic (no fake logos) | T077 | S | M |
| T080 | Proof expand/collapse | T076 | S | S |
| T081 | Section responsive | T075,T077 | S | S |
| T082 | Section a11y | T075,T077 | S | S |

### Milestone 09 — Security
| ID | Task | Dependency | Dur | Cx |
|---|---|---|---|---|
| T083 | Compliance & candor (Beat 8) section | T015 | M | S |
| T084 | CandorPanel (open by default, two columns) | T083 | M | M |
| T085 | "Request the security packet" capture (Dialog + Form) | T016 | M | M |
| T086 | Trust-center branch link | T021 | S | S |
| T087 | /security page (full) | T084 | L | M |
| T088 | Attestable-only compliance copy integration | T084 | S | M |
| T089 | Section responsive | T083,T087 | S | S |
| T090 | Section a11y | T083,T087 | S | S |

### Milestone 10 — Pricing
| ID | Task | Dependency | Dur | Cx |
|---|---|---|---|---|
| T091 | Pricing (Beat 9) section | T015 | M | S |
| T092 | PricingCalculator (sliders → live estimate) | T016 | L | L |
| T093 | Slider + typed fallback + a11y | T092 | M | M |
| T094 | Estimate (mono, no count-up) + "Send me this estimate" capture | T092 | M | M |
| T095 | PlanCard ×3 (one highlighted) | T015 | M | M |
| T096 | Billing-model copy ("by the second, no hidden stack") | T091 | S | S |
| T097 | Enterprise → Talk to our team routing | T095 | S | S |
| T098 | Pricing responsive | T091,T092,T095 | S | S |
| T099 | Pricing a11y | T092,T095 | S | S |

### Milestone 11 — Invitation & Footer
| ID | Task | Dependency | Dur | Cx |
|---|---|---|---|---|
| T100 | Invitation (Beat 10) section + copy | T015 | M | S |
| T101 | Primary CTA scheduler/Dialog (reach a human) | T016 | L | L |
| T102 | Champion enablement kit (shareable) | T100 | M | M |
| T103 | No-dead-end capture (email recorded call/estimate) | T101 | M | M |
| T104 | Footer full (columns, Sagenex, status link) | T027 | M | M |
| T105 | Legal pages (Privacy/Terms/DPA) wiring | T104 | M | M |
| T106 | Exit-intent capture (once, quiet) | T103 | M | M |
| T107 | Invitation/Footer responsive + a11y | T100,T104 | M | M |

### Milestone 12 — Enterprise Dashboard
| ID | Task | Dependency | Dur | Cx |
|---|---|---|---|---|
| T108 | Dashboard shell + auth + providers | T002,T015 | L | L |
| T109 | Global controls (time-range + scope, URL-synced) | T108 | L | L |
| T110 | Realtime WS manager + batching + honest status | T013 | XL | XL |
| T111 | TanStack Query + cache reconcilers | T110 | L | L |
| T112 | Inspector drawer (intercepting/parallel route) | T108 | L | L |
| T113 | Overview / Mission Control | T111 | L | L |
| T114 | Live Calls tail + facet rail + virtualization | T111 | XL | XL |
| T115 | Live-call controls (monitor/whisper/barge/takeover) | T114 | L | L |
| T116 | Follow/pause + stream buffer | T114 | M | M |
| T117 | Call Queue surface | T111 | L | M |
| T118 | Agent Monitoring + monitors/thresholds | T111 | L | L |
| T119 | Regression detector + deploy markers | T118 | L | L |
| T120 | Conversation Timeline (call detail) core | T058,T112 | XL | XL |
| T121 | Score breakdown + actions + handoff packet + audit trail | T120 | L | L |
| T122 | QA (review queue + scorecard editor + calibration) | T111 | XL | XL |
| T123 | Analytics panels (configurable grid) | T069,T111 | L | L |
| T124 | Performance surface (latency percentiles, pipeline, incidents) | T111 | L | L |
| T125 | CRM surface (contacts, sync, write audit) | T111 | L | L |
| T126 | Knowledge Base + gap report | T111 | L | L |
| T127 | Agent Settings/Builder + escalation editor | T016 | XL | XL |
| T128 | Version history + rollback + test console + deploy | T127 | L | L |
| T129 | Integrations (dashboard) + connection health + call log | T111 | L | L |
| T130 | Permissions (RBAC/SSO/SCIM/access audit) | T108 | L | L |
| T131 | Notifications (rules/channels/alert inbox) | T111 | L | L |
| T132 | Global Search / explore (transcript phrase search) | T111 | L | L |
| T133 | Command palette (dashboard actions) + shortcuts | T023 | L | L |
| T134 | Realtime SR throttling + a11y pass | T110 | M | L |
| T135 | Empty/loading/error states across surfaces | T113 | L | M |
| T136 | Dashboard responsive (columns/drawers) | T113 | L | L |
| T137 | Operations-mode theming pass | T007 | M | M |

### Milestone 13 — Performance
| ID | Task | Dependency | Dur | Cx |
|---|---|---|---|---|
| T138 | LCP pass (RSC hero, font preload) | M03–M12 | M | M |
| T139 | CLS elimination (font metrics, reserved space) | M03–M12 | M | M |
| T140 | INP / main-thread (batching, virtualization, offload) | M12 | L | L |
| T141 | Code-splitting audit (dynamic, LazyMotion, chart lib) | M03–M12 | M | M |
| T142 | Caching config (static/ISR/PPR marketing; dynamic dashboard; staleTimes) | M03–M12 | L | L |
| T143 | Image/asset optimization pass (next/image, AVIF, icons, grain) | M03–M12 | M | M |
| T144 | Bundle budgets + tree-shaking audit | M03–M12 | M | M |
| T145 | Web-Vitals monitoring + regression gate | T018 | S | M |

### Milestone 14 — Accessibility
| ID | Task | Dependency | Dur | Cx |
|---|---|---|---|---|
| T146 | Keyboard-complete audit (all surfaces + shortcuts) | M03–M12 | L | L |
| T147 | Focus management (drawers/modals/palette) | M03–M12 | M | M |
| T148 | Reduced-motion audit (MotionConfig, static states) | M03–M12 | M | M |
| T149 | SR semantics (tables, charts, live regions) | M03–M12 | L | L |
| T150 | Realtime SR throttling verification | T134 | M | M |
| T151 | Color-independence + contrast audit (both themes) | M03–M12 | M | M |
| T152 | axe CI across surfaces | T018 | M | M |
| T153 | Target sizes + touch a11y | M03–M12 | S | S |

### Milestone 15 — Production QA
| ID | Task | Dependency | Dur | Cx |
|---|---|---|---|---|
| T154 | Visual regression suite (DNA + both themes) | M03–M12 | L | L |
| T155 | E2E critical journeys (marketing + dashboard) | M03–M12 | L | L |
| T156 | Cross-browser/device matrix | M13,M14 | M | M |
| T157 | Canonical domain resolution (.ai vs .com) + redirects | — | S | M |
| T158 | SEO finalization (metadata, JSON-LD, sitemap/robots, OG) | M03–M11 | M | M |
| T159 | Error-boundary + honest-state verification | M03–M12 | M | M |
| T160 | Security review (auth, headers, CSP, dependency audit) | M12 | L | L |
| T161 | Candor/content audit (no fabricated data/logos; approval-gate heading snapshot) | M03–M12 | M | M |
| T162 | Launch readiness + rollback rehearsal + monitoring | M13,M14 | M | L |

---

# SECTION 5 — Milestone Review Gates

**Universal gate baseline (every milestone, every review type checks these):**
- **Visual:** matches Phase 05 tokens; carries ≥2 DNA signatures; passes the anti-template manifesto; correct density register.
- **UX:** matches Phase 03/04 (question answered, open loop, hover=inspect, no dead ends); motion teaches (Phase 04 banned-list clear).
- **Accessibility:** keyboard-complete; focus visible/managed; reduced-motion parity; SR semantics; contrast AA+; targets ≥44px; axe clean.
- **Performance:** within bundle budget; no CLS regression; motion/realtime within frame budget.
- **Code:** semantic tokens only (lint clean); RSC-by-default boundary respected; typed; unit tests + Storybook states; no `"use client"` without justification.
- **Responsive:** correct behavior across the three breakpoints + capability queries; parity of understanding across devices.
- **Brand Consistency:** voice rules (no hype/banned words/exclamation); CTA lexicon; candor (no fabricated data); terminology (Telebeli, Sagenex).

**Milestone-specific gate additions:**

| M | Visual | UX | A11y | Perf | Code | Responsive | Brand |
|---|---|---|---|---|---|---|---|
| 01 | tokens render both themes; type scale correct | primitives behave per Phase 06 | primitive a11y (Radix) verified | CI budgets live; font CLS 0 | token lint rule enforced; Storybook coverage | primitive size scale | naming conventions applied |
| 02 | nav states + palette on-brand | scroll thresholds, ⌘K, shortcuts work | skip link, focus trap in palette | nav no layout thrash | NavLink single active rule | mobile sheet | one persistent CTA |
| 03 | hero hierarchy; serif LCP | <5s comprehension; CTA arms demo | single h1; CTAs operable | LCP < 2.0s; RSC no-JS | hero is RSC | clamp scale, CTA stack | positioning line leads |
| 04 | player on-brand; waveform real-only | play/scrub/handoff; live variant | captions + live-region + keyboard | audio lazy; no autoload | audio hook isolated | thumb-reach controls | "Real recorded call" honesty |
| 05 | evidence density; markers | question→answer chain; hover-inspect | evidence focus equivalents | table virtualization-ready | EventMarker reusable | dense↔stacked | recognition copy; labeled demo |
| 06 | Timeline DNA-1 unmistakable | self-writing on real play only | text-equivalent event list | reconcile within budget | Timeline variants tokenized | horizontal at all sizes | no fabricated reliability number |
| 07 | preview reads as real product | tabs reconcile; drill affordance | chart text/table equivalents | charts lazy-loaded | reuses M05 surfaces | prioritized columns | labeled-demo honesty |
| 08 | proof/integration calm | expand/collapse; real logos only | list semantics | logos optimized | category-placeholder logic | grid reflow | no invented customers |
| 09 | candor panel equal-weight | open by default; capture works | disclosure a11y | security page static | attestable-only copy | two-col → stack | no unearned certs |
| 10 | pricing clarity; mono estimate | live estimate, no gate/count-up | slider + typed fallback | calculator client-only | rates from tokens/config | plans stack | no inflated savings |
| 11 | invitation focal CTA | scheduler reaches human; capture | form a11y; focus | scheduler lazy | no-dead-end enforced | footer stack | one primary CTA; honest capture |
| 12 | dense register; operations theme | drill-to-call everywhere; palette | realtime SR throttling; keyboard | virtualization; streaming; budgets | feature-module boundaries | drawers/columns | honest realtime status; real/labeled data |
| 13 | no visual regressions | interactions still smooth | no a11y regressions | LCP<2.0/CLS0/INP<200; budgets green | caching decisions documented | all sizes verified | brand intact post-optimization |
| 14 | focus/contrast visuals | keyboard journeys pass | full axe + manual SR pass | a11y adds no perf cost | a11y utilities centralized | touch a11y | inclusive of brand voice |
| 15 | visual-diff green both themes | all e2e journeys pass | final a11y sign-off | Vitals gate green | security + dep audit clean | device matrix pass | candor audit + approval-gate snapshot pass |

**Rule:** a milestone is **Done** only when all seven reviews pass and CI is green. The next dependent milestone does not begin until then.

---

# SECTION 6 — Git Strategy

**Branch naming:** `main` (protected, always releasable) · `develop` (integration) · feature branches `m{NN}/{task-id}-{slug}` (e.g., `m04/t037-waveform-real-audio`) · fixes `fix/{scope}-{slug}` · release `release/{version}` · hotfix `hotfix/{version}-{slug}`.

**Commit conventions:** Conventional Commits — `type(scope): summary`. Types: `feat, fix, refactor, perf, a11y, style, test, docs, chore, ci`. Scope = milestone or component (e.g., `feat(m04/callplayer): sync transcript to audio`). Reference the Task ID in the body (`Task: T037`). Imperative mood; ≤72-char subject.

**Merge strategy:** PR per task (or small task group) → **squash-merge** into `develop` (one clean commit per task, referencing the Task ID). PRs require: green CI (typecheck/lint/unit/axe/bundle/vitals) + 1 code review + the relevant milestone gate reviews for milestone-closing PRs. Milestone completion merges `develop` → `main` via a **milestone PR** that must pass all seven gates. No direct commits to `main`/`develop`.

**Release strategy:** trunk-stable `main`; tag milestones `v0.{milestone}.x`; production releases as semver `v1.x.y` post-launch. Preview deploys (Vercel) on every PR for visual/UX review; staging = `develop`; production = `main`. Feature flags gate incomplete surfaces (e.g., the live "talk to the agent" variant, dashboard surfaces) so `main` stays releasable.

**Rollback strategy:** Vercel instant rollback to the previous production deployment as first response (single click, seconds). Every release tagged for `git revert` of a milestone PR if needed. Feature flags allow disabling a surface without redeploy. Database/stateful changes (dashboard) gated behind reversible migrations. A rollback runbook (T162) is rehearsed before launch; monitoring (Sentry + Vitals) triggers the rollback decision.

---

# SECTION 7 — Engineering Standards

**Folder organization (Phase 09):** `app/` route groups `(marketing)`/`(dashboard)`; shared `components/` (ui/motion/charts/marketing), `features/` (feature-sliced dashboard modules with co-located components/hooks/api/types, barrel-only public surface), `hooks/`, `lib/`, `styles/globals.css` (@theme), `config/`, `tests/`. Nothing imports a feature's internals.

**Naming conventions (Phase 06):** PascalCase components; intent-based variants (`primary/handoff/danger`); `sm/md/lg` sizes; fixed state vocabulary; `leading/trailing` slots; component tokens `--component-role-variant`; hooks `useX`; Task-ID-prefixed branches. Files kebab-case; component files match component name.

**Code quality:** TypeScript strict; ESLint 9 + the raw-token/hex/px ban rule + import-boundary rule; Prettier; RSC-by-default (every `"use client"` justified); Zod-validated boundaries; no `any`; pure utilities; small client leaves.

**Testing (Phase 09):** Vitest + RTL (unit/component/states); Playwright (e2e + axe); Storybook (all states + both themes) + visual regression; contract tests against Zod fixtures; realtime reconcilers tested against fixture streams; candor/approval-gate guardrail tests. CI: typecheck → lint → unit → build → e2e/axe → visual; bundle + Vitals gate the deploy.

**Performance:** LCP < 2.0s, CLS 0, INP < 200ms (marketing); virtualized dashboard; RSC-first; streaming + Suspense; PPR where applicable; per-route-group bundle budgets; dynamic-import heavy client (CallPlayer, charts, palette); LazyMotion; next/font + next/image; Next 15 caching decided explicitly per route.

**Accessibility:** Radix behavior; keyboard-complete; `:focus-visible` ≥3:1/≥2px; targets ≥44px; reduced-motion parity; SR semantics for tables/charts; **throttled realtime announcements**; color never sole signal; axe in CI; both themes meet contrast.

**Animation standards (Phase 04):** motion only from the token config (enter/reconcile/press/exit/hover-reveal); `reconcile` reserved for real state change; no bounce/parallax/idle motion; waveform real-audio-only; scroll reveals fire once at 85%; the banned-interactions list is enforced in review.

**SEO:** marketing RSC/static/PPR; `generateMetadata` + canonical (domain resolved); real semantic headings (approval-gate outline); JSON-LD (Organization/Product/FAQ); `sitemap.ts`/`robots.ts` (dashboard noindex); dynamic OG images; green Core Web Vitals; comparison/alternative static pages.

---

# SECTION 8 — STOP

Execution roadmap complete.

Waiting for Milestone selection.
