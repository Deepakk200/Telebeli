import Image from "next/image";

import { Reveal } from "@/components/motion";
import { STAGGER_CAP, STAGGER_STEP } from "@/lib/motion";
import { surface } from "@/lib/surface";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

const architectureDetails = [
  {
    step: "01",
    title: "Call intake",
    description:
      "Inbound and outbound calls are handled through Twilio, so the voice agent can answer on your existing phone workflow.",
  },
  {
    step: "02",
    title: "Realtime bridge",
    description:
      "A Node.js WebSocket bridge streams caller audio to the model and returns assistant voice back to the call.",
  },
  {
    step: "03",
    title: "AI response",
    description:
      "OpenAI Realtime processes caller audio, understands intent, and generates a natural response while the call is live.",
  },
  {
    step: "04",
    title: "Operational follow-through",
    description:
      "When requested, recordings, summaries, CRM notes, tasks, and follow-ups can be stored for review and action.",
  },
];

export function PlatformCapabilities() {
  return (
    <section id="capabilities" className="container-page scroll-mt-24 py-[var(--spacing-section)]">
      <SectionHeading
        eyebrow="PLATFORM CAPABILITIES"
        title="What the platform does, day in and day out"
        description="The operational system behind the promise: answering, qualifying, routing, recording, and following through on calls around the clock."
      />

      <Reveal className={cn(surface({ elevation: "elevated" }), "mt-12 overflow-hidden p-3 sm:p-4")}>
        <div className="overflow-hidden rounded-md border border-border bg-surface">
          <Image
            src="/system-design.png"
            alt="Voice calling agent system architecture showing caller, Twilio, Node.js WebSocket bridge, OpenAI Realtime API, recording storage, support notes, and CRM follow-up flow."
            width={1920}
            height={1080}
            sizes="(min-width: 1280px) 1216px, calc(100vw - 2rem)"
            className="h-auto w-full"
          />
        </div>
      </Reveal>

      <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {architectureDetails.map((item, index) => (
          <Reveal
            key={item.title}
            delay={Math.min(index, STAGGER_CAP) * STAGGER_STEP}
            className="bg-surface p-5 text-center sm:p-6"
          >
            <span className="font-mono text-xs font-semibold tracking-normal text-accent">{item.step}</span>
            <h3 className="mt-2 text-base font-semibold text-foreground">{item.title}</h3>
            <p className="mx-auto mt-2 max-w-64 text-sm leading-relaxed text-ink-muted">
              {item.description}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
