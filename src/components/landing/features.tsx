import { Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "./section-heading";
import { features } from "@/constants/landing";
import { cn } from "@/lib/utils";
import { surface } from "@/lib/surface";

export function Features() {
  return (
    <section id="platform" className="mx-auto max-w-6xl px-6 py-[var(--spacing-section)]">
      <SectionHeading
        eyebrow="The platform"
        title="Everything a call needs, handled"
        description="One platform for inbound and outbound voice — engineered for latency, reliability, and the messy reality of real conversations."
      />

      <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <StaggerItem key={feature.title}>
            <div className={cn(surface({ interactive: true }), "group h-full p-6")}>
              <div className="flex size-10 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:bg-brand/15">
                <feature.icon className="size-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
