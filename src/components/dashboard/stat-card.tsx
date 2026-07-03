import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Counter } from "@/components/motion";
import { cn } from "@/lib/utils";
import type { Kpi } from "@/services/dashboard";
import { surface } from "@/lib/surface";

/**
 * invertDelta: when a decrease is the good outcome (e.g. latency).
 * countUp: false renders the value statically (SSR-visible, no animation) —
 * used by the marketing hero, where count-up is reserved for the Reliability
 * section and numbers must be present at first paint.
 */
export function StatCard({
  kpi,
  invertDelta = false,
  countUp = true,
}: {
  kpi: Kpi;
  invertDelta?: boolean;
  countUp?: boolean;
}) {
  const up = kpi.delta >= 0;
  const good = invertDelta ? !up : up;
  return (
    <div className={cn(surface(), "p-5")}>
      <p className="text-sm text-muted-foreground">{kpi.label}</p>
      <div className="mt-2 flex items-end justify-between gap-2">
        <p className="font-mono text-h3 font-semibold tracking-tight tabular-nums">
          {countUp ? (
            <Counter
              value={kpi.value}
              decimals={kpi.decimals}
              prefix={kpi.prefix}
              suffix={kpi.suffix}
            />
          ) : (
            <>
              {kpi.prefix}
              {kpi.value.toLocaleString("en-US", {
                minimumFractionDigits: kpi.decimals ?? 0,
                maximumFractionDigits: kpi.decimals ?? 0,
              })}
              {kpi.suffix}
            </>
          )}
        </p>
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium tabular-nums",
            good ? "bg-success/12 text-success" : "bg-destructive/12 text-destructive",
          )}
        >
          {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
          {Math.abs(kpi.delta).toFixed(1)}%
        </span>
      </div>
    </div>
  );
}
