"use client";

import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "./empty-state";
import { cn } from "@/lib/utils";
import { getCallVolume, getLatencySeries } from "@/services/dashboard";
import { surface } from "@/lib/surface";

// Recharts is heavy — load it only on the client, after the shell paints.
const VolumeChart = dynamic(() => import("./charts").then((m) => m.VolumeChart), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full rounded-lg" />,
});
const LatencyChart = dynamic(() => import("./charts").then((m) => m.LatencyChart), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full rounded-lg" />,
});

function ChartCard({
  title,
  subtitle,
  legend,
  className,
  children,
}: {
  title: string;
  subtitle?: string;
  legend?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(surface(), "p-5", className)}>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          {subtitle ? <p className="text-xs text-muted-foreground">{subtitle}</p> : null}
        </div>
        {legend}
      </div>
      <div className="h-64">{children}</div>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}

export function VolumeCard({ className }: { className?: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["call-volume"],
    queryFn: getCallVolume,
  });
  return (
    <ChartCard
      title="Call volume"
      subtitle="Last 14 days"
      className={className}
      legend={
        <div className="flex gap-3">
          <LegendDot color="var(--color-chart-1)" label="Inbound" />
          <LegendDot color="var(--color-chart-3)" label="Outbound" />
        </div>
      }
    >
      {isError ? (
        <EmptyState title="Couldn’t load volume" />
      ) : isLoading || !data ? (
        <Skeleton className="h-full w-full rounded-lg" />
      ) : (
        <VolumeChart data={data} />
      )}
    </ChartCard>
  );
}

export function LatencyCard({ className }: { className?: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["latency"],
    queryFn: getLatencySeries,
  });
  return (
    <ChartCard
      title="Voice latency"
      subtitle="p50 / p95, today"
      className={className}
      legend={
        <div className="flex gap-3">
          <LegendDot color="var(--color-chart-1)" label="p50" />
          <LegendDot color="var(--color-chart-4)" label="p95" />
        </div>
      }
    >
      {isError ? (
        <EmptyState title="Couldn’t load latency" />
      ) : isLoading || !data ? (
        <Skeleton className="h-full w-full rounded-lg" />
      ) : (
        <LatencyChart data={data} />
      )}
    </ChartCard>
  );
}
