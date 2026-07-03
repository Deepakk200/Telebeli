import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { FadeIn } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "./section-heading";
import { SecurityPacketDialog } from "./security-packet-dialog";
import { securityCandor } from "@/constants/landing";
import { surface } from "@/lib/surface";
import { cn } from "@/lib/utils";

/**
 * P08 — Compliance & candor (spec §10). Two equal-weight columns, open by
 * default: what we can prove today / what we're still earning. No certification
 * is claimed before it is attestable; both columns share the same surface() and
 * heading level so "still earning" is never de-emphasized. The request action is
 * a client Dialog island; the trust center links to /security. RSC otherwise.
 */
export function SecuritySection() {
  return (
    <section id="security" className="container-page scroll-mt-24 py-[var(--spacing-section)]">
      <SectionHeading
        eyebrow="SECURITY & COMPLIANCE"
        title="Built for compliance. Honest about what we can't prove yet."
        description="What your security team will ask about — answered plainly, with the certifications we're still earning stated as exactly that."
      />

      <FadeIn className="mx-auto mt-14 max-w-4xl">
        <div className="grid gap-4 md:grid-cols-2">
          <div className={cn(surface(), "p-6")}>
            <h3 className="text-h3 text-foreground">What we can prove today</h3>
            <ul className="mt-4 space-y-2.5">
              {securityCandor.proveToday.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-small text-ink-muted">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={cn(surface(), "p-6")}>
            <h3 className="text-h3 text-foreground">What we&apos;re still earning</h3>
            <ul className="mt-4 space-y-4">
              {securityCandor.stillEarning.map((item) => (
                <li key={item.framework}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-small font-semibold text-foreground">
                      {item.framework}
                    </span>
                    <Badge variant="neutral">{item.status}</Badge>
                  </div>
                  <p className="mt-1 text-small text-ink-muted">{item.note}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-border pt-4 text-xs text-ink-faint">
              {securityCandor.disclaimer}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
          <SecurityPacketDialog />
          <Link
            href="/security"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-md text-small font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Visit the trust center
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
