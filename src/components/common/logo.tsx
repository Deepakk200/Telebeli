import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/logo.png";

/** Compact logo asset for tight spots (dashboard mockup sidebar, favicons-in-UI). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative block size-8 shrink-0 overflow-hidden", className)} aria-hidden>
      <Image
        src={LOGO_SRC}
        alt=""
        width={1536}
        height={1024}
        priority
        className="absolute left-1/2 top-[56%] h-[175%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-contain"
      />
    </span>
  );
}

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
        "group inline-flex items-center gap-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <LogoMark
        className={cn(
          "transition-opacity duration-[var(--dur-fast)] group-hover:opacity-90 motion-reduce:transition-none",
          md ? "size-10" : showTagline ? "size-9" : "size-9",
        )}
      />
      <span
        className={cn(
          "font-display font-bold leading-none tracking-normal text-foreground",
          md ? "text-xl" : "text-lg",
        )}
      >
        Tele<span className="text-accent">beli</span>
      </span>
    </Link>
  );
}
