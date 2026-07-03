# Telebeli — Landing Page Master Specification

**Phase:** 07 — The complete landing page
**Prepared as:** the synthesis of Phases 01–06. Every choice here traces to a locked decision; nothing new is invented at the visual, motion, or voice layer.
**Not code.** A build specification: detailed enough that a senior frontend engineer implements it without guessing.
**Reading order:** §0 Global foundations (stated once), then Sections 1–13 top to bottom. Each section carries all fifteen requested dimensions.

**The spine (Phase 03):** eleven beats in objection order; every section answers one live question and opens the next; the emotional target is **calm, rising conviction — never hype**; there are **no dead ends**; candor is the largest trust deposit and sits late.

---

## §0 — Global foundations (apply to every section)

**Canvas & theme.** Light-first, `--paper` (warm off-white `oklch 0.985 0.004 85`) with a fine monochrome grain at ~2.5% opacity. Operations (dark) mode is a true second theme (deep warm slate); only semantic tokens flip. Ink `--ink 0.22 0.01 55`.

**Grid & containers.** 12 columns, 24px gutter. `--container-text` 720px (narrative measure), `--container-content` 1120px (media/cards), `--container-wide` 1320px (evidence surfaces, full-bleed permitted). Page margins 24 (compact) / 48 (medium) / 64 (expanded).

**Type tokens.** `display` 56/1.05 serif 440 −0.02em · `h1` 40/1.1 serif · `h2` 30/1.15 serif · `h3` 22/1.25 sans 560 · `lead` 20/1.55 sans · `body` 16/1.6 sans · `label` 12/1.35 sans 560 +0.06em uppercase · `evidence` 13/1.5 mono. Body measure 66–72ch. Tabular numerals for all data.

**Color roles.** `--accent` ink-blue `0.48 0.13 250` (scarce; links/primary/focus). Semantic states: `--state-live` amber · `--state-resolved` muted green · `--state-handoff` **muted violet (handoff only)** · `--state-flag` muted clay. `--hairline` ink@10% (primary structure).

**Elevation / radius.** `e1` cards `0 1px 2px ink/6%`; `e2` popovers; `e3` modals. Radius `--r-sm` 4 / `--r-md` 8 / `--r-lg` 12; pill only for the live dot.

**Motion tokens (Phase 04, never re-timed).** `enter` 240ms decelerate, translateY 16→0 + fade, fires once when the element crosses 85% of viewport · `reconcile` 180ms (state change) · `press` 100ms · `exit` 140ms · `hover-reveal` 120ms. No bounce, no parallax, no idle motion. The waveform animates only while real audio advances. `prefers-reduced-motion` → all become instant; no info in motion alone.

**Density registers.** Narrative sections = **airy** (720 measure, generous whitespace). Evidence sections = **dense** (full-bleed, instrument legibility). The page breathes where it tells a story and tightens where it shows data.

**Section rhythm.** Between beats: 128px (expanded) / 96 (medium) / 80 (compact). Major transitions (into pricing/CTA): 160px. Sections are separated by whitespace, not decorative dividers.

**Global interaction.** Native scroll only (no hijack/snap). Hover/focus = **inspect** everywhere. `⌘K`/`Ctrl+K` opens wayfinding to any section or branch exit; scroll position preserved on return. Every terminal action converts or captures an email — no dead ends.

**Accessibility baseline.** Reader-facing headings are real `<h1>…<h2>` in order (the approval-gate skeleton). Skip link first-focusable. Focus ring ≥3:1, ≥2px offset. Targets ≥44px. Live regions for status/transcript; `role="alert"` for errors. Full keyboard operability.

**Per-section fields below:** Purpose · Business objective · User psychology · Layout · Visual hierarchy · Visual balance · Whitespace · Content · Component usage · Copy · CTA placement · Interaction · Animation · Trust signals · Scroll transition (how it enters + how it leads to the next).

---

## Section 1 — Navigation (persistent)

