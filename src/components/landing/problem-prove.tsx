import type { LucideIcon } from "lucide-react";
import { CalendarOff, FileCheck, Rocket, ScrollText, ShieldCheck, TrendingUp } from "lucide-react";
import { RobotFace } from "./problem-icons";

/**
 * "Prove" answer visual (P05 card 04) — a true RADIAL hexagonal ring: a
 * violet→indigo gradient robot hub at the centre with six capability nodes
 * orbiting on dashed spokes (2 top / 2 sides / 2 bottom). Sits freeform on the
 * solution panel — no header, no card wrapper. Every label restates the card's
 * answer copy (honesty rule — nothing new asserted). Pure RSC, no motion.
 */
type Node = { icon: LucideIcon; label: [string, string]; x: number; y: number };

/* Node badge centres as % of the container — a flat-top hexagon around (50,50). */
const NODES: readonly Node[] = [
  { icon: Rocket, label: ["Self-Serve", "Launch Fast"], x: 30, y: 15 },
  { icon: ShieldCheck, label: ["Enterprise", "Grade Security"], x: 70, y: 15 },
  { icon: ScrollText, label: ["Audit Logs", "& Compliance"], x: 14, y: 50 },
  { icon: FileCheck, label: ["SOC 2 /", "HIPAA Ready"], x: 86, y: 50 },
  { icon: CalendarOff, label: ["No Long-Term", "Contracts"], x: 30, y: 85 },
  { icon: TrendingUp, label: ["Scale Without", "Limits"], x: 70, y: 85 },
];

export function ProblemProve() {
  return (
    <div
      role="img"
      aria-label="One Telebeli platform connecting six enterprise capabilities: self-serve launch, audit logs and compliance, enterprise-grade security, no long-term contracts, SOC 2 / HIPAA ready, and scaling without limits"
      className="relative mx-auto mt-2.5 h-[176px] w-full max-w-[290px]"
    >
      {/* Dashed spokes + guide ring behind the nodes. */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        <circle
          cx="50"
          cy="50"
          r="30"
          vectorEffect="non-scaling-stroke"
          className="fill-none stroke-indigo-600/12"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        {NODES.map((n) => (
          <line
            key={`${n.x}-${n.y}`}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            vectorEffect="non-scaling-stroke"
            className="stroke-indigo-600/25"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        ))}
      </svg>

      {/* Capability nodes. */}
      {NODES.map((n) => (
        <div
          key={n.label.join(" ")}
          className="absolute flex w-[70px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-center"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-white text-solution shadow-sm ring-1 ring-indigo-600/20">
            <n.icon className="size-4" aria-hidden />
          </span>
          <span className="text-[0.6rem] font-medium leading-[1.15] text-ink-600">
            {n.label[0]}
            <br />
            {n.label[1]}
          </span>
        </div>
      ))}

      {/* Gradient robot hub. */}
      <span className="absolute left-1/2 top-1/2 z-10 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-grad-arrow text-white glow-hub">
        <RobotFace className="size-8" />
        <span className="sr-only">One Telebeli platform</span>
      </span>
    </div>
  );
}
