import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiveConsole } from "./live-console";

/**
 * Above-the-fold hero. Leads on the memory-test claim ("voice AI you can see
 * working") + reliability — never latency or voice fidelity (see non-goals).
 * Entrance uses a pure-CSS animation so the LCP headline paints without waiting
 * for hydration.
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
              href="#live"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-brand-accent" />
                <span className="relative inline-flex size-2 rounded-full bg-brand-accent" />
              </span>
              Watch a call resolve, live
            </Link>
          </div>

          <h1
            className="animate-enter mt-6 text-balance text-h1 font-semibold tracking-tight md:text-display"
            style={{ animationDelay: "60ms" }}
          >
            Voice AI you can <span className="text-gradient-brand">watch working</span>
          </h1>

          <p
            className="animate-enter mx-auto mt-6 max-w-2xl text-pretty text-lead text-muted-foreground"
            style={{ animationDelay: "120ms" }}
          >
            TeleBeli runs enterprise voice agents on your phone lines and shows you every call as it
            happens — resolving on their own, escalating to a human when they should, and never
            failing in silence.
          </p>

          <div
            className="animate-enter mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "180ms" }}
          >
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/dashboard">
                Start free
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="#live">
                <Play className="size-4" />
                See it live
              </Link>
            </Button>
          </div>

          {/* [verify] SOC 2 Type II status before publishing as fact. */}
          <p
            className="animate-enter mt-5 text-xs text-muted-foreground"
            style={{ animationDelay: "240ms" }}
          >
            No credit card · Self-serve in a day · SOC 2 Type II
          </p>
        </div>

        <div
          id="live"
          className="animate-enter mx-auto mt-16 max-w-4xl scroll-mt-24"
          style={{ animationDelay: "300ms" }}
        >
          <LiveConsole />
        </div>
      </div>
    </section>
  );
}
