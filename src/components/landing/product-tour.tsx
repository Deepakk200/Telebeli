"use client";

import { PhoneIncoming, PhoneOutgoing } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Waveform } from "@/components/common/waveform";
import { SectionHeading } from "./section-heading";
import { surface } from "@/lib/surface";
import { cn } from "@/lib/utils";

// Synthetic preview data — mirrors the real /dashboard without exposing any
// customer data. Reinforces "see it working" without a demo wall.
const liveCalls = [
  { name: "Priya N.", dir: "inbound", status: "resolving", time: "0:42" },
  { name: "Marcus W.", dir: "outbound", status: "resolving", time: "1:15" },
  { name: "Sofia A.", dir: "inbound", status: "handoff", time: "2:03" },
];

const transcript = [
  { who: "caller", text: "Can you push my appointment to next Tuesday?" },
  { who: "agent", text: "Moved it to Tuesday, 2:30pm. You'll get a confirmation text shortly." },
  { who: "caller", text: "Perfect, thanks." },
];

// [verify] illustrative analytics — synthetic 7-day shape.
const bars = [52, 61, 48, 74, 69, 83, 91];

const statusTone: Record<string, string> = {
  resolving: "bg-brand/12 text-brand",
  handoff: "bg-brand-accent/15 text-brand-accent",
};

export function ProductTour() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-[var(--spacing-section)]">
      <SectionHeading
        eyebrow="See it working"
        title="Your whole voice operation, on one screen"
        description="This is the actual product, not a slideshow — live calls, searchable transcripts, and analytics you can drive yourself. No demo wall."
      />

      <div className={cn(surface({ elevation: "floating" }), "mt-14 overflow-hidden p-0")}>
        {/* browser-chrome frame for fidelity */}
        <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-4 py-3">
          <span className="size-2.5 rounded-full bg-destructive/50" />
          <span className="size-2.5 rounded-full bg-brand-accent/50" />
          <span className="size-2.5 rounded-full bg-brand/50" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">
            app.telebeli.com/dashboard
          </span>
        </div>

        <Tabs defaultValue="live" className="p-5">
          <TabsList>
            <TabsTrigger value="live">Live calls</TabsTrigger>
            <TabsTrigger value="transcripts">Transcripts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="mt-5 space-y-2">
            {liveCalls.map((call) => (
              <div
                key={call.name}
                className="flex items-center gap-4 rounded-lg border border-border bg-background/50 px-4 py-3"
              >
                {call.dir === "inbound" ? (
                  <PhoneIncoming className="size-4 text-brand" />
                ) : (
                  <PhoneOutgoing className="size-4 text-brand-accent" />
                )}
                <span className="w-24 text-sm font-medium">{call.name}</span>
                <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium capitalize", statusTone[call.status])}>
                  {call.status}
                </span>
                <div className="hidden h-6 flex-1 opacity-70 sm:block">
                  <Waveform bars={28} barClassName="bg-brand/40" />
                </div>
                <span className="ml-auto font-mono text-sm tabular-nums text-muted-foreground">
                  {call.time}
                </span>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="transcripts" className="mt-5">
            <div className="space-y-2.5 rounded-lg border border-border bg-background/50 p-5 text-sm">
              {transcript.map((turn, i) => (
                <p
                  key={i}
                  className={cn(
                    "w-fit max-w-md rounded-2xl px-3.5 py-2",
                    turn.who === "caller"
                      ? "rounded-tl-sm bg-muted text-foreground/90"
                      : "ml-auto rounded-tr-sm bg-brand text-primary-foreground",
                  )}
                >
                  {turn.text}
                </p>
              ))}
              <p className="pt-2 font-mono text-xs text-muted-foreground">
                CALL-41280 · resolved · sentiment: positive
              </p>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-5">
            <div className="rounded-lg border border-border bg-background/50 p-5">
              <div className="flex h-40 items-end gap-3">
                {bars.map((h, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t bg-gradient-to-t from-brand/40 to-brand"
                      style={{ height: `${h}%` }}
                    />
                    <span className="font-mono text-[10px] text-muted-foreground">D{i + 1}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Resolved calls, last 7 days — searchable and exportable. {/* [verify] */}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
