import type { LucideIcon } from "lucide-react";
import {
  PhoneIncoming,
  PhoneOutgoing,
  Languages,
  ShieldCheck,
  Workflow,
  BarChart3,
  Gauge,
  Users,
} from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    icon: Gauge,
    title: "Sub-400ms responses",
    description:
      "Streaming speech-to-speech keeps conversations natural. Callers never hear the awkward pause that gives a bot away.",
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
    icon: Users,
    title: "Human handoff, mid-sentence",
    description:
      "When intent gets complex, the agent warm-transfers to a live rep with the full transcript and context already attached.",
  },
  {
    icon: Languages,
    title: "32 languages",
    description:
      "Detects and switches language automatically, matching accent and cadence so every caller feels spoken to, not processed.",
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
    icon: BarChart3,
    title: "Every call, measurable",
    description:
      "Live dashboards for volume, latency, resolution rate, and sentiment — with searchable transcripts on demand.",
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

export const metrics: Metric[] = [
  { value: 128, suffix: "ms", label: "Median voice latency" },
  { value: 99.98, decimals: 2, suffix: "%", label: "Platform uptime" },
  { value: 41, suffix: "M+", label: "Calls handled" },
  { value: 87, suffix: "%", label: "Resolved without a human" },
];

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
    question: "How natural does the agent actually sound?",
    answer:
      "TeleBeli streams speech-to-speech with a median 128ms turn latency, so there is no robotic gap before it replies. It handles interruptions, backchannels (\"mm-hmm\"), and mid-sentence corrections the way a person does.",
  },
  {
    question: "What happens when a call is too complex for AI?",
    answer:
      "You define the escalation rules. When the agent hits them — an angry caller, a request outside scope, a compliance trigger — it warm-transfers to a live rep and passes the full transcript and detected intent so the human starts informed.",
  },
  {
    question: "How fast can we go live?",
    answer:
      "Most teams ship a production agent within a day. Describe the task, connect your knowledge base and tools, test in the console, then port a number or connect your SIP trunk.",
  },
  {
    question: "Is it secure and compliant?",
    answer:
      "Yes. Data is encrypted in transit and at rest, PII is redacted before storage, and retention is configurable per workspace. We support SOC 2 Type II, HIPAA with a BAA, SSO, and full audit logging.",
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
];
