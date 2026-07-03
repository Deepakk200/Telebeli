import { cva, type VariantProps } from "class-variance-authority";

/**
 * The single source of truth for card/panel surfaces. Every elevated container
 * (stat cards, charts, tables, feature cards, forms) composes this instead of
 * repeating the border/background/shadow classes.
 */
export const surface = cva("rounded-xl border", {
  variants: {
    tone: {
      default: "border-border bg-card",
      dashed: "border-dashed border-border bg-card/40",
      /* Floating elements only (call widget, nav sheet) — see globals.css E03 note. */
      glass: "border-hairline glass",
    },
    elevation: {
      flat: "",
      subtle: "shadow-subtle",
      elevated: "shadow-elevated",
      floating: "shadow-floating",
    },
    interactive: {
      /* One inspect language (E09): ≤1px lift + hairline/shadow brighten at the
         hover-reveal tempo; keyboard focus mirrors hover; reduced-motion is
         instant. Transform/opacity/border only — compositor-friendly. */
      true: "transition-[transform,border-color,box-shadow] duration-[var(--dur-fast)] motion-reduce:transition-none hover:-translate-y-px hover:border-border-strong hover:shadow-elevated focus-visible:-translate-y-px focus-visible:border-border-strong focus-visible:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
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
