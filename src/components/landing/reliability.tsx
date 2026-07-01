import { Activity, Layers, ShieldCheck } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "./section-heading";
import { surface } from "@/lib/surface";
import { cn } from "@/lib/utils";

// [verify] all figures — illustrative pre-GA proof points.
const proofs = [
  {
    icon: Activity,
    stat: "60-min",
    title: "Long calls hold",
    body: "Hour-long conversations stay coherent to the last turn — no silent failures, no mid-call drops.",
  },
  {
    icon: Layers,
    stat: "1,000s",
    title: "Concurrency headroom",
    body: "Thousands of simultaneous calls at peak, with no queue and no degradation as volume climbs.",
  },
  {
    icon: ShieldCheck,
    stat: "Every call",
    title: "Watched, not hoped",
    body: "Each call is scored automatically, so regressions surface on your dashboard before a customer feels them.",
  },
];

export function Reliability() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-[var(--spacing-section)]">
      <SectionHeading
        eyebrow="Reliability at scale"
        title="It doesn't break on call #5,000"
        description="The failure mode that kills enterprise voice pilots isn't a bad demo — it's the quiet degradation at volume. TeleBeli is built so the ten-thousandth call runs like the first."
      />

      <Stagger className="mt-14 grid gap-4 md:grid-cols-3">
        {proofs.map((proof) => (
          <StaggerItem key={proof.title}>
            <div className={cn(surface({ elevation: "subtle" }), "h-full p-6")}>
              <div className="flex items-center justify-between">
                <div className="flex size-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <proof.icon className="size-5" />
                </div>
                {/* [verify] */}
                <span className="font-mono text-sm font-medium text-brand">{proof.stat}</span>
              </div>
              <h3 className="mt-4 text-base font-semibold">{proof.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{proof.body}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
