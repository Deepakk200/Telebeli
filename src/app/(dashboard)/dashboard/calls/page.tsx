import { PageHeader } from "@/components/dashboard/page-header";
import { CallsTable } from "@/components/dashboard/calls-table";

export const metadata = { title: "Calls" };

export default function CallsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Calls"
        description="Every conversation your agents handled, with latency and outcome."
      />
      <CallsTable />
    </div>
  );
}
