import type { LucideIcon } from "lucide-react";
import { AlertTriangle, Blocks, FileText, RefreshCw, UserRound, Wrench } from "lucide-react";
import { FrownFace, RobotFace } from "./problem-icons";
import { cn } from "@/lib/utils";

/**
 * Problem-side "failure" schematics (P05) — one illustration per card, living on
 * the rose-tinted problem half. Rose/red accents throughout; small circular red
 * alert / refresh badges overlap the artwork corners to signal breakage.
 * Pure RSC, no motion; every meaning is also carried by visible or sr-only text.
 * Nothing here is real customer data.
 */

/** ~30px solid-red circular alert/refresh badge overlapping an artwork corner. */
function FloatBadge({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute z-20 flex size-[30px] items-center justify-center rounded-full bg-problem-alert text-white ring-2 ring-white glow-alert",
        className,
      )}
    >
      <Icon className="size-4" strokeWidth={2.25} />
    </span>
  );
}

/* 01 — breaks off-script: caller asks, agent loops to a canned line. Exactly two
   floating badges: ⚠ by the caller bubble, ↻ by the agent bubble. */
export function FailScript() {
  return (
    <div className="relative mt-4">
      <FloatBadge icon={AlertTriangle} className="right-0 top-6" />
      <FloatBadge icon={RefreshCw} className="-bottom-2 right-1" />

      {/* caller — neutral bubble with an avatar dot */}
      <div className="flex items-start gap-2 pr-7">
        <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-ink-400 ring-1 ring-pc-hairline">
          <UserRound className="size-3.5" aria-hidden />
        </span>
        <p className="rounded-widget rounded-tl-sm bg-white px-3.5 py-2.5 text-small leading-snug text-ink-700 shadow-sm ring-1 ring-pc-hairline">
          Can I change my delivery address after placing the order?
        </p>
      </div>

      {/* dashed connector down to the canned reply */}
      <div aria-hidden className="my-1 ml-3 h-4 w-px border-l border-dashed border-rose-300" />

      {/* agent — rose bubble, the loop-back */}
      <div className="flex justify-end pr-3">
        <p className="rounded-widget rounded-tr-sm bg-rose-100 px-3.5 py-2.5 text-small leading-snug text-ink-700 ring-1 ring-rose-200">
          Let me connect you with an agent. Have a nice day!
        </p>
      </div>
    </div>
  );
}

/* 02 — black box: a sealed dark panel, nothing to inspect. */
export function FailBlackBox() {
  return (
    <div className="relative mt-4">
      <FloatBadge icon={AlertTriangle} className="-bottom-3 -right-3" />
      <div
        role="img"
        aria-label="A sealed black box — nothing to inspect"
        className="relative flex h-36 items-center justify-center overflow-hidden rounded-widget bg-blackbox ring-1 ring-black/40"
      >
        {/* faint concentric + cross guides */}
        <svg
          viewBox="0 0 200 160"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <g className="fill-none stroke-white/[0.07]">
            <circle cx="100" cy="72" r="28" />
            <circle cx="100" cy="72" r="48" />
            <circle cx="100" cy="72" r="68" />
          </g>
          <g className="stroke-white/[0.05]">
            <line x1="100" y1="0" x2="100" y2="160" />
            <line x1="0" y1="72" x2="200" y2="72" />
          </g>
        </svg>
        {/* thin-stroke 3D hexagon with a faint fill */}
        <svg viewBox="0 0 64 64" className="relative size-[64px]" aria-hidden>
          <path
            d="M32 6 54 19 54 45 32 58 10 45 10 19Z"
            className="fill-white/[0.04] stroke-white/60"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M32 6 32 32 54 19M32 32 10 19M32 32 32 58"
            className="fill-none stroke-white/25"
            strokeWidth="1.1"
          />
          <text
            x="32"
            y="37"
            textAnchor="middle"
            className="fill-white/70"
            fontSize="13"
            fontFamily="var(--font-mono)"
          >
            ?
          </text>
        </svg>
        <p className="absolute bottom-3 left-0 right-0 text-center text-label uppercase tracking-[0.2em] text-white/55">
          Unknown
        </p>
      </div>
    </div>
  );
}

/* 03 — strands hardest callers: AI hits its limit, handoff fumbled. */
export function FailHandoff() {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-center gap-3 sm:gap-5">
        <div className="flex flex-col items-center gap-1.5">
          <span className="flex size-16 items-center justify-center rounded-full bg-rose-100 text-problem ring-1 ring-rose-200">
            <RobotFace className="size-9" />
            <span className="sr-only">AI hits its limit</span>
          </span>
          <span className="text-[0.625rem] font-semibold uppercase tracking-wide text-problem-strong">
            AI hits limit
          </span>
        </div>

        {/* dashed red curved arrow */}
        <svg
          viewBox="0 0 64 40"
          className="h-10 w-14 shrink-0 sm:w-16"
          role="img"
          aria-label="fumbled handoff"
        >
          <path
            d="M6 26C22 6 42 6 56 22"
            className="fill-none stroke-problem"
            strokeWidth="1.6"
            strokeDasharray="4 3"
            strokeLinecap="round"
          />
          <path
            d="M56 22l-2-6M56 22l-6 2"
            className="fill-none stroke-problem"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>

        <div className="flex flex-col items-center gap-1.5">
          <span className="flex size-16 items-center justify-center overflow-hidden rounded-full bg-rose-100 ring-1 ring-rose-200">
            <FrownFace className="size-[3.25rem]" />
            <span className="sr-only">A frustrated caller after a poor handoff</span>
          </span>
          <span className="text-[0.625rem] font-semibold uppercase tracking-wide text-problem-strong">
            Poor handoff
          </span>
        </div>
      </div>

      {/* Inline warning — no container, left-aligned under the characters. */}
      <p className="mt-4 flex items-start gap-2 text-small leading-snug text-ink-700">
        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-problem" aria-hidden />
        Customer repeats everything. Frustration. Lost trust.
      </p>
    </div>
  );
}

/* 04 — bad trade-off: every existing option is a rejected option. The alert
   badge sits at the bottom-right, by the last rejected pill. */
const REJECTED = [
  { icon: Wrench, label: "Build it yourself" },
  { icon: Blocks, label: "Outgrow no-code tools" },
  { icon: FileText, label: "Sign a 6-month contract" },
] as const;

export function FailTradeoff() {
  return (
    <div className="relative mt-4">
      <FloatBadge icon={AlertTriangle} className="-bottom-3 -right-2" />
      <ul className="space-y-2.5">
        {REJECTED.map((opt) => (
          <li
            key={opt.label}
            className="flex items-center gap-2.5 rounded-widget bg-rose-100 px-3.5 py-2.5 text-small font-medium text-ink-700 ring-1 ring-rose-200"
          >
            <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-white text-problem ring-1 ring-rose-200">
              <opt.icon className="size-3.5" aria-hidden />
            </span>
            {opt.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
