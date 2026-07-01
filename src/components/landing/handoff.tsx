import { ArrowRightLeft, FileText, Sparkles, UserRound } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { surface } from "@/lib/surface";
import { cn } from "@/lib/utils";

const transcript = [
  { speaker: "caller", text: "…honestly this is the third time I've called about the same charge." },
  {
    speaker: "agent",
    text: "I hear you — this needs someone who can pull up billing. I'm bringing in a specialist now and staying on until they're with you.",
  },
];

const attached = [
  { icon: FileText, label: "Full transcript", value: "every turn, verbatim" },
  { icon: Sparkles, label: "Detected intent", value: "billing dispute · repeat contact" },
  { icon: UserRound, label: "Caller context", value: "order #40128 · verified" },
];

export function Handoff() {
  return (
    <section className="border-y border-border/60 bg-muted/20">
      <div className="mx-auto max-w-6xl px-6 py-[var(--spacing-section)]">
        <SectionHeading
          eyebrow="Every call ends well"
          title="Even the calls AI shouldn't finish"
          description="The moment that earns enterprise trust isn't full automation — it's a clean handoff. When intent gets sensitive, the agent brings in a human and hands over everything, so no one starts from scratch."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-stretch">
          <div className={cn(surface({ elevation: "elevated" }), "p-6")}>
            <div className="space-y-3 text-sm">
              {transcript.map((turn, i) => (
                <p
                  key={i}
                  className={cn(
                    "w-fit rounded-2xl px-3.5 py-2",
                    turn.speaker === "caller"
                      ? "rounded-tl-sm bg-muted text-foreground/90"
                      : "ml-auto rounded-tr-sm bg-brand text-primary-foreground",
                  )}
                >
                  {turn.text}
                </p>
              ))}
              <div className="!mt-5 flex items-center justify-center gap-2 rounded-lg border border-brand-accent/40 bg-brand-accent/10 px-4 py-2.5 text-xs font-medium text-brand-accent">
                <ArrowRightLeft className="size-3.5" />
                Warm transfer to a billing specialist
              </div>
            </div>
          </div>

          <div className={cn(surface({ elevation: "subtle" }), "flex flex-col justify-center gap-4 p-6")}>
            <p className="text-sm font-medium">Handed to the human, automatically:</p>
            {attached.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <item.icon className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
