import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Waveform } from "@/components/common/waveform";
import { FadeIn } from "@/components/motion";
import { CtaCapture } from "./cta-capture";
import { finalCta } from "@/constants/landing";

/**
 * P13 — the invitation (spec §12). Calm and centered: one focal ask that reaches
 * a human (primary), a quiet "watch a real call" that scrolls to the workflow
 * demo, and a low-pressure capture so no one is a dead end. RSC wrapper; only the
 * capture is a client island. The waveform is held static (no idle loop).
 */
export function Cta() {
  return (
    <section id="get-started" className="container-page scroll-mt-24 py-[var(--spacing-section)]">
      <FadeIn>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center shadow-elevated">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-mesh opacity-80" />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-30">
            <Waveform bars={100} barClassName="bg-brand/30" animated={false} />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-h2 font-semibold tracking-tight md:text-h1">
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lead text-ink-muted">{finalCta.description}</p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href={finalCta.primary.href}>
                  {finalCta.primary.label}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                <Link href={finalCta.secondary.href}>
                  <Play className="size-4 fill-current" aria-hidden />
                  {finalCta.secondary.label}
                </Link>
              </Button>
            </div>

            <CtaCapture />
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
