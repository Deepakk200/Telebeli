"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { bookDemoHref, mainNav, siteConfig } from "@/config/site";

/**
 * Approved sticky navigation (landing-page-approved.png): official logo lockup,
 * six-item primary menu (carets on Solutions/Resources), gradient "Book a Demo"
 * CTA. Client only for the scroll compaction + mobile sheet toggle.
 *
 * NOTE: /logo.png is the stacked, white-background official lockup; the approved
 * nav uses a horizontal transparent mark. Rendered here scoped to the light
 * marketing header — swap in a transparent horizontal asset when available.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  // Route links get the active state; hash links all share pathname "/".
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : !href.includes("#") && pathname === href;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NavCaret = ({ show }: { show?: boolean }) =>
    show ? <ChevronDown className="size-4 text-ink-faint" aria-hidden /> : null;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[background-color,border-color] duration-[var(--dur-base)] ease-[var(--ease-out-expo)] motion-reduce:transition-none",
        scrolled
          ? "border-border/60 bg-background/80 backdrop-blur-xl"
          : "border-transparent bg-background/0",
      )}
    >
      <a
        href="#hero"
        className="sr-only left-4 top-3 z-[60] rounded-md bg-card px-4 py-2 text-sm font-medium shadow-elevated ring-2 ring-ring focus:not-sr-only focus:absolute"
      >
        Skip to content
      </a>

      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={`${siteConfig.name} home`}
          className="inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Image
            src="/logo.png"
            alt={`${siteConfig.name} — ${siteConfig.tagline}`}
            width={180}
            height={52}
            priority
            className="h-11 w-auto object-contain"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive(item.href) ? "text-accent" : "text-ink-muted hover:text-foreground",
              )}
            >
              {item.title}
              <NavCaret show={"hasMenu" in item && item.hasMenu} />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="lg"
            className="hidden bg-gradient-brand text-white shadow-elevated hover:opacity-95 sm:inline-flex"
          >
            <Link href={bookDemoHref}>
              Book a Demo
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu" className="max-lg:size-11">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <nav aria-label="Mobile" className="mt-10 flex flex-col gap-1 px-4">
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-md px-3 py-3 text-base transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive(item.href) ? "text-accent" : "text-foreground",
                    )}
                  >
                    {item.title}
                    <NavCaret show={"hasMenu" in item && item.hasMenu} />
                  </Link>
                ))}
                <Button asChild size="lg" className="mt-6 bg-gradient-brand text-white">
                  <Link href={bookDemoHref} onClick={() => setOpen(false)}>
                    Book a Demo
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
