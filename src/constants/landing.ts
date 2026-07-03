import type { LucideIcon } from "lucide-react";
import {
  ArrowRightLeft,
  BrainCircuit,
  ClipboardCheck,
  Clock,
  Eye,
  FileCheck2,
  HeartHandshake,
  Target,
  UserCheck,
  PhoneIncoming,
  PhoneOutgoing,
  Languages,
  ShieldCheck,
  Workflow,
  BarChart3,
  LayoutDashboard,
  MessagesSquare,
  Rocket,
  TrendingUp,
  Gauge,
  Repeat2,
  EyeOff,
  PhoneMissed,
  Scale,
  Bot,
  CircleAlert,
  UserRound,
  PhoneForwarded,
  Webhook,
  KeyRound,
  BookOpen,
  Cross,
  Home,
  Landmark,
  Plane,
  ShoppingBag,
  BadgeCheck,
  Focus,
  Layers,
  SlidersHorizontal,
} from "lucide-react";

import type { CallRecord, Kpi } from "@/services/dashboard";
import { bookDemoHref } from "@/config/site";

export type HeroProofMetric = {
  /** Verified, sourced display value (e.g. "99.98%"). null = not yet defensible → omitted from the strip. */
  value: string | null;
  label: string;
};

// Approved landing copy (landing-page-approved.png). The eyebrow renders
// uppercase via the pill styling; line2 carries the blue→violet gradient accent.
export const hero = {
  eyebrow: "AI Voice Agents for Modern Businesses",
  headline: {
    line1: "Your AI Calling Agent,",
    line2: "Fully Set Up For Your Business",
  },
  subhead:
    "Telebeli builds and configures your complete voice AI calling system using Twilio and OpenAI — from infrastructure to personalized dashboards.",
  primaryCta: { label: "Book a Demo", href: bookDemoHref },
  secondaryCta: { label: "See How It Works", href: "/#lifecycle" },
};

// Trust row under the hero CTAs (approved image): recognized infrastructure and
// a security signal. `mark` selects the inline SVG drawn in the hero badge row.
export type HeroTrustBadge = { mark: "openai" | "twilio" | "shield"; lead: string; name: string };
export const heroTrustBadges: HeroTrustBadge[] = [
  { mark: "openai", lead: "Powered by", name: "OpenAI" },
  { mark: "twilio", lead: "Built on", name: "Twilio" },
  { mark: "shield", lead: "Enterprise", name: "Grade Security" },
];

// P07 — Integrations (position 7). Only truthful entries: the infrastructure
// Telebeli is built on (real brand marks) and generically-stated connector
// categories. Never an invented named third-party logo. `mark` renders the
// shared BrandMark; `icon` renders a lucide category glyph.
export type Integration = {
  name: string;
  mark?: "openai" | "twilio";
  icon?: LucideIcon;
  description: string;
};

export const integrationsBuiltOn: Integration[] = [
  {
    name: "OpenAI",
    mark: "openai",
    description:
      "Speech, reasoning, and voice models power what the agent understands and how it responds.",
  },
  {
    name: "Twilio",
    mark: "twilio",
    description:
      "Carrier-grade telephony carries the calls on your numbers, inbound and outbound.",
  },
];

export const integrationsConnect: Integration[] = [
  {
    name: "CRM & telephony integrations",
    icon: Workflow,
    description:
      "Push calls, outcomes, and structured leads into the tools your team already runs on.",
  },
  {
    name: "Webhooks & REST API",
    icon: Webhook,
    description:
      "Any system with an HTTP endpoint can be called mid-conversation or notified after a call.",
  },
  {
    name: "SIP trunk & number porting",
    icon: PhoneForwarded,
    description: "Bring your own carrier over SIP, or port existing numbers — no rip-and-replace.",
  },
  {
    name: "SSO & access controls",
    icon: KeyRound,
    description:
      "Single sign-on and role-based access, so the right people see the right calls.",
  },
];

