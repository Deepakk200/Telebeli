"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { SectionHeading } from "./section-heading";
import { handoffSteps } from "@/constants/landing";
import { transition, viewportOnce } from "@/lib/motion";
import { useRevealFallback } from "@/components/motion/use-reveal-fallback";
import { surface } from "@/lib/surface";
import { cn } from "@/lib/utils";

// The flow draws left→right to enact the transfer — motion that explains
// (08: the one sanctioned motion here; Stagger/FadeIn-class, not a Reveal).
const flowContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};
const flowNode: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: transition.base },
};
const flowConnector: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: transition.slow },
};

/**
 * The Safety beat (07 · 06): handoff as a headline capability. Extends the
 * console's warm-transfer climax — the human node (with full context) is the
 * emphasized destination, via border weight, never amber.
 */
export function Handoff() {
  const reduce = useReducedMotion();
  const fallback = useRevealFallback();
  const isLast = (index: number) => index === handoffSteps.length - 1;

  return (
    <section className="border-y border-border/60 bg-muted/20">
      <div className="container-page py-[var(--spacing-section)]">
        <SectionHeading
          eyebrow="Graceful handoff"
          title="The calls AI shouldn't finish, it hands off — cleanly."
          description="When a call needs a person, Telebeli transfers it with the full transcript and detected intent already attached. Your team picks up in context, not from scratch. No caller repeats themselves. No one is stranded."
        />

        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={viewportOnce}
          variants={flowContainer}
          role="list"
          className="mt-14 flex flex-col items-stretch sm:flex-row sm:items-center"
        >
          {handoffSteps.map((step, index) => (
            <Fragment key={step.label}>
              {index > 0 && (
                <motion.div
                  aria-hidden
                  variants={flowConnector}
                  className={cn(
                    "mx-auto h-8 w-px origin-top bg-border sm:mx-0 sm:h-px sm:w-auto sm:min-w-6 sm:flex-1 sm:origin-left",
                    fallback,
                  )}
                />
              )}
              <motion.div
                role="listitem"
                variants={flowNode}
                className={cn(
                  surface({ elevation: isLast(index) ? "elevated" : "subtle" }),
                  "flex-shrink-0 p-5 sm:max-w-56",
                  isLast(index) && "border-foreground/30",
                  fallback,
                )}
              >
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-lg",
                    isLast(index) ? "bg-brand/10 text-brand" : "bg-muted text-muted-foreground",
                  )}
                >
                  <step.icon className="size-5" />
                </div>
                <p className="mt-3 text-sm font-semibold">{step.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
              </motion.div>
            </Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
