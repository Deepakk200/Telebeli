# Telebeli — Prioritized Action Roadmap

**Companion to:** Phase 01 (Product Audit & Competitive Research)
**Purpose:** Convert the Phase 01 diagnosis into a sequenced, traceable set of moves. This closes the one gap the Phase 01 checklist review flagged as *Partial* — actionability at the execution level — without padding the analysis or relitigating the strategy.
**Governing standard (inherited from Phases 01–02):** No fabricated metrics. No hype. No target numbers we can't justify. Every "done" state below is defined by an observable condition, not by an invented KPI.

**How to read this:** Actions are grouped into three horizons by *dependency and leverage*, not by preference. Each carries the Phase 01 section it resolves (traceability), a rough effort size (S / M / L / XL — a judgment, not a quote), a role-level owner (the team is unknown, so owners are archetypes), and a *definition of done* (what "resolved" looks like, verifiably). A traceability matrix at the end maps every Phase 01 finding to its action so nothing is dropped.

---

## The one thing (if you do nothing else)

Phase 01's master finding is that **the promise is real but the product behind it is a shell** — the positioning says "watch it working," and there is currently nothing a visitor can actually watch. Every downstream problem (trust, conversion, credibility) is throttled by that one fact.

So the single highest-leverage move is not a copy change or a color change:

> **Make one thing genuinely watchable, and make one path genuinely work.**
> Ship one real, playable call *and* fix the one conversion path a serious buyer would use. Everything else in this roadmap is either a prerequisite for that or a consequence of it.

If resources are severely constrained, do the Horizon 0 "stop the bleeding" list plus that one proof asset, and stop. A small site that is *honest and demonstrable* beats a large site that is *impressive and hollow* — that is the entire thesis of the brand.

---

## Horizon 0 — Credibility & Integrity

**Goal:** Stop actively undermining trust. Most of these remove harm rather than add capability, so they are fast and non-negotiable. They must land before any demand is driven to the site, because every one of them costs a serious buyer's confidence the moment it's noticed.

### 0.1 Fix the broken enterprise conversion path
- **Resolves:** §6.3 ("Talk to sales" links to `/dashboard`), §5.5 (broken CTA undermines enterprise trust).
- **Action:** Route "Talk to sales" / enterprise CTAs to a real destination — a contact form, a booking link, or a monitored inbox that reaches a human. Never a self-serve dead end.
- **Owner:** GTM / Founder. **Effort:** S.
- **Done when:** every high-value CTA reaches a human path, tested end to end.

### 0.2 Reconcile the compliance claims with reality
- **Resolves:** §5.1–§5.2 (hedged/aspirational claims presented as fact; unearned SOC 2 / HIPAA in footer and hero).
- **Action:** Remove or re-label any compliance claim that is not currently attestable. State posture honestly ("SOC 2 Type II in progress — attestation expected [date]"; "HIPAA/BAA available for enterprise deployments" only if true). This is a legal and trust risk, not a copy preference: advertising unearned compliance to healthcare/finance buyers invites the one question that collapses the pitch.
- **Owner:** Security/Compliance lead + Founder. **Effort:** S (copy) / ongoing (the certifications themselves are Horizon 1+).
- **Done when:** no public compliance statement outruns what can be shown on request.

### 0.3 Split the funnels
- **Resolves:** §6.1 (one funnel for three incompatible buyers), §2.2 (enterprise message, SMB packaging).
- **Action:** Establish two explicit paths — a self-serve/growth on-ramp *and* an enterprise path (demo request, security review, pilot). Per Phase 02, the enterprise path is the strategic priority; the growth path is the on-ramp, not the destination.
- **Owner:** GTM + Product. **Effort:** M.
- **Done when:** a regulated buyer and a self-serve buyer each have a distinct, working next step from the homepage.

### 0.4 Add lead capture on high-intent surfaces
- **Resolves:** §6.2 (no lead capture; the pricing calculator computes a number and does nothing with it).
- **Action:** Give every high-intent moment a way to raise a hand — calculator → "send me this estimate / talk to us," security page → "request the security packet," demo → "book a working session."
- **Owner:** GTM. **Effort:** S–M.
- **Done when:** no high-intent surface is a dead end.

