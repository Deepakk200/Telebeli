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
    <div className="group/card relative flex h-full flex-col overflow-hidden rounded-card border border-pc-hairline bg-white shadow-card transition-shadow duration-[var(--dur-base)] hover:shadow-[0_1px_2px_rgba(16,24,40,.04),0_18px_44px_-14px_rgba(16,24,40,.16)] sm:grid sm:grid-cols-2 sm:h-[var(--pc-h)]">
      {/* Problem half — rose gradient wash, content vertically centred. */}
      <div className="flex min-w-0 flex-col justify-center bg-problem-panel p-5 sm:p-6 sm:pr-7">
        <p className="flex items-center gap-2.5 text-label uppercase text-problem-strong">
          <span
            aria-hidden
            className="flex size-7 shrink-0 items-center justify-center rounded-full border-[1.5px] border-problem font-mono text-[0.72rem] font-semibold text-problem-strong"
          >
            {marker}
          </span>
          The problem
        </p>
        <h3 className="mt-3 text-balance text-[1.375rem] font-bold leading-[1.15] tracking-[-0.01em] text-ink-900 sm:text-[1.5rem]">
          {scar.claim}
        </h3>
        <p className="mt-2 text-pretty text-small leading-snug text-ink-600">
          {scar.consequence}
          {scar.sting ? <span className="text-problem-strong"> {scar.sting}</span> : null}
        </p>
        <Failure />
      </div>

      {/* Internal hairline divider — full content height, centred on the seam. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-7 left-1/2 hidden w-px -translate-x-1/2 bg-pc-hairline sm:block"
      />

      {/* Answer half — cool surface, content vertically centred; hosts the seam
          arrow (centred on the divider regardless of content height). */}
      <div className="relative flex min-w-0 flex-col justify-center border-t border-pc-hairline bg-surface-2 p-5 sm:border-t-0 sm:p-6 sm:pl-7">
        <span
          aria-hidden
          className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 sm:left-0 sm:top-1/2"
        >
          <span className="flex size-11 items-center justify-center rounded-full bg-grad-arrow text-white glow-arrow transition-[transform,box-shadow] duration-[var(--dur-base)] group-hover/card:scale-105 group-hover/card:glow-arrow-strong">
            <ArrowRight className="hidden size-[18px] sm:block" strokeWidth={2.25} aria-hidden />
            <ArrowDown className="size-[18px] sm:hidden" strokeWidth={2.25} aria-hidden />
          </span>
        </span>

        <p className="inline-flex items-center gap-1.5 text-label uppercase text-solution-strong">
          <span aria-hidden className="text-solution">✓</span>
          Telebeli · {scar.answerPillar}
        </p>
        <p className="mt-2.5 text-pretty text-small leading-snug text-ink-600">{scar.answer}</p>
        <Visual />
      </div>
    </div>
  );
}
