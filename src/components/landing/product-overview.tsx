import { Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "./section-heading";
import { productOverview } from "@/constants/landing";

/**
 * P01 — positioning beat below Trusted Companies: what Telebeli is, in the
 * approved frame (watch · score · prove). Positioning prose, not a feature
 * grid (features.tsx owns capabilities). RSC; motion is composed client leaves.
 * Stagger renders divs, so list semantics come from ARIA roles.
 */
export function ProductOverview() {
  return (
    <section
      id="product"
      className="container-page scroll-mt-24 py-[var(--spacing-section)]"
    >
      <SectionHeading
        eyebrow={productOverview.eyebrow}
        title={productOverview.title}
        description={productOverview.description}
      />

      <Stagger
        role="list"
        className="mx-auto mt-14 grid max-w-4xl grid-cols-1 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0"
      >
        {productOverview.items.map((item) => (
          <StaggerItem role="listitem" key={item.term} className="py-6 first:pt-0 last:pb-0 md:px-6 md:py-0">
            <h3 className="text-h3 text-foreground">{item.term}</h3>
            <p className="mt-2 text-small text-ink-muted">{item.description}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
