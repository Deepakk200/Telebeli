import type { LucideIcon } from "lucide-react";
import {
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
  Lock,
  Globe,
  ScrollText,
  KeyRound,
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
  secondaryCta: { label: "See How It Works", href: "/#how-it-works" },
};

// Trust row under the hero CTAs (approved image): recognized infrastructure and
// a security signal. `mark` selects the inline SVG drawn in the hero badge row.
export type HeroTrustBadge = { mark: "openai" | "twilio" | "shield"; lead: string; name: string };
export const heroTrustBadges: HeroTrustBadge[] = [
  { mark: "openai", lead: "Powered by", name: "OpenAI" },
  { mark: "twilio", lead: "Built on", name: "Twilio" },
  { mark: "shield", lead: "Enterprise", name: "Grade Security" },
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
export type ProblemScar = {
  icon: LucideIcon;
  claim: string;
  consequence: string;
};

export const problemScars: ProblemScar[] = [
  {
    icon: Repeat2,
    claim: "It breaks off-script.",
    consequence:
      "One unexpected question and the agent loops back to a canned line. You find out when a customer complains.",
  },
  {
    icon: EyeOff,
    claim: "It's a black box.",
    consequence:
      "Once it's live on your lines, you can't see what it's saying. You're asked to trust a system you can't inspect.",
  },
  {
    icon: PhoneMissed,
    claim: "It strands your hardest callers.",
    consequence:
      "When AI hits its limit, most platforms treat the handoff as an afterthought — so the highest-stakes calls end worst.",
  },
  {
    icon: Scale,
    claim: "It forces a bad trade-off.",
    consequence:
      "Build it yourself, outgrow a no-code tool, or sign a six-month managed contract. Enterprise and self-serve shouldn't be a choice.",
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

export type Metric = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

// [verify] Illustrative pre-GA figures — replace with sourced numbers before GA.
// Leads with visibility + reliability (never latency/voice fidelity — see non-goals).
export const metrics: Metric[] = [
  { value: 100, suffix: "%", label: "Of calls visible live" }, // [verify]
  { value: 99.9, decimals: 1, suffix: "%", label: "Uptime target" }, // [verify]
  { value: 20, suffix: "+", label: "Concurrent calls on the free tier" }, // [verify]
  { value: 1, prefix: "<", suffix: " day", label: "Self-serve to live" }, // [verify]
];

// ─── Security & compliance (07 · 08) ───────────────────────────────────────
// INTEGRITY: set real, verified status before launch — do NOT claim a
// certification not held. "aligned" is the conservative truthful default and
// never renders as a held certification. Flip a level to "certified" only
// when the certificate exists (master-plan open question #2).
export type ComplianceEntry = {
  framework: string;
  level: "certified" | "in_progress" | "aligned";
  /** Shown when level === "aligned" — conservative truthful phrasing. */
  alignedLabel: string;
};

export const complianceStatus: ComplianceEntry[] = [
  { framework: "SOC 2 Type II", level: "aligned", alignedLabel: "SOC 2-aligned controls" },
  { framework: "HIPAA", level: "aligned", alignedLabel: "HIPAA-ready controls" },
  { framework: "GDPR", level: "aligned", alignedLabel: "GDPR-ready processes" },
];

export function complianceLabel(entry: ComplianceEntry): string {
  if (entry.level === "certified") return entry.framework;
  if (entry.level === "in_progress") return `${entry.framework} — in progress`;
  return entry.alignedLabel;
}

export type SecurityAttribute = {
  icon: LucideIcon;
  label: string;
  detail: string;
};

export const securityAttributes: SecurityAttribute[] = [
  { icon: Lock, label: "Encryption", detail: "In transit and at rest, always." },
  { icon: Globe, label: "Data residency", detail: "Regional storage and retention controls." },
  { icon: ScrollText, label: "Audit logs", detail: "Every conversation and every access, logged." },
  { icon: KeyRound, label: "Access controls", detail: "SSO, granular roles, least privilege." },
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
      "Transparent per-minute pricing, no sales gate",
      "Port a number or bring your SIP trunk",
      "Test in the console before going live",
    ],
  },
};

// Self-serve CTA destination. Set the real signup/waitlist URL when it exists
// (master-plan open question #3) — do NOT fabricate a signup flow. Until then
// it honestly points at the drivable demo dashboard.
export const selfServeCta = { label: "Explore the dashboard", href: "/dashboard" };

export type PricingTier = {
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$0.09",
    cadence: "/ min",
    description: "For teams launching their first voice agent.",
    features: [
      "Up to 2,500 minutes / mo",
      "1 concurrent agent",
      "8 languages",
      "Standard voices",
      "Email support",
    ],
    cta: "Start free",
  },
  {
    name: "Growth",
    price: "$0.06",
    cadence: "/ min",
    description: "For scaling call volume across the business.",
    features: [
      "Up to 250k minutes / mo",
      "50 concurrent agents",
      "32 languages",
      "Premium voices + voice cloning",
      "CRM & telephony integrations",
      "Priority support",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    description: "For regulated, high-volume deployments.",
    features: [
      "Unlimited concurrency",
      "Dedicated capacity & SLA",
      "HIPAA / BAA, SSO, audit logs",
      "On-prem & private VPC",
      "Solutions engineer",
    ],
    cta: "Talk to sales",
  },
];

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
      "Yes. Data is encrypted in transit and at rest, PII is redacted before storage, and retention is configurable per workspace. We support SOC 2 Type II, HIPAA with a BAA, SSO, and full audit logging.",
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
    question: "How does pricing work?",
    answer:
      "You pay per minute of connected call time, billed by the second, with volume tiers. There are no per-seat fees and no charge for idle capacity. Enterprise plans move to committed-use pricing with a dedicated SLA.",
  },
  {
    question: "How natural does the agent actually sound?",
    answer:
      "Natural enough that callers stay on task: it handles interruptions, backchannels (\"mm-hmm\"), and mid-sentence corrections without the robotic gap. We treat voice quality as table stakes, not the headline.",
  },
];
