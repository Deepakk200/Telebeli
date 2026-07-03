import { Activity, Layers, ShieldCheck } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "./section-heading";
import { surface } from "@/lib/surface";
import { cn } from "@/lib/utils";

/**
 * P10 — Reliability by design (part of the benefits beat). Candor fix: the
 * fabricated pre-GA figures ("60-min", "1,000s") are gone; each card is now a
 * qualitative, provable statement. "call #5,000" stays as qualitative
 * failure-mode framing only, never paired with an invented uptime/volume number.
 */
const proofs = [
  {
    icon: Activity,
    title: "Long calls stay coherent",
    body: "A long conversation holds to the last turn — no quiet degradation, no mid-call drops, no failing in silence.",
  },
  {
    icon: Layers,
    title: "Concurrency headroom",
    body: "Simultaneous calls are handled without a queue, so a busy hour doesn't turn into missed or dropped calls.",
  },
  {
    icon: ShieldCheck,
    title: "Every call is scored",
    body: "Each call is evaluated automatically, so a regression surfaces on your dashboard before a customer feels it.",
  },
];

export function Reliability() {
  return (
    <section id="reliability" className="container-page scroll-mt-24 py-[var(--spacing-section)]">
      <SectionHeading
        eyebrow="RELIABILITY BY DESIGN"
        title="It doesn't break on call #5,000"
        description="The failure mode that kills enterprise voice pilots isn't a bad demo — it's the quiet degradation at volume. Telebeli is built so the five-thousandth call runs like the first."
      />

      <Stagger role="list" className="mt-14 grid gap-4 md:grid-cols-3">
        {proofs.map((proof) => (
          <StaggerItem role="listitem" key={proof.title}>
            <div className={cn(surface({ elevation: "subtle" }), "h-full p-6")}>
              <div className="flex size-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <proof.icon className="size-5" aria-hidden />
              </div>
              <h3 className="mt-4 text-h3 text-foreground">{proof.title}</h3>
              <p className="mt-2 text-body leading-relaxed text-ink-muted">{proof.body}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
