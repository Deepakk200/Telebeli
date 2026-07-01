"use client";

import { useEffect, useState } from "react";
import { Waveform } from "@/components/common/waveform";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const MIN = 1100; // minimum visible time (ms) so it reads as intentional
const MAX = 2600; // hard cap so it can never hang on a stalled asset
const WIPE = 700; // curtain-wipe duration (ms)

/**
 * First-load brand splash: waveform loader + 0→100 count-up + curtain-wipe
 * reveal. Mounted once as the first child of <body>, so it is server-rendered
 * into the initial HTML with no flash of page content behind it.
 */
export function Preloader() {
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);
  const [revealing, setRevealing] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;

    const ready = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });
    const fonts =
      (document as unknown as { fonts?: { ready: Promise<unknown> } }).fonts?.ready ??
      Promise.resolve();
    const minDelay = new Promise<void>((resolve) => setTimeout(resolve, reduced ? 0 : MIN));
    const cap = new Promise<void>((resolve) => setTimeout(resolve, MAX));

    const tick = () => {
      const t = Math.min(1, (performance.now() - start) / MIN);
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100)); // ease-out cubic
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    if (!reduced) raf = requestAnimationFrame(tick);

    let dismissTimer: ReturnType<typeof setTimeout>;
    Promise.race([Promise.all([ready, fonts, minDelay]), cap]).then(() => {
      setProgress(100);
      setRevealing(true);
      dismissTimer = setTimeout(() => setGone(true), reduced ? 0 : WIPE);
    });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(dismissTimer);
    };
  }, [reduced]);

  useEffect(() => {
    document.documentElement.classList.toggle("is-loading", !gone);
    return () => document.documentElement.classList.remove("is-loading");
  }, [gone]);

  if (gone) return null;

  return (
    <div
      role="status"
      aria-label="Loading TeleBeli"
      aria-hidden={revealing}
      data-reveal={revealing}
      className="preloader"
    >
      <div className="bg-mesh preloader__mesh" aria-hidden />
      <div className="preloader__inner">
        <div className="preloader__mark">
          <span className="preloader__dot" aria-hidden />
          <span>
            Tele<span className="text-gradient-brand">Beli</span>
          </span>
        </div>
        <div className="preloader__wave">
          <Waveform bars={44} barClassName="bg-brand-accent" />
        </div>
        <div className="preloader__count">{progress.toString().padStart(3, "0")}</div>
      </div>
    </div>
  );
}
