import { BookOpen, Home, Landmark, Plane, Plus, ShoppingBag, type LucideIcon } from "lucide-react";
import { industries, type Industry } from "@/constants/landing";
import { cn } from "@/lib/utils";

/**
 * P09 — Industries, "Radial Hub" (RSC). Telebeli is the hub; six industries
 * orbit it, each tethered by a dashed connector. Pure CSS + inline SVG, zero
 * images, zero client JS — hover is `:has()`, motion is CSS keyframes gated on
 * `prefers-reduced-motion: no-preference` in the scoped <style> below (the
 * site's global reduced-motion rule also neuters them, belt and suspenders).
 *
 * Desktop (≥1024) and tablet (768–1023) share one radial <ul>; only the
 * decorative SVG differs (its viewBox matches each stage's aspect so the
 * percent-positioned nodes and the SVG connectors line up). Mobile (<768)
 * restructures into a hub + a dashed vertical spine of pucks.
 */

const HEADLINE_ID = "industries-heading";

type Tint = "lavender" | "pink";
type Side = "left" | "right";

const TINT: Record<Tint, { inner: string; icon: string; line: string }> = {
  lavender: { inner: "#EEF2FF", icon: "#4F46E5", line: "#4F46E5" },
  pink: { inner: "#FCE7F3", icon: "#DB2777", line: "#DB2777" },
};

const ICONS: Record<Industry["key"], LucideIcon> = {
  realestate: Home,
  education: BookOpen,
  ecommerce: ShoppingBag,
  healthcare: Plus,
  travel: Plane,
  finance: Landmark,
};

// Node positions as % of the stage (identical desktop/tablet), plus which side
// the label sits and the node tint. Matches the reference layout exactly.
const LAYOUT: Record<Industry["key"], { xPct: number; yPct: number; side: Side; tint: Tint }> = {
  realestate: { xPct: 39, yPct: 22, side: "left", tint: "lavender" },
  education: { xPct: 61, yPct: 22, side: "right", tint: "lavender" },
  ecommerce: { xPct: 30, yPct: 50, side: "left", tint: "pink" },
  healthcare: { xPct: 70, yPct: 50, side: "right", tint: "pink" },
  travel: { xPct: 39, yPct: 78, side: "left", tint: "lavender" },
  finance: { xPct: 61, yPct: 78, side: "right", tint: "lavender" },
};

const NODES = industries.map((it) => ({ ...it, ...LAYOUT[it.key] }));

// Motion + hover. Animation classes only inside `no-preference` → reduced motion
// renders a fully static, complete composition. Connector-brighten crosses from
// a node's hover into the SVG via :has() (pointer devices only).
const STYLE = `
.tbi-conn{transition:stroke-opacity .2s ease,fill-opacity .2s ease}
@keyframes tbi-breathe{0%,100%{box-shadow:0 24px 60px -20px rgba(124,58,237,.35)}50%{box-shadow:0 24px 60px -20px rgba(124,58,237,.5)}}
@keyframes tbi-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes tbi-spin{to{transform:rotate(360deg)}}
@keyframes tbi-dash{to{stroke-dashoffset:-9}}
@media (prefers-reduced-motion: no-preference){
  .tbi-breathe{animation:tbi-breathe 5s ease-in-out infinite}
  .tbi-float{animation:tbi-float 7s ease-in-out infinite}
  .tbi-spin{transform-box:fill-box;transform-origin:center;animation:tbi-spin 120s linear infinite}
  .tbi-dash{animation:tbi-dash 4s linear infinite}
}
@media (hover:hover) and (pointer:fine){
${NODES.map((n) => `.tbi-stage:has([data-ind="${n.key}"]:hover) [data-conn="${n.key}"]{stroke-opacity:.7;fill-opacity:1}`).join("\n")}
}`;

/** Telebeli brand mark, monochrome white: headset (band + earcups + right mic
 *  boom) around a "T" whose stem descends into a voice waveform. Recreated as
 *  SVG paths from the brand logo — no raster (badge is already the gradient). */