### 0.5 Fix the dead company links and add basic company substance
- **Resolves:** §2.4, §8 (About/Careers/Blog/Contact are dead `#` links; no company legitimacy).
- **Action:** Ship a minimal but real About (who we are, that we are an initiative of **Sagenex Group** — a Phase 02 trust asset), a working contact route, and remove or populate every dead footer link. Legal pages (Privacy, Terms, DPA) must resolve to real documents.
- **Owner:** Founder + Legal. **Effort:** M.
- **Done when:** every footer link resolves to real content; Sagenex parentage is visible.

### 0.6 Enforce name and domain consistency
- **Resolves:** §4.1 (name carries no help), plus the Phase 02 terminology decision.
- **Action:** Standardize on **Telebeli** (one capital T) everywhere, and resolve the **telebeli.ai vs telebeli.com** ambiguity to a single canonical domain with redirects. Consistency is itself an enterprise-grade trust signal.
- **Owner:** Founder + Design/Brand. **Effort:** S.
- **Done when:** one spelling, one canonical domain, zero drift across site, assets, and metadata.

### 0.7 Ship one real proof asset — *the pivotal Horizon 0 item*
- **Resolves:** §2.5, §7.2, §9 (a voice product with no voice; the "watch it working" claim is asserted, not shown).
- **Action:** Publish **one genuinely real, playable call** — audio the visitor can hear — ideally the resolve-then-handoff moment the marketing already dramatizes. If a real call can't be published for privacy reasons, publish a real recorded walkthrough of the *actual* product handling a call, clearly labeled as such. This is the higher-effort exception in Horizon 0, placed here because the positioning is inert without it.
- **Owner:** Product + Design. **Effort:** L.
- **Done when:** a first-time visitor can *hear or watch a real call be handled* within one click of the hero — no synthetic loop, no fake dashboard.

**Horizon 0 exit criterion:** nothing on the public site is broken, dead, false, or unprovable, and at least one real, watchable proof asset exists.

---

## Horizon 1 — Proof & Substance

**Goal:** Turn assertion into evidence. Horizon 0 stops the harm; Horizon 1 builds the surfaces that let a buyer *verify the thesis* instead of taking it on faith. This is the heaviest horizon and the most product/engineering-led, because several items require the actual product to exist, not just be depicted.

