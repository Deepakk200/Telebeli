import { cn } from "@/lib/utils";

type WaveformProps = {
  bars?: number;
  className?: string;
  barClassName?: string;
  /** Render static (no animation) — used for decorative dividers. */
  animated?: boolean;
};

/**
 * The signature TeleBeli motif: a live voice waveform.
 * Server component, pure-CSS animation (no client JS, no layout shift).
 * Bar heights are deterministic so SSR and client agree.
 */
export function Waveform({
  bars = 56,
  className,
  barClassName,
  animated = true,
}: WaveformProps) {
  const items = Array.from({ length: bars }, (_, i) => {
    // Symmetric, organic profile via layered sines.
    const t = i / (bars - 1);
    const envelope = Math.sin(t * Math.PI); // taper at edges
    const detail = 0.55 + 0.45 * Math.abs(Math.sin(t * Math.PI * 6 + 1.2));
    const height = Math.max(0.12, envelope * detail);
    // toFixed keeps the SSR and client strings identical (full floats hydration-mismatch).
    const delay = `${((Math.sin(t * Math.PI * 4) * 0.5 + 0.5) * -1.4).toFixed(3)}s`;
    return { height, delay };
  });

  return (
    <div
      aria-hidden
      className={cn(
        "flex h-full w-full items-center justify-center gap-[3px] overflow-hidden",
        className,
      )}
    >
      {items.map((bar, i) => (
        <span
          key={i}
          className={cn(
            "w-[3px] shrink-0 rounded-full bg-brand/70",
            animated && "animate-wave",
            barClassName,
          )}
          style={{
            height: `${Math.round(bar.height * 100)}%`,
            animationDelay: bar.delay,
          }}
        />
      ))}
    </div>
  );
}
