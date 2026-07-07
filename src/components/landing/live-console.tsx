"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Loader2, Pause, PhoneCall, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Waveform } from "@/components/common/waveform";
import { useAnnounce } from "@/components/common/live-region";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { demoCallTracks as TRACKS, type DemoCallTrack } from "@/constants/landing";
import { PLAY_DEMO_EVENT } from "./play-demo-cta";
import { fadeUp, tokens, viewportOnce } from "@/lib/motion";
import { useRevealFallback } from "@/components/motion/use-reveal-fallback";
import { cn } from "@/lib/utils";

type LangCode = DemoCallTrack["code"];
type PlaybackStatus = "idle" | "loading" | "playing" | "paused" | "ended" | "error";

/** Seconds → "MM:SS" with padded minutes for tabular alignment (84 → "01:24"). */
const clock = (s: number) => {
  const safe = Number.isFinite(s) && s > 0 ? Math.floor(s) : 0;
  const mm = Math.floor(safe / 60);
  const ss = safe % 60;
  return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
};

const STATUS_LABEL: Record<PlaybackStatus, string> = {
  idle: "Ready",
  loading: "Loading",
  playing: "Playing",
  paused: "Paused",
  ended: "Completed",
  error: "Unavailable",
};

/** Dot tint per status; `live` also gets a ping ring. */
const STATUS_DOT: Record<PlaybackStatus, string> = {
  idle: "bg-muted-foreground/60",
  loading: "bg-brand",
  playing: "bg-live",
  paused: "bg-brand-accent",
  ended: "bg-success",
  error: "bg-destructive",
};

/**
 * P04 — the "watch a call resolve" proof beat, reworked as a premium
 * multilingual voice demo. A recorded sample AI support call is the content:
 * one hidden <audio> (keyed by language so switching remounts + resets it)
 * drives the waveform, status, seekable progress bar, and MM:SS timer.
 *
 * Playback is explicit only — nothing starts on load, scroll, or language
 * switch; the Play button (or Space when the card is focused) is the sole
 * trigger. IntersectionObserver auto-pauses when <50% of the player is visible
 * and auto-resumes from the same position when it returns — but only if the
 * pause was caused by scrolling away (a manual pause stays paused). Reduced
 * motion freezes the waveform + status animation; a load failure degrades to a
 * disabled "Unavailable" state instead of a broken player.
 */