### 1.1 Make the observability surface real (or honestly demonstrable)
- **Resolves:** §7.4 (inert mock dashboard), §3.4 (sparse where it should be dense), §1.1 (the wedge is the crown jewel and it's under-built).
- **Action:** Replace the mock-data dashboard with either (a) the real product surface, or (b) an interactive demo *clearly labeled as a demo* that behaves like the real thing — a live call monitor, a searchable transcript reader, a call-detail/drill-down view. The observability surface is the hero product, not a marketing metaphor; it should be shown doing real work with legible density (the Datadog lesson from §19b).
- **Owner:** Product + Eng + Design. **Effort:** XL.
- **Done when:** a prospect can open a call, read its transcript, and see its outcome — on real or honestly-labeled data.

### 1.2 Publish the scoring / evaluation methodology
- **Resolves:** §11 (the "every call is scored" differentiator is a black box), §2.3 (assertion without mechanism).
- **Action:** Document *how* calls are scored — the rubric, what counts as a regression, how it surfaces. This simultaneously fixes the technical-credibility gap and deepens the category claim. Per the brand rules, publish what's real and flag what's in progress.
- **Owner:** Product + Eng. **Effort:** M.
- **Done when:** a technical evaluator can read, in plain language, how a call gets a score and how a regression is caught.

### 1.3 Ship the "talk to the agent now" live demo
- **Resolves:** §9 (no interactive/live demo — the category's highest-converting asset), §7.1–§7.2 (nothing to actually try).
- **Action:** Let a visitor place or receive a real call with a Telebeli agent from the site — the single most persuasive asset in the category and the most conspicuous current omission.
- **Owner:** Product + Eng. **Effort:** L.
- **Done when:** a visitor can have a real conversation with an agent and then see that call reflected in the observability surface.

### 1.4 Build the trust & status surface
- **Resolves:** §5.4 (no status page, trust center, subprocessors, DPA/BAA), and converts the §12.2 opportunity (honesty → trust brand).
- **Action:** Publish a live status/reliability page, a subprocessor list, downloadable DPA, a BAA path, and a dated roadmap to each certification. For an observability-positioned brand, a public reliability surface is thematically essential — the brand should show its *own* reliability, not just the product's.
- **Owner:** Security/Compliance + Eng. **Effort:** M–L.
- **Done when:** a risk reviewer can self-serve the core trust documents and see live status without emailing anyone.

### 1.5 Establish developer substance (docs / API)
- **Resolves:** §11 (no docs, API reference, SDKs; §18 Stripe lesson — docs-as-product).
- **Action:** Publish real documentation for the integration surface the site already promises (REST, native actions, SIP/porting). Even a minimal, accurate quickstart beats none; the current absence makes technical evaluation impossible.
- **Owner:** Eng + Product. **Effort:** L.
- **Done when:** a developer can evaluate integration without a sales call.

### 1.6 Land the first real case study
- **Resolves:** §8, §10.2 (no proof, no protagonist), and applies the §19b Ramp lesson (quantified outcomes, honestly).
- **Action:** Convert one real deployment into a case study with a named protagonist and *real, sourced* outcomes (calls handled, containment, a caught regression) — no invented figures. One honest story outperforms a logo wall.
- **Owner:** GTM + Founder. **Effort:** M (dependent on a live customer).
- **Done when:** one verifiable customer story is public, with numbers the customer will stand behind.

### 1.7 Build the agent-creation flow the site promises
- **Resolves:** §7.5 (the promised builder doesn't exist), §7.7 (onboarding is a void).
- **Action:** Ship the "describe the job → test → go live" flow that "How it works" step 01 sells, with a real first-run experience for the self-serve path — designed for the *operator*, not only the developer (the §17/§19b Retool/Synthflow lesson).
- **Owner:** Product + Eng + Design. **Effort:** XL.
- **Done when:** a new user can create, test, and launch an agent without hand-holding.

**Horizon 1 exit criterion:** a buyer can independently verify the four pillars — watch, score, prove, hand off — on the live site or product, without taking a single claim on faith.

---

## Horizon 2 — Category & Compounding

**Goal:** Own the ground. Once proof exists (Horizon 1), invest in the durable, compounding assets that make Telebeli the default name for its category. Doing these *before* Horizon 1 would be marketing a category you can't yet demonstrate — so they are deliberately last.

### 2.1 Name and systematize the methodology
- **Resolves:** §12.1, §12.8, and the §17 Synthflow "BELL framework" lesson.
- **Action:** Package the watch–score–prove discipline into a named, ownable methodology (Phase 02 established the verbal spine). Make it proprietary vocabulary the market repeats.
- **Owner:** Founder + GTM. **Effort:** M.

### 2.2 Publish the "Accountable Voice AI" point of view
- **Resolves:** §10.3–§10.4 (no POV, no content engine), and the §19 Linear lesson (an authored worldview).
- **Action:** Start a focused content stream that names the category, argues the thesis (latency/voice are commoditizing; accountability is the moat), and educates the burned buyer. This is also the SEO surface the category shops in.
- **Owner:** GTM + Founder. **Effort:** M (ongoing).

### 2.3 Go deep in one vertical
- **Resolves:** §4.3, §12.5 (sectors named as icons, never developed).
- **Action:** Pick one high-stakes vertical (healthcare patient access or financial-services collections are the strongest fits for the accountability story) and build real workflow, compliance framing, and a protagonist. Depth in one beats breadth across six.
- **Owner:** Product + GTM. **Effort:** L.

### 2.4 Build the honest comparison surface
- **Resolves:** §6.5 (no comparison/alternative content, where the category actually shops).
- **Action:** Publish "vs" and "alternative" content — done honestly, as a natural extension of the candor brand. Doubles as SEO and as trust.
- **Owner:** GTM. **Effort:** M (ongoing).

### 2.5 Weaponize pricing transparency into a TCO tool
- **Resolves:** §12.3 (extend the calculator into an honest total-cost comparison).
- **Action:** Evolve the pricing calculator into a transparent TCO view that exposes competitors' hidden costs (build-path provider stacking; no-code plan-switching) — factually, without disparagement.
- **Owner:** Product + GTM. **Effort:** M.

**Horizon 2 exit criterion:** the market uses Telebeli's vocabulary, one vertical treats it as the default, and inbound arrives already understanding the category.

---

## Do NOT do yet (guardrails)

A roadmap is as much about restraint as sequencing. These are explicitly *deferred or forbidden*, to prevent premature scaling and brand erosion:

- **Do not drive paid demand to the site until Horizon 0 is complete.** Amplifying a site with broken paths and unprovable claims spends money to erode trust.
- **Do not re-introduce the hype framing.** The "save 80–90%," "10X productivity," "for every business" claims from the current growth collateral violate the Phase 02 brand rules and the Phase 01 differentiation thesis. Savings may be *stated factually and downstream* — never as the headline, never inflated.
- **Do not claim a certification before it is attestable.** (See 0.2.) This is the highest-consequence trust rule in the entire program.
- **Do not broaden verticals before proving one.** (See 2.3.) Breadth before depth re-creates the undifferentiated position Phase 01 warned against.
- **Do not scale the self-serve funnel while the enterprise motion is the strategic priority.** The growth path is an on-ramp; resourcing should reflect that.
- **Do not build a bigger marketing site before building a more real product.** The failure mode is a more elaborate depiction of a product that still doesn't exist.

---

## Ownership & effort model

Owners are role archetypes (the real team is unknown). Effort is T-shirt sizing — a directional judgment, not an estimate to plan against. Timelines are intentionally omitted at the item level because they depend entirely on team capacity; horizons are ordered by dependency, so *sequence* is the commitment, not calendar dates.

| Horizon | Theme | Dominant owners | Nature of work | Relative weight |
|---|---|---|---|---|
| 0 | Credibility & Integrity | Founder, GTM, Security, Design | Mostly removing harm; one real proof asset | Light–Medium (except 0.7) |
| 1 | Proof & Substance | Product, Eng, Design, Security | Building the surfaces that let buyers verify the thesis | Heavy |
| 2 | Category & Compounding | Founder, GTM, Product | Durable demand and category ownership | Ongoing |

---

## How we'll know it worked (honest signals, no fabricated targets)

Consistent with the brand's "no number we can't source" principle, success is defined as *conditions to instrument and observe*, not as invented targets. Instrument these; watch the direction; let real data set the bar.

- **Horizon 0:** Zero broken or dead paths on the site (verifiable by audit). No public claim that outruns provable reality (verifiable by review). At least one real, watchable proof asset live (binary). Watch: whether high-intent surfaces now produce inbound at all (they currently can't).
- **Horizon 1:** A prospect can independently verify each of the four pillars without sales assistance (walk it through as a mystery-shopper test). Watch: enterprise-path conversations reaching a human; security-doc self-serve requests; developer sign-ups against a real doc. Set the baseline from first real data — do not pre-commit to a number.
- **Horizon 2:** The category term appears in inbound language and third-party writing (observe, don't fabricate). One vertical's buyers reference Telebeli as a default. Watch: share of inbound that arrives already understanding "accountable voice AI."

The meta-signal across all three: **the gap between what the site promises and what a buyer can verify shrinks to zero.** That gap is the whole diagnosis; closing it is the whole roadmap.

---

## Critical path (dependencies in one view)

1. **0.7 (real proof asset)** unblocks the credibility of the entire positioning and should start immediately even though it's the heaviest Horizon 0 item.
2. **0.1–0.6** are fast and parallel; they should complete before any demand is driven anywhere.
3. **1.1 (real observability surface)** is the spine of Horizon 1 — 1.2 (methodology), 1.3 (live demo), and 1.7 (builder) all become more credible once it exists, and 1.3 ideally *feeds into* 1.1 (a demo call appears in the monitor).
4. **1.6 (first case study)** depends on a live customer, so it may run in parallel and land opportunistically rather than on a fixed slot.
5. **All of Horizon 2** depends on Horizon 1 proof existing. Marketing a category you can't demonstrate is the one sequencing error that would undo the brand.

---

## Closing

Phase 01 diagnosed. Phase 02 positioned. This roadmap sequences — and it holds the line established by both: the fix for Telebeli is not to *say* more, it is to *prove* more. Every item above either removes a claim that can't be backed or builds the evidence that lets a claim stand on its own. Done in order, it converts a beautifully-argued pitch into a demonstrably-trustworthy product — which is the only version of Telebeli the market will pay enterprise prices for.

*Make it watchable. Make it provable. Then, and only then, make it loud.*
