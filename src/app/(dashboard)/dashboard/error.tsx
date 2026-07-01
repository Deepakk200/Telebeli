"use client";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/dashboard/empty-state";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-2xl py-10">
      <EmptyState
        title="This view hit a snag"
        description="We couldn’t load your dashboard data. Give it another try."
        action={<Button onClick={reset}>Retry</Button>}
      />
    </div>
  );
}
