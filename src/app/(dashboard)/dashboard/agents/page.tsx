import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Waveform } from "@/components/common/waveform";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { surface } from "@/lib/surface";

export const metadata = { title: "Agents" };

const agents = [
  { name: "Reception", role: "Inbound · main line", live: true, calls: 3120, latency: 118 },
  { name: "Bookings", role: "Inbound · scheduling", live: true, calls: 1894, latency: 131 },
  { name: "Renewals", role: "Outbound · win-back", live: true, calls: 2260, latency: 124 },
  { name: "After-hours", role: "Inbound · overflow", live: false, calls: 402, latency: 140 },
];

export default function AgentsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title="Agents" description="Your voice agents and how each one is performing.">
        <Button size="sm">
          <Plus className="size-4" />
          New agent
        </Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <div
            key={agent.name}
            className={cn(surface({ interactive: true }), "group p-5")}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{agent.name}</h3>
                <p className="text-xs text-muted-foreground">{agent.role}</p>
              </div>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
                  agent.live
                    ? "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400"
                    : "bg-muted text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    agent.live ? "bg-emerald-500" : "bg-muted-foreground",
                  )}
                />
                {agent.live ? "Live" : "Paused"}
              </span>
            </div>

            <div className="my-4 h-10 opacity-70">
              <Waveform bars={32} animated={agent.live} barClassName="bg-brand/50" />
            </div>

            <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
              <div>
                <p className="font-mono font-medium tabular-nums">{agent.calls.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">calls / mo</p>
              </div>
              <div className="text-right">
                <p className="font-mono font-medium tabular-nums">{agent.latency}ms</p>
                <p className="text-xs text-muted-foreground">median latency</p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard/settings">Configure</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