- **Purpose:** predictable wayfinding; a one-tap escape for the multi-visit committee; a permanent path to the human.
- **Business objective:** keep conversion one action away at every scroll depth; route CTO/compliance/finance to their branch exits.
- **User psychology:** "I'm in control and can leave for what I need." Reduces trap-anxiety.
- **Layout:** fixed top bar, full-bleed with page margins. Left: wordmark `Telebeli`. Center/right: `Product · Pricing · Security · Docs`. Far right: primary CTA + `⌘K` hint.
- **Visual hierarchy:** wordmark and CTA anchor the two ends; nav links are `quiet` weight between them.
- **Visual balance:** two-end anchoring with a light center — asymmetric, stable.
- **Whitespace:** 16px vertical padding (full) / 10px (compact); 24px between links.
- **Content:** wordmark, 4 links (Security = trust center, Docs = engineer branch), CTA, ⌘K affordance, mobile menu trigger.
- **Component usage:** `Navbar`, `NavLink`, `Button` (secondary→primary CTA), `CommandPalette`, `NavMenu` (mobile sheet).
- **Copy:** links "Product / Pricing / Security / Docs"; CTA **"Talk to our team"**; ⌘K hint "⌘K".
- **CTA placement:** one persistent secondary-styled "Talk to our team" (top-right); never duplicated with a competing call.
- **Interaction:** `full` state at `scrollY ≤120`, `compact` above; re-`full` on up-scroll ≥48px/300ms. Branch links preserve scroll on return. `⌘K` opens palette (focus-trapped, `Esc` restores).
- **Animation:** full↔compact via `reconcile`; no entrance animation (nav is present on load).
- **Trust signals:** a working "Security" link in the nav itself signals nothing to hide.
- **Scroll transition:** the nav recedes as the hero owns the first screen, handing full attention downward.

---

## Section 2 — Hero (Beat 0)

- **Purpose:** state the one idea in under five seconds and qualify the accountable operator.
- **Business objective:** win the stay/go decision; route the dominant first intent ("is this real?") to the demo.
- **User psychology:** "What is this, and is it serious?" → recognition that this is *accountable* voice AI, not another bot.
- **Layout:** centered, `--container-text`. Eyebrow → headline → subhead → CTA row → microtrust → the embedded proof device below (`--container-content`). Top padding 96–128; the proof device sits ~64px under the CTA row.
- **Visual hierarchy:** `display` serif headline dominates; `lead` subhead second; CTAs third; the live-call device is a strong secondary focal object drawing the eye downward.
- **Visual balance:** centered composition for the hero only (the one place centering is allowed); the horizontal proof device balances the vertical text stack.
- **Whitespace:** generous — this section breathes most. 24px headline→subhead, 36px subhead→CTA, 64px CTA→device.
- **Content:** eyebrow label, headline, subhead, growth support line, two CTAs, Sagenex microtrust, a real recorded call ready to play.
- **Component usage:** `Hero`, `Button` (primary + secondary), `CallPlayer` (ready/paused), `Timeline` (hero variant), `Badge` ("Real recorded call").
- **Copy:**
  - Eyebrow (`label`): "ACCOUNTABLE VOICE AI"
  - Headline (`display`): **"Voice AI you can watch, score, and prove."**
  - Subhead (`lead`): "Telebeli runs voice agents on your phone lines and makes every call visible, measured, and auditable — so you can automate without losing oversight."
  - Support line (`body-sm`, muted): "AI takes calls. You grow."
  - Microtrust (`body-sm`, muted): "An initiative of Sagenex Group."
- **CTA placement:** primary **"Watch a real call"** (left), secondary **"Talk to our team"** (right), directly under the subhead. Primary arms the demo below.
- **Interaction:** headline paints immediately (LCP), one quiet settle only. Primary CTA scrolls to + focuses the `CallPlayer`, armed to play on next explicit action. No autoplay. No scroll cue.
- **Animation:** single `enter` settle on the text stack; the `CallPlayer` device fades in with `enter`; waveform static until played.
- **Trust signals:** Sagenex parentage; a "Real recorded call" label on the device; the absence of hype/superlatives is itself a signal.
- **Scroll transition:** stating "watch, score, prove" opens *"do they understand why I'd need that?"* — the next section answers it. Visually, the hero's timeline device threads a hairline down into Recognition.

