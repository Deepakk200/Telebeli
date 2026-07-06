import type { ReactNode } from "react";
import type { Organization, SoftwareApplication } from "schema-dts";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Problem } from "@/components/landing/problem";
import { LiveConsole } from "@/components/landing/live-console";
import { AiVsHuman } from "@/components/landing/ai-vs-human";
import { HowItWorks } from "@/components/landing/how-it-works";
import { ProductOverview } from "@/components/landing/product-overview";
import { PlatformCapabilities } from "@/components/landing/platform-capabilities";
import { Handoff } from "@/components/landing/handoff";
import { Metrics } from "@/components/landing/metrics";
import { Industries } from "@/components/landing/industries";
import { Logos } from "@/components/landing/logos";
import { SecuritySection } from "@/components/landing/security-section";
import { Faq } from "@/components/landing/faq";
import { Cta } from "@/components/landing/cta";
import { SectionHeading } from "@/components/landing/section-heading";
import { ChatFAB } from "@/components/common/chat-fab";
import { JsonLd } from "@/lib/json-ld";
import { siteConfig } from "@/config/site";

export const metadata = {
  alternates: { canonical: "/" },
};

const organization: Organization = {
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  email: siteConfig.email,
  sameAs: [siteConfig.links.twitter, siteConfig.links.linkedin, siteConfig.links.github],
};

const application: SoftwareApplication = {
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: siteConfig.description,
};

/**
 * Marketing page (RSC). Sections are composed in the narrative-spine order
 * (telebeli-website-story.md / standing working agreement): the headings, read
 * top to bottom, tell the whole story. Exactly one <h1> (the hero); every
 * section contributes an ordered <h2>. The footer lives in the marketing layout.
 *
 * Rhythm & cadence (E04 + P04): every section owns its own
 * py-[--spacing-section] — Band never adds vertical gap, it only tints. Adjacent
 * narrative beats separate by *tone* (ambient ↔ muted), never by dividers, so
 * the page reads as one continuous story. One SectionBreak marks the single
 * major transition into the closing CTA.
 *
 * Pending spine slots (their own prompts; data already staged in
 * constants/landing.ts): "AI vs Human" (P05 — humanVsAgent) sits after the live
 * call; "Call scoring" (P11) sits after operational visibility. HowItWorks is
 * rebuilt around `systemFlow` in P06.
 */
function Band({ tone = "base", children }: { tone?: "base" | "muted"; children: ReactNode }) {
  return <div className={tone === "muted" ? "bg-muted/30" : undefined}>{children}</div>;
}

export default function HomePage() {
  return (
    <>
      {/* Beat 0 — Hero + approved value strip + trust marquee (hero region):
          institutional backing lands up front, before the wound. */}
      <Hero />
      <Features />
      <Logos />

      {/* Beat 1 — the wound. */}
      <Band tone="muted">
        <Problem />
      </Band>

      {/* Beat 2 — proof: watch a real call resolve, then hand off. */}
      <section id="workflow" className="container-page scroll-mt-24 py-[var(--spacing-section)]">
        <SectionHeading
          eyebrow="SEE IT WORK"
          title="Watch a call resolve — then hand off to a human"
          description="A scripted demonstration of the real workflow: the agent resolves what it can and warm-transfers what it shouldn't handle, with full context attached. Labeled demo — never real customer data."
        />
        <div className="mx-auto mt-14 max-w-4xl">
          <LiveConsole />
        </div>
      </section>

      <AiVsHuman />

      {/* Beat 3 — AI vs Human (why this over hiring). PENDING P05; humanVsAgent
          data is ready in constants/landing.ts. */}

      {/* Beat 4 — how it works: the connected system. */}
      <Band tone="muted">
        <HowItWorks />
      </Band>

      {/* Beat 5 — operational visibility (the live product). */}
      <ProductOverview />
      <PlatformCapabilities />

      {/* Beat 6 — call scoring (accountability). PENDING P11. */}

      {/* Beat 7 — human handoff. Handoff self-tints (bg-muted/20), so it is its
          own tonal beat between two base regions — no Band wrapper. */}
      <Handoff />

      {/* Beat 8 — business outcomes. */}
      <Metrics />

      {/* Beat 9 — legitimacy: built-for industries. (Trust marquee moved to
          the hero region, Beat 0.) */}
      <Band tone="muted">
        <Industries />
      </Band>

      {/* Beat 10 — security & candor. */}
      <SecuritySection />

      {/* Beat 11 — FAQ. */}
      <Band tone="muted">
        <Faq />
      </Band>

      {/* Beat 12 — the invitation (single major transition into the ask). */}
      <div aria-hidden className="h-[var(--spacing-section-major)]" />
      <Cta />

      <ChatFAB />
      <JsonLd data={organization} />
      <JsonLd data={application} />
    </>
  );
}