// P04 — Interactive voice-workflow demo (position 4). Synthetic script only —
// never real customer data; the UI labels it "Labeled demo". A full call that
// visibly resolves, then reaches the human-handoff moment (the climax).
export type WorkflowTurn = { speaker: "caller" | "agent" | "system"; text: string };

export const workflowScript: readonly WorkflowTurn[] = [
  { speaker: "caller", text: "Hi, I need to move my delivery to Thursday." },
  {
    speaker: "agent",
    text: "Done — order #40128 is set for Thursday, 9am to noon. Anything else?",
  },
  { speaker: "caller", text: "Yeah — I think I was double-charged last month." },
  {
    speaker: "agent",
    text: "That one needs a billing specialist. Let me bring a human in with your details.",
  },
  {
    speaker: "system",
    text: "Warm transfer → Billing. Full transcript and detected intent attached.",
  },
] as const;

// P02 — Product-tour live view: synthetic seed data (labeled in the UI).
// The component adds status/startedAt at runtime; swapping in a websocket
// later replaces only the tick, not this data shape.
export type ProductTourSeed = Omit<CallRecord, "status" | "startedAt">;

export const productTourLive = {
  /** Two calls already in progress when the view seeds. */
  inProgressSeeds: [
    {
      id: "CALL-4101",
      contact: "Jonas Berg",
      direction: "inbound",
      durationSec: 47,
      latencyMs: 119,
      language: "English",
    },
    {
      id: "CALL-4099",
      contact: "Amara Diallo",
      direction: "outbound",
      durationSec: 128,
      latencyMs: 126,
      language: "French",
    },
  ] satisfies ProductTourSeed[],
  /** Names/languages the live tick draws from — synthetic, like everything here. */
  incomingContacts: [
    "Noah Kim",
    "Fatima Al-Sayed",
    "Lucas Weber",
    "Mei Chen",
    "Omar Haddad",
    "Sara Lindqvist",
  ],
  languages: ["English", "Spanish", "German", "Mandarin"],
};

// P01 — Product Overview (position 1, below Trusted Companies). Positioning
// prose from the brand playbook: Level-1 line (§21) + the pillar language
// (Visibility / Accountability). No metrics, no CTA — candor gates apply.
export type ProductOverviewItem = { term: string; description: string };

export const productOverview = {
  eyebrow: "ACCOUNTABLE VOICE AI",
  title: "Voice AI you can watch, score, and prove.",
  description:
    "Telebeli runs voice agents on your lines and makes every conversation visible, measured, and auditable — not a black box you're asked to trust.",
  items: [
    {
      term: "Watch",
      description:
        "Every call is observable, live and after the fact. Nothing happens on your lines that you can't see.",
    },
    {
      term: "Score",
      description:
        "Every call is evaluated automatically, so quality is measured, not assumed — and regressions surface before your customers feel them.",
    },
    {
      term: "Prove",
      description:
        "Everything is auditable. You can prove what happened on any call to anyone who needs to know.",
    },
  ] satisfies ProductOverviewItem[],
};

// P03 — Platform Capabilities (position 3). Sourced from poster-1's six
// capability tiles, rewritten to the enterprise candor voice: no percentages,
// no multipliers, no "every business". Distinct from heroFeatures (the four-up
// value-prop strip) — these are operational capabilities.
export type Capability = { icon: LucideIcon; title: string; description: string };

