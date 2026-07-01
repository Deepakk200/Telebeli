import { Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "./section-heading";
import { Waveform } from "@/components/common/waveform";
import { steps } from "@/constants/landing";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-y border-border/60 bg-muted/20"
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-40">
        <Waveform bars={90} barClassName="bg-brand/25" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-[var(--spacing-section)]">
        <SectionHeading
          eyebrow="How it works"
          title="From idea to live agent in a day"
          description="No ML team, no telephony wrangling. Describe the job and TeleBeli handles the voice stack end to end."
        />

        <Stagger className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <StaggerItem key={step.number}>
              <div className="relative">
                <span className="font-mono text-sm font-medium text-brand">{step.number}</span>
                <div className="mt-3 h-px w-full bg-gradient-to-r from-brand/40 to-transparent" />
                <h3 className="mt-4 text-h3 font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
