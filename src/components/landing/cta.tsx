import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Waveform } from "@/components/common/waveform";
import { FadeIn } from "@/components/motion";

export function Cta() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-[var(--spacing-section)]">
      <FadeIn>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center shadow-elevated">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-mesh opacity-80" />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-30">
            <Waveform bars={100} barClassName="bg-brand/30" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-h2 font-semibold tracking-tight md:text-h1">
              Put an AI agent on your phone lines this week
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lead text-muted-foreground">
              Start with 2,500 free minutes. No credit card, no sales call required.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/dashboard">
                  Start building free
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <Link href="#pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
