import type { Transition, Variants } from "motion/react";

/**
 * Motion Language tokens (interaction-blueprint-v2 §4) — exact values.
 * Every animation goes through these; no bounce/overshoot/elastic anywhere.
 */
export const tokens = {
  /** "content arrived" — scroll/section entrances. */
  enter: { duration: 0.24, ease: [0, 0, 0.2, 1] },
  /** "system state changed" — reserved for real state change only. */
  reconcile: { duration: 0.18, ease: [0.4, 0, 0.2, 1] },
  /** "your action registered" — scale 1 → 0.98, within one frame of input. */
  press: { duration: 0.1, ease: [0.2, 0, 0, 1] },
  /** "content leaving" — translateY 0 → −8 + fade. */
  exit: { duration: 0.14, ease: [0.4, 0, 1, 1] },
  /** "here is the evidence beneath" — opacity only. */
  hoverRevealIn: { duration: 0.12, ease: [0, 0, 0.2, 1] },
  hoverRevealOut: { duration: 0.1, ease: [0.4, 0, 1, 1] },
} satisfies Record<string, Transition>;

/** Stagger (exact): delay = index × 40ms, capped at 5 items. */
export const STAGGER_STEP = 0.04;
export const STAGGER_CAP = 5;

/** Scroll-entrance trigger (§4.4): fires once when the top passes 85% of
    viewport. The huge TOP margin makes anything the reader has already
    scrolled past count as in-view, so content can never be stranded invisible
    when the observer attaches after hydration (fast scroll on a slow device). */
export const viewportOnce = { once: true, margin: "10000% 0px -15% 0px" } as const;

/**
 * @deprecated Legacy shape kept for existing section consumers — values now
 * resolve to the token table. Import `tokens` directly in new code.
 */
export const transition = {
  fast: tokens.exit,
  base: tokens.reconcile,
  slow: tokens.enter,
} satisfies Record<string, Transition>;

/** `enter` token as variants — rise 16→0 + fade, plays once. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: tokens.enter },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: tokens.enter },
};

/** `exit` token as variants — drop −8 + fade. */
export const fadeExit: Variants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -8, transition: tokens.exit },
};

/**
 * Stagger container — children reveal in sequence at the 40ms step.
 * ponytail: Framer's staggerChildren can't cap at 5; every current grid has
 * ≤4 items — switch to per-index custom variants if a longer list appears.
 */
export function staggerContainer(stagger = STAGGER_STEP, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}