export const capabilities: Capability[] = [
  {
    icon: PhoneIncoming,
    title: "Never miss a call",
    description:
      "Every call is answered on the first ring — day, night, weekend. No queue, no voicemail, no callback list.",
  },
  {
    icon: UserCheck,
    title: "Qualify and engage leads",
    description:
      "The agent asks your qualifying questions, records the answers, and hands your team a structured lead instead of a voicemail.",
  },
  {
    icon: Clock,
    title: "24/7 availability",
    description:
      "Coverage that doesn't depend on shifts or staffing. The agent takes calls through nights and holidays without fatigue.",
  },
  {
    icon: Target,
    title: "Convert more conversations",
    description:
      "Answered instantly and followed up on time — fewer interested callers lost to hold music or missed callbacks.",
  },
  {
    icon: HeartHandshake,
    title: "Consistent customer experience",
    description:
      "Every caller hears the same calm, on-script voice. The thousandth call sounds like the first.",
  },
  {
    icon: BrainCircuit,
    title: "Smart and adaptive",
    description:
      "Understands intent, handles interruptions mid-sentence, and is tuned from real transcripts your team can review.",
  },
];

// Four-up feature strip beneath the hero (landing-page-approved.png; copy
// confirmed by telebeli-poster-*). Exactly four, in this order — do not add/remove.
export const heroFeatures: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Rocket,
    title: "Done-for-you Setup",
    description: "We handle everything from infrastructure to deployment.",
  },
  {
    icon: MessagesSquare,
    title: "AI-Powered Conversations",
    description: "Natural, human-like interactions using OpenAI.",
  },
  {
    icon: LayoutDashboard,
    title: "Custom Dashboards",
    description: "Personalized dashboards built around your business.",
  },
  {
    icon: TrendingUp,
    title: "Real Results",
    description: "More leads, more bookings, more revenue.",
  },
];

// Synthetic data for the hero's product glimpse. Mirrors the dashboard's own
// sample values (services/dashboard.ts) so the promise and the product agree
// on-screen; visibly labeled "Synthetic data" in the UI.
export const heroPreviewKpis: Kpi[] = [
  { label: "Calls today", value: 4996, delta: 12.4 },
  { label: "Resolution rate", value: 87.2, decimals: 1, suffix: "%", delta: 3.1 },
];

export const heroPreviewLiveCall = {
  contact: "Priya N.",
  line: "Inbound · Support line",
  elapsed: "1:42",
};

export const heroPreviewCalls: CallRecord[] = [
  {
    id: "CALL-3182",
    contact: "Ava Thompson",
    direction: "inbound",
    status: "resolved",
    durationSec: 154,
    latencyMs: 121,
    language: "English",
    startedAt: "2026-07-02T08:12:00Z",
  },
  {
    id: "CALL-3181",
    contact: "Diego Marin",
    direction: "outbound",
    status: "resolved",
    durationSec: 98,
    latencyMs: 117,
    language: "Spanish",
    startedAt: "2026-07-02T08:05:00Z",
  },
  {
    id: "CALL-3179",
    contact: "Elena Rossi",
    direction: "inbound",
    status: "transferred",
    durationSec: 233,
    latencyMs: 132,
    language: "English",
    startedAt: "2026-07-02T07:58:00Z",
  },
];

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    icon: BarChart3,
    title: "See every call",
    description:
      "Live dashboards for volume, outcomes, and sentiment, with searchable transcripts on demand. Nothing happens on your lines that you can't watch.",
  },
  {
    icon: PhoneIncoming,
    title: "Inbound, answered instantly",
    description:
      "Every call picked up on the first ring — no queue, no voicemail. Reservations, support, triage, and FAQs handled end to end.",
  },
  {
    icon: PhoneOutgoing,
    title: "Outbound at scale",
    description:
      "Run thousands of concurrent outbound calls for reminders, renewals, and follow-ups, each one personalized from your data.",
  },
  {
    icon: Workflow,
    title: "Wired into your stack",
    description:
      "Native actions for Salesforce, HubSpot, Zendesk, and any REST endpoint. The agent books, updates, and looks up in real time.",
  },
  {
    icon: ShieldCheck,
    title: "SOC 2 & HIPAA ready",
    description:
      "Encryption in transit and at rest, PII redaction, granular retention, and audit logs on every conversation.",
  },
  {
    icon: Languages,
    title: "32 languages",
    description:
      "Detects and switches language automatically, matching accent and cadence so every caller feels spoken to, not processed.",
  },
  {
    icon: Gauge,
    title: "Natural turn-taking",
    description:
      "Handles interruptions and backchannels and stays fast enough to feel human — not a hero number, just table stakes we keep.",
  },
];

