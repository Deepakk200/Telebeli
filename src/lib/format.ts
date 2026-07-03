import { formatDistanceToNowStrict } from "date-fns";

/**
 * Shared evidence formatters. Output is plain ASCII digits so it renders
 * correctly in the mono/tabular-nums evidence voice (text-evidence).
 */

/** Seconds → "m:ss" (e.g. 125 → "2:05"). */
export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/** Milliseconds → "128 ms". */
export function formatLatency(ms: number): string {
  return `${Math.round(ms)} ms`;
}

/** ISO string or Date → strict relative time, e.g. "3 minutes ago". */
export function formatRelativeTime(value: string | Date): string {
  return formatDistanceToNowStrict(new Date(value), { addSuffix: true });
}

/** Fixed two-fraction currency (tabular columns align). */
export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
