import type { ComponentType } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import type { ProblemScar, ProblemVisual } from "@/constants/landing";
import { FailBlackBox, FailHandoff, FailScript, FailTradeoff } from "./problem-failures";
import { ProblemHandoff } from "./problem-handoff";
import { ProblemProve } from "./problem-prove";
import { ProblemScore } from "./problem-score";
import { ProblemWatch } from "./problem-watch";

/**
 * One problem card (P05) — presentational RSC. ONE unified card (not two panels)
 * split 50/50 by an internal hairline divider: the wound on a rose-tinted half
 * (rose number ring, "The problem" label, claim, consequence with its rose
 * sting, failure schematic) | the answer on a cool half (indigo pillar label,
 * answer, storytelling visual). A violet→indigo gradient arrow straddles the
 * seam, vertically centred regardless of content. Both visuals resolve from
 * registries keyed by the discriminated `visual`.
 */
const FAILURES: Record<ProblemVisual, ComponentType> = {
  score: FailScript,
  watch: FailBlackBox,
  handoff: FailHandoff,
  prove: FailTradeoff,
};

const VISUALS: Record<ProblemVisual, ComponentType> = {
  watch: ProblemWatch,
  score: ProblemScore,
  handoff: ProblemHandoff,
  prove: ProblemProve,
};

type Props = {
  scar: ProblemScar;
  /** Zero-based position in problemScars — rendered as the 01–04 marker. */
  index: number;
};

export function ProblemCard({ scar, index }: Props) {
  const Failure = FAILURES[scar.visual];
  const Visual = VISUALS[scar.visual];
  const marker = String(index + 1).padStart(2, "0");

  return (
    <div className="group/card relative flex h-full flex-col overflow-hidden rounded-card border border-pc-hairline bg-white shadow-card transition-shadow duration-[var(--dur-base)] hover:shadow-[0_1px_2px_rgba(16,24,40,.04),0_18px_44px_-14px_rgba(16,24,40,.16)] sm:grid sm:grid-cols-2">
      {/* Problem half — rose wash; content top-aligned so the schematic follows
          the body copy with a modest gap; spare height falls away at the bottom.
          Header stays first, so every card's eyebrow + heading line up on one row. */}
      <div className="flex min-w-0 flex-col justify-start bg-problem-panel px-4 py-3.5 sm:pr-5">
        <div>
          <p className="flex items-center gap-2.5 text-label uppercase tracking-[0.08em] text-problem">
            <span
              aria-hidden
              className="flex size-6 shrink-0 items-center justify-center rounded-full border-[1.5px] border-problem font-mono text-[0.68rem] font-semibold text-problem-strong"
            >
              {marker}
            </span>
            The problem
          </p>
          <h3 className="mt-1.5 text-balance text-[1.1875rem] font-bold leading-[1.15] tracking-[-0.01em] text-ink-900">
            {scar.claim}
          </h3>
          <p className="mt-1.5 text-pretty text-small leading-snug text-ink-600">
            {scar.consequence}
            {scar.sting ? <span className="text-problem-strong"> {scar.sting}</span> : null}
          </p>
        </div>
        <Failure />
      </div>

      {/* Internal hairline divider — full content height, centred on the seam. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-5 left-1/2 hidden w-px -translate-x-1/2 bg-pc-hairline sm:block"
      />

      {/* Answer half — cool surface; content top-aligned so the visual follows
          the body copy with a modest gap; spare height falls away at the bottom.
          Hosts the seam arrow (centred on the divider, any content). */}
      <div className="relative flex min-w-0 flex-col justify-start border-t border-pc-hairline bg-surface-2 px-4 py-3.5 sm:border-t-0 sm:pl-5">
        <span
          aria-hidden
          className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 sm:left-0 sm:top-1/2"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-grad-arrow text-white glow-arrow transition-[transform,box-shadow] duration-[var(--dur-base)] group-hover/card:scale-105 group-hover/card:glow-arrow-strong">
            <ArrowRight className="hidden size-[18px] sm:block" strokeWidth={2.25} aria-hidden />
            <ArrowDown className="size-[18px] sm:hidden" strokeWidth={2.25} aria-hidden />
          </span>
        </span>

        <div>
          <p className="text-label uppercase text-solution-strong">
            Telebeli · {scar.answerPillar}
          </p>
          <p className="mt-1.5 text-pretty text-small leading-snug text-ink-600">{scar.answer}</p>
        </div>
        <Visual />
      </div>
    </div>
  );
}
