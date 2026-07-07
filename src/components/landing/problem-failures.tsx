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
        "absolute z-20 flex size-[28px] items-center justify-center rounded-full bg-problem-alert text-white ring-2 ring-white glow-alert",
        className,
      )}
    >
      <Icon className="size-3.5" strokeWidth={2.25} />
    </span>
  );
}

/* 01 — breaks off-script: caller asks, agent loops to a canned line. Exactly two
   floating badges: ⚠ by the caller bubble, ↻ by the agent bubble. */
export function FailScript() {
  return (
    // grow + justify-center: the chat block (whose curved arrow must stay glued to
    // both bubbles, so it can't be stretched apart) centres in the panel's leftover height.
    <div className="mt-2.5 flex grow flex-col justify-center">
      {/* caller — narrow rose bubble with an avatar attached top-left; the ⚠
          alert stands to its right (not overlapping the corner). */}
      <div className="flex items-start gap-2.5">
        <div className="relative max-w-[200px]">
          <span
            aria-hidden
            className="absolute -left-2 -top-2 z-10 flex size-[22px] items-center justify-center rounded-full bg-white text-ink-400 shadow-sm ring-1 ring-rose-200"
          >
            <UserRound className="size-3" />
          </span>
          <p className="rounded-widget rounded-tl-sm bg-rose-100 px-3 py-2 text-[0.8125rem] leading-snug text-ink-700 ring-1 ring-rose-200">
            Can I change my delivery address after placing the order?
          </p>
        </div>
        <span
          aria-hidden
          className="mt-3 flex size-[26px] shrink-0 items-center justify-center rounded-full bg-problem-alert text-white ring-2 ring-white glow-alert"
        >
          <AlertTriangle className="size-3.5" strokeWidth={2.25} />
        </span>
      </div>

      {/* dashed curved elbow connector — from the caller bubble's bottom-left,
          down and to the right, arrowhead into the top of the agent bubble */}
      <svg viewBox="0 0 200 32" preserveAspectRatio="none" className="my-0.5 h-6 w-full" aria-hidden>
        <defs>
          <marker id="chatArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto">
            <path d="M0 0 10 5 0 10 3 5Z" className="fill-rose-300" />
          </marker>
        </defs>
        <path
          d="M14 3C14 24 118 8 172 28"
          className="fill-none stroke-rose-300"
          strokeWidth="1.6"
          strokeDasharray="4 4"
          strokeLinecap="round"
          markerEnd="url(#chatArrow)"
        />
      </svg>

      {/* agent — narrow rose bubble offset right; ↻ overlaps its bottom-right corner */}
      <div className="flex justify-end">
        <div className="relative max-w-[200px]">
          <p className="rounded-widget rounded-tr-sm bg-rose-100 px-3 py-2 text-[0.8125rem] leading-snug text-ink-700 ring-1 ring-rose-200">
            Let me connect you with an agent. Have a nice day!
          </p>
          <span
            aria-hidden
            className="absolute -bottom-2.5 -right-2.5 flex size-[26px] items-center justify-center rounded-full bg-problem-alert text-white ring-2 ring-white glow-alert"
          >
            <RefreshCw className="size-3.5" strokeWidth={2.25} />
          </span>
        </div>
      </div>
    </div>
  );
}

/* 02 — black box: a sealed dark panel, nothing to inspect. */
export function FailBlackBox() {
  return (
    // grow lets the box fill the panel's leftover height; the inner box flex-grows
    // from a min-h-24 floor so the centred art bottom-aligns with the other cards.
    <div className="relative mt-3 flex grow flex-col">
      <FloatBadge icon={AlertTriangle} className="bottom-0 right-0 translate-x-[38%] translate-y-[38%]" />
      <div
        role="img"
        aria-label="A sealed black box — nothing to inspect"
        className="relative flex min-h-20 grow items-center justify-center overflow-hidden rounded-widget bg-blackbox ring-1 ring-black/40"
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
        <svg viewBox="0 0 64 64" className="relative size-[46px]" aria-hidden>
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
        <p className="absolute bottom-2.5 left-0 right-0 text-center text-[0.6875rem] font-medium tracking-[0.14em] text-white/55">
          Unknown
        </p>
      </div>
    </div>
  );
}

/* 03 — strands hardest callers: AI hits its limit, handoff fumbled. */
export function FailHandoff() {
  return (
    <div className="mt-2.5 flex grow flex-col justify-center">
      <div className="flex items-end justify-center gap-3 sm:gap-5">
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[0.625rem] font-semibold uppercase tracking-wide text-problem-strong">
            AI hits limit
          </span>
          <span className="flex size-12 items-center justify-center rounded-full bg-rose-100 text-problem ring-1 ring-rose-200">
            <RobotFace className="size-7" />
            <span className="sr-only">AI hits its limit</span>
          </span>
        </div>

        {/* dashed red curved arrow — points right into the poor-handoff face,
            sized to the icons so it centres on them */}
        <svg viewBox="0 0 60 56" className="h-12 w-12 shrink-0 self-end overflow-visible sm:w-14" aria-hidden>
          <defs>
            <marker id="handoffArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0 10 5 0 10 3 5Z" className="fill-problem" />
            </marker>
          </defs>
          <path
            d="M2 30 C 16 38 40 37 57 31"
            className="fill-none stroke-problem"
            strokeWidth="2"
            strokeDasharray="6 4"
            strokeLinecap="round"
            markerEnd="url(#handoffArrow)"
          />
        </svg>

        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[0.625rem] font-semibold uppercase tracking-wide text-problem-strong">
            Poor handoff
          </span>
          <span className="flex size-12 items-center justify-center overflow-hidden rounded-full bg-rose-100 ring-1 ring-rose-200">
            <FrownFace className="size-9" />
            <span className="sr-only">A frustrated caller after a poor handoff</span>
          </span>
        </div>
      </div>

      {/* Inline warning — no container, left-aligned under the characters. */}
      <p className="mt-2.5 flex items-start gap-2 text-small leading-snug text-ink-700">
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
    <div className="relative mt-2.5 flex grow flex-col justify-center">
      <FloatBadge icon={AlertTriangle} className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />
      <ul className="space-y-1">
        {REJECTED.map((opt) => (
          <li
            key={opt.label}
            className="flex items-center gap-2.5 rounded-widget bg-rose-100 px-3.5 py-2 text-small font-medium text-ink-700 ring-1 ring-rose-200"
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
