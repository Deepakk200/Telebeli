import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const STATES = {
  live: { dot: "bg-state-live", text: "text-state-live", label: "Live" },
  paused: { dot: "bg-muted-foreground", text: "text-muted-foreground", label: "Paused" },
  resolved: { dot: "bg-state-resolved", text: "text-state-resolved", label: "Resolved" },
} as const;

/**
 * Dynamic state indicator — dot + mandatory text label. The dot is the one
 * sanctioned pill, and its pulse runs ONLY while genuinely live (real state,
 * never decoration). Static labels belong to Badge; interactive metadata to Tag.
 * RSC-capable: pure CSS, no client hooks.
 */
export function Status({
  state,
  children,
  className,
}: {
  state: keyof typeof STATES;
  /** Optional label override — a text label always renders. */
  children?: ReactNode;
  className?: string;
}) {
  const s = STATES[state];
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium", s.text, className)}>
      <span className="relative inline-flex size-2" aria-hidden>
        {state === "live" ? (
          <span className={cn("absolute inset-0 rounded-full animate-pulse-ring", s.dot)} />
        ) : null}
        <span className={cn("relative inline-flex size-2 rounded-full", s.dot)} />
      </span>
      {children ?? s.label}
    </span>
  );
}
