"use client";

import { useEffect, useRef, useState } from "react";
import { m, useInView } from "motion/react";
import { ArrowRightLeft, Pause, PhoneCall, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Waveform } from "@/components/common/waveform";
import { useAnnounce } from "@/components/common/live-region";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { workflowScript as SCRIPT, type WorkflowTurn } from "@/constants/landing";
import { fadeUp, tokens, viewportOnce } from "@/lib/motion";
import { formatDuration } from "@/lib/format";
import { cn } from "@/lib/utils";

const STEP_MS = 1700;

/* Status pill transitions use the reconcile token (180ms) — sourced from
   lib/motion.ts, not hardcoded. */
const reconcileMs = `${tokens.reconcile.duration * 1000}ms`;

const speakerLabel: Record<WorkflowTurn["speaker"], string> = {
  caller: "Caller",
  agent: "Agent",
  system: "System",
};

/**
 * P04 — the "watch it work" proof beat. Explicit play only (no autoplay, no
 * loop): the demonstration starts paused, plays through once to the handoff,
 * and stops; Replay restarts it. Space plays/pauses, ←/→ scrub through turns.
 * Reduced motion → the full transcript renders statically. Synthetic script —
 * labeled demo in the UI, never real customer data.
 */
export function LiveConsole() {
  const reduce = usePrefersReducedMotion();
  // Reduced motion: fully resolved state, no timers. Otherwise: armed, paused.
  const [step, setStep] = useState(reduce ? SCRIPT.length : 1);
  const [seconds, setSeconds] = useState(reduce ? 47 : 0);
  const [playing, setPlaying] = useState(false);
  const { announce, liveRegion } = useAnnounce();

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });

  const stepRef = useRef(step);
  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  // Playback advances only after an explicit play, while visible, and never
  // under reduced motion; ticks are skipped while the tab is hidden. Reaching
  // the handoff stops the demonstration — it never loops on its own.
  useEffect(() => {
    if (reduce || !playing || !inView) return;
    const reveal = setInterval(() => {
      if (document.hidden) return;
      if (stepRef.current >= SCRIPT.length) {
        setPlaying(false);
        return;
      }
      const next = stepRef.current + 1;
      setStep(next);
      const turn = SCRIPT[next - 1];
      if (turn) announce(`${speakerLabel[turn.speaker]}: ${turn.text}`);
      if (next >= SCRIPT.length) setPlaying(false);
    }, STEP_MS);
    const clock = setInterval(() => {
      if (!document.hidden) setSeconds((s) => s + 1);
    }, 1000);
    return () => {
      clearInterval(reveal);
      clearInterval(clock);
    };
  }, [reduce, playing, inView, announce]);

  const scrub = (delta: 1 | -1) => {
    if (reduce) return;
    const next = Math.min(SCRIPT.length, Math.max(1, stepRef.current + delta));
    if (next === stepRef.current) return;
    setStep(next);
    const turn = SCRIPT[next - 1];
    if (turn) announce(`${speakerLabel[turn.speaker]}: ${turn.text}`);
  };

  const replay = () => {
    // Inert under reduced motion: the final state is already fully rendered.
    if (reduce) return;
    setStep(1);
    setSeconds(0);
    setPlaying(true);
    const first = SCRIPT[0];
    if (first) announce(`${speakerLabel[first.speaker]}: ${first.text}`);
  };

  // Keyboard for the focused group itself; inner buttons keep their native keys.
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === " ") {
      event.preventDefault();
      setPlaying((p) => (stepRef.current >= SCRIPT.length ? p : !p));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      scrub(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrub(-1);
    }
  };

  const lastVisible = SCRIPT[step - 1];
  const agentSpeaking = !reduce && playing && lastVisible?.speaker === "agent";
  const handedOff = step >= SCRIPT.length;
  const ended = handedOff;

  return (
    <m.div
      ref={ref}
      role="group"
      tabIndex={0}
      aria-label="Call workflow demonstration. Space plays or pauses; left and right arrows step through the conversation."
      onKeyDown={onKeyDown}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "visible"}
      viewport={viewportOnce}
      variants={fadeUp}
      className="rounded-2xl border border-border bg-card/70 p-2 shadow-floating backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="rounded-xl border border-border/70 bg-background/60">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 px-5 py-2">
          <div className="flex items-center gap-2.5">
            <span
              className={cn(
                "flex size-8 items-center justify-center rounded-full transition-colors",
                handedOff ? "bg-brand-accent/15 text-brand-accent" : "bg-brand/15 text-brand",
              )}
              style={{ transitionDuration: reconcileMs }}
            >
              {handedOff ? <ArrowRightLeft className="size-4" /> : <PhoneCall className="size-4" />}
            </span>
            <div className="text-left">
              <p className="text-sm font-medium">
                {handedOff ? "Handoff · Billing specialist" : "Inbound · Support line"}
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                {handedOff ? "context passed" : playing ? "connected" : "ready"} ·{" "}
                {formatDuration(seconds)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <span className="rounded-full border border-border bg-background/60 px-2 py-0.5 font-mono text-xs text-muted-foreground">
              Labeled demo
            </span>
            {/* Explicit playback controls — nothing moves until the visitor asks. */}
            <Button
              variant="ghost"
              size="icon"
              className="size-11 text-muted-foreground"
              onClick={() => setPlaying((p) => (ended ? p : !p))}
              disabled={reduce || ended}
              aria-label={playing ? "Pause demonstration" : "Play demonstration"}
            >
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-11 text-muted-foreground"
              onClick={replay}
              disabled={reduce}
              aria-label="Replay demonstration"
            >
              <RotateCcw className="size-4" />
            </Button>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-xs transition-colors",
                handedOff ? "bg-success/12 text-success" : "bg-live/15 text-foreground",
              )}
              style={{ transitionDuration: reconcileMs }}
            >
              {!handedOff && playing && (
                <span aria-hidden className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-live" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-live" />
                </span>
              )}
              {handedOff ? "resolved" : playing ? "live" : "paused"}
            </span>
          </div>
        </div>

        <div className="grid gap-5 p-5 md:grid-cols-[1fr_auto] md:items-center">
          {/* All turns are rendered so the box height is reserved (no layout shift);
              un-revealed turns are just faded out. Visible transcript = captions;
              the shared live region announces each turn politely. */}
          <div className="flex min-h-42 flex-col justify-center gap-2.5 text-left text-sm">
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
            {/* Animates only while playback is advancing an agent turn. */}
            <Waveform bars={40} animated={agentSpeaking} />
          </div>
        </div>
      </div>
      {liveRegion}
    </m.div>
  );
}
