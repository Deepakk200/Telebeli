"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { staggerContainer, fadeUp } from "@/lib/motion";

type StaggerProps = HTMLMotionProps<"div"> & {
  stagger?: number;
  delayChildren?: number;
};

/** Reveals children in sequence on scroll into view (once). */
export function Stagger({ stagger = 0.08, delayChildren = 0, children, ...props }: StaggerProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "visible"}
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer(stagger, delayChildren)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={fadeUp} {...props}>
      {children}
    </motion.div>
  );
}
