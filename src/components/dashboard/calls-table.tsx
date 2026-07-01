"use client";

import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { PhoneIncoming, PhoneOutgoing } from "lucide-react";
import { DataTable } from "./data-table";
import { EmptyState } from "./empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatDuration } from "@/lib/format";
import { getRecentCalls, type CallRecord } from "@/services/dashboard";
import { surface } from "@/lib/surface";

const statusStyles: Record<CallRecord["status"], string> = {
  resolved: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400",
  transferred: "bg-brand/12 text-brand",
  missed: "bg-destructive/12 text-destructive",
};

export const callColumns: ColumnDef<CallRecord>[] = [
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => (
      <div className="flex items-center gap-2.5">
        {row.original.direction === "inbound" ? (
          <PhoneIncoming className="size-4 text-brand" />
        ) : (
          <PhoneOutgoing className="size-4 text-brand-accent" />
        )}
        <div>
          <p className="font-medium">{row.original.contact}</p>
          <p className="font-mono text-xs text-muted-foreground">{row.original.id}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<CallRecord["status"]>();
      return (
        <span
          className={cn(
            "inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize",
            statusStyles[status],
          )}
        >
          {status}
        </span>
      );
    },
  },
  { accessorKey: "language", header: "Language" },
  {
    accessorKey: "latencyMs",
    header: "Latency",
    cell: ({ getValue }) => (
      <span className="font-mono tabular-nums">{getValue<number>()}ms</span>
    ),
  },
  {
    accessorKey: "durationSec",
    header: "Duration",
    cell: ({ getValue }) => (
      <span className="font-mono tabular-nums">{formatDuration(getValue<number>())}</span>
    ),
  },
  {
    accessorKey: "startedAt",
    header: "When",
    cell: ({ getValue }) => (
      <span className="whitespace-nowrap text-muted-foreground">
        {formatDistanceToNow(new Date(getValue<string>()), { addSuffix: true })}
      </span>
    ),
  },
];

export function CallsTable({ limit }: { limit?: number }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["recent-calls"],
    queryFn: getRecentCalls,
  });

  if (isLoading) {
    return (
      <div className={cn(surface(), "space-y-3 p-4")}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        title="Couldn’t load calls"
        description="Something went wrong fetching your call history. Try refreshing."
      />
    );
  }

  const rows = limit ? (data ?? []).slice(0, limit) : (data ?? []);
  if (rows.length === 0) {
    return (
      <EmptyState
        title="No calls yet"
        description="Once your agent starts taking calls, they’ll show up here in real time."
      />
    );
  }

  return <DataTable columns={callColumns} data={rows} />;
}
