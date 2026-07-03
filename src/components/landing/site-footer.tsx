import Link from "next/link";
import { Logo } from "@/components/common/logo";
import { siteConfig } from "@/config/site";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Platform", href: "/#platform" },
      { label: "Pricing", href: "/#pricing" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: `mailto:${siteConfig.email}` },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "/security" },
      { label: "DPA", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Enterprise AI voice agents that answer every call, 24/7.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="font-mono text-xs">SOC 2 Type II · HIPAA · GDPR</p>
        </div>
      </div>
    </footer>
  );
}
