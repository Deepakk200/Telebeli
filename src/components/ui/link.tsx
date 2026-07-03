import * as React from "react";
import NextLink from "next/link";

import { cn } from "@/lib/utils";

/**
 * Inline text link — the scarce accent, underline on hover/focus, baseline
 * focus ring. Nav surfaces use NavLink (later milestone); this is prose/UI.
 */
export function Link({ className, ...props }: React.ComponentProps<typeof NextLink>) {
  return (
    <NextLink
      className={cn(
        "rounded-sm text-accent underline-offset-4 transition-colors hover:underline focus-visible:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      {...props}
    />
  );
}
