"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useInView } from "motion/react";
import { formatDistanceToNow } from "date-fns";
import { track } from "@vercel/analytics";
import {
  PhoneIncoming,
  PhoneOutgoing,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Reveal } from "@/components/motion";
import { useAnnounce } from "@/components/common/live-region";
import { SectionHeading } from "./section-heading";
import { CallDetailDialog } from "./call-detail-dialog";
import { StatCard } from "@/components/dashboard/stat-card";
import { DataTable } from "@/components/dashboard/data-table";
import {
  callColumns,
  statusStyles,
  type LiveCallRecord,
} from "@/components/dashboard/calls-table";
import { VolumeCard, LatencyCard } from "@/components/dashboard/chart-cards";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { getKpis, getRecentCalls, type CallDirection, type CallRecord } from "@/services/dashboard";
import { formatDuration } from "@/lib/format";
import { surface } from "@/lib/surface";
import { cn } from "@/lib/utils";

const TICK_MS = 3000;
const TICK_SECONDS = TICK_MS / 1000;
const MAX_ROWS = 30;

type StatusFilter = "all" | LiveCallRecord["status"];
type DirectionFilter = "all" | CallDirection;
type MobileSort = "newest" | "duration" | "latency" | "contact";

const mobileSortOptions: { value: MobileSort; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "duration", label: "Longest duration" },
  { value: "latency", label: "Lowest latency" },
  { value: "contact", label: "Contact A–Z" },
];

const mobileSorts: Record<MobileSort, (a: LiveCallRecord, b: LiveCallRecord) => number> = {
  newest: (a, b) => b.startedAt.localeCompare(a.startedAt),
  duration: (a, b) => b.durationSec - a.durationSec,
  latency: (a, b) => a.latencyMs - b.latencyMs,
  contact: (a, b) => a.contact.localeCompare(b.contact),
};

// Names for calls the live tick brings in — synthetic, like everything here.
const incomingPool = [
  "Noah Kim",
  "Fatima Al-Sayed",
  "Lucas Weber",
  "Mei Chen",
  "Omar Haddad",
  "Sara Lindqvist",
];
const languagePool = ["English", "Spanish", "German", "Mandarin"];

/** Seed the live view: the sample history plus two calls in progress. */
function seedLive(history: CallRecord[]): LiveCallRecord[] {
  const now = Date.now();
  const inProgress: LiveCallRecord[] = [
    {
      id: "CALL-4101",
      contact: "Jonas Berg",
      direction: "inbound",
      status: "resolving",
      durationSec: 47,
      latencyMs: 119,
      language: "English",
      startedAt: new Date(now - 47_000).toISOString(),
    },
    {
      id: "CALL-4099",
      contact: "Amara Diallo",
      direction: "outbound",
      status: "resolving",
      durationSec: 128,
      latencyMs: 126,
      language: "French",
      startedAt: new Date(now - 128_000).toISOString(),
    },
  ];
  return [...inProgress, ...history].slice(0, MAX_ROWS);
}

/**
 * One live-view step: in-progress timers advance; occasionally the oldest
 * in-progress call completes (resolved or handed off) and a new call arrives.
 * Deterministic off the tick counter — calm, not random. Same types as the
 * service, so swapping the interval for a websocket later changes nothing else.
 */
