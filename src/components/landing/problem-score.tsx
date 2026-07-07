import { Counter } from "@/components/motion";

/**
 * "Score" answer visual (P05 card 01) — a call-score mini-chart: an indigo ring
 * filled to 92/100 (Counter animates the number, the ring sweeps once) beside a
 * filled indigo AREA trend on the SAME row, the trend peaking then regressing
 * with the drop marked by a rose dot + "Regression" callout. Footer pairs the
 * "Quality Trend" caption with a rose regression chip. Numbers are illustrative.
 * RSC apart from the Counter leaf, which honours prefers-reduced-motion.
 */
const SCORE = 92;
/* Eight plotted points: a rise to a peak (122,16) then a regression dip. */
const POINTS = [
  [6, 50],
  [35, 44],
  [64, 46],
  [93, 32],
  [122, 16],
  [151, 38],
  [180, 30],
  [209, 24],
] as const;
const PEAK = POINTS[4];
const LINE = POINTS.map(([x, y]) => `${x},${y}`).join(" ");
const AREA = `M${LINE.split(" ").join(" L")} L209,84 L6,84 Z`;

export function ProblemScore() {
  return (
    <div className="mt-2.5 flex grow flex-col rounded-widget bg-white p-2.5 shadow-sm ring-1 ring-pc-hairline">
      <p className="text-[0.75rem] font-semibold tracking-[0.01em] text-ink-600">Call Score</p>

      {/* Ring + area trend, side by side. flex-1 lets this row absorb the card's
          extra height and keeps the chart vertically centred (label top, footer bottom). */}
      <div className="mt-1.5 flex flex-1 items-center gap-3">
        <div className="relative size-[52px] shrink-0">
          <svg viewBox="0 0 40 40" className="size-full -rotate-90" aria-hidden>
            <circle cx="20" cy="20" r="16" pathLength={100} className="fill-none stroke-pc-hairline" strokeWidth="3.5" />
            <circle
              cx="20"
              cy="20"
              r="16"
              pathLength={100}
              strokeDasharray="100"
              style={{ strokeDashoffset: 100 - SCORE }}
              strokeLinecap="round"
              className="fill-none stroke-solution animate-score-ring"
              strokeWidth="3.5"
            />
          </svg>
          <p className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[1.20rem] font-bold leading-none tabular-nums text-ink-900">
              <Counter value={SCORE} />
            </span>
            <span className="text-[0.6rem] font-medium text-ink-400">/ 100</span>
          </p>
        </div>

        <div className="relative min-w-0 flex-1">
          <span className="absolute left-[46%] top-0 z-10 flex items-center gap-1 text-[0.625rem] font-semibold uppercase text-problem-strong">
            <span aria-hidden className="size-1.5 rounded-full bg-problem" />
            Regression
          </span>
          <svg viewBox="0 0 220 84" preserveAspectRatio="none" className="mt-2.5 h-[72px] w-full" role="img" aria-label="Quality trend rising then regressing">
            <defs>
              <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" style={{ stopColor: "var(--indigo-600)" }} stopOpacity="0.4" />
                <stop offset="70%" style={{ stopColor: "var(--indigo-600)" }} stopOpacity="0.12" />
                <stop offset="100%" style={{ stopColor: "var(--indigo-600)" }} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={AREA} fill="url(#scoreFill)" />
            <polyline
              points={LINE}
              className="fill-none stroke-solution"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1={PEAK[0]}
              y1={PEAK[1]}
              x2={PEAK[0]}
              y2="3"
              className="stroke-problem/50"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            {POINTS.map(([x, y]) => (
              <circle key={x} cx={x} cy={y} r="2.4" className="fill-white stroke-solution" strokeWidth="1.5" />
            ))}
            <circle cx={PEAK[0]} cy={PEAK[1]} r="3.6" className="fill-problem" />
          </svg>
        </div>
      </div>

      {/* Footer caption + regression chip */}
      <div className="mt-1.5 flex items-center justify-between">
        <span className="text-[0.75rem] font-semibold tracking-[0.01em] text-ink-600">Quality Trend</span>
        <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-[0.6875rem] font-semibold text-problem-strong">
          ↓ 18% vs last week
        </span>
      </div>
    </div>
  );
}
