import { Reveal } from "@/components/motion";
import { SectionHeading } from "./section-heading";
import { Waveform } from "@/components/common/waveform";
import { lifecycleStages } from "@/constants/landing";

/**
 * P06 — the AI call lifecycle (watch → score → handoff → prove). A real ordered
 * list rendered as a horizontal timeline that collapses to a vertical stepper on
 * mobile; the Waveform is the section's connective motif, held static (no idle
 * loop). RSC; a single enter-once Reveal wraps the group. All four stages
 * share the same blue accent token.
 */
export function HowItWorks() {
  return (
    <section
      id="lifecycle"
      className="relative scroll-mt-24 overflow-hidden border-y border-border/60 bg-muted/20"
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-40">
        <Waveform bars={90} barClassName="bg-brand/25" animated={false} />
      </div>

      <div className="container-page relative py-[var(--spacing-section)]">
        <SectionHeading
          eyebrow="THE CALL LIFECYCLE"
          title="How every call is handled, end to end"
          description="Watch, score, hand off, and prove — the four stages every call moves through on Telebeli, so you can trust the process, not just the promise."
        />

        <Reveal className="mt-14">
          <ol className="relative grid gap-10 md:grid-cols-4">
            {/* Connective thread across the nodes (desktop only). */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-5 top-5 hidden h-px bg-border md:block"
            />
            {lifecycleStages.map((stage, index) => {
              return (
                <li key={stage.pillar} className="relative flex flex-col">
                  <span className="relative z-10 flex size-10 items-center justify-center rounded-full border border-border bg-card text-accent">
                    <stage.icon className="size-5" aria-hidden />
                  </span>
                  <p className="mt-4 text-label uppercase text-accent">
                    <span className="font-mono">{String(index + 1).padStart(2, "0")}</span> ·{" "}
                    {stage.pillar}
                  </p>
                  <h3 className="mt-1 text-h3 text-foreground">{stage.title}</h3>
                  <p className="mt-2 text-small leading-relaxed text-ink-muted">
                    {stage.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
