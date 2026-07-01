import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  Database,
  KeyRound,
  Lock,
  Server,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { surface } from "@/lib/surface";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Security & Trust",
  description:
    "How TeleBeli protects voice data — certifications, encryption, access controls, data residency, and subprocessors.",
  alternates: { canonical: "/security" },
};

// [verify] Confirm every certification/claim with the security team before GA.
const certifications = [
  "SOC 2 Type II",
  "HIPAA + BAA",
  "GDPR",
  "PCI DSS",
  "CCPA",
];

const pillars = [
  {
    icon: Lock,
    title: "Encryption everywhere",
    points: [
      "TLS 1.2+ in transit, AES-256 at rest",
      "PII redacted before storage",
      "Per-workspace encryption boundaries",
    ],
  },
  {
    icon: Database,
    title: "Data handling",
    points: [
      "Configurable retention, down to zero",
      "Recording and transcript opt-outs",
      "Data residency options (US / EU) [verify]",
    ],
  },
  {
    icon: KeyRound,
    title: "Access & identity",
    points: [
      "SSO / SAML and SCIM provisioning",
      "Role-based access control",
      "Full, immutable audit logs",
    ],
  },
  {
    icon: Server,
    title: "Infrastructure",
    points: [
      "Isolated tenants",
      "Private VPC and on-prem options",
      "Continuous vulnerability scanning [verify]",
    ],
  },
];

export default function SecurityPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
      <div className="max-w-2xl">
        <p className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-brand">
          <ShieldCheck className="size-4" />
          Security &amp; Trust
        </p>
        <h1 className="text-balance text-h1 font-semibold tracking-tight">
          Enterprise voice, handled responsibly
        </h1>
        <p className="mt-5 text-lead text-muted-foreground">
          Voice calls carry some of the most sensitive data your business touches. Here is exactly
          how TeleBeli secures it — in plain language, no legalese.
        </p>
      </div>

      {/* Certifications */}
      <div className="mt-12 flex flex-wrap gap-3">
        {certifications.map((cert) => (
          <span
            key={cert}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium"
          >
            <BadgeCheck className="size-4 text-brand" />
            {cert}
          </span>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {/* [verify] */}Certifications shown reflect target compliance posture; ask for current
        attestation reports and our latest audit status.
      </p>

      {/* Pillars */}
      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        {pillars.map((pillar) => (
          <div key={pillar.title} className={cn(surface({ elevation: "subtle" }), "p-6")}>
            <div className="flex size-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <pillar.icon className="size-5" />
            </div>
            <h2 className="mt-4 text-base font-semibold">{pillar.title}</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {pillar.points.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-brand" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Subprocessors */}
      <div className="mt-14">
        <h2 className="text-h3 font-semibold tracking-tight">Subprocessors</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {/* [to-source] Publish the live subprocessor list and change-notification policy. */}
          We maintain a current list of subprocessors (cloud infrastructure, telephony, and model
          providers) with data-processing terms in place. Request the latest list and our DPA below.
        </p>
      </div>

      {/* CTA */}
      <div
        className={cn(
          surface({ elevation: "elevated" }),
          "mt-12 flex flex-col items-start justify-between gap-4 p-8 sm:flex-row sm:items-center",
        )}
      >
        <div>
          <p className="text-base font-semibold">Need our DPA or a security review?</p>
          <p className="mt-1 text-sm text-muted-foreground">
            We&apos;ll share attestation reports, answer your questionnaire, and sign a DPA.
          </p>
        </div>
        <Button asChild size="lg">
          <Link href={`mailto:${siteConfig.email}?subject=Security%20review`}>
            Contact security
          </Link>
        </Button>
      </div>
    </div>
  );
}
