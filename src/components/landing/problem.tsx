import { Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "./section-heading";
import { problemScars } from "@/constants/landing";
import { surface } from "@/lib/surface";
import { cn } from "@/lib/utils";

/**
 * The Recognition beat (07 · 04): four "scar" cards a burned buyer recognizes
 * at a glance. Muted icons on purpose — nothing here is "live", so no amber.
 */
export function Problem() {
  return (
    <section className="container-page py-[var(--spacing-section)]">
      <SectionHeading
        eyebrow="The problem"
        title="You've seen voice AI fail. So have your customers."
        description="The demo is flawless. Production is where it falls apart — and usually where no one is watching."
      />

      <Stagger role="list" className="mt-14 grid gap-4 sm:grid-cols-2">
        {problemScars.map((scar) => (
          <StaggerItem key={scar.claim} role="listitem">
            <div className={cn(surface(), "h-full p-6")}>
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <scar.icon className="size-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{scar.claim}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {scar.consequence}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
