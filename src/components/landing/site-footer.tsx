import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Status } from "@/components/ui/status";
import { bookDemoHref, siteConfig } from "@/config/site";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Platform", href: "/#capabilities" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Security", href: "/security" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "How it works", href: "/#lifecycle" },
      { label: "Industries", href: "/#industries" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact", href: `mailto:${siteConfig.email}` },
      { label: "Book a demo", href: bookDemoHref },
      { label: "LinkedIn", href: siteConfig.links.linkedin },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[60] bg-[#050608] pt-16 text-white sm:pt-24">
      <div className="w-full rounded-t-[2rem] bg-white pb-12 pt-16 text-[#050608] sm:rounded-t-[4rem] sm:py-16">
        <div className="container-page">
          <div className="grid gap-10 border-b border-black/10 pb-12 xl:grid-cols-[minmax(0,1fr)_26rem] xl:items-center">
            <h2 className="max-w-full text-[clamp(4.5rem,12vw,10.5rem)] font-black uppercase leading-[0.82] tracking-normal">
              TELEBELI
            </h2>
            <div className="max-w-md xl:justify-self-end">
              <p className="text-balance text-2xl font-semibold leading-tight text-black/70">
                Your AI calling agent, fully set up for your business.
              </p>
              <Link
                href={bookDemoHref}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Book a demo
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>

          <div className="grid gap-10 border-b border-black/10 py-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <p className="text-xl font-extrabold uppercase tracking-normal">TELIBELI</p>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-black/60">
                Enterprise voice AI you can watch, score, and prove.
              </p>
              <p className="mt-5 text-base text-black/60">{siteConfig.email}</p>
            </div>

            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/60">
                  {col.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-7 items-center rounded-sm text-base font-medium text-black/70 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-8 text-sm font-medium text-black/60 sm:flex-row sm:items-center sm:justify-between">
            <p>
              {siteConfig.name} © {year} — An initiative of {siteConfig.parent}
            </p>
            <Link
              href="/security"
              className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <Status state="resolved">All systems operational</Status>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
