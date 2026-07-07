import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BrandMark } from "./brand-marks";
import { HeroDashboard } from "./hero-dashboard";
import { PlayDemoCta } from "./play-demo-cta";
import { hero, heroTrustBadges } from "@/constants/landing";

const line2Words = hero.headline.line2.split(" ");
const gradientHead = line2Words.slice(0, -2).join(" ");
const gradientTail = line2Words.slice(-2).join(" ");

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div className="container-page grid gap-8 pb-14 pt-8 sm:gap-10 sm:pb-16 sm:pt-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-10 lg:pb-24 lg:pt-16 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* LEFT — content (DOM-first, before the mockup regardless of visual order).
            Paints statically: the headline is the LCP, so no opacity entrance gates it. */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-accent/20 bg-accent-wash px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.06em] text-accent sm:px-3.5 sm:text-label sm:tracking-[0.08em]">
            {hero.eyebrow}
          </span>

          <h1
            id="hero-heading"
            className="mt-5 max-w-[22rem] text-balance text-[1.85rem] font-bold leading-[1.08] tracking-[-0.01em] sm:mt-6 sm:max-w-none sm:text-display"
          >
            {hero.headline.line1}
            <br />
            {/* Comp-exact wrap: the gradient phrase breaks before its last two
                words ("…For / Your Business"), never after the penultimate one. */}
            <span className="text-gradient-brand">
              {gradientHead} <span className="whitespace-nowrap">{gradientTail}</span>
            </span>
          </h1>

          <p className="mt-5 max-w-[21rem] text-pretty text-[1rem] leading-7 text-ink-muted sm:mt-6 sm:max-w-xl sm:text-lead">{hero.subhead}</p>

          {/* CTAs — one primary (gradient) + outline secondary with a play badge. */}
          <div className="mt-7 flex w-full max-w-[21rem] flex-col gap-2.5 sm:mt-8 sm:max-w-none min-[480px]:w-auto min-[480px]:flex-row min-[480px]:items-center">
            <Button asChild size="lg" variant="gradient" className="h-11 w-full px-5 text-sm sm:h-12 sm:px-6 min-[480px]:w-auto">
              <Link href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <PlayDemoCta href={hero.secondaryCta.href} label={hero.secondaryCta.label} />
          </div>

          {/* Trust row — recognized infrastructure + a security signal. */}
          <ul className="mt-8 grid w-full max-w-[22rem] grid-cols-3 items-start justify-items-center gap-2 sm:mt-10 sm:max-w-none sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-5 sm:gap-y-4 lg:justify-start">
            {heroTrustBadges.map((badge, i) => (
              <li key={badge.name} className="flex min-w-0 items-center gap-2 sm:gap-5">
                {i > 0 ? <span aria-hidden className="hidden h-9 w-px bg-border sm:block" /> : null}
                <span className="flex min-w-0 items-center gap-1.5 sm:gap-2.5">
                  <BrandMark mark={badge.mark} />
                  <span className="flex min-w-0 flex-col leading-tight">
                    <span className="truncate text-[0.58rem] text-ink-faint sm:text-xs">{badge.lead}</span>
                    <span className="truncate text-[0.72rem] font-semibold text-foreground sm:text-sm">{badge.name}</span>
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT — product dashboard mockup (P007 shell; P008–P013 fill it). */}
        <div className="w-full overflow-visible lg:justify-self-end">
          <HeroDashboard />
        </div>
      </div>
    </section>
  );
}
