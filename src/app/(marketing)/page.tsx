import type { Organization, SoftwareApplication } from "schema-dts";
import { Hero } from "@/components/landing/hero";
import { Logos } from "@/components/landing/logos";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Metrics } from "@/components/landing/metrics";
import { Pricing } from "@/components/landing/pricing";
import { Faq } from "@/components/landing/faq";
import { Cta } from "@/components/landing/cta";
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
  offers: {
    "@type": "Offer",
    price: "0.06",
    priceCurrency: "USD",
    description: "Per connected minute, billed by the second.",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Logos />
      <Features />
      <HowItWorks />
      <Metrics />
      <Pricing />
      <Faq />
      <Cta />
      <JsonLd data={organization} />
      <JsonLd data={application} />
    </>
  );
}