---

## Section 3 — Recognition (Beat 1)

- **Purpose:** prove Telebeli understands the buyer's wound before selling anything.
- **Business objective:** convert skepticism into attention; earn the right to the rest of the page.
- **User psychology:** "Do they understand my problem?" → relief ("they get it"). First up-tick on the emotional curve, starting below neutral.
- **Layout:** left-anchored, `--container-text` (narrative measure). A short heading, two tight paragraphs, and one restrained inline detail. Deliberately near-static.
- **Visual hierarchy:** `h2` serif heading leads; body follows; no competing element — this is a reading moment.
- **Visual balance:** strong left edge; wide right whitespace — the composition itself feels calm and unhurried.
- **Whitespace:** most whitespace-dominant narrative beat; 128px above, generous line spacing, no cards.
- **Content:** the silent-failure story in the buyer's terms — no illustration, no stat.
- **Component usage:** type only; optional one `Tag`/inline hairline-marked detail on focus. No card.
- **Copy:**
  - Heading (`h2`): **"Most voice AI goes dark in production. You find out from the customer."**
  - Body: "The demo is flawless, so you roll it out. Then, at volume, it drifts. An escalation that should reach a human doesn't. A frustrated caller surfaces days later — and when you go looking for what happened, there is almost nothing to see. It didn't crash. It failed quietly, and you found out downstream."
  - Close (`body`, emphasis): "The question was never whether AI could talk. It was whether anyone could see what it was doing."
- **CTA placement:** none. This beat earns attention, it does not ask.
- **Interaction:** near-static; enters once and holds. No hover theater.
- **Animation:** single `enter` on the heading and body; nothing after.
- **Trust signals:** naming the exact failure mode signals category fluency — the strongest credibility a first screen can carry.
- **Scroll transition:** the closing line ("whether anyone could *see* what it was doing") opens *"so do they actually solve it, or just diagnose it?"* — handing directly to the demo.

---

## Section 4 — The live call demo (Beat 2)

- **Purpose:** answer "is this real?" by letting the visitor watch it work.
- **Business objective:** the pivotal proof; the highest-leverage conversion asset; a shareable artifact for the internal sale.
- **User psychology:** "Is this real, or another slick demo?" → cautious intrigue as they watch a call resolve and hand off.
- **Layout:** `--container-content`, centered. Heading + subhead (narrow, centered), then the `CallPlayer` full-width within the container: controls, waveform, synchronized transcript, linked timeline.
- **Visual hierarchy:** the player is the focal object; heading is supporting. Within the player, the transcript and the handoff moment lead.
- **Visual balance:** the horizontal player anchors; heading sits centered above it; balanced, symmetrical for this one demonstration.
- **Whitespace:** 128px above; tight, purposeful interior spacing in the player (dense but legible).
- **Content:** a real recorded call that resolves, then reaches its limit and hands off; optional "Talk to it yourself" live variant.
- **Component usage:** `CallPlayer`, `Transcript`, `Waveform`, `Timeline` (detail), `Status`, `Badge`.
- **Copy:**
  - Heading (`h2`): **"Watch a real call resolve — then hand off to a human."**
  - Subhead (`lead`): "Not a slideshow. A real call you can play, scrub, and inspect — including the moment it reaches its limit and brings in a person."
  - In-player labels: "Real recorded call · captions on"; on handoff: "Handed to a human — full context attached."
  - Live variant CTA text: "Talk to it yourself."
