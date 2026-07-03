"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRightLeft } from "lucide-react";
import { statusStyles, type LiveCallRecord } from "@/components/dashboard/calls-table";
import { formatDuration } from "@/lib/format";
import { cn } from "@/lib/utils";

/** Deterministic pseudo-score from the call id so SSR/client and re-renders agree. */
function qaScore(call: LiveCallRecord): number {
  let hash = 0;
  for (const char of call.id) hash = (hash * 31 + char.charCodeAt(0)) % 997;
  return 88 + (hash % 11);
}

// Synthetic transcripts keyed by outcome — labeled as such in the UI.
const transcripts: Record<LiveCallRecord["status"], { who: "caller" | "agent"; text: string }[]> = {
  resolving: [
    { who: "caller", text: "Hi, I'd like to check the status of my order." },
    { who: "agent", text: "Happy to help — pulling up order details now…" },
  ],
  resolved: [
    { who: "caller", text: "Can you move my appointment to next Tuesday?" },
    { who: "agent", text: "Done — Tuesday at 2:30pm. You'll get a confirmation text shortly." },
    { who: "caller", text: "Perfect, thanks." },
  ],
  transferred: [
    { who: "caller", text: "This is the third time I'm calling about the same charge." },
    {
      who: "agent",
      text: "I hear you — this needs someone who can pull up billing. I'm bringing in a specialist and staying on until they're with you.",
    },
  ],
  missed: [],
};

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-mono text-sm font-medium tabular-nums">{value}</p>
    </div>
  );
}

/**
 * Open-a-call detail. Radix Dialog provides the focus trap and Esc; because the
 * dialog opens programmatically (row activation, no DialogTrigger), the caller
 * captures the activating element in `restoreFocusTo` and it is refocused on
 * close.
 */
export function CallDetailDialog({
  call,
  onClose,
  restoreFocusTo,
}: {
  call: LiveCallRecord | null;
  onClose: () => void;
  restoreFocusTo?: React.RefObject<HTMLElement | null>;
}) {
  return (
    <Dialog open={call !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-h-[85dvh] overflow-y-auto sm:max-w-xl"
        onCloseAutoFocus={(event) => {
          if (restoreFocusTo?.current) {
            event.preventDefault();
            restoreFocusTo.current.focus();
          }
        }}
      >
        {call ? (
          <>
            <DialogHeader className="text-left">
              <DialogTitle className="flex flex-wrap items-center gap-2.5">
                {call.contact}
                <span
                  className={cn(
                    "inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                    statusStyles[call.status],
                  )}
                >
                  {call.status}
                </span>
              </DialogTitle>
              <DialogDescription className="font-mono text-xs">
                {call.id} · {call.direction} · {call.language}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-3 gap-4 rounded-lg border border-border bg-muted/30 p-4">
              <MetaItem label="Duration" value={formatDuration(call.durationSec)} />
              <MetaItem label="Latency" value={`${call.latencyMs}ms`} />
              <MetaItem
                label="QA score"
                value={call.status === "missed" ? "—" : `${qaScore(call)} / 100`}
              />
            </div>

            {call.status === "transferred" ? (
              <div className="flex items-start gap-3 rounded-lg border border-brand-accent/40 bg-brand-accent/10 p-4 text-sm">
                <ArrowRightLeft className="mt-0.5 size-4 shrink-0 text-foreground dark:text-brand-accent" />
                <p>
                  Warm-transferred to a human agent with the full transcript and detected intent
                  attached — the caller never repeated themselves.
                </p>
              </div>
            ) : null}

            {transcripts[call.status].length > 0 ? (
              <div className="space-y-2.5">
                {transcripts[call.status].map((turn, index) => (
                  <p
                    key={index}
                    className={cn(
                      "w-fit max-w-[85%] rounded-2xl px-3.5 py-2 text-sm",
                      turn.who === "caller"
                        ? "rounded-tl-sm bg-muted text-foreground/90"
                        : "ml-auto rounded-tr-sm bg-brand text-primary-foreground",
                    )}
                  >
                    {turn.text}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No transcript — the call was never answered. Missed calls surface here so nothing
                fails silently.
              </p>
            )}

            <p className="font-mono text-xs text-muted-foreground">Synthetic transcript — demo data.</p>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
