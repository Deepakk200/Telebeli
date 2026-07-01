"use client";

import { ThemeProvider } from "./theme-provider";
import { QueryProvider } from "./query-provider";
import { SmoothScroll } from "./smooth-scroll";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <QueryProvider>
        <TooltipProvider delayDuration={200}>
          <SmoothScroll>{children}</SmoothScroll>
        </TooltipProvider>
        <Toaster position="bottom-right" />
      </QueryProvider>
    </ThemeProvider>
  );
}
