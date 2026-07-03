"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { DataTable } from "@/components/dashboard/data-table";
import { callColumns } from "@/components/dashboard/calls-table";
import { Waveform } from "@/components/common/waveform";
import { surface } from "@/lib/surface";
import { cn } from "@/lib/utils";
import {
  heroPreviewCalls,
  heroPreviewKpis,
  heroPreviewLiveCall,
} from "@/constants/landing";

// A read-only slice of the real column defs — the columns that fit the hero's
// narrow glimpse. "When" is excluded on purpose: it renders relative time,
// which would drift between prerender and hydration.
const previewColumnKeys = new Set(["contact", "status", "durationSec"]);
const previewColumns = callColumns.filter(
  (column) => "accessorKey" in column && previewColumnKeys.has(String(column.accessorKey)),
);

/**
 * The hero's live-looking operations glimpse: the REAL dashboard components
 * (StatCard, DataTable + callColumns) over labeled synthetic data — one source
 * of truth, so the promise and the product are the same UI. All data is static
 * and server-rendered (no fetch, no skeleton, no layout shift); the only
 * persistent motion is the live signal (amber --live pulse + waveform).
 */
export function HeroPreview() {
  return (
    <div
      role="group"
      aria-label="Product preview, synthetic data"
      className={cn(surface({ elevation: "floating" }), "p-3")}
    >
      <div className="flex items-center justify-between px-1 pb-3">
        <p className="text-sm font-medium">Live operations</p>
        <span className="rounded-full border border-border bg-muted/60 px-2 py-0.5 font-mono text-xs text-muted-foreground">
          Synthetic data
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {heroPreviewKpis.map((kpi) => (
          <StatCard key={kpi.label} kpi={kpi} countUp={false} />
        ))}
      </div>

      {/* The one in-progress row — the live motif, keyed to --live (amber = live, only). */}
      <div className="mt-3 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-subtle">
        <span className="relative flex size-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-live" />
          <span className="relative inline-flex size-2.5 rounded-full bg-live" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{heroPreviewLiveCall.contact}</p>
          <p className="font-mono text-xs text-muted-foreground">
            {heroPreviewLiveCall.line} · {heroPreviewLiveCall.elapsed}
          </p>
        </div>
        <div className="ml-auto h-8 w-24 shrink-0">
          <Waveform bars={22} barClassName="bg-live/70" />
        </div>
      </div>

      <div className="mt-3">
        <DataTable columns={previewColumns} data={heroPreviewCalls} />
      </div>
    </div>
  );
}
