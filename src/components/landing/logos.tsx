import { BookOpen, Car, Cross, Home, Landmark, ShoppingBag } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion";

/**
 * Trusted-by row (landing-page-approved.png). Illustrative company lockups in
 * muted gray with sector icons, standing in for the poster industries (real
 * estate, healthcare, education, finance, automotive, retail). Not real
 * customers — the visible footnote keeps that honest until sourced client
 * logos exist (brand-playbook candor). RSC; the Stagger is the client leaf.
 */
const trustedCompanies = [
  { icon: Home, name: "REALTY", sub: "Group" },
  { icon: Cross, name: "MediCare", sub: "Health Services" },
  { icon: BookOpen, name: "EduBridge", sub: "International" },
  { icon: Landmark, name: "Finserve", sub: "Solutions" },
  { icon: Car, name: "AutoDrive", sub: "Car Solutions" },
  { icon: ShoppingBag, name: "QuickMart", sub: "Smart Retail" },
];

export function Logos() {
  return (
    <section
      aria-label="Trusted by businesses worldwide"
      className="container-page pb-[var(--spacing-section)]"
    >
      <p className="text-center text-label font-semibold uppercase tracking-[0.14em] text-accent">
        Trusted by businesses worldwide
      </p>
      <Stagger
        role="list"
        className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-7 text-ink-faint"
      >
        {trustedCompanies.map((company) => (
          <StaggerItem
            role="listitem"
            key={company.name}
            className="flex items-center gap-2.5 transition-colors duration-[var(--dur-fast)] hover:text-ink-muted motion-reduce:transition-none"
          >
            <company.icon className="size-6 shrink-0" aria-hidden />
            <span className="flex flex-col leading-none">
              <span className="text-base font-bold tracking-tight text-ink-muted">
                {company.name}
              </span>
              <span className="mt-0.5 text-[10px] uppercase tracking-[0.16em]">{company.sub}</span>
            </span>
          </StaggerItem>
        ))}
      </Stagger>
      <p className="mt-6 text-center text-xs text-ink-faint">
        Illustrative lockups for the industries we build for — not customer endorsements.
      </p>
    </section>
  );
}
