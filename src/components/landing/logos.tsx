import type { CSSProperties } from "react";
import { SectionHeading } from "./section-heading";
import { trust } from "@/constants/landing";

/**
 * P14 — Trust marquee. Honest by construction: two real entities only —
 * Sagenex (Telebeli's parent, framed as backing) and Ecoleaf (a customer) —
 * presented as text wordmarks, so no logo is ever fabricated or guessed. Calm
 * left→right CSS drift; RSC, zero client JS (pause-on-hover/focus is pure CSS).
 *
 * Seamless loop: the track is two identical halves; the keyframe translates
 * -50% → 0, landing on an identical frame each cycle. Each half repeats the pair
 * enough times to overflow the widest viewport, so several wordmarks are always
 * visible and the repetition reads as rhythm, not a two-item blink.
 *
 * Accessibility: the animated marquee is decorative (aria-hidden) and hidden
 * under reduced motion; a static two-up lockup takes its place there. An
 * sr-only list names each entity once while the marquee plays, so assistive
 * tech announces "Sagenex" and "Ecoleaf" exactly once in either mode.
 */
const HALF_REPEATS = 8;

function Wordmark({ name, label }: { name: string; label: string }) {
  return (
    <span className="flex shrink-0 items-baseline gap-2.5">
      <span className="font-display text-2xl font-semibold tracking-tight text-ink-muted transition-colors duration-[var(--dur-fast)] hover:text-foreground motion-reduce:transition-none">
        {name}
      </span>
      <span className="text-label font-semibold uppercase tracking-[0.14em] text-ink-faint">
        {label}
      </span>
    </span>
  );
}

export function Logos() {
  const half = Array.from({ length: HALF_REPEATS }, () => trust.entities).flat();
  const track = [...half, ...half];

  return (
    <section
      id="trust"
      aria-label="Institutional backing and customers"
      className="container-page py-[var(--spacing-section)]"
    >

      {/* Animated marquee — decorative; replaced by the static lockup below under reduced motion. */}
      <div
        aria-hidden
        className="group marquee-mask relative  overflow-hidden motion-reduce:hidden"
      >
        <div
          className="marquee-track flex w-max items-center gap-x-16 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
          style={{ "--marquee-duration": "45s" } as CSSProperties}
        >
          {track.map((entity, i) => (
            <Wordmark key={`${entity.name}-${i}`} name={entity.name} label={entity.label} />
          ))}
        </div>
      </div>

      {/* Static two-up lockup — shown only under reduced motion. */}
      <ul className="mt-12 hidden flex-wrap items-center justify-center gap-x-10 gap-y-4 motion-reduce:flex">
        {trust.entities.map((entity, i) => (
          <li key={entity.name} className="flex items-center gap-10">
            {i > 0 ? <span aria-hidden className="hidden h-7 w-px bg-border sm:block" /> : null}
            <Wordmark name={entity.name} label={entity.label} />
          </li>
        ))}
      </ul>

      {/* Real names for assistive tech while the marquee plays (announced once). */}
      <ul className="sr-only motion-reduce:hidden">
        {trust.entities.map((entity) => (
          <li key={entity.name}>
            {entity.name} — {entity.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
