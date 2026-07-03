import { Stagger, StaggerItem, Counter } from "@/components/motion";
import { metrics } from "@/constants/landing";

export function Metrics() {
  return (
    <section className="container-page py-[var(--spacing-section)]">
      <Stagger className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {metrics.map((m) => (
          <StaggerItem key={m.label} className="text-center">
            <p className="font-mono text-h1 font-semibold tracking-tight tabular-nums text-gradient-brand">
              <Counter
                value={m.value}
                decimals={m.decimals}
                prefix={m.prefix}
                suffix={m.suffix}
              />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{m.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
      <p className="mt-8 text-center text-xs text-muted-foreground">
        Illustrative — pre-GA benchmarks.
      </p>
    </section>
  );
}
