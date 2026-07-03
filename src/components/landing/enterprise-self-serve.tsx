import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion";
import { SectionHeading } from "./section-heading";
import { enterpriseSelfServe, selfServeCta } from "@/constants/landing";
import { surface } from "@/lib/surface";
import { cn } from "@/lib/utils";

/**
 * The Differentiator beat (07 · 09): the false trade-off (build-it-yourself
 * vs. six-month managed) collapsed into one offer. Two columns resolved side
 * by side; the self-serve CTA destination comes from config — never a
 * fabricated signup flow.
 */
export function EnterpriseSelfServe() {
  const columns = [enterpriseSelfServe.enterprise, enterpriseSelfServe.selfServe];
  return (
    <section className="container-page py-[var(--spacing-section)]">
      <SectionHeading
        eyebrow="Enterprise + self-serve"
        title="Enterprise-grade. Live in days."
        description="Not a six-month managed engagement, and not a build-it-yourself developer kit. Deploy self-serve with the compliance, scale, and support an enterprise actually needs."
      />

      <FadeIn>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {columns.map((column) => (
            <div key={column.title} className={cn(surface(), "p-6")}>
              <h3 className="text-base font-semibold">{column.title}</h3>
              <ul className="mt-4 space-y-3">
                {column.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          {/* Secondary by design — "Book a demo" stays the page's one primary CTA. */}
          <Button asChild variant="outline" size="lg" className="min-h-11">
            <Link href={selfServeCta.href}>
              {selfServeCta.label}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
