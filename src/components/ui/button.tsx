import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { IconLoader } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

/* Intent skins (design-system §2). Legacy shadcn names below alias onto these
   so deferred sections re-skin without edits. */
const primarySkin = "bg-primary text-primary-foreground hover:bg-accent-ink"
const secondarySkin =
  "border border-border bg-card text-foreground hover:border-border-strong hover:bg-muted"
const ghostSkin = "text-foreground hover:bg-muted"
const dangerSkin = "bg-destructive text-destructive-foreground hover:bg-destructive/90"
/* Marketing macro-CTA (landing-page-approved.png): even brand gradient, white
   AA label, elevated depth, subtle hover brighten (never a glow). */
const gradientSkin =
  "bg-gradient-brand text-white shadow-elevated hover:brightness-105 motion-reduce:hover:brightness-100"

const buttonVariants = cva(
  // Press token: 100ms cubic-bezier(0.2,0,0,1), scale 1 → 0.98 on activate.
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-sm text-sm font-medium whitespace-nowrap transition-all duration-100 ease-[cubic-bezier(0.2,0,0,1)] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 pointer-coarse:min-h-11 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: primarySkin,
        secondary: secondarySkin,
        ghost: ghostSkin,
        danger: dangerSkin,
        gradient: gradientSkin,
        /** @deprecated alias of `primary` */
        default: primarySkin,
        /** @deprecated alias of `secondary` */
        outline: secondarySkin,
        /** @deprecated alias of `danger` */
        destructive: dangerSkin,
        /** @deprecated inline-link look — use the Link primitive */
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 gap-1.5 px-3", // 32 — control scale
        md: "h-10 px-4", // 40
        lg: "h-12 px-6", // 48 — hero CTAs
        /** @deprecated alias of `md` */
        default: "h-10 px-4",
        /** @deprecated off-scale */
        xs: "h-6 gap-1 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
        /** @deprecated off-scale */
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

/**
 * Button Interaction Contract (design-system §0.3): one `primary` per view;
 * icon-only sizes REQUIRE `aria-label`; `loading` sets aria-busy and blocks
 * re-submit. Icon slots: pass leading/trailing SVGs as children (8px gap).
 */
function Button({
  className,
  variant = "primary",
  size = "md",
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {loading ? <IconLoader className="animate-spin" /> : null}
          {children}
        </>
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
