import Link from "next/link";
import { Logo } from "@/components/common/logo";
import { Status } from "@/components/ui/status";
import { bookDemoHref, siteConfig } from "@/config/site";

/**
 * P14 — audited footer (spec §13). Every link resolves to a real route or an
 * on-page section id — no "#" dead ends (Privacy/Terms/DPA were removed rather
 * than left dead, since those pages don't exist yet). Sagenex parentage and an
 * honest status signal are present; the old "SOC 2 · HIPAA · GDPR" strip was
 * removed as it implied held certifications (see the security candor panel).
 * RSC, tokens-only, labelled nav lists.
 */
const columns = [
  {
    title: "Product",
    links: [
      { label: "Platform", href: "/#capabilities" },
      { label: "Capabilities", href: "/#capabilities" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "How it works", href: "/#lifecycle" },
      { label: "Integrations", href: "/#integrations" },
      { label: "Industries", href: "/#industries" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Security", href: "/security" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: `mailto:${siteConfig.email}` },
      { label: "Book a demo", href: bookDemoHref },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div>
            <Logo showTagline />
            <p className="mt-4 max-w-xs text-sm text-ink-muted">
              Enterprise voice AI you can watch, score, and prove.
            </p>
            <p className="mt-4 text-xs text-ink-faint">
              {siteConfig.name} — an initiative of {siteConfig.parent}.
            </p>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-sm font-semibold text-foreground">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-9 items-center rounded-sm text-sm text-ink-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-sm text-ink-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <Link
            href="/security"
            className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Status state="resolved">All systems operational</Status>
          </Link>
        </div>
      </div>
    </footer>
  );
}
