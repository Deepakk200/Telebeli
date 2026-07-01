import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Counter } from "@/components/motion";
import { cn } from "@/lib/utils";
import type { Kpi } from "@/services/dashboard";
import { surface } from "@/lib/surface";

/** invertDelta: when a decrease is the good outcome (e.g. latency). */
export function StatCard({ kpi, invertDelta = false }: { kpi: Kpi; invertDelta?: boolean }) {
  const up = kpi.delta >= 0;
  const good = invertDelta ? !up : up;
  return (
    <div className={cn(surface(), "p-5")}>
      <p className="text-sm text-muted-foreground">{kpi.label}</p>
      <div className="mt-2 flex items-end justify-between gap-2">
        <p className="font-mono text-h3 font-semibold tracking-tight tabular-nums">
          <Counter
            value={kpi.value}
            decimals={kpi.decimals}
            prefix={kpi.prefix}
            suffix={kpi.suffix}
          />
        </p>
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium tabular-nums",
            good
              ? "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400"
              : "bg-destructive/12 text-destructive",
          )}
        >
          {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
          {Math.abs(kpi.delta).toFixed(1)}%
        </span>
      </div>
    </div>
  );
}
