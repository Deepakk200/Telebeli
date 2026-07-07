"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/common/logo";
import { bookDemoHref, mainNav } from "@/config/site";

/**
 * Sticky glass navigation. Clean, conversion-focused menu, no dropdowns;
 * transparent on the hero, premium glass once scrolled. Mobile: a full-width
 * glass sheet under the bar with scroll lock, focus trap, and
 * Escape/outside/link-tap close.
 */

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Glass once scrolled past the hero's top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile sheet: lock scroll, focus first link, trap Tab, Escape close, restore focus.
  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      panelRef.current
        ? Array.from(panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"))
        : [];
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "Tab") {
        const f = focusables();
        if (!f.length) return;
        const first = f[0]!;
        const last = f[f.length - 1]!;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  const navLinks = (mobile: boolean) =>
    mainNav.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        onClick={mobile ? () => setOpen(false) : undefined}
        className={
          mobile
            ? "flex h-[52px] items-center border-b border-[rgba(15,23,42,0.06)] text-[16px] font-medium text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
            : "rounded-[8px] px-3 py-2 text-[14px] font-medium text-[#475569] transition-colors duration-[160ms] hover:bg-[rgba(15,23,42,0.05)] hover:text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2 motion-reduce:transition-none"
        }
      >
        {item.title}
      </Link>
    ));

  return (
    <header
      className={cn(
        "sticky top-0 z-[100] w-full border-b transition-[background-color,border-color,backdrop-filter] duration-200 motion-reduce:transition-none",
        scrolled
          ? "border-[rgba(15,23,42,0.08)] bg-white/[0.72] backdrop-blur-[12px]"
          : "border-transparent bg-transparent",
      )}
    >
      <a
        href="#hero"
        className="sr-only left-4 top-3 z-[110] rounded-md bg-white px-4 py-2 text-sm font-medium shadow-[0_8px_24px_-8px_rgba(15,23,42,0.25)] ring-2 ring-[#4F46E5] focus:not-sr-only focus:absolute"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 lg:h-16">
        <Logo href="/#hero" size="sm" />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navLinks(false)}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={bookDemoHref}
            className="hidden rounded-[10px] bg-[#4F46E5] px-[18px] py-2.5 text-[14px] font-semibold text-white transition-[background-color,transform] duration-[160ms] hover:-translate-y-px hover:bg-[#4338CA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:inline-flex"
          >
            Book a demo
          </Link>

          <button
            ref={triggerRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="flex size-11 items-center justify-center rounded-md text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] lg:hidden"
          >
            <span className="relative block h-4 w-6" aria-hidden>
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-6 rounded-full bg-current transition-all duration-200 motion-reduce:transition-none",
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-1",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-6 rounded-full bg-current transition-all duration-200 motion-reduce:transition-none",
                  open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-1",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile sheet — full-width, under the bar. */}
      {open ? (
        <>
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-x-0 bottom-0 top-14 z-[90] cursor-default lg:hidden"
          />
          <div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="absolute inset-x-0 top-full z-[95] border-b border-[rgba(15,23,42,0.08)] bg-white/[0.92] px-6 pb-4 backdrop-blur-[12px] [animation:tbn-sheet_160ms_ease-out] lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {navLinks(true)}
            </nav>
            <Link
              href={bookDemoHref}
              onClick={() => setOpen(false)}
              className="mt-4 flex h-12 w-full items-center justify-center rounded-[10px] bg-[#4F46E5] text-[15px] font-semibold text-white hover:bg-[#4338CA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
            >
              Book a demo
            </Link>
          </div>
          <style>{`@keyframes tbn-sheet { from { opacity: 0; transform: translateY(-8px) } to { opacity: 1; transform: none } }`}</style>
        </>
      ) : null}
    </header>
  );
}
