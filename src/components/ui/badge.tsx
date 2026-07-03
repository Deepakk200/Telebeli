import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/* Evidence-palette skins. Color never stands alone — Badge always renders its
   text label (a handoff badge says "Handoff"). */
const neutralSkin = "border-border bg-muted text-muted-foreground"
const flagSkin = "border-state-flag/25 bg-state-flag/10 text-state-flag"

const badgeVariants = cva(
  // Static semantic label: 20px tall, r-sm — pill is reserved for the Status dot.
  "inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-sm border px-2 text-xs font-medium whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        live: "border-state-live/25 bg-state-live/10 text-state-live",
        resolved: "border-state-resolved/25 bg-state-resolved/10 text-state-resolved",
        handoff: "border-state-handoff/25 bg-state-handoff/10 text-state-handoff",
        flag: flagSkin,
        neutral: neutralSkin,
        /** @deprecated alias of `neutral` */
        default: neutralSkin,
        /** @deprecated alias of `neutral` */
        secondary: neutralSkin,
        /** @deprecated alias of `flag` */
        destructive: flagSkin,
        /** @deprecated alias of `neutral` */
        outline: "border-border bg-transparent text-foreground",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
)

function Badge({
  className,
  variant = "neutral",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
