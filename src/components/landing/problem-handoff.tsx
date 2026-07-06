import { ArrowRight, Check } from "lucide-react";
import { AgentFace, RobotFace } from "./problem-icons";

/**
 * "Handoff" answer visual (P05 card 03) — the warm handoff: an indigo-tinted
 * robot → a vertical stack of context chips → a warm, SMILING, illustrated
 * human agent with a headset (never a real or implied person / photo). A green
 * success line confirms the context arrived. Schematic demo UI; pure RSC.
 */
const CONTEXT_CHIPS = ["Full Transcript", "Detected Intent", "Call Summary"] as const;

export function ProblemHandoff() {
  return (
    <div className="mt-2.5 rounded-widget bg-white p-3 shadow-sm ring-1 ring-pc-hairline">
      <p className="text-[0.75rem] font-semibold tracking-[0.01em] text-ink-600">Warm Handoff</p>

      <div className="mt-3.5 flex items-center justify-between gap-1.5">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-lavender-tint text-solution ring-1 ring-indigo-600/20">
          <RobotFace className="size-6" />
          <span className="sr-only">AI agent</span>
        </span>

        <ArrowRight className="size-3.5 shrink-0 text-ink-600" aria-hidden />

        {/* subtle bordered sub-box holding the three context chips */}
        <div className="flex min-w-0 shrink-0 flex-col gap-1 rounded-lg bg-surface-2 p-1.5 ring-1 ring-pc-hairline">
          {CONTEXT_CHIPS.map((chip) => (
            <span
              key={chip}
              className="whitespace-nowrap rounded-md bg-lavender-tint px-2 py-1 text-center text-[0.625rem] font-medium text-solution-strong ring-1 ring-indigo-600/20"
            >
              {chip}
            </span>
          ))}
        </div>

        <ArrowRight className="size-3.5 shrink-0 text-ink-600" aria-hidden />

        <span className="size-12 shrink-0 overflow-hidden rounded-full shadow-sm ring-2 ring-white">
          <AgentFace className="size-full" />
          <span className="sr-only">Human agent</span>
        </span>
      </div>

      <p className="mt-3.5 flex items-center gap-2 rounded-lg bg-success/10 px-3.5 py-2 text-small font-semibold text-success">
        <Check className="size-4 shrink-0" aria-hidden />
        Context passed. Happy customer.
      </p>
    </div>
  );
}
