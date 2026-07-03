"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { ThemeProvider } from "./theme-provider";
import { QueryProvider } from "./query-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        {/* Not strict: deferred sections still use full `motion.*`; they move
            to `m` in their own milestones. reducedMotion="user" makes every
            token instant under OS reduced-motion. */}
        <LazyMotion features={domAnimation}>
          <MotionConfig reducedMotion="user">
            {/* hover show-delay 60ms, focus 0 (blueprint §hover-reveal). */}
            <TooltipProvider delayDuration={60}>{children}</TooltipProvider>
          </MotionConfig>
        </LazyMotion>
        <Toaster position="bottom-right" />
      </QueryProvider>
    </ThemeProvider>
  );
}
