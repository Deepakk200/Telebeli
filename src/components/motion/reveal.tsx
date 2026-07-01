"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { transition } from "@/lib/motion";

type RevealProps = Omit<HTMLMotionProps<"div">, "children"> & {
  delay?: number;
  children?: ReactNode;
};

/** Clip-mask reveal — content wipes up into view once. */
export function Reveal({ delay = 0, children, className, style, ...props }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div className={className} style={style as React.CSSProperties}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 24, clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...transition.slow, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