// The four scars (03-copywriting · 04): name the fear before the feature.
// Empathetic and specific; never names competitors — the mirror does the work.
// P05 pairs each scar with Telebeli's honest answer, tagged to the pillar it
// belongs to (watch / score / handoff / prove). No fabricated outcomes.
export type ProblemScar = {
  icon: LucideIcon;
  claim: string;
  consequence: string;
  /** The pillar this answer belongs to — shown as a text label, not colour alone. */
  answerPillar: "Watch" | "Score" | "Handoff" | "Prove";
  answer: string;
};

export const problemScars: ProblemScar[] = [
  {
    icon: Repeat2,
    claim: "It breaks off-script.",
    consequence:
      "One unexpected question and the agent loops back to a canned line. You find out when a customer complains.",
    answerPillar: "Score",
    answer:
      "Every call is scored automatically, so a regression surfaces on your dashboard before a customer runs into it — not after they complain.",
  },
  {
    icon: EyeOff,
    claim: "It's a black box.",
    consequence:
      "Once it's live on your lines, you can't see what it's saying. You're asked to trust a system you can't inspect.",
    answerPillar: "Watch",
    answer:
      "Every call is observable live and after the fact, with searchable transcripts on demand. You inspect the system instead of trusting it.",
  },
  {
    icon: PhoneMissed,
    claim: "It strands your hardest callers.",
    consequence:
      "When AI hits its limit, most platforms treat the handoff as an afterthought — so the highest-stakes calls end worst.",
    answerPillar: "Handoff",
    answer:
      "When a call reaches the agent's limit, it warm-transfers to a person with the full transcript and detected intent attached. The caller never repeats themselves.",
  },
  {
    icon: Scale,
    claim: "It forces a bad trade-off.",
    consequence:
      "Build it yourself, outgrow a no-code tool, or sign a six-month managed contract. Enterprise and self-serve shouldn't be a choice.",
    answerPillar: "Prove",
    answer:
      "Deploy self-serve and grow into enterprise on one platform — audit logs and SOC 2 / HIPAA-class controls, without a six-month contract.",
  },
];

// The three-node handoff flow (07 · 06): AI handling → reaches its limit →
// human with full context. The last node is the point.
export type HandoffStep = {
  icon: LucideIcon;
  label: string;
  detail: string;
};

export const handoffSteps: HandoffStep[] = [
  {
    icon: Bot,
    label: "AI handling",
    detail: "Routine calls resolved end to end — bookings, changes, questions.",
  },
  {
    icon: CircleAlert,
    label: "Reaches its limit",
    detail: "A sensitive intent, an escalation rule, or a caller who needs a person.",
  },
  {
    icon: UserRound,
    label: "Human, full context attached",
    detail:
      "Full transcript and detected intent handed over — the caller never repeats themselves.",
  },
];

// P06 — the AI call lifecycle: the four stages every call moves through, on the
// watch → score → handoff → prove spine. Distinct from `steps` below (which is
// the get-started onboarding flow). The Handoff stage is tagged so the UI can
// give it the state-handoff violet alongside its text label.
export type LifecycleStage = {
  pillar: "Watch" | "Score" | "Handoff" | "Prove";
  icon: LucideIcon;
  title: string;
  description: string;
};

