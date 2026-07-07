import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./section-heading";
import { FadeIn } from "@/components/motion";
import { surface } from "@/lib/surface";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

// Every engagement includes these — phrasing lifted from existing site copy
// (the watch→score→handoff→prove spine, handoffSteps, securityCandor,
// enterpriseSelfServe). No new product claims.
const included = [
  "Full platform access — watch, score, hand off, and prove every call",
  "Human handoff with full context attached",
  "Scales to thousands of concurrent calls",
  "Full audit logs on every call and access",
];

/**
 * Custom pricing (enterprise / talk-to-sales). No tiers, no numbers: we scope it
 * to each business. RSC — FadeIn handles reduced motion, same as its siblings.
 */
export function Pricing() {
  return (
    <section id="pricing" className="container-page scroll-mt-24 py-[var(--spacing-section)]">
      <SectionHeading
        eyebrow="Pricing"
        title="Custom pricing, built around your call volume"
        description="No fixed tiers. Pricing is scoped to your business — call volume, industries, integrations, and compliance needs — so you pay for what you actually run, not a plan you're forced into."
      />

      <FadeIn className="mx-auto mt-14 max-w-xl">
        <div className={cn(surface({ elevation: "elevated" }), "p-8")}>
          <p className="text-sm font-medium text-brand">Every engagement includes</p>
          <ul className="mt-5 space-y-3">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-0.5 size-5 flex-shrink-0 text-brand" aria-hidden />
                <span className="text-sm leading-relaxed text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href={`mailto:${siteConfig.email}`}>Contact us</Link>
            </Button>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