function HubGlyph({ className }: { className?: string }) {
  // Waveform bars flanking the T-stem: [centerX, height], symmetric about x=36.
  const bars: [number, number][] = [
    [30, 16],
    [42, 16],
    [26, 11],
    [46, 11],
    [22, 6],
    [50, 6],
  ];
  return (
    <svg viewBox="0 0 72 72" fill="none" aria-hidden className={className}>
      {/* headset: band over the top + two earcups + mic boom to the front */}
      <path d="M13 40 A23 22 0 0 1 59 40" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <rect x="9.5" y="34" width="7.5" height="16" rx="3.75" fill="currentColor" />
      <rect x="55" y="34" width="7.5" height="16" rx="3.75" fill="currentColor" />
      <path d="M58 50 Q58 61 45 61" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="44" cy="61" r="2.5" fill="currentColor" />
      {/* the "T": bar + stem */}
      <rect x="23" y="26" width="26" height="5.5" rx="2.75" fill="currentColor" />
      <rect x="34" y="26" width="4" height="27" rx="2" fill="currentColor" />
      {/* voice waveform around the stem */}
      {bars.map(([cx, h], i) => (
        <rect key={i} x={cx - 1.5} y={44 - h / 2} width="3" height={h} rx="1.5" fill="currentColor" />
      ))}
    </svg>
  );
}

/** Orbit rings + connectors + end dots. viewBox aspect matches the stage so the
 *  percent-positioned DOM nodes and these lines coincide at any width. */
function DiagramSvg({
  w,
  h,
  startR,
  nodeR,
  rings,
  className,
}: {
  w: number;
  h: number;
  startR: number;
  nodeR: number;
  rings: number[];
  className?: string;
}) {
  const cx = w / 2;
  const cy = h / 2;
  const ringOpacity = [0.1, 0.08, 0.06];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} aria-hidden className={cn("absolute inset-0 z-0 h-full w-full", className)}>
      {rings.map((r, i) => {
        const outer = i === rings.length - 1;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#4F46E5"
            strokeOpacity={ringOpacity[i]}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            strokeDasharray={outer ? "2 6" : undefined}
            className={outer ? "tbi-spin" : undefined}
          />
        );
      })}
      {NODES.map((n) => {
        const nx = (n.xPct / 100) * w;
        const ny = (n.yPct / 100) * h;
        const dx = nx - cx;
        const dy = ny - cy;
        const d = Math.hypot(dx, dy);
        const ux = dx / d;
        const uy = dy / d;
        const x1 = cx + ux * startR;
        const y1 = cy + uy * startR;
        const x2 = nx - ux * (nodeR + 3);
        const y2 = ny - uy * (nodeR + 3);
        const color = TINT[n.tint].line;
        return (
          <g key={n.key}>
            <line
              data-conn={n.key}
              className="tbi-conn tbi-dash"
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={color}
              strokeOpacity={0.35}
              strokeWidth={1.5}
              strokeDasharray="3 6"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <circle data-conn={n.key} className="tbi-conn" cx={x2} cy={y2} r={3} fill={color} fillOpacity={0.6} />
          </g>
        );
      })}
    </svg>
  );
}

function Hub({ mobile }: { mobile?: boolean }) {
  return (
    <div
      className={cn(
        "tbi-breathe flex items-center justify-center rounded-full bg-white/90",
        mobile ? "size-[148px]" : "size-[176px] lg:size-[180px]",
      )}
      style={{ boxShadow: "0 24px 60px -20px rgba(124,58,237,0.35)" }}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full",
          mobile ? "size-[120px]" : "size-[140px] lg:size-[144px]",
        )}
        style={{
          backgroundImage: "linear-gradient(135deg,#4F46E5,#7C3AED)",
          boxShadow: "inset 0 2px 6px rgba(255,255,255,0.25)",
        }}
      >
        <HubGlyph className="w-[41%] text-white" />
      </div>
    </div>
  );
}

