import Link from "next/link";
import { Download, Plus } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { VolumeCard, LatencyCard } from "@/components/dashboard/chart-cards";
import { CallsTable } from "@/components/dashboard/calls-table";
import { Button } from "@/components/ui/button";
import { getKpis } from "@/services/dashboard";

export const metadata = { title: "Overview" };

export default async function OverviewPage() {
  const kpis = await getKpis();
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title="Overview" description="How your voice agents performed across every line.">
        <Button variant="outline" size="sm">
          <Download className="size-4" />
          Export
        </Button>
        <Button asChild size="sm">
          <Link href="/dashboard/agents">
            <Plus className="size-4" />
            New agent
          </Link>
        </Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <StatCard
            key={kpi.label}
            kpi={kpi}
            invertDelta={/latency|handle/i.test(kpi.label)}
          />
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <VolumeCard className="lg:col-span-2" />
        <LatencyCard />
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-h3 font-semibold tracking-tight">Recent calls</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard/calls">View all</Link>
          </Button>
        </div>
        <CallsTable limit={8} />
      </div>
    </div>
  );
}