export const lifecycleStages: LifecycleStage[] = [
  {
    pillar: "Watch",
    icon: Eye,
    title: "See every call",
    description:
      "The moment a call connects it's observable — live and after it ends, with searchable transcripts and full context. Nothing on your lines is hidden.",
  },
  {
    pillar: "Score",
    icon: ClipboardCheck,
    title: "Score every call",
    description:
      "Each call is evaluated automatically against your rubric, so quality is measured rather than assumed and regressions surface before customers feel them.",
  },
  {
    pillar: "Handoff",
    icon: ArrowRightLeft,
    title: "Hand off when it should",
    description:
      "When a call reaches the agent's limit, it warm-transfers to a person with the full transcript and detected intent attached — no one starts from scratch.",
  },
  {
    pillar: "Prove",
    icon: FileCheck2,
    title: "Prove what happened",
    description:
      "Every call is auditable end to end, so you can show exactly what was said and done to anyone who needs to know — risk, compliance, or a customer.",
  },
];

export type Step = {
  number: string;
  title: string;
  description: string;
};

export const steps: Step[] = [
  {
    number: "01",
    title: "Describe the job",
    description:
      "Write the agent's goals in plain language, drop in your knowledge base, and connect the tools it should use.",
  },
  {
    number: "02",
    title: "Test and tune",
    description:
      "Call your agent live in the console, replay real transcripts, and adjust guardrails until it sounds exactly right.",
  },
  {
    number: "03",
    title: "Go live in a day",
    description:
      "Port a number or connect your SIP trunk. TeleBeli scales from one call to fifty thousand concurrent, automatically.",
  },
];

// P10 — Customer benefits (position 10). The poster's "why businesses love"
// set, rewritten to the candor voice: no percentages, no multipliers, no
// fabricated stats. Qualitative and provable — honesty is the benefit.
export type CustomerBenefit = { icon: LucideIcon; title: string; description: string };

export const customerBenefits: CustomerBenefit[] = [
  {
    icon: Layers,
    title: "Scale without a queue",
    description:
      "From a single call to many at once — no hold music and no degradation as volume climbs.",
  },
  {
    icon: BadgeCheck,
    title: "Consistent and professional",
    description:
      "Every caller hears the same calm, on-brand voice, whether it's the first call of the day or the thousandth.",
  },
  {
    icon: SlidersHorizontal,
    title: "Customizable to your business",
    description:
      "Trained on your services and your way of talking, and tuned from real transcripts your team reviews.",
  },
  {
    icon: BarChart3,
    title: "Detailed reports",
    description:
      "Call summaries, transcripts, scores, and lead data — in real time, exportable, and auditable.",
  },
  {
    icon: Focus,
    title: "Focus on what matters",
    description:
      "Let the agent handle the calls so your team can spend its time closing and growing.",
  },
];

// P08 — Compliance & candor panel (spec §10, exact approved copy). Two equal-
// weight columns, open by default. Attestable-only: no certification is claimed
// before it is attestable, and no date is fabricated (the spec's "[date]" slot
// stays honest until a real attestation date exists).
export type StillEarningItem = { framework: string; status: string; note: string };

export const securityCandor = {
  proveToday: [
    "Encryption in transit and at rest",
    "PII redaction before storage",
    "Configurable retention per workspace",
    "Full audit logs on every call and access",
    "SSO and role-based access control",
  ],
  stillEarning: [
    {
      framework: "SOC 2 Type II",
      status: "In progress",
      note: "Audit underway; we publish the attestation date once it is set.",
    },
    {
      framework: "HIPAA with a BAA",
      status: "Enterprise pilots",
      note: "Available for enterprise pilots.",
    },
  ] satisfies StillEarningItem[],
  disclaimer: "We will not claim a certification before it is attestable.",
};

// P09 — Industries (position 9). "Built for" framing, sourced from the posters —
// never fabricated customers or outcomes. Icons match logos.tsx (the trusted-by
// row) for consistency. One candor-safe use case each; no names, no metrics.
export type Industry = { icon: LucideIcon; name: string; useCase: string };