export function Industries() {
  return (
    <section
      id="industries"
      aria-labelledby={HEADLINE_ID}
      className="relative scroll-mt-24 overflow-hidden py-12 lg:py-14"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header — centered (matches the reference). */}
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#4F46E5]">Industries</p>
          <h2
            id={HEADLINE_ID}
            className="mx-auto mt-4 max-w-3xl font-display text-[clamp(27px,7vw,32px)] font-bold leading-[1.15] tracking-[-0.02em] text-[#0F172A] md:text-[36px] lg:text-[44px]"
          >
            Built for high-stakes, high-volume operations
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-[1.6] text-[#475569] lg:text-[17px]">
            {"Telebeli is built for the sectors where a missed or mishandled call has real consequences. Here's where it fits — what it's built for, not who we can name."}
          </p>
        </header>

        {/* Radial diagram — tablet + desktop. */}
        <div className="tbi-stage relative mx-auto mt-6 hidden w-full max-w-[900px] md:block md:aspect-[760/560] lg:mt-8 lg:aspect-[1100/620]">
          <DiagramSvg w={760} h={560} startR={88} nodeR={40} rings={[168, 222, 277]} className="lg:hidden" />
          <DiagramSvg w={1100} h={620} startR={110} nodeR={48} rings={[200, 265, 330]} className="hidden lg:block" />

          <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
            <Hub />
          </div>

          <ul className="absolute inset-0 z-20 m-0 list-none p-0">
            {NODES.map((n, i) => {
              const Icon = ICONS[n.key];
              const t = TINT[n.tint];
              const left = n.side === "left";
              return (
                <li
                  key={n.key}
                  data-ind={n.key}
                  className="group absolute h-0 w-0"
                  style={{ left: `${n.xPct}%`, top: `${n.yPct}%` }}
                >
                  <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
                    <div className="tbi-float" style={{ animationDelay: `${i * 0.9}s` }}>
                      <div className="flex size-20 items-center justify-center rounded-full bg-white shadow-[0_16px_32px_-16px_rgba(15,23,42,0.20)] transition-[transform,box-shadow] duration-200 group-hover:scale-105 group-hover:shadow-[0_22px_40px_-16px_rgba(15,23,42,0.28)] lg:size-[78px]">
                        <div
                          className="flex size-[54px] items-center justify-center rounded-full lg:size-[52px]"
                          style={{ background: t.inner }}
                        >
                          <Icon className="size-6" style={{ color: t.icon }} strokeWidth={2} aria-hidden />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "absolute top-0 w-[170px] -translate-y-1/2 lg:w-[220px]",
                      left ? "right-14 text-right lg:right-[55px]" : "left-14 text-left lg:left-[55px]",
                    )}
                  >
                    <h3 className="whitespace-nowrap text-[17px] font-bold leading-tight text-[#0F172A] transition-colors duration-200 group-hover:text-[#4F46E5] lg:text-[19px]">
                      {n.name}
                    </h3>
                    <p className="mt-1 text-[13px] leading-[1.55] text-[#64748B] lg:text-[14px]">{n.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile (<768) — hub + dashed spine of pucks. */}
        <div className="mt-6 md:hidden">
          <div className="relative mx-auto flex h-[200px] w-[280px] items-center justify-center overflow-hidden">
            <svg viewBox="0 0 280 200" aria-hidden preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <ellipse cx="140" cy="100" rx="70" ry="70" fill="none" stroke="#4F46E5" strokeOpacity="0.1" strokeWidth="1" />
              <ellipse cx="140" cy="100" rx="96" ry="96" fill="none" stroke="#4F46E5" strokeOpacity="0.07" strokeWidth="1" />
            </svg>
            <div className="relative">
              <Hub mobile />
            </div>
          </div>
          <p className="mt-2 text-center text-[13px] text-[#64748B]">One agent, every line.</p>

          <ul className="relative mx-auto mt-8 max-w-[420px] list-none p-0">
            <span
              aria-hidden
              className="absolute bottom-[42px] left-[28px] top-[42px] w-px border-l border-dashed"
              style={{ borderColor: "rgba(79,70,229,0.30)" }}
            />
            {NODES.map((n) => {
              const Icon = ICONS[n.key];
              const t = TINT[n.tint];
              return (
                <li key={n.key} className="relative flex items-center gap-4 py-3.5">
                  <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_10px_24px_-12px_rgba(15,23,42,0.25)]">
                    <span className="flex size-10 items-center justify-center rounded-full" style={{ background: t.inner }}>
                      <Icon className="size-5" style={{ color: t.icon }} strokeWidth={2} aria-hidden />
                    </span>
                  </span>
                  <div>
                    <h3 className="text-[16px] font-bold text-[#0F172A]">{n.name}</h3>
                    <p className="mt-1 text-[14px] leading-[1.55] text-[#64748B]">{n.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <style>{STYLE}</style>
    </section>
  );
}
