"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SolutionsMobile, SolutionsPanel } from "./solutions-menu";
import { Logo } from "@/components/common/logo";
import { bookDemoHref, mainNav } from "@/config/site";

/**
 * Approved sticky navigation (landing-page-approved.png): official logo lockup,
 * six-item primary menu, gradient "Book a Demo" CTA. Client for scroll
 * compaction + mobile sheet toggle. P18 adds the Solutions mega menu — an inline
 * Radix NavigationMenu on desktop and a Sheet accordion on mobile; every other
 * nav item and behaviour (skip link, one CTA, active states) is unchanged.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
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
        <Logo size="md" showTagline />

        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {mainNav.map((item) =>
            item.title === "Solutions" ? (
              <NavigationMenu
                key={item.href}
                viewport={false}
                aria-label="Solutions"
                className="max-w-none flex-none"
              >
                <NavigationMenuList className="gap-0">
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-auto gap-1 rounded-md bg-transparent px-3 py-2 text-sm font-medium text-ink-muted hover:bg-transparent hover:text-foreground focus:bg-transparent focus:text-foreground data-[state=open]:bg-transparent data-[state=open]:text-foreground data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent">
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="left-1/2 w-[min(46rem,calc(100vw-3rem))] -translate-x-1/2 rounded-lg border border-border bg-card p-0 shadow-floating md:w-[min(46rem,calc(100vw-3rem))]">
                      <SolutionsPanel />
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ) : (
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
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="lg" variant="gradient" className="hidden sm:inline-flex">
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
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <nav aria-label="Mobile" className="mt-10 flex flex-col gap-1 px-4">
                {mainNav.map((item) =>
                  item.title === "Solutions" ? (
                    <Accordion key={item.href} type="single" collapsible>
                      <AccordionItem value="solutions" className="border-none">
                        <AccordionTrigger className="rounded-md px-3 py-3 text-base font-normal text-foreground hover:bg-muted hover:no-underline">
                          {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="pb-0">
                          <SolutionsMobile onNavigate={() => setOpen(false)} />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
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
                  ),
                )}
                <Button asChild size="lg" variant="gradient" className="mt-6">
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
