import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BrandMark } from "./brand-marks";
import { HeroDashboard } from "./hero-dashboard";
import { hero, heroTrustBadges } from "@/constants/landing";

const line2Words = hero.headline.line2.split(" ");
const gradientHead = line2Words.slice(0, -2).join(" ");
const gradientTail = line2Words.slice(-2).join(" ");

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div className="container-page grid gap-10 pb-16 pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14 lg:pb-24 lg:pt-16">
        {/* LEFT — content (DOM-first, before the mockup regardless of visual order).
            Paints statically: the headline is the LCP, so no opacity entrance gates it. */}
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-wash px-3.5 py-1.5 text-label font-semibold uppercase tracking-[0.08em] text-accent">
            <Sparkles className="size-3.5" aria-hidden />
            {hero.eyebrow}
          </span>

          <h1 id="hero-heading" className="mt-6 text-balance text-display">
            {hero.headline.line1}
            <br />
            {/* Comp-exact wrap: the gradient phrase breaks before its last two
                words ("…For / Your Business"), never after the penultimate one. */}
            <span className="text-gradient-brand">
              {gradientHead} <span className="whitespace-nowrap">{gradientTail}</span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lead text-ink-muted">{hero.subhead}</p>

          {/* CTAs — one primary (gradient) + outline secondary with a play badge. */}
          <div className="mt-8 flex w-full flex-col gap-3 min-[480px]:w-auto min-[480px]:flex-row min-[480px]:items-center">
            <Button asChild size="lg" variant="gradient" className="w-full min-[480px]:w-auto">
              <Link href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="w-full min-[480px]:w-auto">
              <Link href={hero.secondaryCta.href}>
                <span className="flex size-6 items-center justify-center rounded-full bg-gradient-brand text-white">
                  <Play className="size-3 fill-current" aria-hidden />
                </span>
                {hero.secondaryCta.label}
              </Link>
            </Button>
          </div>

          {/* Trust row — recognized infrastructure + a security signal. */}
          <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            {heroTrustBadges.map((badge, i) => (
              <li key={badge.name} className="flex items-center gap-6">
                {i > 0 ? <span aria-hidden className="hidden h-9 w-px bg-border sm:block" /> : null}
                <span className="flex items-center gap-2.5">
                  <BrandMark mark={badge.mark} />
                  <span className="flex flex-col leading-tight">
                    <span className="text-xs text-ink-faint">{badge.lead}</span>
                    <span className="text-sm font-semibold text-foreground">{badge.name}</span>
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT — product dashboard mockup (P007 shell; P008–P013 fill it). */}
        <div className="w-full lg:justify-self-end">
          <HeroDashboard />
        </div>
      </div>
    </section>
  );
}
