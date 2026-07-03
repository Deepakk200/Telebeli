"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Light-first theme config. "operations" is the dark token set from the
 * identity system; it maps onto the .dark class so the CSS token layer stays
 * theme-name-agnostic. next-themes injects a blocking inline script before
 * paint (no FOUC), and color-scheme flips via html/.dark rules in globals.css.
 * Dashboard-specific default handling is deferred to M12.
 */
export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      themes={["light", "operations"]}
      value={{ light: "light", operations: "dark" }}
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
