"use client";

import { motion } from "motion/react";
import { useScrollProgress } from "@/providers/scroll-progress";

/**
 * Top scroll progress bar. Fill is driven by the shared MotionValue via scaleX
 * (compositor-only, no per-frame React render). Purely decorative.
 */
export function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent"
    >
      <motion.div
        className="h-full origin-left rounded-r-full bg-gradient-to-r from-brand via-brand-accent to-brand"
        style={{ scaleX: progress }}
      />
    </div>
  );
}
