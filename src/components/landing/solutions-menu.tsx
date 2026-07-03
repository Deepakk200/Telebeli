"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { solutionsMenu, type SolutionsLeaf } from "@/config/site";

/**
 * P18 — Solutions mega-menu content, defined once and shared by the desktop
 * panel (Radix NavigationMenu) and the mobile Sheet accordion. Original TeleBeli
 * composition on the approved tokens — not a reproduction of any reference menu.
 * "live" leaves are real links; "soon" leaves render as non-interactive labels
 * (the no-dead-link candor rule) — never a bare "#".
 */
const SoonBadge = () => (
  <span className="rounded-full border border-border px-1.5 py-px text-[10px] font-medium uppercase tracking-wide text-ink-faint">
    Soon
  </span>
);

function DesktopLeaf({ leaf }: { leaf: SolutionsLeaf }) {
  if (leaf.status === "soon" || !leaf.href) {
    return (
      <span className="flex items-center gap-2 rounded-md px-2 py-1.5 text-small text-ink-faint">
        {leaf.label}
        <SoonBadge />
      </span>
    );
  }
  return (
    <NavigationMenuLink asChild>
      <Link
        href={leaf.href}
        className="block rounded-md px-2 py-1.5 text-small text-ink-muted transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {leaf.label}
      </Link>
    </NavigationMenuLink>
  );
}

/** Desktop: four categorized columns + a secondary spotlight rail (not a CTA). */
export function SolutionsPanel() {
  return (
    <div className="p-5">
      <div className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-4">
        {solutionsMenu.map((category) => (
          <div
            key={category.title}
            className="min-w-0 md:border-l md:border-border md:pl-4 md:first:border-l-0 md:first:pl-0"
          >
            <p className="mb-2 px-2 text-label uppercase tracking-[0.08em] text-ink-faint">
              {category.title}
            </p>
            <ul className="space-y-0.5">
              {category.items.map((leaf) => (
                <li key={leaf.label}>
                  <DesktopLeaf leaf={leaf} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col items-start justify-between gap-3 rounded-lg border border-border bg-accent-wash/50 p-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-label uppercase tracking-[0.08em] text-accent">See it work</p>
          <p className="mt-1 text-small text-ink-muted">
            Watch a real call resolve, then hand off to a human — the whole workflow in under a
            minute.
          </p>
        </div>
        <NavigationMenuLink asChild>
          <Link
            href="/#workflow"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md text-small font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Play className="size-4 fill-current" aria-hidden />
            Watch a real call
          </Link>
        </NavigationMenuLink>
      </div>
    </div>
  );
}

/** Mobile: same data, single column, inside the Sheet accordion. */
export function SolutionsMobile({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="space-y-4 px-1 pb-2">
      {solutionsMenu.map((category) => (
        <div key={category.title}>
          <p className="px-2 text-label uppercase tracking-[0.08em] text-ink-faint">
            {category.title}
          </p>
          <ul className="mt-1">
            {category.items.map((leaf) =>
              leaf.status === "soon" || !leaf.href ? (
                <li key={leaf.label}>
                  <span className="flex min-h-11 items-center gap-2 px-2 text-sm text-ink-faint">
                    {leaf.label}
                    <SoonBadge />
                  </span>
                </li>
              ) : (
                <li key={leaf.label}>
                  <Link
                    href={leaf.href}
                    onClick={onNavigate}
                    className="flex min-h-11 items-center rounded-md px-2 text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {leaf.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
