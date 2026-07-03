import type { Organization, SoftwareApplication } from "schema-dts";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Logos } from "@/components/landing/logos";
import { ProductOverview } from "@/components/landing/product-overview";
import { PlatformCapabilities } from "@/components/landing/platform-capabilities";
import { LiveConsole } from "@/components/landing/live-console";
import { Problem } from "@/components/landing/problem";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Integrations } from "@/components/landing/integrations";
import { SecuritySection } from "@/components/landing/security-section";
import { Industries } from "@/components/landing/industries";
import { Reliability } from "@/components/landing/reliability";
import { Metrics } from "@/components/landing/metrics";
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
 * Marketing page (RSC). Composes the Milestone 1–3 sections in the canonical
 * narrative order — the section headings, read top to bottom, tell the Telebeli
 * story (calm, rising conviction). Exactly one <h1> (the hero); every section
 * contributes an ordered <h2> via SectionHeading. The footer lives in the
 * marketing layout (not here); the JSON-LD below is the SEO foundation.
 *
 * Rhythm (E04): every section carries py-[--spacing-section]; register
 * alternates airy (hero, overview, industries) ↔ dense (console, metrics,
 * FAQ) so the page breathes. The closing CTA — the one major narrative beat —
 * gets extra pure whitespace via SectionBreak (no decorative dividers;
 * whitespace separates, per spec §0).
 */
function SectionBreak() {
  return <div aria-hidden className="h-[var(--spacing-section-major)]" />;
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Logos />
      <ProductOverview />
      <PlatformCapabilities />
      {/* Workflow beat — RSC section wrapper; only the console island is client JS. */}
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
      <Problem />
      <HowItWorks />
      <Integrations />
      <SecuritySection />
      <Industries />
      {/* Customer-benefits beat: benefits, then reliability-by-design. */}
      <Metrics />
      <Reliability />
      <Faq />
      <SectionBreak />
      <Cta />
      <ChatFAB />
      <JsonLd data={organization} />
      <JsonLd data={application} />
    </>
  );
}
