import { heroFeatures } from "@/constants/landing";

/**
 * Four-up feature strip (landing-page-approved.png). One rounded container split
 * into four equal cells by 1px dividers — a `gap-px` grid over a border-colored
 * background, so the dividers adapt automatically as the grid reflows 4 → 2 → 1.
 * Static RSC; lavender icon tiles.
 */
export function Features() {
  return (
    <section
      aria-label="What Telebeli handles"
      className="container-page pb-[var(--spacing-section)]"
    >
      <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border shadow-subtle sm:grid-cols-2 lg:grid-cols-4">
        {heroFeatures.map((feature) => (
          <li key={feature.title} className="flex flex-col gap-3 bg-surface p-6">
            <span className="flex size-11 items-center justify-center rounded-lg bg-accent-wash text-accent">
              <feature.icon className="size-5" aria-hidden />
            </span>
            <div>
              <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{feature.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
