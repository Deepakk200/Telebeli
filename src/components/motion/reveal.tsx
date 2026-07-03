"use client";

import { m, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { tokens, viewportOnce } from "@/lib/motion";

type RevealProps = Omit<HTMLMotionProps<"div">, "children"> & {
  delay?: number;
  children?: ReactNode;
};

/** `enter` reveal — rise 16→0 + fade, fires once at the 85% viewport line. */
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
    <m.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ ...tokens.enter, delay }}
      {...props}
    >
      {children}
    </m.div>
  );
}
