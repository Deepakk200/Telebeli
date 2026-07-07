"use client";

import { useSyncExternalStore } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const subscribe = () => () => {};

/**
 * Fail-open guard for reveal primitives. Motion SSRs the hidden `initial`
 * state as an inline style, so without JS (slow network, blocked scripts,
 * hydration failure) revealed content would stay invisible forever. SSR HTML
 * carries `reveal-fallback` — a delayed CSS animation (globals.css) that
 * forces content visible, the only mechanism that overrides an inline style
 * with zero JS. The first client render returns undefined, stripping the
 * class, so with working JS the reveals behave exactly as designed.
 */
export function useRevealFallback(): string | undefined {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const reduce = usePrefersReducedMotion();
  // Under reduced motion the class stays permanently: the animation resolves
  // instantly there (globals.css), which both shows content immediately and
  // overrides server-rendered hidden styles React 19 leaves unpatched when
  // the client tree hydrates on the reduce branch.
  return hydrated && !reduce ? undefined : "reveal-fallback";
}