- **CTA placement:** the player's own play control is the action; a quiet secondary "Talk to it yourself" where the live variant is available. No page-level CTA competing with the demo.
- **Interaction:** explicit play only; scrub moves audio + transcript together; transcript streams in causal order; handoff appears via `reconcile`; replay + inspect any turn. Live variant: consent + "you're speaking to an AI" disclosure; the visitor's own call then appears in the dashboard preview (Section 5).
- **Animation:** transcript turns via `enter` with 40ms stagger (cap 5); status `live→resolved` and handoff via `reconcile`; waveform animates only while audio plays.
- **Trust signals:** it is real and inspectable; captions and a live-region transcript; the honesty of showing the handoff rather than hiding the AI's limits.
- **Scroll transition:** watching it work opens *"how is this different from the black box that burned me?"* The timeline established here becomes the visual through-line into the mechanism beats.

---

## Section 5 — Visibility (Beat 3)

- **Purpose:** deliver the category-defining difference — you see every call.
- **Business objective:** differentiate from black-box competitors while the "how is this different" question is hot.
- **User psychology:** "How is this different?" → understanding; growing confidence.
- **Layout:** switches to the **dense/evidence register**, `--container-wide`, full-bleed. Left: a short heading + one-line claim (narrow). Right/below: the `Dashboard` observability preview (a `Table` of live calls, hover-to-inspect).
- **Visual hierarchy:** the dashboard preview leads (it's the proof); the claim is a caption to it.
- **Visual balance:** asymmetric — text left-anchored, the dense evidence surface carrying the visual weight on the right/below.
- **Whitespace:** tighter interior (instrument density); generous margin around the surface to frame it as a "record."
- **Content:** live-calls table (contact, direction, status, duration, latency, language), hover-reveal evidence, a call that reconciles live→resolved.
- **Component usage:** `Dashboard`, `Table` (dense), `Badge`/`Status`, `Timeline` (mini in rows), `EventMarker`, `Dialog` (call detail on click).
- **Copy:**
  - Heading (`h2`): **"See every call, live and after it happens."**
  - Body: "Every conversation on your lines is visible — live as it happens, and searchable afterward. Open any call, read the full transcript, see the outcome. Nothing happens on your lines that you can't watch."
  - Micro-label over the surface: "app.telebeli.ai · live calls"
- **CTA placement:** none primary; an inline "Open a call" affordance within the preview (opens a `Dialog`).
- **Interaction:** hover/focus a row = inspect (evidence overlay, no layout shift); click = call detail `Dialog`; a live call visibly reconciles to resolved. Keyboard: row list, `Enter` inspects, `Esc` closes.
- **Animation:** surface `enter` on scroll-in; the one live→resolved `reconcile` as the teaching moment; hover-reveal on rows.
- **Trust signals:** legible density of real (or clearly-labeled demo) data — the Datadog credibility move; mono evidence; the DNA on full display.
- **Scroll transition:** seeing calls opens *"seeing is nice — how do I know they're any good?"* → scoring. The dashboard persists conceptually into the next beat (same surface, new tab).

---

## Section 6 — Scoring (Beat 4)

- **Purpose:** open the black box — measured, explainable quality; regressions caught early.
- **Business objective:** prove the differentiator (not just visibility, but accountability) instead of asserting it.
- **User psychology:** "How do I know the calls are good, and stay good?" → confidence deepens.
- **Layout:** continues the dense register / same dashboard surface, `--container-wide`. Heading + claim, then the Scores view: scored calls (mono), a rubric-on-inspect, and a surfaced regression.
- **Visual hierarchy:** the score column and the flagged regression lead the eye; heading supports.
- **Visual balance:** the flagged regression is the single focal accent (one `--state-flag` mark) against calm rows.
- **Whitespace:** dense rows; breathing room around the regression callout so it reads as significant.
- **Content:** scored calls, score rubric reveal, a regression flagged with what changed and when.
- **Component usage:** `Table`/`Dashboard` (Scores tab), `ScoreBadge` (mono), `EventMarker` (`flag`), `Tooltip`/overlay (rubric), `Chart` (score trend sparkline).
- **Copy:**
  - Heading (`h2`): **"Every call is scored, so problems surface before your customers feel them."**
  - Body: "Quality is measured, not assumed. Every call is scored automatically against your criteria, and a regression shows up on your dashboard before a customer calls to complain — not after."
  - On the flag: "Regression detected · resolution rate down on refund intents · 14:20."
- **CTA placement:** none; inline "See how scoring works" links to Docs (engineer branch).
- **Interaction:** hover/focus a score = rubric reveal; the regression appears via `reconcile` and draws the eye once; inspect reveals the change.
- **Animation:** `reconcile` for the surfaced regression; hover-reveal for rubric; sparkline draws in once via `enter`.
- **Trust signals:** an *explained* score (rubric visible) and a *caught* problem — proof, not claim; all data real or labeled demo (candor).
- **Scroll transition:** measurable quality opens *"and the calls it shouldn't handle at all?"* → the handoff, on a calmer, narrative register again.

---

## Section 7 — Handoff (Beat 5)

- **Purpose:** neutralize the most emotional objection — loss of control on hard calls.
- **Business objective:** the trust moment that earns enterprise confidence; de-risk the scariest scenario before scale/price.
- **User psychology:** "What happens when the AI shouldn't finish a call?" → reassurance.
- **Layout:** back to a semi-airy register, `--container-content`. Two-part composition: left, a short transcript reaching a sensitive moment; right, the annotated "handed to the human" artifact (what was passed).
- **Visual hierarchy:** the handoff artifact (with the `--state-handoff` violet) leads; the transcript sets it up.
- **Visual balance:** left transcript / right artifact — a balanced 1.3:1 split; the violet handoff marker is the single accent.
- **Whitespace:** 128px above; comfortable interior; the artifact framed with margin as a discrete object.
- **Content:** a warm-transfer moment; the passed context — full transcript, detected intent, caller context.
- **Component usage:** `Card` (evidence), `Transcript` excerpt, `Badge` (`handoff`), `EventMarker` (`handoff`), `Timeline` (handoff point), `Avatar` (the human).
- **Copy:**
  - Heading (`h2`): **"When a call shouldn't be handled by AI, it reaches a human — with full context."**
  - Body: "You set the rules. When a call crosses them — a sensitive request, a compliance trigger, an upset caller — the agent brings in a person and hands over the full transcript, the detected intent, and the caller's context. The human starts informed, and the caller never repeats themselves."
  - Artifact labels: "Full transcript · Detected intent: billing dispute · Caller: verified."
- **CTA placement:** none; the beat is reassurance, not an ask.
- **Interaction:** hover/focus the handoff tag reveals exactly what was passed.
- **Animation:** the handoff artifact assembles via `reconcile` (a state change), not a flourish; enters once on scroll.
- **Trust signals:** the AI knowing its limits; the human named/represented; the completeness of the passed context.
- **Scroll transition:** a clean handoff for one call opens *"but does it hold at my volume?"* → reliability.

---

## Section 8 — Reliability (Beat 6)

- **Purpose:** answer the fear of quiet failure at scale.
- **Business objective:** win the mental "will this survive my pilot" test.
- **User psychology:** "Does it break on call #5,000?" → conviction.
- **Layout:** narrative register, `--container-text`, left-anchored. Heading + two-sentence claim; optional a restrained "scrub across a long run" evidence element (no fake counter).
- **Visual hierarchy:** the heading (a memorable line) leads; body supports.
- **Visual balance:** left-anchored text; the timeline motif can stretch as a long horizontal anchor implying volume.
- **Whitespace:** generous; this is a confident, unhurried claim.
- **Content:** the failure-mode framing + the mechanism that makes reliability visible; deliberately no fabricated uptime number.
- **Component usage:** type; optional `Timeline` (long) or `Chart` (consistency across a run), real/labeled only.
- **Copy:**
  - Heading (`h2`): **"It holds at call #5,000."**
  - Body: "The failure that kills voice pilots isn't a bad demo — it's quiet degradation at volume. Telebeli is built so the five-thousandth call runs like the first. And because every call is watched and scored, you would see drift the moment it began — not after your customers did."
- **CTA placement:** none.
- **Interaction:** if the optional run-scrubber is present, it lets the visitor scan consistency across many calls (real/labeled).
- **Animation:** `enter` on the heading; any evidence element draws once; no counters, no ticking.
- **Trust signals:** honesty (no invented uptime figure); reliability framed as a consequence of the visible mechanism already shown.
- **Scroll transition:** "you would see drift" ties reliability back to visibility and opens *"who else actually trusts this?"* → proof.

---

## Section 9 — Proof & legitimacy (Beat 7)

- **Purpose:** confirm belief with social and institutional proof.
- **Business objective:** move from "I believe the mechanism" to "others trust it, and a real group is behind it."
- **User psychology:** "Who trusts this, and who's behind it?" → trust.
- **Layout:** `--container-content`, centered. Sagenex endorsement line; when a real case study exists, a `Testimonial`/`CaseStudyCard` with a named protagonist and sourced outcomes.
- **Visual hierarchy:** the customer quote (serif pull-quote) leads when present; otherwise the Sagenex statement leads.
- **Visual balance:** centered, calm; one quote or one endorsement — not a logo wall.
- **Whitespace:** 128px above; the quote given room to land.
- **Content:** Sagenex parentage (true today); real case study (candor gate — only when it exists).
- **Component usage:** `Testimonial`, `CaseStudyCard`, `Avatar`, `Metric` (sourced only).
- **Copy:**
  - Heading (`h2`): **"An initiative of Sagenex Group — built for operations that can't fail quietly."**
  - Body (until a real case study lands): "Telebeli is backed by Sagenex Group, and built for the teams whose phone lines can't afford a silent failure — patient access, collections, claims, dispatch."
  - Case study slot (when real): serif pull-quote + name, role, company + one sourced outcome.
- **CTA placement:** a quiet "Read the full story" (expands) when a case study exists.
- **Interaction:** case-study expand/collapse in place.
- **Animation:** `enter` once; expand via `reconcile`.
- **Trust signals:** institutional backing; and — critically — **no invented customers or logos** until real (the candor rule visibly kept).
- **Scroll transition:** "built for operations that can't fail quietly" opens *"could I get this past my risk team?"* → compliance and candor.

---

## Section 10 — Compliance & candor (Beat 8)

- **Purpose:** clear the compliance gate and make the signature honesty move.
- **Business objective:** unblock the risk/compliance veto; deposit the largest trust asset; certify every claim above.
- **User psychology:** "Can I put this in front of risk and compliance?" → assurance + integrity ("they admit what they can't prove").
- **Layout:** `--container-content`. Heading, then the `CandorPanel` — two honest columns, **open by default**: "What we can prove today" / "What we're still earning." A "Request the security packet" action; a link to the trust center.
- **Visual hierarchy:** the two-column candor panel leads; heading supports.
- **Visual balance:** two balanced columns; the "still earning" column is not hidden or minimized — equal visual weight is the point.
- **Whitespace:** clear separation between the two columns; calm, ledger-like.
- **Content:** real, current security posture on the left; honestly-dated in-progress items on the right.
- **Component usage:** `CandorPanel`, `Card` (evidence), `Button` (secondary "Request the security packet"), `Link` (trust center), `Badge` (status of each item).
- **Copy:**
  - Heading (`h2`): **"Built for compliance. Honest about what we can't prove yet."**
  - "What we can prove today": "Encryption in transit and at rest · PII redaction before storage · configurable retention per workspace · full audit logs · SSO and role-based access."
  - "What we're still earning": "SOC 2 Type II — in progress; attestation expected [date]. HIPAA with a BAA — available for enterprise pilots. We will not claim a certification before it is attestable."
  - Closing line: "You can ask us for our current status at any time."
- **CTA placement:** secondary **"Request the security packet"**; quiet link "Visit the trust center."
- **Interaction:** panel open by default; optional expand for detail; "Request the security packet" opens a `Dialog` (real capture).
- **Animation:** `enter` once; expands via `reconcile`.
- **Trust signals:** the highest-value one — publicly stating limits. This retroactively certifies every prior claim; it is the emotional turning point of the page.
- **Scroll transition:** honesty earned, the visitor exhales; it opens *"what will this cost, and will it surprise me?"* → pricing.

---

## Section 11 — Pricing (Beat 9)

- **Purpose:** remove the unpredictable-cost fear; make transparency the pitch.
- **Business objective:** commercial de-risking immediately before the ask; capture high-intent modelers.
- **User psychology:** "What will this cost, and will it surprise me?" → respect/fairness.
- **Layout:** major transition (160px above), `--container-content`. Heading + one-line model statement; the `PricingCalculator` (sliders → live mono estimate); `PlanCard`s below (one highlighted).
- **Visual hierarchy:** the live estimate (mono, prominent) leads; the calculator controls and plans support.
- **Visual balance:** calculator centered/left with the estimate as the focal figure; plan cards in a balanced row (the highlighted one carries slightly more weight).
- **Whitespace:** clear separation between calculator and plans; generous around the estimate figure.
- **Content:** by-the-second model; sliders (minutes, concurrency); Starter / Growth / Enterprise plans; capture.
- **Component usage:** `PricingSection`, `PricingCalculator`, `Slider`, `Metric` (estimate), `PlanCard` (one `highlighted`), `Button`, `Form` (capture).
- **Copy:**
  - Heading (`h2`): **"Transparent pricing, billed by the second. No hidden stack."**
  - Body: "You pay for connected call time, billed by the second. No per-seat fees, no charge for idle capacity, and no stacked provider costs to reconcile later."
  - Estimate label: "Estimated / month" (figure in mono).
  - Plan CTAs: Starter "Start free" · Growth "Start free trial" · Enterprise "Talk to our team".
- **CTA placement:** under the estimate, **"Send me this estimate"** (captures email); Enterprise plan → **"Talk to our team"**.
- **Interaction:** estimate updates live on slider `input` (no calculate button, no count-up); typed fallback; "Send me this estimate" opens a light capture.
- **Animation:** estimate updates instantly (`press`-speed value change, never ticking); cards `enter` once.
- **Trust signals:** transparency itself; the explicit "no hidden stack" answering the competitor wound; capture turns modeling into a low-pressure next step.
- **Scroll transition:** cost de-risked opens *"I'm interested — what's the low-risk next step?"* → the invitation.

---

## Section 12 — The invitation (Beat 10)

- **Purpose:** make the ask, now that every objection is cleared and trust has crossed the threshold.
- **Business objective:** convert to a booked conversation/pilot; equip the champion; capture everyone else.
- **User psychology:** "What do I do next without regretting it?" → calm readiness.
- **Layout:** `--container-content`, centered. Heading + one-line reassurance; a primary CTA; secondary "watch/hear" options; a champion "take this to your team" action; a no-dead-end capture line.
- **Visual hierarchy:** the primary CTA is the single focal element; everything else recedes.
- **Visual balance:** centered, singular — the calmest, most decisive composition on the page.
- **Whitespace:** the most open section after the hero; the CTA sits in clear space.
- **Content:** the smallest safe next step; a shareable kit for the internal sale; an email-capture fallback.
- **Component usage:** `Button` (primary + secondary), `Form` (capture), `Card` (champion kit link).
- **Copy:**
  - Heading (`h2`): **"See it on your lines. Talk to our team."**
  - Body: "Watch a real call, hear one, or run a scoped pilot on your own lines before you commit. Someone on our team will help you set it up — no pressure, no dead ends."
  - Champion line: "Building the case internally? Take the recorded call and a one-page summary to your team."
  - Capture line: "Not ready? Send yourself the recorded call and the estimate."
- **CTA placement:** primary **"Talk to our team"** (or "Book a working session") centered; secondary **"Watch a real call"**; tertiary text actions for the champion kit and the email capture.
- **Interaction:** primary opens a real scheduler/`Dialog` reaching a human; champion action provides the shareable artifact; capture emails the call/estimate. Exit-intent may surface the capture once, quietly.
- **Animation:** `enter` once; success confirmation via `Toast` (plain, no confetti).
- **Trust signals:** a human on the other side; a low-risk pilot before commitment; the explicit "no dead ends" honesty.
- **Scroll transition:** the loop closes into action or capture — never nothing. Downward leads to the footer's completeness signal.

---

## Section 13 — Footer

- **Purpose:** completeness and trust; a full, honest site index.
- **Business objective:** satisfy the enterprise checklist (trust/company/legal); serve the returning committee.
- **User psychology:** "These people are real and organized." Reassurance.
- **Layout:** `--container-wide`, multi-column. Columns: Product · Solutions · Developers · Trust · Company · Legal. Endorsement + status line + wordmark.
- **Visual hierarchy:** column headers (`label`) over quiet links; the Sagenex endorsement and status link sit at the base.
- **Visual balance:** even columns, calm; a full-width hairline separates it from the page.
- **Whitespace:** major top margin (160px); consistent column gaps.
- **Content:** every link resolves; Trust column (security, status, subprocessors, DPA); Company (about, careers, contact); Legal (privacy, terms, DPA); "an initiative of Sagenex Group"; status link.
- **Component usage:** `Footer`, `FooterColumn`, `FooterNav`, `Link`, `Status` (system status dot).
- **Copy:** column headers "Product / Solutions / Developers / Trust / Company / Legal"; base line "Telebeli — an initiative of Sagenex Group."; "All systems operational" (linked to the real status page).
- **CTA placement:** none primary; the Trust and Docs links serve late-stage branches.
- **Interaction:** standard nav; status dot reflects real system status (`Status` component).
- **Animation:** none (footer is static).
- **Trust signals:** no dead links (fixing Phase 01); a live status link; legal and subprocessor transparency; Sagenex.
- **Scroll transition:** terminal — the page ends on completeness and a working status signal, the final quiet proof of a system you can watch.

---

## Implementation notes & acceptance criteria

**The through-line rule.** Each section's closing thought is the next section's opening question (§ Scroll transition fields). The `Timeline` motif is the visual thread — introduced in the hero, it recurs as a hairline anchor across beats, so the page feels like one continuous record.

**Register discipline.** Sections 2, 3, 7, 8, 9, 11, 12 use the **airy** register (720 measure, generous whitespace). Sections 5, 6 use the **dense/evidence** register (1320 full-bleed). This alternation is the page's rhythm; do not flatten it.

**Emotional curve check.** The page must feel like a steadily rising line of calm confidence, starting below neutral (Recognition) and ending in quiet readiness (Invitation) — never a hype spike. If a section adds excitement rather than assurance, it is wrong.

**Candor gates (must hold at build).** No fabricated metrics anywhere. Compliance copy states only attestable facts (Section 10). Testimonials/logos appear only when real (Section 9). The pricing estimate is real math (Section 11). Every terminal action converts or captures (Sections 11–12).

**Acceptance criteria (a section is done when):**
1. It answers exactly one question and opens the next (Phase 03).
2. It carries ≥2 DNA signatures (annotated record, event marker, mono evidence, handoff-violet, hairlines).
3. It ships loading/empty/error/reduced-motion states for any data element (Phase 04/06).
4. Its copy passes the voice rules (no hype, no banned words, no exclamation, no unprovable claim).
5. Its motion uses only Phase 04 tokens; its color and type use only semantic tokens.
6. A stranger reading only the headings still understands Telebeli (the approval gate).

*The page should read like a system of record making its case: calm, exact, and honest — leading the visitor, one answered question at a time, from a remembered failure to a decision they feel certain about.*
