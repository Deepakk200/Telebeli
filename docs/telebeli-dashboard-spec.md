# Telebeli — Dashboard Product Design Specification

**Phase:** 08 — The product (dashboard)
**Prepared as:** Staff Product Designer review
**Standard:** enterprise observability comparable to Datadog, Linear, and Grafana — instrument-dense, real-time, keyboard-first, drill-down everywhere.
**Not code.** A design specification: every surface, every widget, every interaction, and why each exists.
**Locked to:** Phase 02 (candor, watch·score·prove, the operator is the user), Phase 04 (motion/interaction/a11y), Phase 05 v2 (visual DNA, dense register, Operations mode), Phase 06 (components + tokens).

---

## Design thesis

Every voice-AI dashboard on the market is a call log with charts. Telebeli's is an **observability system for conversation.** The mental model is Datadog's, translated to voice:

- **The unit is the call** (as a log line is Datadog's unit). Everything drills to a call; every call is a full, auditable record.
- **Three lenses map to the pillars:** *watch* (live visibility), *score* (QA/evaluation), *prove* (the auditable conversation timeline).
- **The workflow is detect → triage → investigate → resolve → prevent.** The dashboard exists to let the accountable operator catch a problem before a customer does, understand it in one drill-down, and prevent it recurring.
- **The user is the operator, not a developer** (Retool/Synthflow lesson) — they must monitor, investigate, and *change agent behavior* without waiting on engineering.
- **Candor is a product feature:** real data or clearly-labeled demo; the dashboard tells the truth about its own realtime connection and about what it doesn't know.

Operations (dark) mode is idiomatic for monitoring and is the recommended default for the live surfaces; the dashboard is fully themeable (both are true Phase 05 themes; only semantic tokens flip).

---

## §0 — Global shell & information architecture

**Why it exists:** one consistent frame so an operator never loses context while moving between watching, investigating, and configuring.

**Layout (three zones + a drawer):**
- **Left sidebar (primary nav)** — collapsible; grouped by workflow (below). Persistent live indicators (open alerts count, live calls count) sit inline with their nav items.
- **Top bar** — left→right: workspace switcher · breadcrumb · **global scope filter** (agent / line / environment) · **global time-range picker** · global search field · **live-connection status** · notifications bell (alert count) · theme toggle (light/operations) · account. `⌘K` affordance at right.
- **Main content** — the current surface, instrument-dense register, `--container-wide` full-bleed.
- **Right inspector drawer** — slides in on any "inspect" without navigating away (Linear/Datadog pattern); holds call/agent/contact detail; `Esc` closes, focus returns.

**IA (sidebar groups):**
- **Monitor:** Overview · Live Calls · Call Queue · Agent Monitoring
- **Investigate:** Search · Conversation Timeline (opens from any call) · QA
- **Analyze:** Analytics · Performance
- **Data:** CRM · Knowledge Base
- **Configure:** Agents & Settings · Integrations · Notifications · Permissions

**Global controls (Datadog signatures, present on every applicable surface):**
- **Time-range picker:** Live · 15m · 1h · Today · 7d · 30d · custom. Every analytical/monitoring surface respects it. This is the single most important shared control.
- **Scope filter:** narrow the whole surface to an agent, a line, or an environment; scope persists across surfaces.
- **Saved views:** any filtered state (facets + time + scope) saves as a named view, shareable by URL.
- **Live-connection status:** a `Status` element that honestly shows `live / reconnecting / paused / degraded` — the dashboard never pretends to be live when it isn't (candor).

**Global interaction laws:** hover/focus = inspect; row → drawer; aggregate → underlying calls (drill-down); realtime updates arrive via `reconcile`; `⌘K` from anywhere; nothing is a dead end.

---

## §1 — Overview (Mission Control)

**Why it exists:** the accountable operator's first glance — "is everything okay right now?" answered in one screen, before they dive anywhere.

**Layout:** a top strip of health tiles; a middle row of live stream + attention feed; a bottom row of trend sparklines. Respects global time range (defaults to Live/Today).

**Widgets (every one):**
- **Health tiles (StatCards):** Live calls now · Calls today · Resolution rate (vs target) · Median score (vs target) · Median latency · Active agents · Open alerts. Each shows value (mono), a sparkline, and a delta with semantic direction — no fabricated numbers; each links to its source surface.
- **Live stream (mini):** the top ~8 in-progress/just-completed calls (a compact Live Calls widget), streaming.
- **Attention feed:** the triage queue — regressions, failed calls, unusual handoff spikes, monitor breaches — ranked by severity; each item is one click to its calls. This is the "catch it before customers" surface.
- **Volume + score trend sparklines:** inbound/outbound volume and median score over the range, with deploy/version markers.
- **Agent health strip:** each live agent as a chip (status dot + score + latency); a `flag` marker if a monitor is breaching.

**Interactions:** click any tile → its surface pre-scoped; click an attention item → the drawer or the filtered calls; hover any sparkline point → exact mono values. Time-range and scope re-render everything.

**Realtime:** health tiles and the live stream update via `reconcile`; the attention feed prepends new items (a subtle `--state-flag` pulse once, not looping).

**Why:** Datadog/Grafana overviews answer "healthy or not" instantly; this one is tuned to the operator's single question and routes them straight to the problem.

---

## §2 — Live Calls

**Why it exists:** the literal "watch it working" — see every call as it happens, and step in when needed.

**Layout:** a **live tail** (Datadog Live Tail pattern): a stream table, newest at top, with a faceted filter rail on the left and the inspector drawer on the right.

**Widgets:**
- **Live tail table:** columns — time · agent · line · direction · caller (redaction-aware) · **status** (`live/resolved/handoff/flag`) · duration (ticking for live) · latency · language · detected intent · score (on completion). Each live row shows a mini `Timeline`/`EventMarker` progressing.
- **Facet rail:** filter by agent, line, status, language, intent, direction, score band, duration — with live counts per facet (Datadog logs explorer pattern).
- **Follow / Pause control:** "follow" pins to newest; "pause" freezes the stream to read (Datadog live-tail pause) — pausing is honest, the status shows `paused`.
- **Live-call controls (per selected live call):** **Monitor** (listen), **Whisper** (coach the agent — future/human context), **Barge / Take over** (a human joins/assumes the call). These make the operator's oversight real, not passive.
- **Concurrency meter:** current concurrent calls vs capacity (ties to Call Queue).

**Interactions:** click a row → inspector opens the **live transcript streaming** + waveform + live event timeline; from the drawer, open the full Conversation Timeline. Filters update the tail instantly; facet counts reconcile live. Keyboard: `j/k` move rows, `Enter` inspect, `f` follow, `space` pause.

**Realtime:** new calls `reconcile` in at top (throttled/batched to avoid jitter); live rows update duration/latency/status; a call moving to `handoff` flashes the violet marker once; the selected call's waveform animates only while its audio streams.

**Why:** operators managing high volume need a live, filterable, interveneable stream — the difference between "we have a dashboard" and "we can actually watch and act." The monitor/whisper/takeover controls answer the enterprise fear of losing control.

---

## §3 — Call Queue

**Why it exists:** answer "will we drop calls?" — reliability at volume, made operational.

**Layout:** capacity dashboard: a concurrency gauge up top; per-line queues below; routing status aside.

**Widgets:**
- **Concurrency utilization:** current vs capacity, with a threshold band; trend sparkline over the range.
- **Queue depth per line:** table of lines with waiting count, longest wait, SLA-on-answer status (`--state-flag` if breaching).
- **Overflow / after-hours routing status:** which rules are active, where overflow is going (to another agent, to voicemail, to a human).
- **Answer-time distribution:** histogram of time-to-answer.
- **Capacity forecast:** projected peak vs capacity for the range (labeled projection, not a promise).

**Interactions:** click a line → its live calls filtered; hover the gauge → exact utilization; a breaching SLA links to affected calls and can trigger a notification rule.

**Realtime:** gauge and queue depths reconcile live; a breach raises an attention-feed item and (if configured) a notification.

**Why:** Datadog/Grafana treat saturation as first-class; for voice, dropped/queued calls are lost customers, so capacity is a monitoring surface, not a settings footnote.

---

## §4 — Agent Monitoring

**Why it exists:** catch quiet degradation *per agent* before customers feel it — the reliability + accountability pillars, operationalized as monitors.

**Layout:** an agent health table/grid up top; a selected agent's detail (monitors, trends, deploy markers) below or in the drawer.

**Widgets:**
- **Agent health table:** each agent — status (`live/paused`) · calls/hr · resolution rate · median score · median latency · handoff rate · a health indicator rolled up from its monitors. Sparklines per metric in-row.
- **Monitors (per agent):** threshold-based health checks (score below X, latency above Y, handoff rate spiking, resolution dropping) with states `ok / warn / alert` — the Datadog monitor concept for voice.
- **Regression detector:** a statistical drift flag on score/resolution trend (the "before customers feel it" mechanism); links to the calls that moved the metric (correlation/drill-down).
- **Deploy / version markers:** overlaid on trends so a behavior change correlates to a config/version/KB change (Datadog deploy correlation) — critical for root-causing "why did it get worse today."
- **Alert list:** active and recent breaches for this agent.

**Interactions:** click an agent → detail (trends, monitors, versions, recent flagged calls); click a regression → the causal calls; edit a monitor threshold inline; pause an agent from here (with confirm `Modal`). Deploy markers are hoverable for what changed.

**Realtime:** health indicators and monitor states reconcile live; a new breach animates once and posts to the attention feed + notifications.

**Why:** this is the surface that makes "it doesn't break on call #5,000" real — you'd *see* the drift, per agent, tied to what changed. No competitor operationalizes per-agent monitors + regression detection + deploy correlation.

---

## §5 — Conversation Timeline (call detail)

**Why it exists:** investigate and **prove** any single call, end to end — the signature "prove" surface and the DNA-1 annotated record at full power.

**Layout:** full-surface or expanded drawer. A header (call meta), the **annotated timeline** across the top, the **synchronized transcript + audio** as the spine, and side panels for score, actions, handoff, and audit.

**Widgets:**
- **Annotated timeline (hero):** the call as a horizontal record with `EventMarker`s — greeting, intent detected, tool/action calls, guardrail/escalation triggers, **handoff** (violet), resolution — each with mono timestamps; latency per segment. Click a marker to seek.
- **CallPlayer:** real audio + waveform (real-audio-only animation) + **transcript** streaming/synced; scrub moves audio + transcript + timeline together; inspect any turn.
- **Score breakdown:** the rubric with per-criterion scores (mono), and *why* each score (the evaluation rationale) — opening the black box.
- **Detected intents & entities:** what the agent understood, per turn.
- **Actions taken:** every tool/CRM/API call the agent made mid-conversation (looked up order #, booked slot, updated ticket) — auditable, with success/failure.
- **Handoff packet:** exactly what was passed to the human (transcript, intent, caller context) — the artifact.
- **Sentiment track:** caller sentiment across the call.
- **Audit trail:** who accessed this call, when; redactions applied; retention status — the compliance record.

**Interactions:** marker-seek; turn-inspect; "jump to handoff"; copy call ID (mono); export (audited); flag for QA review; annotate. Keyboard: `space` play, `←/→` scrub, `[`/`]` prev/next event.

**Realtime:** if the call is live, the timeline writes itself via `reconcile` as events occur; transcript streams; on resolution the record finalizes.

**Why:** this is the auditable record that lets an operator answer "what exactly happened, and can I prove it" to a customer, a manager, or a regulator. It is the product's soul; every other surface leads here.

---

## §6 — QA

**Why it exists:** the "score" pillar — measure quality continuously, catch regressions, and improve agents.

**Layout:** score analytics up top; a review queue and scorecard editor below (tabs).

**Widgets:**
- **Score distribution:** histogram + per-criterion breakdown across the range/scope.
- **Review queue:** calls surfaced for human review — low-score, sampled, disputed, or flagged — as a work queue (assignable, statused).
- **Scorecard editor:** define/edit rubrics (criteria, weights, pass thresholds) — operator-owned, versioned.
- **Auto-vs-human calibration:** agreement between automated scores and human reviews, to trust the automation (a genuine QA-program need).
- **Annotation / dispute:** reviewers annotate turns, override a score, add coaching notes (feed back to Settings/KB).
- **Regression alerts (from scores):** feed the monitors in Agent Monitoring.

**Interactions:** open a queued call → Conversation Timeline with the scorecard focused; grade/override; edit a rubric criterion and preview its effect on recent calls; assign reviews. Bulk-select the queue (`x` to select, `j/k` to move).

**Realtime:** the review queue prepends newly-flagged calls; distribution updates as calls complete.

**Why:** Datadog-grade means continuous evaluation with monitors, not spot-checks. QA closes the loop: measure → review → adjust rubric/agent → measure again. It is what makes "every call is scored" true and improvable.

---

## §7 — Analytics

**Why it exists:** understand performance over time and prove it upward — the champion's reporting surface.

**Layout:** a configurable panel grid (Grafana-like), respecting global time range and scope; saveable as named dashboards.

**Widgets (panels):**
- Volume (inbound/outbound) over time · Resolution/containment rate · Handoff rate · Median score trend · Sentiment trend · Top intents (ranked) · Language mix · Cost over time · Outcomes by agent/line. Each panel: hover for exact mono values; click to drill to the underlying calls.
- **Comparisons:** period-over-period and agent-vs-agent overlays.
- **Segment/group-by:** by agent, line, language, intent, time bucket.
- **Export / schedule:** export a panel or schedule a digest (ties to Notifications) — for the upward report.

**Interactions:** add/remove/rearrange panels; group-by; drill any point to calls; save the view; share by URL. No fabricated data; every panel is real or labeled.

**Realtime:** live time-range keeps panels current; historical ranges are static.

**Why:** the analytical layer turns operations into evidence the org can act on — the Ramp/quantified-outcomes lesson, honestly sourced.

---

## §8 — Performance

**Why it exists:** the technical/SRE health surface — for the engineer and CTO — correlating system performance to call quality.

**Layout:** latency and reliability panels; pipeline breakdown; incidents.

**Widgets:**
- **Latency percentiles:** p50/p95/p99 per turn, per agent, over the range — the honest technical view (kept off the marketing page as a non-goal, but essential here).
- **Pipeline latency breakdown:** ASR → LLM → TTS → telephony segments, so you see where time goes.
- **Error/failure rates:** dropped calls, tool-call failures, ASR errors.
- **Uptime & incidents:** availability, incident timeline, deploy markers.
- **Provider/model health:** status of underlying providers; concurrency saturation.
- **Correlation panel:** latency vs score/resolution, so degraded performance ties to degraded outcomes.

**Interactions:** drill a latency spike to the slow calls; overlay deploy markers; hover for exact values; link an incident to affected calls.

**Realtime:** live percentiles and error rates reconcile; an incident posts to the attention feed.

**Why:** Grafana/Datadog SRE view; here it exists so technical reliability is provable and correlatable to what customers actually experienced.

---

## §9 — CRM

**Why it exists:** the agents act on real records — operators must see and trust the data flowing to and from the CRM, and audit it.

**Layout:** a contact/account table with a contact detail drawer; sync status aside.

**Widgets:**
- **Contact table:** contacts/accounts with last-call outcome, sentiment trend, total calls, owner, CRM-sync status.
- **Contact detail:** full call history (each links to its Conversation Timeline), outcomes, notes the agent captured, fields synced.
- **CRM sync status:** connection health with Salesforce/HubSpot/Zendesk, last sync, error queue, field mapping.
- **Field mapping editor:** which call data writes to which CRM field.
- **Write audit:** what the agent wrote/updated in the CRM, per call (auditable — ties to actions in the timeline).

**Interactions:** open a contact → history; open a call → timeline; resolve a sync error; edit mapping (with confirm). Redaction-aware for PII per permissions.

**Realtime:** sync status and error queue reconcile; a failed write raises an alert.

**Why:** "wired into your stack" is a claim competitors make; making the data flow visible and auditable is how Telebeli makes it *trustworthy*.

---

## §10 — Knowledge Base

**Why it exists:** close the improvement loop — better answers come from better knowledge, and calls reveal the gaps.

**Layout:** source list + document editor; a coverage/gap report as the differentiator.

**Widgets:**
- **Source list:** documents, FAQs, URLs, connected sources — with version, last-updated, and which agents use them.
- **Document editor:** edit content, version history, rollback; attach to agents.
- **Coverage / gap report:** **questions callers asked that the KB couldn't answer** (mined from transcripts/QA) — a ranked list of gaps, each linking to the calls. This is the signature KB feature: the product tells you what it doesn't know.
- **Test-a-question:** type a question, see what the agent would retrieve/answer, from which source.
- **Freshness monitor:** stale/again-failing sources flagged.

**Interactions:** click a gap → the calls that hit it → create/edit a KB entry to fix it → verify with test-a-question. Version and rollback like code.

**Realtime:** the gap report updates as new unanswered questions arrive.

**Why:** this operationalizes "learn" — the loop from a failed call to a KB fix to a better next call — owned by the operator, no engineer required.

---

## §11 — Agents & Settings (the builder)

**Why it exists:** configure and improve agents — operator-owned, so the team can change behavior without waiting on engineering (the whole Synthflow/Retool thesis).

**Layout:** agent list → agent editor (tabbed) with a persistent **test console**; workspace/billing settings separate.

**Widgets:**
- **Agent editor tabs:** Goals & instructions (plain language) · Voice & language · **Guardrails** · **Escalation rules** (when to hand off, to whom — the handoff config) · **Tools/actions** (which CRM/API/tool calls it may make) · **Knowledge** (attach KB sources) · Limits (max duration) · Greeting.
- **Escalation-rule editor:** visual conditions (intent, sentiment, compliance trigger, out-of-scope) → action (warm transfer target). Makes the handoff pillar configurable without code.
- **Test console:** call the agent live, replay a real transcript against a new config, see the diff before publishing.
- **Version history + rollback:** every change versioned; preview, compare, roll back safely (Datadog/Grafana change-safety).
- **Publish / deploy:** stage → publish, with a deploy marker that appears on the monitoring trends (closing the correlation loop).
- **Workspace settings:** billing, data retention, redaction policy, default theme.

**Interactions:** edit → test in console → compare versions → publish; rollback in one action; changes are audited. Validation on blur (Form contract); no dead ends.

**Why:** this is where the marketing promise "describe the job → test → go live" becomes real, and where the operator owns the hundredth-call improvement, not just the first.

---

## §12 — Integrations

**Why it exists:** connect the stack and **monitor** it — connections are a reliability and audit surface, not a one-time setup.

**Widgets:**
- **Catalog:** telephony (SIP, number porting, carriers), CRM (Salesforce/HubSpot/Zendesk), tools (REST endpoints), webhooks, API keys — with real connection status/health each.
- **Connection health:** last success, error rate, latency per integration; a failing integration raises an alert.
- **Config panels:** per-integration setup; BYO-carrier/SIP; number management.
- **Integration call log:** every external call the agents made (the tool-call audit) — searchable, ties to the Conversation Timeline actions.
- **API keys & webhooks:** scoped keys, rotation, webhook delivery status/retries.

**Interactions:** connect/disconnect (confirm), rotate a key, replay a failed webhook, drill an integration error to the affected calls. Redaction/permission-aware.

**Why:** competitors treat integrations as a logo list; here they are monitored, auditable connections — because a silent integration failure is a silent call failure.

---

## §13 — Permissions

**Why it exists:** enterprise governance — who can see and do what — the compliance requirement made real in-product.

**Widgets:**
- **Roles matrix:** roles (Admin, Ops, Reviewer, Viewer, **Auditor**) × capabilities (view calls, hear audio, see PII, edit agents, manage integrations, export, admin) — clear, editable.
- **User list:** members, roles, last active, SSO status.
- **SSO / SAML / SCIM config:** enterprise identity; provisioning.
- **Scoped access:** restrict a user to specific agents/lines.
- **PII / redaction controls:** who can un-redact; per-field policy.
- **Access audit log:** every admin action and every sensitive access (who heard which call), immutable — the record regulators ask for.

**Interactions:** assign roles, scope access, configure SSO, export the audit log. Destructive changes require a confirm `Modal`.

**Why:** SSO/RBAC/audit were *claimed* on the marketing site (Phase 01 flagged: never shown). This surface makes them real and demonstrable — a sales unblocker.

---

## §14 — Notifications

**Why it exists:** get the right eyes on a problem before customers feel it — the "surface before the customer" promise turned into routing.

**Widgets:**
- **Notification rules:** monitor/alert → channel(s), with conditions and severity.
- **Channels:** email, Slack, PagerDuty, webhook — with delivery health.
- **Escalation policies / on-call:** who gets paged when, escalation ladders.
- **Alert inbox / history:** every alert, its state (triggered/acknowledged/resolved), and the calls behind it.
- **Digests:** scheduled summaries (the upward report) — ties to Analytics.
- **Preferences:** per-user notification settings; quiet hours.

**Interactions:** create a rule (choose a monitor, condition, channel); test a channel; acknowledge/resolve an alert (which links to its calls); snooze. 

**Realtime:** the alert inbox updates live; unacknowledged criticals persist visibly.

**Why:** a monitor with no route is just a dashboard nobody's watching at 2am; routing is what makes "never fail in silence" operationally true.

---

## §15 — Search (cross-cutting)

**Why it exists:** find any call, transcript, contact, agent, or doc instantly — the "explore" of an observability tool.

**Behavior:** global field (top bar) and a full explore surface. Keyword + **phrase-in-transcript** + semantic search; faceted (same facets as Live Calls); scoped and time-ranged. Results are calls/records, each opening to its detail. Searches save as views.

**Interactions:** `/` focuses search anywhere; type-ahead across entities; `Enter` opens; facets refine; "search transcripts for '…'" returns the exact turns. No-results state guides recovery.

**Realtime:** live searches include in-progress calls.

**Why:** operators live in search; making transcripts searchable by phrase is the difference between "we log calls" and "we can find the one that matters."

---

## §16 — Command Palette (⌘K)

**Why it exists:** keyboard-first speed for power operators (the Linear standard) and instant wayfinding for the multi-surface committee.

**Behavior:** `⌘K`/`Ctrl+K` opens a searchable palette that **navigates** (jump to any surface, agent, call, contact, doc), **acts** (pause an agent, create a monitor, export, open a saved view, switch scope/time-range, toggle theme), and **searches** (calls/transcripts). Recent and suggested actions surface first. Focus-trapped; `Esc` restores focus and scroll.

**Interactions:** type to filter; `↑↓` move; `Enter` run; nested actions (e.g., "Pause agent →" lists agents). Every meaningful action in the app is reachable here.

**Why:** it collapses the distance between intent and action, and — like Live Tail follow or Linear's palette — signals a serious, fast, keyboard-native product.

---

## §17 — Shortcuts (cross-cutting)

**Why it exists:** expert efficiency; the dashboard should be operable without a mouse.

**The map (representative):** `g` then `o/l/q/a/s/n/p` → go to Overview/Live/Queue/Agents/Search/Notifications/Performance · `j/k` move rows · `Enter` open · `x` select · `/` focus search · `f` follow (live) · `space` pause stream / play audio · `[` `]` prev/next event in a timeline · `e` export · `r` refresh · `?` open the shortcut cheatsheet · `Esc` close drawer/modal.

**Behavior:** a `?` overlay documents all shortcuts, grouped by surface; shortcuts never override browser/AT defaults; all are discoverable in the command palette too.

**Why:** speed is a feature (Linear); for operators triaging at volume, seconds compound.

---

## §18 — Realtime updates (cross-cutting system)

**Why it exists:** "watch it live" must be technically and experientially real — and honest when it isn't.

**Behavior:**
- **Live stream** over a persistent connection; the **live-status indicator** shows `live / reconnecting / paused / degraded` truthfully (candor — never fake-live).
- **Update motion:** all realtime changes use `reconcile`; new rows prepend; state changes cross-fade within the semantic palette; the waveform animates only for the actively-streaming selected call.
- **Batching/throttling:** updates are batched (e.g., coalesced per short interval) to prevent jitter and to protect performance and screen-reader sanity (see §19).
- **Follow vs pause:** the operator controls the stream; pausing freezes for reading and says so.
- **Reconnection:** on drop, the indicator shows `reconnecting`, buffered updates apply on reconnect with a subtle "N new" affordance rather than a disorienting jump.
- **Optimistic vs confirmed:** operator actions (pause an agent, take over a call) show immediately with a confirmed/failed reconcile.

**Why:** a monitoring product that silently stops updating is worse than none; making realtime state visible and controllable is itself a trust feature.

---

## §19 — Accessibility (cross-cutting)

**Why it exists:** an enterprise tool must be operable by everyone, and a realtime dashboard has accessibility hazards a static site doesn't.

**Behavior (inherits Phase 04/05 baseline; dashboard specifics):**
- **Keyboard-complete:** every surface, drawer, table, chart, and control operable by keyboard; the shortcut map (§17); focus managed on drawer/modal open/close.
- **Realtime + screen readers (critical):** live updates are **throttled and summarized** to a polite live region ("3 new calls; 1 handoff") rather than announcing every row — preventing the classic realtime-dashboard SR flood. Operators can mute live announcements. Critical alerts use `role="alert"` (assertive), sparingly.
- **Tables:** real semantics, `scope`, `aria-sort`, row focus; the dense data is navigable and announced coherently.
- **Charts:** every panel has a text summary and an accessible data-table equivalent; series distinguished by label/pattern, not color alone; thresholds announced.
- **Status/color:** never color-alone — status carries a text label everywhere (handoff-violet always paired with "Handoff").
- **Reduced motion:** all `reconcile`/`enter` become instant; realtime still updates, just without movement; the waveform renders a static representation.
- **Contrast & targets:** operations-mode and light-mode both meet contrast; targets ≥44px; focus rings ≥3:1.

**Why:** accessibility is both an enterprise procurement requirement and consistent with the brand's respect for the user; the realtime-SR throttling is the detail most dashboards get wrong.

---

## Governance & acceptance

1. **Everything drills to a call; every call is a full auditable record.** No aggregate is a dead end; the Conversation Timeline is always reachable.
2. **Every monitoring surface honors the global time-range and scope**, and any state is saveable as a view.
3. **Realtime is honest** — the live indicator never lies; degraded/paused states are shown.
4. **Candor holds** — real data or clearly-labeled demo; no fabricated metrics; the KB gap report and QA calibration exist because the product admits what it doesn't know.
5. **Operator-owned** — an ops user can investigate, review, adjust a rubric, edit an escalation rule, fix a KB gap, and publish an agent change without an engineer.
6. **DNA + dense register everywhere** — timeline, event markers, mono evidence, handoff-violet, hairlines; instrument density is the credibility.
7. **Keyboard-first and accessible** — command palette, shortcuts, and the realtime-SR discipline are acceptance criteria, not extras.

*A surface is done when a Datadog engineer would recognize the rigor, a Linear user would recognize the speed, a Grafana user would recognize the panels — and the accountable operator could catch a problem, prove what happened, and fix it, before a single customer felt it.*
