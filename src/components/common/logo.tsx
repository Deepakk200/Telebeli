import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

/** TeleBeli wordmark with a compact voice-wave mark. */
export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 font-semibold tracking-tight",
        className,
      )}
      aria-label={`${siteConfig.name} home`}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-brand to-brand-2 shadow-glow/0">
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="none">
          {[4, 9, 14, 19].map((x, i) => (
            <rect
              key={x}
              x={x}
              y={[8, 4, 6, 9][i]}
              width="2"
              height={[8, 16, 12, 6][i]}
              rx="1"
              className="fill-white/95"
            />
          ))}
        </svg>
      </span>
      <span className="text-lg">{siteConfig.name}</span>
    </Link>
  );
}
