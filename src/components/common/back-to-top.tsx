"use client";

import { ArrowUp } from "lucide-react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const RADIUS = 15;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Back-to-top button whose ring reflects page progress. */
export function BackToTop() {
  const { scrollYProgress: progress } = useScroll();
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(progress, "change", (v) => setVisible(v > 0.08));
  const dashoffset = useTransform(progress, (v) => CIRCUMFERENCE * (1 - v));

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })}
      className={cn(
        "fixed left-6 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-50 grid size-11 place-items-center rounded-full border border-border bg-card/80 text-foreground shadow-elevated backdrop-blur transition-all duration-300 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 40 40" aria-hidden>
        <circle cx="20" cy="20" r={RADIUS} fill="none" stroke="var(--color-border)" strokeWidth="2" />
        <motion.circle
          cx="20"
          cy="20"
          r={RADIUS}
          fill="none"
          stroke="var(--color-brand-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          style={{ strokeDashoffset: dashoffset }}
        />
      </svg>
      <ArrowUp className="size-4" />
    </button>
  );
}
