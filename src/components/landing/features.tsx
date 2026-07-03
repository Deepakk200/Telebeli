import { Stagger, StaggerItem } from "@/components/motion";
import { fade } from "@/lib/motion";
import { surface } from "@/lib/surface";
import { cn } from "@/lib/utils";
import { heroFeatures } from "@/constants/landing";

const featureStats = ["01", "24/7", "Live", "ROI"];

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
          "grid grid-cols-2 gap-px overflow-hidden bg-border md:grid-cols-4",
        )}
      >
        {heroFeatures.map((feature, index) => (
          <StaggerItem
            role="listitem"
            key={feature.title}
            variants={fade}
            className="flex min-h-36 flex-col items-center justify-center bg-surface px-4 py-6 text-center transition-colors duration-[var(--dur-fast)] hover:bg-accent-wash/30 sm:min-h-40 sm:px-6 motion-reduce:transition-none"
          >
            <span className="font-mono text-2xl font-bold leading-none tracking-normal text-accent sm:text-3xl">
              {featureStats[index]}
            </span>
            <h3 className="mt-3 text-sm font-semibold text-foreground sm:text-base">{feature.title}</h3>
            <p className="mt-1.5 max-w-48 text-xs leading-relaxed text-ink-muted sm:text-sm">
              {feature.description}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
