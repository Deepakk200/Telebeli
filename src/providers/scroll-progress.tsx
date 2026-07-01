"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useScroll, useSpring, useReducedMotion, type MotionValue } from "motion/react";

const Ctx = createContext<MotionValue<number> | null>(null);

/**
 * Single source of truth for page scroll progress. Computes the smoothed value
 * once and shares it with every consumer (progress bar + back-to-top ring) so
 * they can never drift.
 */
export function ScrollProgressProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return <Ctx.Provider value={reduced ? scrollYProgress : smooth}>{children}</Ctx.Provider>;
}

export function useScrollProgress() {
  const value = useContext(Ctx);
  if (!value) {
    throw new Error("useScrollProgress must be used within ScrollProgressProvider");
  }
  return value;
}
