import { Check } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "./section-heading";
import { problemScars } from "@/constants/landing";
import { surface } from "@/lib/surface";
import { cn } from "@/lib/utils";

/**
 * P05 — Recognition, paired with the answer (07 · 04). Each card names a failure
 * a burned buyer recognizes, then Telebeli's honest response tagged to its pillar
 * (Watch / Score / Handoff / Prove). The pairing is carried in text labels
 * ("The problem" / "Telebeli"), never colour or position alone. RSC; motion
 * children keep the section server-rendered.
 */
export function Problem() {
  return (
    <section id="problems" className="container-page scroll-mt-24 py-[var(--spacing-section)]">
      <SectionHeading
        eyebrow="THE PROBLEM — AND THE ANSWER"
        title="You've seen voice AI fail. So have your customers."
        description="The demo is flawless; production is where it falls apart. Here's each failure we kept seeing — and what we built so it doesn't happen on your lines."
      />

      <Stagger role="list" className="mt-14 grid gap-4 sm:grid-cols-2">
        {problemScars.map((scar) => (
          <StaggerItem key={scar.claim} role="listitem">
            <div className={cn(surface(), "flex h-full flex-col overflow-hidden")}>
              {/* The wound */}
              <div className="p-6">
                <p className="text-label uppercase text-ink-faint">The problem</p>
                <div className="mt-3 flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <scar.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-h3 text-foreground">{scar.claim}</h3>
                    <p className="mt-1.5 text-small leading-relaxed text-ink-muted">
                      {scar.consequence}
                    </p>
                  </div>
                </div>
              </div>

              {/* The answer — pinned to the card bottom so pairs align */}
              <div className="mt-auto border-t border-border bg-accent-wash/50 p-6">
                <p className="inline-flex items-center gap-1.5 text-label uppercase text-accent">
                  <Check className="size-3.5" aria-hidden />
                  Telebeli · {scar.answerPillar}
                </p>
                <p className="mt-2 text-small leading-relaxed text-foreground">{scar.answer}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
