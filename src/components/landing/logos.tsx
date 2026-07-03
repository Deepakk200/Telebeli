import { BookOpen, Car, Cross, Home, Landmark, ShoppingBag } from "lucide-react";

/**
 * Trusted-by row (landing-page-approved.png). Illustrative company lockups in
 * muted gray with sector icons, standing in for the poster industries (real
 * estate, healthcare, education, finance, automotive, retail). Not real
 * customers — swap in sourced client logos when available (brand-playbook honesty).
 * Static RSC.
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
      <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 text-ink-faint">
        {trustedCompanies.map((company) => (
          <li key={company.name} className="flex items-center gap-2.5">
            <company.icon className="size-6 shrink-0" aria-hidden />
            <span className="flex flex-col leading-none">
              <span className="text-base font-bold tracking-tight text-ink-muted">
                {company.name}
              </span>
              <span className="mt-0.5 text-[10px] uppercase tracking-[0.16em]">{company.sub}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
