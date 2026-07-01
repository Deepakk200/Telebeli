"use client";

import { useEffect, useRef, type RefObject } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";

export type UseCounterOptions = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
};

/**
 * Animates a number from 0 to `value` once it scrolls into view, writing the
 * formatted string straight to the returned element's textContent (no re-renders
 * per frame). Honors prefers-reduced-motion by jumping to the final value.
 * Logic only — the caller owns the JSX.
 */
export function useCounter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
}: UseCounterOptions): RefObject<HTMLSpanElement | null> {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1200, bounce: 0 });

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      motionValue.jump(value);
      return;
    }
    motionValue.set(value);
  }, [inView, value, reduce, motionValue]);

  useEffect(() => {
    const format = (v: number) =>
      `${prefix}${v.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`;
    if (ref.current) ref.current.textContent = format(reduce ? value : 0);
    const unsubscribe = spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = format(v);
    });
    return () => unsubscribe();
  }, [spring, decimals, prefix, suffix, reduce, value]);

  return ref;
}
