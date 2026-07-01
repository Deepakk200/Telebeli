"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Slim top progress bar for client-side navigations only. Distinct from the
 * first-load Preloader — it never replays the splash. Pure CSS transform, no deps.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const isFirst = useRef(true);
  const [scale, setScale] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false; // the first load is owned by the Preloader
      return;
    }
    // Start async (rAF) so the bar animates from 0, and to satisfy the
    // no-setState-in-effect-body rule.
    const raf = requestAnimationFrame(() => {
      setVisible(true);
      setScale(0.35);
    });
    const grow = setTimeout(() => setScale(0.75), 120);
    const finish = setTimeout(() => setScale(1), 320);
    const fade = setTimeout(() => setVisible(false), 520);
    const reset = setTimeout(() => setScale(0), 820);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(grow);
      clearTimeout(finish);
      clearTimeout(fade);
      clearTimeout(reset);
    };
  }, [pathname]);

  return (
    <div
      className="route-progress"
      style={{ transform: `scaleX(${scale})`, opacity: visible ? 1 : 0 }}
      aria-hidden
    />
  );
}
