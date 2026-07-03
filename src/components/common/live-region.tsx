"use client";

import { useCallback, useState, type ReactNode } from "react";

/**
 * The canonical screen-reader announcer: one visually-hidden polite live
 * region + an announce() function. Render `liveRegion` once per client island
 * and call announce() for updates — never hand-roll another inline announcer.
 * Used by the live console and the dashboard centerpiece.
 */
export function useAnnounce(): {
  announce: (message: string) => void;
  liveRegion: ReactNode;
} {
  const [message, setMessage] = useState("");
  const announce = useCallback((text: string) => setMessage(text), []);
  return {
    announce,
    liveRegion: (
      <p aria-live="polite" className="sr-only">
        {message}
      </p>
    ),
  };
}
