import type { Organization, SoftwareApplication } from "schema-dts";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Logos } from "@/components/landing/logos";
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
 * Marketing page shell (RSC). The approved landing sections
 * (docs/design-assets/landing-page-approved.png) are composed here by Milestone 2
 * in approved order: hero → hero feature cards → trusted-by. Empty until those
 * prompts land; the JSON-LD below is the SEO foundation.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Logos />
      <ChatFAB />
      <JsonLd data={organization} />
      <JsonLd data={application} />
    </>
  );
}
