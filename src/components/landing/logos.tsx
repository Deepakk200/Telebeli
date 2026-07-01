import { HeartPulse, Landmark, ShieldCheck, Truck } from "lucide-react";
import { FadeIn } from "@/components/motion";

// Honest, category-based social proof — no invented customer names or unsourced
// volume claims (see punch-list P0.2). Swap in real logos once sourced.
const industries = [
  { icon: HeartPulse, label: "Healthcare" },
  { icon: Landmark, label: "Financial services" },
  { icon: ShieldCheck, label: "Insurance" },
  { icon: Truck, label: "Logistics" },
];

export function Logos() {
  return (
    <section className="border-y border-border/60 bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <FadeIn className="text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Built for regulated, high-volume voice operations
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {industries.map((industry) => (
              <span
                key={industry.label}
                className="inline-flex items-center gap-2 text-base font-medium text-foreground/55 transition-colors hover:text-foreground/80"
              >
                <industry.icon className="size-4 text-brand" />
                {industry.label}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
