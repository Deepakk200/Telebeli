"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";

type Tag = "h1" | "h2" | "h3" | "p" | "span";
type Props = { children: string; as?: Tag; delay?: number; className?: string };

const EASE = [0.16, 1, 0.3, 1] as const;
const container = { hidden: {}, show: { transition: { staggerChildren: 0.045 } } };
const word = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.5, ease: EASE } },
};

/**
 * Reveals text word-by-word (rising out of a mask) once it scrolls into view.
 * Words stay real, selectable, screen-reader text in reading order. For
 * below-the-fold headings only — never the LCP hero. Reduced-motion renders
 * the final text instantly.
 */
export function TextReveal({ children, as: Tag = "span", delay = 0, className }: Props) {
  const reduced = useReducedMotion();
  if (reduced) return <Tag className={className}>{children}</Tag>;

  const words = children.split(" ");
  return (
    <Tag className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ delayChildren: delay }}
        style={{ display: "inline" }}
      >
        {words.map((w, i) => (
          <Fragment key={i}>
            <span
              // overflow-hidden is the mask; the pb/-mb pair keeps descenders (g,y,p,j) unclipped.
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "top",
                paddingBottom: "0.15em",
                marginBottom: "-0.15em",
              }}
            >
              <motion.span variants={word} style={{ display: "inline-block", willChange: "transform" }}>
                {w}
              </motion.span>
            </span>
            {/* space must be a sibling of the mask — inline-block trims trailing whitespace */}
            {i < words.length - 1 ? " " : ""}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}
