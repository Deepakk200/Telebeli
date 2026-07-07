import { Stagger, StaggerItem } from "@/components/motion";
import { ProblemCard } from "./problem-card";
import { problemScars } from "@/constants/landing";

/**
 * P05 — Recognition, paired with the answer (07 · 04). One premium editorial
 * infographic: centered eyebrow + two-line headline → 2×2 grid of equal-height
 * unified ProblemCards (rose problem | indigo answer, split 50/50). Rows share
 * one height via grid-auto-rows:1fr so all four cards match; the grid closes
 * the section, and the whole section fits a ~900px desktop viewport.
 */
export function Problem() {
  return (
    <section
      id="problems"
      className="scroll-mt-28 px-[var(--gutter)] py-3"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center rounded-full bg-lavender-tint px-3.5 py-0.5 text-label uppercase text-solution-strong">
            The Problem — And The Answer
          </span>
          <h2 className="mx-auto mt-2 max-w-3xl text-balance font-display text-[clamp(1.5rem,2.1vw,1.875rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-ink-900">
            You&apos;ve seen voice AI fail.
            <br />
            <span className="bg-grad-hero bg-clip-text text-transparent">So have your customers.</span>
          </h2>
          <p className="mx-auto mt-1.5 max-w-2xl text-pretty text-sm leading-relaxed text-ink-600">
            The demo is flawless; production is where it falls apart. Here&apos;s each
            failure we kept seeing — and what we built so it doesn&apos;t happen on your
            lines.
          </p>
        </div>

        <Stagger
          role="list"
          className="mt-3 grid grid-cols-1 gap-5 min-[1100px]:grid-cols-2 min-[1100px]:[grid-auto-rows:1fr]"
        >
          {problemScars.map((scar, index) => (
            <StaggerItem key={scar.visual} role="listitem" className="h-full">
              <ProblemCard scar={scar} index={index} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
