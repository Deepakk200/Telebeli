import { Reveal } from "@/components/motion";
import { STAGGER_CAP, STAGGER_STEP } from "@/lib/motion";
import { surface } from "@/lib/surface";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { capabilities } from "@/constants/landing";

/**
 * P03 — the capability map for the scanning buyer (position 3). Six cards from
 * the poster set, candor-rewritten. Distinct from features.tsx (hero value
 * strip). RSC; per-card Reveal implements the exact 40ms stagger with the
 * 5-item cap (Stagger's container variant can't cap — see lib/motion.ts).
 */
export function PlatformCapabilities() {
  return (
    <section
      id="capabilities"
      className="container-page scroll-mt-24 py-[var(--spacing-section)]"
    >
      <SectionHeading
        eyebrow="PLATFORM CAPABILITIES"
        title="What the platform does, day in and day out"
        description="The operational capabilities behind the promise — answering, qualifying, and following through on your calls around the clock."
      />

      <div role="list" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((capability, index) => (
          <Reveal
            role="listitem"
            key={capability.title}
            delay={Math.min(index, STAGGER_CAP) * STAGGER_STEP}
            className={cn(surface({ interactive: true }), "flex h-full flex-col gap-3 p-6")}
          >
            <span className="flex size-11 items-center justify-center rounded-lg bg-accent-wash text-accent">
              <capability.icon className="size-5" aria-hidden />
            </span>
            <div>
              <h3 className="text-h3 text-foreground">{capability.title}</h3>
              <p className="mt-1.5 text-body text-ink-muted">{capability.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
