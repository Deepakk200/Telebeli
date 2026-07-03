import Image from "next/image";
import { ArrowRightLeft, CalendarCheck, Headphones, Languages, NotebookTabs, PhoneCall } from "lucide-react";

import { Reveal } from "@/components/motion";
import { STAGGER_CAP, STAGGER_STEP } from "@/lib/motion";
import { surface } from "@/lib/surface";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

const robotCapabilities = [
  {
    icon: PhoneCall,
    title: "I answer every call",
    description: "Inbound, outbound, after-hours, and peak-time calls start instantly without a queue.",
  },
  {
    icon: NotebookTabs,
    title: "I capture the details",
    description: "Names, needs, notes, outcomes, and lead context are organized while the call is live.",
  },
  {
    icon: CalendarCheck,
    title: "I help complete actions",
    description: "Book, qualify, confirm, route, and update your systems from the conversation.",
  },
  {
    icon: ArrowRightLeft,
    title: "I hand off with context",
    description: "When a person is needed, your team receives the caller intent and call notes.",
  },
];

const robotStats = [
  { value: "24/7", label: "always on" },
  { value: "Live", label: "call notes" },
  { value: "Many", label: "calls at once" },
];

const speechBubbles = [
  "I can answer your next caller.",
  "I qualify, summarize, and route.",
  "Humans keep the important calls.",
];

export function AiVsHuman() {
  return (
    <section id="ai-vs-human" className="container-page scroll-mt-24 py-[var(--spacing-section)]">
      <SectionHeading
        eyebrow="FUNCTIONAL VOICE AGENT"
        title="Meet the robot that explains your call workflow."
        description="Telebeli is built to talk, listen, capture details, and pass the right work to your team - so your website story moves from promise to operation."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(20rem,0.82fr)_minmax(0,1fr)] lg:items-start">
        <Reveal
          className={cn(
            surface({ elevation: "elevated" }),
            "relative isolate overflow-hidden p-4 sm:p-6 lg:min-h-[31rem]",
          )}
        >
          <div
            aria-hidden
            className="absolute inset-x-6 bottom-5 top-20 rounded-full bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.18),rgba(37,99,235,0.08)_42%,transparent_70%)]"
          />

          <div className="relative z-10 mx-auto flex max-w-sm flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-wash px-3 py-1 text-xs font-semibold uppercase tracking-normal text-accent">
              <Headphones className="size-3.5" aria-hidden />
              Voice agent online
            </span>
            <h3 className="mt-4 text-2xl font-semibold tracking-normal text-foreground sm:text-3xl">
              Hi, I handle the busy calls.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              I take the repetitive conversations so your team can stay focused on judgment,
              relationships, and high-priority issues.
            </p>
          </div>

          <div className="relative z-10 mx-auto mt-6 grid max-w-sm grid-cols-3 gap-px overflow-hidden rounded-lg border border-border bg-border">
            {robotStats.map((stat) => (
              <div key={stat.label} className="bg-surface/90 px-2 py-3 text-center">
                <p className="text-base font-semibold text-foreground">{stat.value}</p>
                <p className="mt-0.5 text-[0.68rem] leading-snug text-ink-muted">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="relative z-10 mx-auto mt-4 flex max-w-[21rem] justify-center">
            <Image
              src="/product-visual.png"
              alt="Friendly Telebeli robot voice agent wearing a headset."
              width={900}
              height={900}
              sizes="(min-width: 1024px) 360px, 78vw"
              priority={false}
              className="h-auto w-[min(76%,18rem)] object-contain drop-shadow-[0_24px_42px_rgba(68,56,190,0.22)] sm:w-[min(82%,20rem)]"
            />
          </div>

          <div className="relative z-10 mt-4 grid gap-2 text-xs leading-relaxed text-foreground">
            {speechBubbles.map((bubble, index) => (
              <Reveal
                key={bubble}
                delay={Math.min(index, STAGGER_CAP) * STAGGER_STEP}
                className={cn(
                  "rounded-xl border border-border bg-surface/95 px-3 py-2 shadow-sm",
                  index === 1 ? "ml-auto max-w-[16rem]" : "mr-auto max-w-[15rem]",
                )}
              >
                {bubble}
              </Reveal>
            ))}
          </div>
        </Reveal>

        <div className={cn(surface(), "flex flex-col p-4 sm:p-6 lg:p-7")}>
          <p className="text-label uppercase text-accent">What I do on every call</p>
          <h3 className="mt-3 max-w-2xl text-2xl font-semibold tracking-normal text-foreground sm:text-3xl">
            A functional assistant, not a static chatbot.
          </h3>
          <p className="mt-4 max-w-2xl text-small leading-relaxed text-ink-muted">
            The robot is the friendly face of the workflow: real-time voice, structured capture,
            useful actions, and clean handoff. Each call becomes something your business can act on.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:gap-3">
            {robotCapabilities.map((item, index) => (
              <Reveal
                key={item.title}
                delay={Math.min(index, STAGGER_CAP) * STAGGER_STEP}
                className="rounded-lg border border-border bg-card/70 p-3 transition-colors duration-[var(--dur-fast)] hover:bg-accent-wash/40 sm:p-4 motion-reduce:transition-none"
              >
                <span className="flex size-8 items-center justify-center rounded-lg bg-accent-wash text-accent sm:size-10">
                  <item.icon className="size-4 sm:size-5" aria-hidden />
                </span>
                <h4 className="mt-3 text-sm font-semibold leading-snug text-foreground sm:mt-4 sm:text-base">
                  {item.title}
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-muted sm:mt-2 sm:text-sm">
                  {item.description}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="mt-5 rounded-lg border border-accent/20 bg-accent-wash/60 p-3 sm:mt-6 sm:p-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface text-accent">
                <Languages className="size-4" aria-hidden />
              </span>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Built for natural conversations</h4>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                  Callers speak normally. Telebeli listens, responds, remembers context, and keeps
                  the workflow moving until the call is resolved or handed off.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
