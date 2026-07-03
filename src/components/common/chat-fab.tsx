import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { bookDemoHref } from "@/config/site";

/**
 * Floating chat button (landing-page-approved.png), fixed bottom-right. No real
 * chat panel exists yet, so it is an honest link to the demo contact rather than
 * a button that opens nothing — which keeps it RSC (no client JS) and avoids a
 * false affordance. ≥44px, labelled, keyboard-operable, focus-visible.
 */
export function ChatFAB() {
  return (
    <Link
      href={bookDemoHref}
      aria-label="Open chat"
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-gradient-brand text-white shadow-floating transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
    >
      <MessageCircle className="size-6" aria-hidden />
    </Link>
  );
}
