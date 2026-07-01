import { PageHeader } from "@/components/dashboard/page-header";
import { VolumeCard, LatencyCard } from "@/components/dashboard/chart-cards";

export const metadata = { title: "Analytics" };

export default function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Analytics"
        description="Volume, latency, and resolution trends across your agents."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <VolumeCard />
        <LatencyCard />
      </div>
    </div>
  );
}
