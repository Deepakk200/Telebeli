"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

/**
 * Light ↔ operations toggle. Icons swap via CSS (.dark) so there is no
 * hydration flash; aria-pressed settles after mount (SSR can't know the theme).
 */
export function ModeToggle({ className }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  // Hydration-safe mounted flag: false on the server render, true on the client.
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  // System preference resolves to "dark"/"light"; explicit choice is "operations".
  const isOperations = mounted && (theme === "operations" || resolvedTheme === "dark");

  return (
    <button
      type="button"
      aria-label="Operations mode"
      aria-pressed={isOperations}
      onClick={() => setTheme(isOperations ? "light" : "operations")}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-md border border-border bg-card text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <Moon className="size-4 dark:hidden" />
      <Sun className="hidden size-4 dark:block" />
    </button>
  );
}
