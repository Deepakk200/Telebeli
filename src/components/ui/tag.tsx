import type { MouseEventHandler, ReactNode } from "react";

import { IconX } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const tagBase =
  "inline-flex h-5 items-center gap-1 rounded-sm border px-2 text-xs font-medium whitespace-nowrap";
const tagIdle = "border-border bg-muted text-muted-foreground";

/**
 * Interactive metadata (filters, languages). Static by default; pass
 * `onSelect` for a selectable tag (real button + aria-pressed) or `onRemove`
 * for a removable one (labeled ✕ button). Static state belongs to Badge.
 */
export function Tag({
  children,
  selected = false,
  onSelect,
  onRemove,
  removeLabel,
  className,
}: {
  children: ReactNode;
  selected?: boolean;
  onSelect?: MouseEventHandler<HTMLButtonElement>;
  onRemove?: MouseEventHandler<HTMLButtonElement>;
  /** Accessible name for the ✕ — required when children isn't plain text. */
  removeLabel?: string;
  className?: string;
}) {
  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  if (onSelect) {
    return (
      <button
        type="button"
        aria-pressed={selected}
        onClick={onSelect}
        className={cn(
          tagBase,
          focusRing,
          "transition-colors",
          selected
            ? "border-ring bg-accent-wash text-accent-ink"
            : cn(tagIdle, "hover:border-border-strong hover:text-foreground"),
          className,
        )}
      >
        {children}
      </button>
    );
  }

  return (
    <span className={cn(tagBase, tagIdle, className)}>
      {children}
      {onRemove ? (
        <button
          type="button"
          aria-label={removeLabel ?? (typeof children === "string" ? `Remove ${children}` : "Remove")}
          onClick={onRemove}
          className={cn("-mr-1 rounded-sm hover:text-foreground", focusRing)}
        >
          <IconX className="size-3" />
        </button>
      ) : null}
    </span>
  );
}
