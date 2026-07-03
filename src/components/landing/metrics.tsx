import { Reveal } from "@/components/motion";
import { STAGGER_CAP, STAGGER_STEP } from "@/lib/motion";
import { surface } from "@/lib/surface";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { customerBenefits } from "@/constants/landing";

/**
 * P10 — Customer benefits (position 10). Formerly a row of fabricated pre-GA
 * counters; now qualitative, provable benefit cards (the poster's "why
 * businesses love" set, candor-rewritten). No numbers, so no Counter and nothing
 * to source. RSC; per-card Reveal for the capped 40ms stagger.
 */
export function Metrics() {
  return (
    <section id="benefits" className="container-page scroll-mt-24 py-[var(--spacing-section)]">
      <SectionHeading
        eyebrow="WHY TEAMS CHOOSE TELEBELI"
        title="The benefits are the ones we can stand behind"
        description="No inflated savings and no invented numbers — just what the platform reliably does for the teams that run it."
      />

      <div role="list" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {customerBenefits.map((benefit, index) => (
          <Reveal
            role="listitem"
            key={benefit.title}
            delay={Math.min(index, STAGGER_CAP) * STAGGER_STEP}
            className={cn(surface({ interactive: true }), "flex h-full flex-col gap-3 p-6")}
          >
            <span className="flex size-11 items-center justify-center rounded-lg bg-accent-wash text-accent">
              <benefit.icon className="size-5" aria-hidden />
            </span>
            <div>
              <h3 className="text-h3 text-foreground">{benefit.title}</h3>
              <p className="mt-1.5 text-body text-ink-muted">{benefit.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