export const industries: Industry[] = [
  { icon: Home, name: "Real Estate", useCase: "Lead qualification and viewing scheduling, around the clock." },
  { icon: BookOpen, name: "Education", useCase: "Admissions and enrolment questions, answered on the first ring." },
  { icon: Cross, name: "Healthcare", useCase: "Patient access and appointment booking, with PII redaction." },
  { icon: ShoppingBag, name: "E-commerce", useCase: "Order status, returns, and support — handled or escalated." },
  { icon: Plane, name: "Travel & Hospitality", useCase: "Booking, changes, and dispatch, at any hour." },
  { icon: Landmark, name: "Finance", useCase: "Collections and account servicing, with full audit logs." },
];

// ─── Enterprise + self-serve (07 · 09) ─────────────────────────────────────
export const enterpriseSelfServe = {
  enterprise: {
    title: "Enterprise-grade",
    items: [
      "SOC 2 / HIPAA-class controls and audit logs",
      "Scales to thousands of concurrent calls",
      "SLA, SSO, and dedicated capacity options",
      "A solutions engineer when you need one",
    ],
  },
  selfServe: {
    title: "Live in days",
    items: [
      "Deploy self-serve — no six-month engagement",
      "No sales gate — start without a sales call",
      "Port a number or bring your SIP trunk",
      "Test in the console before going live",
    ],
  },
};

// Self-serve CTA destination. Set the real signup/waitlist URL when it exists
// (master-plan open question #3) — do NOT fabricate a signup flow. Until then
// it honestly points at the drivable demo dashboard.
export const selfServeCta = { label: "Explore the dashboard", href: "/dashboard" };

// P13 — the invitation (spec §12). Calm, one focal ask that reaches a human,
// a quiet secondary that scrolls to the demo, and a low-pressure capture so no
// one is a dead end.
export const finalCta = {
  title: "See it on your lines. Talk to our team.",
  description:
    "Bring a real call flow and we'll show you what watching, scoring, and proving looks like on your numbers. Prefer to explore first? Send yourself the recorded call.",
  primary: { label: "Talk to our team", href: bookDemoHref },
  secondary: { label: "Watch a real call", href: "#workflow" },
  capture: {
    label: "Send yourself the recorded call",
    placeholder: "you@company.com",
    button: "Send it to me",
  },
};

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "What happens when a call is too complex for AI?",
    answer:
      "You define the escalation rules. When the agent hits them — an angry caller, a request outside scope, a compliance trigger — it warm-transfers to a live rep and passes the full transcript and detected intent so the human starts informed.",
  },
  {
    question: "How do you stay reliable at high call volume?",
    answer:
      "Reliability is the product. Calls are load-tested for long-duration stability and high concurrency, every call is scored automatically, and failures surface on your dashboard in real time — so quiet degradation gets caught before customers feel it, not after.",
  },
  {
    question: "Is it secure and compliant?",
    answer:
      "Yes. Data is encrypted in transit and at rest, PII is redacted before storage, retention is configurable per workspace, and every call and access is logged, with SSO and role-based access. SOC 2 Type II is in progress and HIPAA with a BAA is available for enterprise pilots — we won't claim a certification before it's attestable.",
  },
  {
    question: "How fast can we go live?",
    answer:
      "Most teams ship a production agent within a day. Describe the task, connect your knowledge base and tools, test in the console, then port a number or connect your SIP trunk.",
  },
  {
    question: "Which telephony and CRM systems does it integrate with?",
    answer:
      "Bring your own carrier over SIP, or port numbers directly. Native actions cover Salesforce, HubSpot, and Zendesk, and any REST API can be wired as a tool the agent calls mid-conversation.",
  },
  {
    question: "How natural does the agent actually sound?",
    answer:
      "Natural enough that callers stay on task: it handles interruptions, backchannels (\"mm-hmm\"), and mid-sentence corrections without the robotic gap. We treat voice quality as table stakes, not the headline.",
  },
  {
    question: "Who's behind Telebeli?",
    answer:
      "Telebeli is an initiative of Sagenex Group, built for operations that can't fail quietly. It's engineered on OpenAI and Twilio, with the accountability layer — watch, score, and prove — built in rather than bolted on.",
  },
];
