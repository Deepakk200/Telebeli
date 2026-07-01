import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Waveform } from "@/components/common/waveform";

/**
 * Above-the-fold hero. Entrance uses a pure-CSS animation (not JS motion) so the
 * LCP headline paints on first frame instead of waiting for hydration.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Signature mesh + grid backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-mesh" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklch, var(--border) 60%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--border) 60%, transparent) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-enter">
            <Link
              href="#platform"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-brand-accent" />
                <span className="relative inline-flex size-2 rounded-full bg-brand-accent" />
              </span>
              Live in 32 languages, 24/7
            </Link>
          </div>

          <h1
            className="animate-enter mt-6 text-balance text-h1 font-semibold tracking-tight md:text-display"
            style={{ animationDelay: "60ms" }}
          >
            AI voice agents that <span className="text-gradient-brand">answer every call</span>
          </h1>

          <p
            className="animate-enter mx-auto mt-6 max-w-2xl text-pretty text-lead text-muted-foreground"
            style={{ animationDelay: "120ms" }}
          >
            TeleBeli runs enterprise-grade voice agents on your phone lines — resolving support,
            booking, and outreach with sub-400ms responses, seamless human handoff, and every
            conversation logged.
          </p>

          <div
            className="animate-enter mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "180ms" }}
          >
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/dashboard">
                Start building free
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="#how-it-works">
                <PhoneCall className="size-4" />
                Hear a live demo
              </Link>
            </Button>
          </div>

          <p
            className="animate-enter mt-5 text-xs text-muted-foreground"
            style={{ animationDelay: "240ms" }}
          >
            No credit card · 2,500 free minutes · SOC 2 Type II
          </p>
        </div>

        {/* Live-call console featuring the waveform motif */}
        <div
          className="animate-enter mx-auto mt-16 max-w-4xl"
          style={{ animationDelay: "300ms" }}
        >
          <div className="rounded-2xl border border-border bg-card/70 p-2 shadow-floating backdrop-blur">
            <div className="rounded-xl border border-border/70 bg-background/60">
              <div className="flex items-center justify-between border-b border-border/70 px-5 py-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-full bg-brand/15 text-brand">
                    <PhoneCall className="size-4" />
                  </span>
                  <div className="text-left">
                    <p className="text-sm font-medium">Inbound · Support line</p>
                    <p className="font-mono text-xs text-muted-foreground">connected · 00:47</p>
                  </div>
                </div>
                <span className="rounded-full bg-brand-accent/15 px-2.5 py-1 font-mono text-xs text-brand-accent">
                  128ms
                </span>
              </div>

              <div className="grid gap-5 p-5 md:grid-cols-[1fr_auto] md:items-center">
                <div className="space-y-3 text-left text-sm">
                  <p className="w-fit rounded-2xl rounded-tl-sm bg-muted px-3.5 py-2 text-foreground/90">
                    Hi, I need to move my delivery to Thursday.
                  </p>
                  <p className="ml-auto w-fit rounded-2xl rounded-tr-sm bg-brand px-3.5 py-2 text-primary-foreground">
                    Done — order #40128 is now set for Thursday, 9am to noon. Anything else?
                  </p>
                </div>
                <div className="h-20 w-full md:w-56">
                  <Waveform bars={40} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
