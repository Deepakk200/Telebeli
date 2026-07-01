import { cva, type VariantProps } from "class-variance-authority";

/**
 * The single source of truth for card/panel surfaces. Every elevated container
 * (stat cards, charts, tables, feature cards, forms) composes this instead of
 * repeating the border/background/shadow classes.
 */
export const surface = cva("rounded-xl border bg-card", {
  variants: {
    tone: {
      default: "border-border",
      dashed: "border-dashed border-border bg-card/40",
    },
    elevation: {
      flat: "",
      subtle: "shadow-subtle",
      elevated: "shadow-elevated",
      floating: "shadow-floating",
    },
    interactive: {
      true: "transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-elevated",
      false: "",
    },
  },
  defaultVariants: {
    tone: "default",
    elevation: "subtle",
    interactive: false,
  },
});

export type SurfaceVariants = VariantProps<typeof surface>;
