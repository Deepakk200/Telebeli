import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";
import { pricingTiers } from "@/constants/landing";

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-[var(--spacing-section)]">
      <SectionHeading
        eyebrow="Pricing"
        title="Pay for talk time, nothing else"
        description="Per-minute billing by the second. No seats, no idle fees. Scale down to zero and up to fifty thousand concurrent calls."
      />

      <Stagger className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-start">
        {pricingTiers.map((tier) => (
          <StaggerItem key={tier.name}>
            <div
              className={cn(
                "relative flex h-full flex-col rounded-2xl border bg-card p-8",
                tier.highlighted
                  ? "border-brand/50 shadow-floating ring-1 ring-brand/30 lg:-mt-4 lg:pb-12"
                  : "border-border shadow-subtle",
              )}
            >
              {tier.highlighted ? (
                <span className="absolute -top-3 left-8 rounded-full bg-brand px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most popular
                </span>
              ) : null}

              <h3 className="text-lg font-semibold">{tier.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-h2 font-semibold tracking-tight tabular-nums">{tier.price}</span>
                <span className="text-sm text-muted-foreground">{tier.cadence}</span>
              </div>

              <Button
                asChild
                className="mt-6"
                variant={tier.highlighted ? "default" : "outline"}
              >
                <Link href="/dashboard">{tier.cta}</Link>
              </Button>

              <ul className="mt-8 space-y-3 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                    <span className="text-foreground/85">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
