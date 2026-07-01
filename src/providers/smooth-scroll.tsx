"use client";

import { ReactLenis } from "lenis/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/** Lenis smooth scroll, disabled under prefers-reduced-motion. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = usePrefersReducedMotion();
  return (
    <ReactLenis root options={{ smoothWheel: !reduce, duration: 1.1 }}>
      {children}
    </ReactLenis>
  );
}
