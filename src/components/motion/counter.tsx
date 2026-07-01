"use client";

import { useCounter, type UseCounterOptions } from "@/hooks/use-counter";

type CounterProps = UseCounterOptions & {
  className?: string;
};

/** Animated number counter. All logic lives in the useCounter hook. */
export function Counter({ className, ...options }: CounterProps) {
  const ref = useCounter(options);
  return <span ref={ref} className={className} />;
}
