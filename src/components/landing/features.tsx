import { Stagger, StaggerItem } from "@/components/motion";
import { fade } from "@/lib/motion";
import { surface } from "@/lib/surface";
import { cn } from "@/lib/utils";
import { heroFeatures } from "@/constants/landing";

/**
 * Four-up feature strip (landing-page-approved.png). One elevated rounded card
 * lifted into the hero region, split into four equal cells by 1px dividers — a
 * `gap-px` grid over a border-colored background, so the dividers adapt
 * automatically as the grid reflows 4 → 2 → 1. RSC; motion is the client leaf.
 * Cells fade (not rise) so the card's overflow clip never shears them.
 */
export function Features() {
  return (
    <section
      aria-label="What Telebeli handles"
      className="container-page relative z-10 -mt-2 pb-[var(--spacing-section)] lg:-mt-6"
    >
      <Stagger
        role="list"
        className={cn(
          surface({ elevation: "elevated" }),
          "grid grid-cols-1 gap-px overflow-hidden bg-border sm:grid-cols-2 lg:grid-cols-4",
        )}
      >
        {heroFeatures.map((feature) => (
          <StaggerItem
            role="listitem"
            key={feature.title}
            variants={fade}
            className="flex h-full flex-col gap-4 bg-surface p-7 transition-colors duration-[var(--dur-fast)] hover:bg-accent-wash/30 motion-reduce:transition-none"
          >
            <span className="flex size-12 items-center justify-center rounded-lg bg-accent-wash text-accent">
              <feature.icon className="size-5" aria-hidden />
            </span>
            <div>
              <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{feature.description}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
