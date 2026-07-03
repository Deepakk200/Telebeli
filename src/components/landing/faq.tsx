import type { FAQPage } from "schema-dts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "./section-heading";
import { FadeIn } from "@/components/motion";
import { JsonLd } from "@/lib/json-ld";
import { faqs } from "@/constants/landing";

export function Faq() {
  const faqSchema: FAQPage = {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section id="faq" className="scroll-mt-24 border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-3xl px-6 py-[var(--spacing-section)]">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <FadeIn className="mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.question} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {f.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
      <JsonLd data={faqSchema} />
    </section>
  );
}
