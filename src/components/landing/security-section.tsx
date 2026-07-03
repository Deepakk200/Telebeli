import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion";
import { SectionHeading } from "./section-heading";
import {
  complianceLabel,
  complianceStatus,
  securityAttributes,
} from "@/constants/landing";
import { surface } from "@/lib/surface";
import { cn } from "@/lib/utils";

/**
 * The Safety reassurance beat (07 · 08): solid and still — one quiet FadeIn,
 * no amber, no animation. Certification language comes exclusively from
 * `complianceStatus`; nothing here may imply a certification not held.
 */
export function SecuritySection() {
  return (
    <section className="container-page py-[var(--spacing-section)]">
      <SectionHeading
        eyebrow="Security & compliance"
        title="Built for regulated, high-volume operations."
        description="SOC 2 and HIPAA-class controls, encryption in transit and at rest, data residency, and audit logs — the requirements your security team will ask about, answered before they do."
      />

      <FadeIn>
        <ul className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {securityAttributes.map((attribute) => (
            <li key={attribute.label} className={cn(surface(), "p-5")}>
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <attribute.icon className="size-5" />
              </div>
              <p className="mt-3 text-sm font-semibold">{attribute.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {attribute.detail}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2.5">
          {complianceStatus.map((entry) => (
            <span
              key={entry.framework}
              className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium"
            >
              {complianceLabel(entry)}
            </span>
          ))}
          <Link
            href="/security"
            className="ml-auto inline-flex min-h-11 items-center gap-1.5 rounded-md text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Read the full security overview
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
