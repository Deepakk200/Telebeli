"use client";

import { useCounter, type UseCounterOptions } from "@/hooks/use-counter";

type CounterProps = UseCounterOptions & {
  className?: string;
};

/** Animated number counter. All logic lives in the useCounter hook. */
export function Counter({ className, ...options }: CounterProps) {
  const ref = useCounter(options);
  const { value, decimals = 0, prefix = "", suffix = "" } = options;
  // SSR the final value so the number exists without JS; the hook rewrites
  // textContent on hydration and the count-up plays as before.
  const final = `${prefix}${value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${suffix}`;
  return (
    <span ref={ref} className={className}>
      {final}
    </span>
  );
}
