"use client";

import { useState } from "react";
import { surface } from "@/lib/surface";
import { cn } from "@/lib/utils";
import { pricingTiers } from "@/constants/landing";

// Rates read from the published tiers so the estimate never drifts from pricing.
// [verify] confirm the volume threshold for the Growth rate.
const STARTER_RATE = Number(pricingTiers[0]?.price.replace("$", "")) || 0.09;
const GROWTH_RATE = Number(pricingTiers[1]?.price.replace("$", "")) || 0.06;
const GROWTH_THRESHOLD = 2500;

function rateFor(minutes: number): number {
  return minutes > GROWTH_THRESHOLD ? GROWTH_RATE : STARTER_RATE;
}

export function PricingCalculator() {
  const [minutes, setMinutes] = useState(50_000);
  const [concurrency, setConcurrency] = useState(20);

  const rate = rateFor(minutes);
  const monthly = minutes * rate;
  const estimate = monthly.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <div className={cn(surface({ elevation: "elevated" }), "mx-auto mb-12 max-w-2xl p-6 sm:p-8")}>
      <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="space-y-6">
          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="minutes" className="text-sm font-medium">
                Monthly minutes
              </label>
              <span className="font-mono text-sm tabular-nums text-muted-foreground">
                {minutes.toLocaleString("en-US")}
              </span>
            </div>
            <input
              id="minutes"
              type="range"
              min={1000}
              max={500_000}
              step={1000}
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              className="mt-2 w-full accent-[var(--brand)]"
            />
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="concurrency" className="text-sm font-medium">
                Peak concurrent calls
              </label>
              <span className="font-mono text-sm tabular-nums text-muted-foreground">
                {concurrency}
              </span>
            </div>
            <input
              id="concurrency"
              type="range"
              min={1}
              max={200}
              step={1}
              value={concurrency}
              onChange={(e) => setConcurrency(Number(e.target.value))}
              className="mt-2 w-full accent-[var(--brand)]"
            />
          </div>
        </div>

        <div className="text-center sm:border-l sm:border-border sm:pl-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Estimated / month
          </p>
          <p
            className="mt-1 font-mono text-h2 font-semibold tracking-tight tabular-nums text-gradient-brand"
            aria-live="polite"
          >
            {estimate}
          </p>
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            ${rate.toFixed(2)}/min · billed by the second
          </p>
        </div>
      </div>

      <p className="mt-6 border-t border-border pt-4 text-center text-sm text-muted-foreground">
        One number, everything included — no per-seat fees, no charge for idle capacity.
      </p>
    </div>
  );
}
