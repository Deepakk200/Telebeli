"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { ArrowRightLeft, Pause, PhoneCall, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Waveform } from "@/components/common/waveform";
import { useAnnounce } from "@/components/common/live-region";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { formatDuration } from "@/lib/format";
import { cn } from "@/lib/utils";

type Turn = { speaker: "caller" | "agent" | "system"; text: string };

// Synthetic script only — never real customer data. A full call that visibly
// resolves, then reaches a human-handoff moment, then loops. This is the
// page's "see it working" anchor; the warm-transfer line is the climax.
const SCRIPT: readonly Turn[] = [
  { speaker: "caller", text: "Hi, I need to move my delivery to Thursday." },
  {
    speaker: "agent",
    text: "Done — order #40128 is set for Thursday, 9am to noon. Anything else?",
  },
  { speaker: "caller", text: "Yeah — I think I was double-charged last month." },
  {
    speaker: "agent",
    text: "That one needs a billing specialist. Let me bring a human in with your details.",
  },
  {
    speaker: "system",
    text: "Warm transfer → Billing. Full transcript and detected intent attached.",
  },
] as const;

const STEP_MS = 1700;

const speakerLabel: Record<Turn["speaker"], string> = {
  caller: "Caller",
  agent: "Agent",
  system: "System",
};

export function LiveConsole() {
  const reduce = usePrefersReducedMotion();
  const [step, setStep] = useState(reduce ? SCRIPT.length : 1);
  const [seconds, setSeconds] = useState(reduce ? 47 : 0);
  const [paused, setPaused] = useState(false);
  const { announce, liveRegion } = useAnnounce();

  // Whisper of depth: the console settles from a hair small to full size on scroll.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.35"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.965, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [12, 0]);

  const stepRef = useRef(step);
  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  // The loop runs only while visible, unpaused, and motion-tolerant; ticks are
  // skipped while the tab is hidden (same pattern as the dashboard live view).
  useEffect(() => {
    if (reduce || paused || !inView) return;
    const reveal = setInterval(() => {
      if (document.hidden) return;
      const next = stepRef.current >= SCRIPT.length ? 1 : stepRef.current + 1;
      if (next === 1) setSeconds(0);
      setStep(next);
      const turn = SCRIPT[next - 1];
      if (turn) announce(`${speakerLabel[turn.speaker]}: ${turn.text}`);
    }, STEP_MS);
    const clock = setInterval(() => {
      if (!document.hidden) setSeconds((s) => s + 1);
    }, 1000);
    return () => {
      clearInterval(reveal);
      clearInterval(clock);
    };
  }, [reduce, paused, inView, announce]);

  const replay = () => {
    // Inert under reduced motion: the final state is already fully rendered.
    if (reduce) return;
    setStep(1);
    setSeconds(0);
    setPaused(false);
    const first = SCRIPT[0];
    if (first) announce(`${speakerLabel[first.speaker]}: ${first.text}`);
  };

  const lastVisible = SCRIPT[step - 1];
  const agentSpeaking = !reduce && !paused && lastVisible?.speaker === "agent";
  const handedOff = step >= SCRIPT.length;

  return (
    <motion.div
      ref={ref}
      role="group"
      aria-label="Live call demonstration"
      style={reduce ? undefined : { scale, y }}
      className="rounded-2xl border border-border bg-card/70 p-2 shadow-floating backdrop-blur"
    >
      <div className="rounded-xl border border-border/70 bg-background/60">
        <div className="flex items-center justify-between gap-2 border-b border-border/70 px-5 py-2">
          <div className="flex items-center gap-2.5">
            <span
              className={cn(
                "flex size-8 items-center justify-center rounded-full transition-colors",
                handedOff ? "bg-brand-accent/15 text-brand-accent" : "bg-brand/15 text-brand",
              )}
            >
              {handedOff ? <ArrowRightLeft className="size-4" /> : <PhoneCall className="size-4" />}
            </span>
            <div className="text-left">
              <p className="text-sm font-medium">
                {handedOff ? "Handoff · Billing specialist" : "Inbound · Support line"}
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                {handedOff ? "context passed" : "connected"} · {formatDuration(seconds)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Quiet playback controls — the visitor is never trapped in the loop. */}
            <Button
              variant="ghost"
              size="icon"
              className="size-11 text-muted-foreground"
              onClick={() => setPaused((previous) => !previous)}
              aria-label={paused ? "Resume demonstration" : "Pause demonstration"}
            >
              {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-11 text-muted-foreground"
              onClick={replay}
              aria-label="Replay demonstration"
            >
              <RotateCcw className="size-4" />
            </Button>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-xs transition-colors duration-[var(--dur-base)]",
                handedOff ? "bg-success/12 text-success" : "bg-live/15 text-foreground",
              )}
            >
              {!handedOff && (
                <span aria-hidden className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-live" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-live" />
                </span>
              )}
              {handedOff ? "resolved" : "live"}
            </span>
          </div>
        </div>

        <div className="grid gap-5 p-5 md:grid-cols-[1fr_auto] md:items-center">
          {/* All turns are rendered so the box height is reserved (no layout shift);
              un-revealed turns are just faded out. */}
          <div className="flex min-h-[168px] flex-col justify-center gap-2.5 text-left text-sm">
            {SCRIPT.map((turn, i) => {
              const visible = i < step;
              const base =
                "w-fit rounded-2xl px-3.5 py-2 transition-all duration-[var(--dur-base)] motion-reduce:transition-none";
              const tone =
                turn.speaker === "caller"
                  ? "rounded-tl-sm bg-muted text-foreground/90"
                  : turn.speaker === "agent"
                    ? "ml-auto rounded-tr-sm bg-brand text-primary-foreground"
                    : "mx-auto border border-brand-accent/40 bg-brand-accent/10 text-foreground dark:text-brand-accent text-xs";
              return (
                <p
                  key={i}
                  className={cn(
                    base,
                    tone,
                    visible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
                  )}
                >
                  {turn.text}
                </p>
              );
            })}
          </div>

          <div
            className={cn(
              "h-20 w-full transition-opacity duration-[var(--dur-base)] md:w-56",
              agentSpeaking ? "opacity-100" : "opacity-40",
            )}
          >
            <Waveform bars={40} animated={agentSpeaking} />
          </div>
        </div>
      </div>
      {liveRegion}
    </motion.div>
  );
}
