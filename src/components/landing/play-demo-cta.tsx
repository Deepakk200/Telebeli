"use client";

import Link from "next/link";
import { Play } from "lucide-react";

import { Button } from "@/components/ui/button";

/** Custom event the hero CTA fires and the demo player listens for. */
export const PLAY_DEMO_EVENT = "telebeli:play-demo";

/**
 * Hero "See How It Works" CTA. A client island so the hero stays a Server
 * Component (it holds the LCP). The Link's href scrolls to the demo section;
 * the click also fires PLAY_DEMO_EVENT so the player starts — dispatched
 * synchronously inside the click so play() runs within the user gesture and
 * isn't blocked by the browser's autoplay policy.
 */
export function PlayDemoCta({ href, label }: { href: string; label: string }) {
  return (
    <Button
      asChild
      size="lg"
      variant="secondary"
      className="h-11 w-full px-5 text-sm sm:h-12 sm:px-6 min-[480px]:w-auto"
    >
      <Link href={href} onClick={() => window.dispatchEvent(new CustomEvent(PLAY_DEMO_EVENT))}>
        <span className="flex size-5 items-center justify-center rounded-full bg-gradient-brand text-white sm:size-6">
          <Play className="size-3 fill-current" aria-hidden />
        </span>
        {label}
      </Link>
    </Button>
  );
}
