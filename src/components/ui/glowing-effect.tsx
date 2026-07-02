"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { animate } from "motion/react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

/**
 * Pointer-tracking conic-gradient border glow (Aceternity-style), adapted to
 * the Signal theme. Renders nothing under prefers-reduced-motion or on coarse
 * pointers (the effect is pointer-driven; phones get no payoff for the cost).
 * Updates CSS variables per frame via rAF — no React state per frame.
 */
export const GlowingEffect = memo(function GlowingEffect({
  blur = 0,
  inactiveZone = 0.7,
  proximity = 0,
  spread = 20,
  className,
  movementDuration = 2,
  borderWidth = 1,
  disabled = false,
}: GlowingEffectProps) {
  const reduced = usePrefersReducedMotion();
  const [coarse, setCoarse] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const off = disabled || reduced || coarse;

  const handleMove = useCallback(
    (e?: PointerEvent | { x: number; y: number }) => {
      if (!containerRef.current) return;
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const el = containerRef.current;
        if (!el) return;
        const { left, top, width, height } = el.getBoundingClientRect();
        const x = e?.x ?? lastPosition.current.x;
        const y = e?.y ?? lastPosition.current.y;
        if (e) lastPosition.current = { x, y };

        const cx = left + width * 0.5;
        const cy = top + height * 0.5;
        if (Math.hypot(x - cx, y - cy) < 0.5 * Math.min(width, height) * inactiveZone) {
          el.style.setProperty("--active", "0");
          return;
        }

        const isActive =
          x > left - proximity &&
          x < left + width + proximity &&
          y > top - proximity &&
          y < top + height + proximity;
        el.style.setProperty("--active", isActive ? "1" : "0");
        if (!isActive) return;

        const current = parseFloat(el.style.getPropertyValue("--start")) || 0;
        const target = (180 * Math.atan2(y - cy, x - cx)) / Math.PI + 90;
        const next = current + (((target - current + 180) % 360) - 180);
        animate(current, next, {
          duration: movementDuration,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (v) => el.style.setProperty("--start", String(v)),
        });
      });
    },
    [inactiveZone, proximity, movementDuration],
  );

  useEffect(() => {
    if (off) return;
    const onScroll = () => handleMove();
    const onPointer = (e: PointerEvent) => handleMove(e);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.body.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", onScroll);
      document.body.removeEventListener("pointermove", onPointer);
    };
  }, [handleMove, off]);

  if (off) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden
      style={
        {
          "--blur": `${blur}px`,
          "--spread": spread,
          "--start": "0",
          "--active": "0",
          "--ge-bw": `${borderWidth}px`,
          // Signal-branded gradient — indigo → cyan → violet, from theme tokens only.
          "--gradient": `
            radial-gradient(circle at 30% 30%, color-mix(in oklch, var(--brand) 55%, transparent) 8%, transparent 22%),
            radial-gradient(circle at 70% 65%, color-mix(in oklch, var(--brand-accent) 50%, transparent) 8%, transparent 22%),
            repeating-conic-gradient(
              from 236deg at 50% 50%,
              var(--brand) 0%,
              var(--brand-accent) calc(25% / 5),
              var(--brand-2) calc(50% / 5),
              var(--brand-accent) calc(75% / 5),
              var(--brand) calc(100% / 5)
            )`,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        blur > 0 && "blur-[var(--blur)]",
        className,
      )}
    >
      <div
        className={cn(
          "rounded-[inherit]",
          'after:content-[""] after:absolute after:rounded-[inherit] after:inset-[calc(-1*var(--ge-bw))]',
          "after:[border:var(--ge-bw)_solid_transparent]",
          "after:[background:var(--gradient)] after:[background-attachment:fixed]",
          "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
          "after:[mask-clip:padding-box,border-box] after:[mask-composite:intersect]",
          "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]",
        )}
      />
    </div>
  );
});
