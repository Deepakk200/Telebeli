"use client";

import { m, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { staggerContainer, fadeUp, STAGGER_STEP, viewportOnce } from "@/lib/motion";

type StaggerProps = HTMLMotionProps<"div"> & {
  stagger?: number;
  delayChildren?: number;
};

/** Reveals children in sequence (40ms step) once, at the 85% viewport line. */
export function Stagger({
  stagger = STAGGER_STEP,
  delayChildren = 0,
  children,
  ...props
}: StaggerProps) {
  const reduce = useReducedMotion();
  return (
    <m.div
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "visible"}
      viewport={viewportOnce}
      variants={staggerContainer(stagger, delayChildren)}
      {...props}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <m.div variants={fadeUp} {...props}>
      {children}
    </m.div>
  );
}
