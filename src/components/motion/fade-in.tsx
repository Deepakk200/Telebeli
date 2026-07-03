"use client";

import { m, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { tokens, viewportOnce } from "@/lib/motion";

type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
};

/**
 * @deprecated Use `Reveal` — identical `enter` behavior. Kept only because
 * its remaining consumers are section components deferred to later milestones.
 */
export function FadeIn({ delay = 0, y = 16, children, ...props }: FadeInProps) {
  const reduce = useReducedMotion();
  return (
    <m.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ ...tokens.enter, delay }}
      {...props}
    >
      {children}
    </m.div>
  );
}
