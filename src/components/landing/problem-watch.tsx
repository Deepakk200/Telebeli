import { Play, Search } from "lucide-react";
import { Waveform } from "@/components/common/waveform";

/**
 * "Watch" answer visual (P05 card 02) — a searchable live-transcript mini-UI:
 * a search field, the signature waveform with a timestamp, then three
 * timestamped speaker turns (proportional sans, not mono). The black-box motif
 * lives on the problem side. The transcript is illustrative. Pure RSC — the
 * waveform is CSS animation, frozen under reduced motion.
 */
const TURNS = [
  { t: "00:01:24", speaker: "AI Agent", line: "Hello! How can I help you today?" },
  { t: "00:01:31", speaker: "Customer", line: "I'd like to know about my refund." },
  { t: "00:01:35", speaker: "AI Agent", line: "Sure, I can help you with that." },
] as const;

export function ProblemWatch() {
  return (
    <div className="mt-2.5 rounded-widget bg-white p-2.5 shadow-sm ring-1 ring-pc-hairline">
      {/* Search — decorative demo UI, deliberately not a real control. It leads
          the widget (no header label, per the reference). */}
      <div
        aria-hidden
        className="flex items-center gap-2 rounded-lg bg-surface-2 px-3 py-0.5 text-ink-400 ring-1 ring-pc-hairline"
      >
        <Search className="size-4 shrink-0" />
        <span className="text-small">Search transcripts…</span>
      </div>

      <div className="mt-1.5 flex items-center gap-2">
        <span
          aria-hidden
          className="flex size-6 shrink-0 items-center justify-center rounded-full bg-lavender-tint text-solution"
        >
          <Play className="size-3 fill-current" />
        </span>
        <Waveform bars={26} className="h-4 min-w-0 flex-1" />
        <span className="shrink-0 text-[0.6875rem] font-medium tabular-nums text-ink-400">00:01:24</span>
      </div>

      <ul className="mt-1.5 space-y-1">
        {TURNS.map((turn) => (
          <li key={turn.t} className="flex items-start justify-between gap-3">
            <p className="min-w-0 text-[0.8125rem] leading-[1.3]">
              <span className="font-bold text-ink-900">{turn.speaker}:</span>{" "}
              <span className="text-ink-600">{turn.line}</span>
            </p>
            <span className="shrink-0 pt-0.5 text-[0.6875rem] tabular-nums text-ink-400">{turn.t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