export function LiveConsole() {
  const reduce = usePrefersReducedMotion();
  const fallback = useRevealFallback();
  const { announce, liveRegion } = useAnnounce();

  const [lang, setLang] = useState<LangCode>(TRACKS[0]!.code);
  const [status, setStatus] = useState<PlaybackStatus>("idle");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const rafRef = useRef<number | null>(null);
  const currentTimeRef = useRef(0);
  const statusRef = useRef<PlaybackStatus>("idle");
  // True only while paused *because the section scrolled out of view* — the one
  // case we may auto-resume. A manual pause clears it, so it stays paused.
  const autoPausedRef = useRef(false);

  const track = TRACKS.find((t) => t.code === lang) ?? TRACKS[0]!;
  const activeIndex = TRACKS.findIndex((t) => t.code === lang);

  const isPlaying = status === "playing";
  const isLoading = status === "loading";
  const ended = status === "ended";
  const errored = status === "error";
  const displayDuration = duration > 0 ? duration : 0;
  const pct = displayDuration > 0 ? Math.min(100, (currentTime / displayDuration) * 100) : 0;
  const statusLabel = STATUS_LABEL[status];

  // Mirror status into a ref so the IntersectionObserver (created once) reads it.
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  const handleError = useCallback(() => setStatus("error"), []);

  // The one driver: while playing, sample audio.currentTime via rAF and push a
  // throttled (~10/sec) state update. Everything visual derives from currentTime.
  useEffect(() => {
    if (status !== "playing") return;
    let last = 0;
    const loop = (ts: number) => {
      const audio = audioRef.current;
      if (audio) {
        currentTimeRef.current = audio.currentTime;
        if (ts - last >= 100) {
          last = ts;
          setCurrentTime(audio.currentTime);
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [status]);

  // Auto-pause when <50% visible; auto-resume (from the kept position) when it
  // returns — but only if scrolling caused the pause. The IO callback is an
  // external-system event, so setting state here is the intended pattern.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        const visible = entry.intersectionRatio >= 0.5;
        if (visible) {
          if (autoPausedRef.current) {
            autoPausedRef.current = false;
            audioRef.current?.play().catch(() => setStatus("paused"));
          }
        } else if (statusRef.current === "playing") {
          autoPausedRef.current = true;
          audioRef.current?.pause();
        }
      },
      { threshold: [0, 0.5, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Full teardown on unmount.
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      audio?.pause();
    };
  }, []);

  // Read the track duration. `loadedmetadata` doesn't bubble, so React's JSX
  // handler can miss it when the file is already cached (the event fires before
  // the listener attaches). Reading it directly here + an imperative listener
  // covers both the already-parsed and parses-later cases. Re-runs per language.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const sync = () => {
      const d = audio.duration;
      if (Number.isFinite(d) && d > 0) setDuration(d);
    };
    sync();
    audio.addEventListener("loadedmetadata", sync);
    audio.addEventListener("durationchange", sync);
    return () => {
      audio.removeEventListener("loadedmetadata", sync);
      audio.removeEventListener("durationchange", sync);
    };
  }, [lang]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    autoPausedRef.current = false;
    if (duration === 0) setStatus("loading");
    audio.play().catch(handleError);
  }, [duration, handleError]);

  // External trigger: the hero "See How It Works" CTA fires PLAY_DEMO_EVENT. The
  // dispatch is synchronous inside that click, so play() still runs within the
  // user gesture (autoplay policy allows it). The CTA's href does the scroll;
  // this only starts playback once the visitor lands on the demo.
  useEffect(() => {
    const onDemand = () => play();
    window.addEventListener(PLAY_DEMO_EVENT, onDemand);
    return () => window.removeEventListener(PLAY_DEMO_EVENT, onDemand);
  }, [play]);

  const pause = useCallback(() => {
    autoPausedRef.current = false; // manual pause: do not auto-resume on scroll
    audioRef.current?.pause();
  }, []);

  const replay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    autoPausedRef.current = false;
    audio.currentTime = 0;
    currentTimeRef.current = 0;
    setCurrentTime(0);
    if (duration === 0) setStatus("loading");
    audio.play().catch(handleError);
  }, [duration, handleError]);

  const togglePlay = useCallback(() => {
    if (errored) return;
    if (isPlaying || isLoading) pause();
    else if (ended) replay();
    else play();
  }, [errored, isPlaying, isLoading, ended, pause, replay, play]);

  const seek = useCallback(
    (t: number) => {
      if (displayDuration <= 0) return;
      const clamped = Math.max(0, Math.min(displayDuration, t));
      currentTimeRef.current = clamped;
      setCurrentTime(clamped);
      const audio = audioRef.current;
      if (audio) audio.currentTime = clamped;
      if (status === "ended" && clamped < displayDuration - 0.1) setStatus("paused");
    },
    [displayDuration, status],
  );

  const selectLang = useCallback(
    (code: LangCode) => {
      if (code === lang) return;
      autoPausedRef.current = false;
      audioRef.current?.pause();
      currentTimeRef.current = 0;
      setCurrentTime(0);
      setDuration(0);
      setStatus("idle");
      setLang(code);
      announce(`${TRACKS.find((t) => t.code === code)?.label} selected`);
    },
    [lang, announce],
  );

  // Card-level keys (only when the card itself is focused — inner controls keep
  // their native keys). Space plays/pauses; ←/→ seek ±5s.
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === " ") {
      event.preventDefault();
      togglePlay();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      seek(currentTimeRef.current + 5);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      seek(currentTimeRef.current - 5);
    }
  };

  // Roving arrow-key selection for the language segmented control.
  const onSelectorKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    let next = activeIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (activeIndex + 1) % TRACKS.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (activeIndex - 1 + TRACKS.length) % TRACKS.length;
    else return;
    event.preventDefault();
    selectLang(TRACKS[next]!.code);
    const radios = event.currentTarget.querySelectorAll<HTMLElement>('[role="radio"]');
    radios[next]?.focus();
  };

  const playAria = errored
    ? "Audio unavailable"
    : isLoading
      ? "Loading audio"
      : isPlaying
        ? "Pause"
        : ended
          ? "Replay from the beginning"
          : "Play";
  const timeText = `${clock(currentTime)} of ${clock(displayDuration)}`;
  const waveActive = !reduce && (isPlaying || status === "paused");

  return (
    <m.div
      ref={sectionRef}
      role="group"
      tabIndex={0}
      aria-label="AI call demo. Space plays or pauses; left and right arrows seek five seconds."
      onKeyDown={onKeyDown}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "visible"}
      viewport={viewportOnce}
      variants={fadeUp}
      className={cn(
        "rounded-2xl border border-border bg-card/70 p-2 shadow-floating backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        fallback,
      )}
    >
      <div className="rounded-xl border border-border/70 bg-background/60 px-5 py-7 sm:px-8 sm:py-9">
        <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-6 text-center">
          {/* 1 — line identity */}
          <div className="flex flex-col items-center gap-2.5">
            <span className="flex size-11 items-center justify-center rounded-full bg-brand/12 text-brand">
              <PhoneCall className="size-5" />
            </span>
            <div>
              <p className="text-sm font-medium">Inbound · Support line</p>
              <p className="font-mono text-xs text-muted-foreground">
                Labeled demo · recorded sample
              </p>
            </div>
          </div>

          {/* 2 — language selector (segmented control, animated indicator) */}
          <div
            role="radiogroup"
            aria-label="Demo language"
            onKeyDown={onSelectorKey}
            className="relative flex w-full max-w-[300px] rounded-full border border-border bg-muted p-1"
          >
            {/* Active-pill indicator. Positioned by `left` (not translateX) so it
                sits inside each equal slot with a 2px inset on every side — the
                rounded pill never pokes past the container's rounded border at
                the extremes. Works for any track count. */}
            <span
              aria-hidden
              className="absolute inset-y-1 rounded-full bg-card shadow-sm transition-[left] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none"
              style={{
                width: `calc((100% - 0.5rem) / ${TRACKS.length} - 4px)`,
                left: `calc(0.25rem + 2px + ${Math.max(0, activeIndex)} * (100% - 0.5rem) / ${TRACKS.length})`,
              }}
            />
            {TRACKS.map((t) => {
              const active = t.code === lang;
              return (
                <button
                  key={t.code}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  tabIndex={active ? 0 : -1}
                  onClick={() => selectLang(t.code)}
                  className={cn(
                    // basis-0 min-w-0 forces exact equal thirds so the %-based
                    // indicator always lines up regardless of label length.
                    "relative z-10 min-w-0 flex-1 basis-0 whitespace-nowrap rounded-full px-2 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-muted sm:px-4",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* 3 — waveform hero */}
          <div
            className={cn(
              "relative h-24 w-full transition-opacity duration-300 motion-reduce:transition-none sm:h-28",
              isPlaying ? "opacity-100" : status === "paused" ? "opacity-80" : "opacity-45",
            )}
          >
            {/* Animates while playing, freezes on pause, resets to static otherwise. */}
            <Waveform bars={56} animated={waveActive} playing={isPlaying} />
          </div>

          {/* 4 — controls (big play/pause centered; replay flanks it) */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={replay}
              disabled={errored}
              aria-label="Replay from the beginning"
              className="size-11 rounded-full text-muted-foreground"
            >
              <RotateCcw className="size-5" />
            </Button>
            <Button
              variant="gradient"
              size="icon"
              onClick={togglePlay}
              disabled={errored}
              aria-label={playAria}
              className="size-16 rounded-full [&_svg]:size-6"
            >
              {isLoading ? (
                <Loader2 className="animate-spin motion-reduce:animate-none" />
              ) : isPlaying ? (
                <Pause />
              ) : (
                <Play className="translate-x-px" />
              )}
            </Button>
            {/* balances the replay button so Play stays centered */}
            <span aria-hidden className="size-11" />
          </div>

          {/* 5 — status */}
          <div className="flex h-5 items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <m.p
                key={statusLabel}
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={tokens.reconcile}
                className="flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <span className="relative flex size-2">
                  {isPlaying && (
                    <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-live motion-reduce:animate-none" />
                  )}
                  <span className={cn("relative inline-flex size-2 rounded-full", STATUS_DOT[status])} />
                </span>
                {statusLabel}
              </m.p>
            </AnimatePresence>
          </div>

          {/* 6 — seekable progress bar (mouse, touch, keyboard via native range) */}
          <div className="w-full">
            <div className="relative flex h-6 items-center">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-brand transition-[width] duration-100 ease-linear motion-reduce:transition-none"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span
                aria-hidden
                className="pointer-events-none absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-background bg-brand shadow-sm transition-[left] duration-100 ease-linear motion-reduce:transition-none"
                style={{ left: `${pct}%` }}
              />
              <input
                type="range"
                min={0}
                max={displayDuration || 0}
                step={0.1}
                value={Math.min(currentTime, displayDuration)}
                disabled={errored || displayDuration <= 0}
                onChange={(e) => seek(Number(e.target.value))}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    seek(currentTimeRef.current - 5);
                  } else if (e.key === "ArrowRight") {
                    e.preventDefault();
                    seek(currentTimeRef.current + 5);
                  }
                }}
                aria-label="Seek through the recording"
                aria-valuetext={timeText}
                className="absolute inset-0 size-full cursor-pointer appearance-none bg-transparent opacity-0 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-default"
              />
            </div>

            {/* 7 — time (elapsed / total) */}
            <div className="mt-2 flex items-center justify-between font-mono text-xs tabular-nums text-muted-foreground">
              <span>{clock(currentTime)}</span>
              {errored ? (
                <span className="text-destructive">Couldn&rsquo;t load the recording</span>
              ) : null}
              <span>{clock(displayDuration)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Single hidden audio element, keyed by language so a switch remounts +
          resets it. preload="metadata" fetches only the header (duration for the
          timer) — never the stream, never autoplay; playback needs an explicit
          Play. */}
      <audio
        ref={audioRef}
        key={lang}
        src={track.src}
        preload="metadata"
        hidden
        onPlay={() => setStatus("playing")}
        onPlaying={() => setStatus("playing")}
        onTimeUpdate={(e) => {
          // Coarse backstop (~4/sec) for the rAF loop, which the browser throttles
          // when the tab isn't painting — keeps timer/progress moving.
          const t = e.currentTarget.currentTime;
          currentTimeRef.current = t;
          setCurrentTime(t);
        }}
        onPause={() => {
          if (audioRef.current?.ended) return;
          setStatus((s) => (s === "ended" || s === "error" ? s : "paused"));
        }}
        onEnded={() => {
          const d = audioRef.current?.duration ?? 0;
          if (Number.isFinite(d) && d > 0) {
            currentTimeRef.current = d;
            setCurrentTime(d);
          }
          setStatus("ended");
          announce("Call complete");
        }}
        onError={handleError}
      />
      {liveRegion}
    </m.div>
  );
}