function advance(
  calls: LiveCallRecord[],
  tick: number,
): { next: LiveCallRecord[]; message: string | null } {
  let message: string | null = null;
  let next = calls.map((call) =>
    call.status === "resolving" ? { ...call, durationSec: call.durationSec + TICK_SECONDS } : call,
  );

  if (tick % 4 === 0) {
    const index = next.map((call) => call.status).lastIndexOf("resolving");
    const finished = index === -1 ? undefined : next[index];
    if (finished) {
      const status = tick % 8 === 0 ? "transferred" : "resolved";
      next[index] = { ...finished, status };
      message = `Call from ${finished.contact} ${status === "resolved" ? "resolved" : "handed off to a human agent"}.`;
    }
  }

  if (tick % 5 === 0) {
    const step = tick / 5;
    const contact = incomingPool[step % incomingPool.length] ?? "New caller";
    const incoming: LiveCallRecord = {
      id: `CALL-${4110 + step}`,
      contact,
      direction: step % 3 === 0 ? "outbound" : "inbound",
      status: "resolving",
      durationSec: 0,
      latencyMs: 108 + ((step * 13) % 40),
      language: languagePool[step % languagePool.length] ?? "English",
      startedAt: new Date().toISOString(),
    };
    next = [incoming, ...next].slice(0, MAX_ROWS);
    message = `New ${incoming.direction} call from ${contact}.`;
  }

  return { next, message };
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex min-h-7 items-center gap-1 rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-xs font-medium capitalize transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`Remove filter: ${label}`}
    >
      {label}
      <X className="size-3" />
    </button>
  );
}

function CallCard({
  call,
  onOpen,
}: {
  call: LiveCallRecord;
  onOpen: (call: LiveCallRecord) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(call)}
      className={cn(
        surface({ elevation: "flat" }),
        "w-full min-h-11 p-4 text-left transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm font-medium">
          {call.direction === "inbound" ? (
            <PhoneIncoming className="size-4 text-brand" />
          ) : (
            <PhoneOutgoing className="size-4 text-brand-accent" />
          )}
          {call.contact}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium capitalize transition-colors duration-[var(--dur-base)]",
            statusStyles[call.status],
          )}
        >
          {call.status === "resolving" ? (
            <span aria-hidden className="relative inline-flex size-1.5 rounded-full bg-live" />
          ) : null}
          {call.status}
        </span>
      </div>
      <dl className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground tabular-nums">
        <div className="flex gap-1">
          <dt className="sr-only">ID</dt>
          <dd>{call.id}</dd>
        </div>
        <div className="flex gap-1">
          <dt>dur</dt>
          <dd>{formatDuration(call.durationSec)}</dd>
        </div>
        <div className="flex gap-1">
          <dt>lat</dt>
          <dd>{call.latencyMs}ms</dd>
        </div>
        <div className="flex gap-1">
          <dt className="sr-only">Language</dt>
          <dd>{call.language}</dd>
        </div>
        <div className="flex gap-1">
          <dt className="sr-only">When</dt>
          <dd>{formatDistanceToNow(new Date(call.startedAt), { addSuffix: true })}</dd>
        </div>
      </dl>
    </button>
  );
}

