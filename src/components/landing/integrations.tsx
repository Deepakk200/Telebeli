import { Reveal } from "@/components/motion";
import { STAGGER_CAP, STAGGER_STEP } from "@/lib/motion";
import { surface } from "@/lib/surface";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { BrandMark } from "./brand-marks";
import { integrationsBuiltOn, integrationsConnect, type Integration } from "@/constants/landing";

/**
 * P07 — Integrations (position 7). Honest content only: the real infrastructure
 * Telebeli is built on (OpenAI/Twilio marks reused verbatim from the hero via
 * the shared BrandMark) and generically-stated connector categories — never an
 * invented third-party logo. RSC; per-card Reveal for the capped 40ms stagger.
 */
function IntegrationCard({ item, index }: { item: Integration; index: number }) {
  return (
    <Reveal
      role="listitem"
      delay={Math.min(index, STAGGER_CAP) * STAGGER_STEP}
      className={cn(surface({ interactive: true }), "flex h-full items-start gap-3 p-5")}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
        {item.mark ? (
          <BrandMark mark={item.mark} />
        ) : item.icon ? (
          <item.icon className="size-5 text-accent" aria-hidden />
        ) : null}
      </span>
      <div>
        <p className="text-base font-semibold text-foreground">{item.name}</p>
        <p className="mt-1 text-small leading-relaxed text-ink-muted">{item.description}</p>
      </div>
    </Reveal>
  );
}

function IntegrationGroup({ label, items }: { label: string; items: Integration[] }) {
  return (
    <div>
      <h3 className="text-label uppercase text-ink-faint">{label}</h3>
      <div role="list" className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <IntegrationCard key={item.name} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}

export function Integrations() {
  return (
    <section id="integrations" className="container-page scroll-mt-24 py-[var(--spacing-section)]">
      <SectionHeading
        eyebrow="INTEGRATIONS"
        title="Built on infrastructure you already trust"
        description="Telebeli runs on OpenAI and Twilio, and connects to the systems your team already uses — through standard, documented interfaces."
      />

      <div className="mt-14 space-y-10">
        <IntegrationGroup label="Built on" items={integrationsBuiltOn} />
        <IntegrationGroup label="Connects with" items={integrationsConnect} />
      </div>
    </section>
  );
}
