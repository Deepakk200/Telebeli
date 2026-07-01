"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { transition } from "@/lib/motion";

type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
};

/** Fade + rise into view once. Honors prefers-reduced-motion. */
export function FadeIn({ delay = 0, y = 16, children, ...props }: FadeInProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...transition.slow, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
