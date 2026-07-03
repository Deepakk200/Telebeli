import { Reveal } from "@/components/motion";
import { STAGGER_CAP, STAGGER_STEP } from "@/lib/motion";
import { surface } from "@/lib/surface";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { industries } from "@/constants/landing";

/**
 * P09 — Industries (position 9). "Built for" framing sourced from the posters —
 * no fabricated customers or outcomes. Icons match logos.tsx (the trusted-by
 * row); card craft matches the capability grid. RSC; per-card Reveal for the
 * capped 40ms stagger.
 */
export function Industries() {
  return (
    <section id="industries" className="container-page scroll-mt-24 py-[var(--spacing-section)]">
      <SectionHeading
        eyebrow="INDUSTRIES"
        title="Built for high-stakes, high-volume operations"
        description="Telebeli is built for the sectors where a missed or mishandled call has real consequences. Here's where it fits — what it's built for, not who we can name."
      />

      <div role="list" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry, index) => (
          <Reveal
            role="listitem"
            key={industry.name}
            delay={Math.min(index, STAGGER_CAP) * STAGGER_STEP}
            className={cn(surface({ interactive: true }), "flex h-full flex-col gap-3 p-6")}
          >
            <span className="flex size-11 items-center justify-center rounded-lg bg-accent-wash text-accent">
              <industry.icon className="size-5" aria-hidden />
            </span>
            <div>
              <h3 className="text-h3 text-foreground">{industry.name}</h3>
              <p className="mt-1.5 text-body text-ink-muted">{industry.useCase}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
