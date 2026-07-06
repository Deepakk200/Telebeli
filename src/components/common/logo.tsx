import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

/*
 * Approved brand lockup (landing-page-approved.png): gradient speech-bubble
 * headset mark + two-tone wordmark ("Tele" ink / "beli" gradient) + optional
 * "AI takes calls. You grow." tagline. Inline SVG + live text — crisp at any
 * size, zero image request, theme-aware (ink adapts; the gradient stays brand).
 */

const [taglineLead, taglineAccent] = ["AI takes calls.", "You grow."];

/** Just the mark — for tight spots (dashboard mockup sidebar, favicons-in-UI). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden
      className={cn("h-8 w-8 shrink-0", className)}
      fill="none"
    >
      <defs>
        <linearGradient
          id="tb-mark-gradient"
          gradientUnits="userSpaceOnUse"
          x1="3"
          y1="4"
          x2="29"
          y2="28"
        >
          <stop offset="0" stopColor="var(--gradient-from)" />
          <stop offset="1" stopColor="var(--gradient-to)" />
        </linearGradient>
      </defs>
      {/* Speech bubble: circle + tail, one fill so the gradient reads as one shape. */}
      <path
        fill="url(#tb-mark-gradient)"
        d="M16 2.5c7.18 0 13 5.6 13 12.5s-5.82 12.5-13 12.5c-1.6 0-3.13-.28-4.55-.78L4.3 29.7a.9.9 0 0 1-1.17-1.1l1.8-5.53A12.1 12.1 0 0 1 3 15C3 8.1 8.82 2.5 16 2.5Z"
      />
      <path
        d="M10.4 15.6v-1.4a5.6 5.6 0 0 1 11.2 0v1.4"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="8.6" y="14.6" width="3.4" height="5.6" rx="1.7" fill="white" />
      <rect x="20" y="14.6" width="3.4" height="5.6" rx="1.7" fill="white" />
      <path
        d="M21.7 20.6v.4a3.4 3.4 0 0 1-3.4 3.2h-1.1"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="16.4" cy="24.2" r="1.3" fill="white" />
    </svg>
  );
}

/**
 * Full lockup. `size="sm"` is the compact dashboard/footer default; `size="md"`
 * is the marketing header scale (~44px tall with tagline). The wordmark is real
 * selectable text; the tagline hides below `sm` so the lockup fits at 320px.
 */
export function Logo({
  className,
  href = "/",
  size = "sm",
  showTagline = false,
}: {
  className?: string;
  href?: string;
  size?: "sm" | "md";
  showTagline?: boolean;
}) {
  const md = size === "md";
  return (
    <Link
      href={href}
      aria-label={`${siteConfig.name} home`}
      className={cn(
        "group inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        md ? "gap-2.5" : "gap-2",
        className,
      )}
    >
      <LogoMark
        className={cn(
          "transition-opacity duration-[var(--dur-fast)] group-hover:opacity-90 motion-reduce:transition-none",
          md ? "h-10 w-10" : "h-8 w-8",
        )}
      />
      <span className="flex flex-col justify-center">
        <span
          className={cn(
            "font-display font-semibold leading-none tracking-tight text-ink",
            md ? "text-2xl" : "text-lg",
          )}
        >
          {siteConfig.name.slice(0, 4)}
          <span className="text-gradient-brand">{siteConfig.name.slice(4)}</span>
        </span>
        {showTagline && (
          <span className="mt-1 hidden text-[0.5rem] font-semibold uppercase leading-none tracking-[0.18em] text-ink-muted sm:block">
            {taglineLead} <span className="text-accent">{taglineAccent}</span>
          </span>
        )}
      </span>
    </Link>
  );
}