export function ProductTour() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.1 });
  // Charts are heavy (recharts) — mount them only once the section has been seen.
  const chartsArmed = useInView(sectionRef, { once: true, amount: 0.05 });
  const reduced = usePrefersReducedMotion();

  const kpisQuery = useQuery({ queryKey: ["kpis"], queryFn: getKpis });
  const callsQuery = useQuery({ queryKey: ["recent-calls"], queryFn: getRecentCalls });

  const [calls, setCalls] = useState<LiveCallRecord[] | null>(null);
  const { announce, liveRegion } = useAnnounce();
  const [openCall, setOpenCall] = useState<LiveCallRecord | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [directionFilter, setDirectionFilter] = useState<DirectionFilter>("all");
  const [query, setQuery] = useState("");
  const [mobileSort, setMobileSort] = useState<MobileSort>("newest");

  const callsRef = useRef<LiveCallRecord[] | null>(null);
  const tickRef = useRef(0);
  const trackedActions = useRef(new Set<string>());

  // The "drove the dashboard" qualifying event — once per action type.
  const droveDashboard = (action: "sort" | "filter" | "search" | "open") => {
    if (trackedActions.current.has(action)) return;
    trackedActions.current.add(action);
    // Only fires where the Analytics script is mounted (Vercel deploys).
    if (typeof window !== "undefined" && "va" in window) {
      track("drove_dashboard", { action });
    }
  };

  useEffect(() => {
    if (callsQuery.data && callsRef.current === null) {
      const seeded = seedLive(callsQuery.data);
      callsRef.current = seeded;
      setCalls(seeded);
    }
  }, [callsQuery.data]);

  useEffect(() => {
    callsRef.current = calls;
  }, [calls]);

  // Live tick: only while visible, never under reduced motion, skipped when the
  // tab is hidden. Interval is torn down entirely when the section scrolls away.
  useEffect(() => {
    if (!inView || reduced) return;
    const id = setInterval(() => {
      if (document.hidden || !callsRef.current) return;
      tickRef.current += 1;
      const { next, message } = advance(callsRef.current, tickRef.current);
      setCalls(next);
      if (message) announce(message);
    }, TICK_MS);
    return () => clearInterval(id);
  }, [inView, reduced, announce]);

  const filtered = useMemo(() => {
    if (!calls) return [];
    const text = query.trim().toLowerCase();
    return calls.filter(
      (call) =>
        (statusFilter === "all" || call.status === statusFilter) &&
        (directionFilter === "all" || call.direction === directionFilter) &&
        (text === "" ||
          call.contact.toLowerCase().includes(text) ||
          call.id.toLowerCase().includes(text)),
    );
  }, [calls, statusFilter, directionFilter, query]);

  const mobileSorted = useMemo(
    () => [...filtered].sort(mobileSorts[mobileSort]),
    [filtered, mobileSort],
  );

  const detailTriggerRef = useRef<HTMLElement | null>(null);
  const openDetail = (call: LiveCallRecord) => {
    // The activating row/card (focused by click or keyboard) gets focus back on close.
    detailTriggerRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    droveDashboard("open");
    setOpenCall(call);
  };

  const filterSelects = (
    <>
      <Select
        value={statusFilter}
        onValueChange={(value) => {
          setStatusFilter(value as StatusFilter);
          droveDashboard("filter");
        }}
      >
        <SelectTrigger className="min-h-9 w-full sm:w-36" aria-label="Filter by status">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="resolving">Resolving</SelectItem>
          <SelectItem value="resolved">Resolved</SelectItem>
          <SelectItem value="transferred">Transferred</SelectItem>
          <SelectItem value="missed">Missed</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={directionFilter}
        onValueChange={(value) => {
          setDirectionFilter(value as DirectionFilter);
          droveDashboard("filter");
        }}
      >
        <SelectTrigger className="min-h-9 w-full sm:w-36" aria-label="Filter by direction">
          <SelectValue placeholder="Direction" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All directions</SelectItem>
          <SelectItem value="inbound">Inbound</SelectItem>
          <SelectItem value="outbound">Outbound</SelectItem>
        </SelectContent>
      </Select>
    </>
  );

  return (
    <section id="dashboard" className="container-page py-[var(--spacing-section)]">
      <SectionHeading
        eyebrow="Take the controls"
        title="Your whole voice operation, on one screen"
        description="This is the actual product surface — sort it, filter it, search it, open a call. Live synthetic data, no demo wall, no signup."
      />

      {/* Signature Reveal moment #2 (page cap ≤3: console, dashboard, +1). */}
      <Reveal className="mt-14">
        <div ref={sectionRef} className={cn(surface({ elevation: "floating" }), "overflow-hidden p-0")}>
          {/* Browser-chrome frame for fidelity — labeled synthetic so fidelity never reads as real data. */}
          <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-4 py-3">
            <span className="size-2.5 rounded-full bg-destructive/50" />
            <span className="size-2.5 rounded-full bg-brand-accent/50" />
            <span className="size-2.5 rounded-full bg-brand/50" />
            <span className="ml-3 hidden font-mono text-xs text-muted-foreground sm:inline">
              app.telebeli.com/dashboard
            </span>
            <span className="ml-auto rounded-full border border-border bg-background/60 px-2 py-0.5 font-mono text-xs text-muted-foreground">
              Synthetic data
            </span>
          </div>

          <div className="space-y-4 p-4 sm:p-5">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {kpisQuery.data
                ? kpisQuery.data.map((kpi) => (
                    <StatCard
                      key={kpi.label}
                      kpi={kpi}
                      countUp={false}
                      invertDelta={kpi.label === "Median latency" || kpi.label === "Avg handle time"}
                    />
                  ))
                : Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="h-[104px] rounded-xl" />
                  ))}
            </div>

            {/* Visible controls — operability is the message. */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-0 flex-1 basis-52">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    droveDashboard("search");
                  }}
                  placeholder="Search contact or call ID…"
                  aria-label="Search calls by contact or ID"
                  className="min-h-9 pl-9"
                />
              </div>
              <div className="hidden items-center gap-2 sm:flex">{filterSelects}</div>
              <div className="flex w-full items-center gap-2 sm:hidden">
                <Select
                  value={mobileSort}
                  onValueChange={(value) => {
                    setMobileSort(value as MobileSort);
                    droveDashboard("sort");
                  }}
                >
                  <SelectTrigger className="min-h-11 flex-1" aria-label="Sort calls">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    {mobileSortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="min-h-11">
                      <SlidersHorizontal className="size-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="pb-8">
                    <SheetTitle>Filter calls</SheetTitle>
                    <div className="mt-4 flex flex-col gap-3 px-1">{filterSelects}</div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {(statusFilter !== "all" || directionFilter !== "all" || query.trim() !== "") && (
              <div className="flex flex-wrap items-center gap-2">
                {statusFilter !== "all" && (
                  <FilterChip
                    label={`status: ${statusFilter}`}
                    onRemove={() => setStatusFilter("all")}
                  />
                )}
                {directionFilter !== "all" && (
                  <FilterChip
                    label={`direction: ${directionFilter}`}
                    onRemove={() => setDirectionFilter("all")}
                  />
                )}
                {query.trim() !== "" && (
                  <FilterChip label={`search: ${query.trim()}`} onRemove={() => setQuery("")} />
                )}
              </div>
            )}

            {callsQuery.isError ? (
              <EmptyState
                title="Couldn’t load calls"
                description="Something went wrong fetching the call history. Try refreshing."
              />
            ) : calls === null ? (
              <div className={cn(surface({ elevation: "flat" }), "space-y-3 p-4")}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Skeleton className="size-8 rounded-full" />
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <EmptyState
                title={calls.length === 0 ? "No calls yet" : "No matching calls"}
                description={
                  calls.length === 0
                    ? "Once your agent starts taking calls, they’ll show up here in real time."
                    : "Try clearing a filter or changing the search."
                }
              />
            ) : (
              <>
                <div className="hidden sm:block">
                  <DataTable
                    columns={callColumns}
                    data={filtered}
                    caption="Recent and in-progress calls. Sortable by column; press Enter on a row to open the call detail."
                    onRowActivate={openDetail}
                    onSortChange={() => droveDashboard("sort")}
                  />
                </div>
                <div className="space-y-2 sm:hidden">
                  {mobileSorted.map((call) => (
                    <CallCard key={call.id} call={call} onOpen={openDetail} />
                  ))}
                </div>
              </>
            )}

            <div className="grid gap-3 lg:grid-cols-2">
              {chartsArmed ? (
                <>
                  <VolumeCard />
                  <LatencyCard />
                </>
              ) : (
                <>
                  <Skeleton className="h-[356px] rounded-xl" />
                  <Skeleton className="h-[356px] rounded-xl" />
                </>
              )}
            </div>
          </div>
        </div>
      </Reveal>

      <CallDetailDialog
        call={openCall}
        onClose={() => setOpenCall(null)}
        restoreFocusTo={detailTriggerRef}
      />
      {/* Live-region announcements for the ticking view (shared utility). */}
      {liveRegion}
    </section>
  );
}
