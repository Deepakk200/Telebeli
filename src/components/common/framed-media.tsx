import Image from "next/image";
import type { ReactNode } from "react";
import { surface } from "@/lib/surface";
import { cn } from "@/lib/utils";

type Frame = "plain" | "glass" | "elevated";

type FramedMediaProps = {
  src: string;
  /** Meaningful description for informative art; "" only for purely decorative use. */
  alt: string;
  /** Intrinsic pixel dimensions — required so next/image reserves space (no CLS) and never distorts. */
  width: number;
  height: number;
  priority?: boolean;
  /** plain = quiet hairline card · glass = blurred translucent frame · elevated = floating card + brand underglow. */
  frame?: Frame;
  caption?: ReactNode;
  className?: string;
  sizes?: string;
};

/*
 * Premium framed image (RSC). Wraps next/image in a token-based frame built from
 * surface() — never a hand-rolled shadow/border stack. The image keeps its
 * intrinsic aspect ratio (object-contain, w-full h-auto) so it can never
 * stretch; the frame's small padding lets the surface read as a border around
 * the art. Below-the-fold callers omit `priority`; only hero-level art sets it.
 */
const FRAME: Record<Frame, string> = {
  plain: surface({ elevation: "subtle" }),
  glass: surface({ tone: "glass", elevation: "floating" }),
  elevated: surface({ elevation: "floating" }),
};

export function FramedMedia({
  src,
  alt,
  width,
  height,
  priority = false,
  frame = "elevated",
  caption,
  className,
  sizes = "(min-width: 1024px) 40rem, 100vw",
}: FramedMediaProps) {
  return (
    <figure className={cn("relative isolate mx-auto w-full max-w-3xl", className)}>
      {frame === "elevated" && (
        // Decorative brand underglow beneath the card — depth, not a glow ring.
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-mesh opacity-40 blur-2xl"
        />
      )}
      <div className={cn(FRAME[frame], "overflow-hidden p-1.5")}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className="h-auto w-full rounded-md object-contain"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-small text-ink-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
