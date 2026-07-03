import {
  ArrowUp,
  Bell,
  Blocks,
  Bot,
  CalendarDays,
  ChevronDown,
  FileBarChart2,
  Gift,
  Grid3x3,
  History,
  LayoutGrid,
  Megaphone,
  Mic,
  Pause,
  Phone,
  PhoneCall,
  Play,
  Settings,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { LogoMark } from "@/components/common/logo";

/* Static, decorative product mockup (landing-page-approved.png). The whole card
   is exposed as one image (role="img"), so the illustrative demo text below
   creates no landmarks/headings and none of the items are real controls.
   Sidebar labels use the dashboard-spec surface vocabulary. */

const navItems = [
  { icon: LayoutGrid, label: "Overview", active: true },
  { icon: PhoneCall, label: "Live Calls" },
  { icon: History, label: "Call History" },
  { icon: Users, label: "Leads" },
  { icon: Bot, label: "Agents" },
  { icon: Megaphone, label: "Campaigns" },
  { icon: FileBarChart2, label: "Reports" },
  { icon: Blocks, label: "Integrations" },
  { icon: Settings, label: "Settings" },
];


/* Hand-authored static Call Analytics chart (landing-page-approved.png). Inline
   SVG only — no charting library reaches the marketing bundle (engineering
   architecture §Performance). Decorative: exposed as one labelled image. */
function MockupChart() {
  const yLabels = [
    { v: "2k", y: 10 },
    { v: "1.5k", y: 37.5 },
    { v: "1k", y: 65 },
    { v: "500", y: 92.5 },
  ];
  const xLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const xs = [35, 81, 127, 172, 218, 264, 310];
  const ys = [65, 76, 51, 32, 24, 70, 43];
  const line =
    "M35,65 C58,65 58,76 81,76 C104,76 104,51 127,51 C150,51 149,32 172,32 C195,32 195,24 218,24 C241,24 241,70 264,70 C287,70 287,43 310,43";
  return (
    <div className="flex flex-col rounded-md border border-border bg-surface p-[clamp(0.25rem,0.9vw,0.75rem)]">
      <div className="flex min-w-0 items-center justify-between gap-1 [&>span:first-child]:truncate [&>span:first-child]:text-[1em]">
        <span className="font-semibold text-foreground">Call Analytics</span>
        <span className="inline-flex items-center gap-1 rounded-md border border-border px-[clamp(0.125rem,0.5vw,0.375rem)] py-0.5 text-[0.8em] text-ink-muted">
          This Week
          <ChevronDown className="size-[1em]" aria-hidden />
        </span>
      </div>
      <svg
        viewBox="0 0 320 145"
        className="mt-[clamp(0.25rem,0.8vw,0.5rem)] w-full"
        role="img"
        aria-label="Illustrative weekly call analytics"
      >
        <defs>
          <linearGradient id="mc-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {yLabels.map((l) => (
          <g key={l.v}>
            <line x1="30" y1={l.y} x2="315" y2={l.y} stroke="var(--border)" strokeWidth="0.5" />
            <text x="4" y={l.y + 3} fontSize="8" fill="var(--ink-faint)">
              {l.v}
            </text>
          </g>
        ))}
        <path d={`${line} L310,120 L35,120 Z`} fill="url(#mc-fill)" />
        <path
          d={line}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {xs.map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy={ys[i]}
            r="2.5"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
        ))}
        {xLabels.map((l, i) => (
          <text key={l} x={xs[i]} y="138" fontSize="8" fill="var(--ink-faint)" textAnchor="middle">
            {l}
          </text>
        ))}
      </svg>
    </div>
  );
}

// Top Performing Agents (landing-page-approved.png). Percent is shown as text
// (not colour-only); gradient progress bars are token-styled.
const agents = [
  { name: "Sales Agent", calls: "892 Calls", pct: 92, initials: "SA" },
  { name: "Support Agent", calls: "680 Calls", pct: 88, initials: "SU" },
  { name: "Booking Agent", calls: "578 Calls", pct: 85, initials: "BA" },
];

function TopAgents() {
  return (
    <div className="flex flex-col gap-[clamp(0.25rem,0.7vw,0.5rem)] rounded-md border border-border bg-surface p-[clamp(0.25rem,0.9vw,0.75rem)]">
      <span className="font-semibold text-foreground">Top Performing Agents</span>
      <div className="flex flex-col gap-[clamp(0.2rem,0.7vw,0.625rem)]">
        {agents.map((a) => (
          <div key={a.name} className="flex flex-col gap-1">
            <div className="flex items-center gap-[clamp(0.2rem,0.65vw,0.5rem)]">
              <span className="flex size-[clamp(0.75rem,1.7vw,1.5rem)] shrink-0 items-center justify-center rounded-full bg-accent-wash text-[0.72em] font-semibold text-accent">
                {a.initials}
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate font-medium text-foreground">{a.name}</p>
                <p className="text-[0.82em] text-ink-faint">{a.calls}</p>
              </div>
              <span className="font-mono text-[0.9em] font-semibold tabular-nums text-foreground">
                {a.pct}%
              </span>
            </div>
            <div className="h-[clamp(0.125rem,0.42vw,0.375rem)] overflow-hidden rounded-full bg-sunken">
              <div className="h-full rounded-full bg-gradient-brand" style={{ width: `${a.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Static waveform bar heights (px). Never animates — the waveform animates only
// on real audio (design-system DNA rule); this is an illustration.
const waveform = [
  4, 7, 11, 6, 9, 13, 8, 5, 10, 14, 7, 4, 9, 12, 15, 10, 6, 8, 13, 9, 5, 11, 7, 4, 10, 13, 8, 6,
];

function CallSummary() {
  return (
    <div className="flex flex-col gap-[clamp(0.25rem,0.7vw,0.5rem)] rounded-md border border-border bg-surface p-[clamp(0.25rem,0.9vw,0.75rem)]">
      <span className="font-semibold text-foreground">Call Summary</span>
      <div className="flex items-center gap-[clamp(0.2rem,0.65vw,0.5rem)]">
        <span className="flex size-[clamp(1rem,2.3vw,2rem)] shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white">
          <Play className="size-[45%] fill-current" aria-hidden />
        </span>
        <div aria-hidden className="flex h-[clamp(1rem,2.3vw,2rem)] flex-1 items-center justify-between">
          {waveform.map((h, i) => (
            <span
              key={i}
              className="w-px shrink-0 rounded-full bg-accent/50"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between font-mono text-[0.82em] tabular-nums text-ink-faint">
        <span>02:45</span>
        <span>04:22</span>
      </div>
    </div>
  );
}

// Recent Calls (landing-page-approved.png). Status via the Badge primitive —
// semantic colour + text label, never colour alone. Illustrative data.
const recentCalls = [
  { number: "+1 (202) 555-0187", time: "2:15 PM", dur: "02:45", ok: true, status: "Successful" },
  { number: "+1 (415) 555-0123", time: "1:47 PM", dur: "03:12", ok: true, status: "Successful" },
  { number: "+1 (310) 555-0198", time: "1:32 PM", dur: "01:58", ok: false, status: "Voicemail" },
  { number: "+1 (518) 555-0112", time: "11:08 AM", dur: "04:22", ok: true, status: "Successful" },
  { number: "+1 (305) 555-0176", time: "10:12 AM", dur: "02:09", ok: true, status: "Successful" },
];

function RecentCalls() {
  return (
    <div className="flex flex-col rounded-md border border-border bg-surface p-[clamp(0.25rem,0.9vw,0.75rem)]">
      <span className="font-semibold text-foreground">Recent Calls</span>
      <ul className="mt-[clamp(0.2rem,0.7vw,0.5rem)] flex flex-col gap-[clamp(0.18rem,0.55vw,0.5rem)]">
        {recentCalls.map((c) => (
          <li key={c.number} className="flex items-center gap-[clamp(0.18rem,0.55vw,0.5rem)]">
            <span
              className={`flex size-[clamp(0.7rem,1.7vw,1.5rem)] shrink-0 items-center justify-center rounded-full ${
                c.ok ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
              }`}
            >
              <Phone className="size-[50%]" aria-hidden />
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate font-mono text-[0.9em] font-medium text-foreground">
                {c.number}
              </p>
              <p className="truncate text-[0.82em] text-ink-faint">
                {c.time} · {c.dur}
              </p>
            </div>
            <Badge
              variant={c.ok ? "resolved" : "flag"}
              className="h-auto shrink-0 px-[clamp(0.1rem,0.45vw,0.375rem)] py-0.5 text-[0.78em]"
            >
              {c.status}
            </Badge>
          </li>
        ))}
      </ul>
      <span className="mt-2.5 text-[10px] font-medium text-accent">View All Calls →</span>
    </div>
  );
}

// Illustrative KPIs (landing-page-approved.png). Solid colored icon tiles,
// mono numerals, green up-deltas (arrow carries the direction, not color alone).
const kpis: { icon: LucideIcon; tile: string; label: string; value: string; delta: string }[] = [
  { icon: Phone, tile: "bg-accent", label: "Total Calls", value: "2,350", delta: "12.5%" },
  { icon: PhoneCall, tile: "bg-success", label: "Successful Calls", value: "1,823", delta: "8.2%" },
  { icon: Users, tile: "bg-state-handoff", label: "Leads Captured", value: "658", delta: "15.3%" },
  { icon: CalendarDays, tile: "bg-gradient-brand", label: "Appointments", value: "128", delta: "11.7%" },
];

// Floating live-call widget (landing-page-approved.png). Static preview; the
// controls are visual only (inert, non-focusable) and the waveform never
// animates. Deep blue→violet gradient — overlaps the mockup at desktop and
// drops in-flow on mobile so it never overflows.
const widgetWave = [6, 10, 14, 8, 12, 16, 10, 6, 13, 17, 9, 7, 12, 15, 8, 5, 11, 14, 9, 6];
const widgetControls = [
  { icon: Mic, label: "Mute" },
  { icon: Pause, label: "Hold" },
  { icon: Grid3x3, label: "Keypad" },
];

function CallWidget() {
  return (
    <div
      role="img"
      aria-label="Live call preview"
      style={{
        backgroundImage: "linear-gradient(140deg, oklch(0.42 0.17 268), oklch(0.4 0.2 302))",
      }}
      className="absolute bottom-[clamp(-5.25rem,-2.7vw,-0.95rem)] right-[clamp(-1.75rem,-3.2vw,-0.55rem)] w-[clamp(6.35rem,18%,10.25rem)] rounded-xl p-[clamp(0.28rem,0.72vw,0.6rem)] text-[clamp(0.26rem,0.52vw,0.5rem)] text-white shadow-floating ring-1 ring-white/10"
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium">AI Agent Calling…</span>
        <ChevronDown className="size-[1.2em] text-white/70" aria-hidden />
      </div>
      <p className="mt-[0.3em] truncate whitespace-nowrap font-mono text-[1.02em] font-semibold tracking-normal">+1 (555) 123-4567</p>
      <p className="font-mono text-[0.92em] text-white/70">04:12</p>
      <div aria-hidden className="mt-[0.6em] flex h-[1.7em] items-center justify-between">
        {widgetWave.map((h, i) => (
          <span key={i} className="w-px rounded-full bg-white/70" style={{ height: `${h}px` }} />
        ))}
      </div>
      <div className="mt-[0.65em] flex items-center justify-around">
        {widgetControls.map((c) => (
          <div key={c.label} className="flex flex-col items-center gap-1">
            <span className="flex size-[2.35em] items-center justify-center rounded-full bg-white/15">
              <c.icon className="size-[1em]" aria-hidden />
            </span>
            <span className="text-[0.72em] text-white/70">{c.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-[0.65em] flex justify-center">
        <span className="flex size-[2.7em] items-center justify-center rounded-full bg-red-500 shadow-md">
          <Phone className="size-[1.1em] rotate-[135deg]" aria-hidden />
        </span>
      </div>
    </div>
  );
}

export function HeroDashboard() {
  return (
    <div className="relative mx-auto w-full max-w-[860px] lg:mx-0">
      <div
        role="img"
        aria-label="Telebeli product dashboard preview"
        className="w-full overflow-hidden rounded-lg border border-border bg-surface text-[clamp(0.32rem,0.64vw,0.625rem)] leading-tight text-foreground shadow-floating"
      >
      {/* minmax(0,…) lifts the 1fr track's min-content floor so the mockup can
          compress to any phone width; the sidebar is desktop furniture and
          hides below sm — the composed mobile view leads with the KPIs. */}
      <div className="grid grid-cols-[18.5%_minmax(0,1fr)]">
        {/* ── Sidebar ─────────────────────────────────────────────── */}
        <div className="flex min-h-[clamp(16rem,41vw,27rem)] flex-col gap-[clamp(0.25rem,0.8vw,0.75rem)] border-r border-border bg-sunken/50 p-[clamp(0.25rem,0.85vw,0.75rem)]">
          <div className="flex items-center gap-[clamp(0.15rem,0.55vw,0.5rem)] px-1 py-1">
            <LogoMark className="size-[clamp(0.85rem,1.9vw,1.5rem)]" />
            <span className="truncate text-[1.15em] font-semibold tracking-tight">
              Tele<span className="text-gradient-brand">beli</span>
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            {navItems.map((item) => (
              <span
                key={item.label}
                className={
                  item.active
                    ? "flex items-center gap-[clamp(0.15rem,0.55vw,0.5rem)] rounded-md bg-accent-wash px-[clamp(0.15rem,0.6vw,0.5rem)] py-[clamp(0.15rem,0.45vw,0.375rem)] font-medium text-accent"
                    : "flex items-center gap-[clamp(0.15rem,0.55vw,0.5rem)] rounded-md px-[clamp(0.15rem,0.6vw,0.5rem)] py-[clamp(0.15rem,0.45vw,0.375rem)] text-ink-muted"
                }
              >
                <item.icon className="size-[1.15em] shrink-0" aria-hidden />
                <span className="truncate">{item.label}</span>
              </span>
            ))}
          </div>

          {/* Pro Plan card, pinned to the bottom. */}
          <div className="mt-auto rounded-md border border-border bg-surface p-[clamp(0.2rem,0.75vw,0.625rem)]">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">Pro Plan</span>
              <span className="rounded-full bg-success/15 px-[clamp(0.1rem,0.45vw,0.375rem)] py-0.5 text-[0.78em] font-semibold text-success">
                Active
              </span>
            </div>
            <p className="mt-1 text-ink-faint">Unlimited Calls</p>
            <p className="mt-2 font-medium text-accent">Manage Plan →</p>
          </div>
        </div>

        {/* ── Main area — named slots filled by P008–P013 ─────────── */}
        <div className="flex flex-col gap-[clamp(0.25rem,0.8vw,0.75rem)] p-[clamp(0.35rem,1vw,0.875rem)]">
          {/* P008 — greeting header */}
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-[clamp(0.2rem,0.7vw,0.5rem)]">
              <div className="min-w-0">
                <p className="truncate text-[1.15em] font-semibold text-foreground">
                  Good Morning, Arjun <span aria-hidden>👋</span>
                </p>
                <p className="truncate text-ink-faint">
                  Here&apos;s what&apos;s happening with your AI agents today.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-[clamp(0.18rem,0.6vw,0.5rem)]">
                <Gift className="size-[1.2em] text-ink-muted" aria-hidden />
                <span className="relative">
                  <Bell className="size-[1.2em] text-ink-muted" aria-hidden />
                  <span
                    aria-hidden
                    className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-destructive ring-2 ring-surface"
                  />
                </span>
                <span className="flex items-center gap-[clamp(0.1rem,0.45vw,0.375rem)] rounded-full border border-border bg-surface py-0.5 pl-0.5 pr-[clamp(0.1rem,0.45vw,0.375rem)]">
                  <span className="flex size-[clamp(0.75rem,1.45vw,1.25rem)] items-center justify-center rounded-full bg-gradient-brand text-[0.7em] font-semibold text-white">
                    AS
                  </span>
                  <span className="flex flex-col leading-none">
                    <span className="truncate text-[0.9em] font-semibold text-foreground">Arjun Sharma</span>
                    <span className="text-[0.8em] text-ink-faint">Admin</span>
                  </span>
                  <ChevronDown className="size-[1em] text-ink-faint" aria-hidden />
                </span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 self-end rounded-md border border-border bg-surface px-[clamp(0.2rem,0.65vw,0.5rem)] py-[clamp(0.1rem,0.4vw,0.25rem)] text-[0.9em] font-medium text-ink-muted">
              May 20 - May 26, 2024
              <ChevronDown className="size-[1em]" aria-hidden />
            </span>
          </div>
          {/* P009 — KPI row (reflows 4 → 2 → 1) */}
          <div className="grid grid-cols-4 gap-[clamp(0.2rem,0.7vw,0.5rem)]">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-md border border-border bg-surface p-[clamp(0.2rem,0.75vw,0.625rem)]">
                <div className="flex items-start gap-[clamp(0.15rem,0.55vw,0.5rem)]">
                  <span
                    className={`flex size-[clamp(0.85rem,2vw,1.75rem)] shrink-0 items-center justify-center rounded-md text-white ${kpi.tile}`}
                  >
                    <kpi.icon className="size-[50%]" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[0.78em] leading-tight text-ink-faint">{kpi.label}</p>
                    <p className="font-mono text-[1.15em] font-bold tabular-nums text-foreground">
                      {kpi.value}
                    </p>
                  </div>
                </div>
                <p className="mt-[clamp(0.1rem,0.35vw,0.25rem)] inline-flex items-center gap-0.5 text-[0.82em] font-semibold text-success">
                  <ArrowUp className="size-[1em]" aria-hidden />
                  {kpi.delta}
                </p>
              </div>
            ))}
          </div>
          {/* P010–P011 — call analytics chart + recent calls */}
          <div className="grid grid-cols-[1.6fr_1fr] gap-[clamp(0.2rem,0.7vw,0.5rem)]">
            <MockupChart />
            <RecentCalls />
          </div>
          {/* P012 — top agents + call summary */}
          <div className="grid grid-cols-2 gap-[clamp(0.2rem,0.7vw,0.5rem)]">
            <TopAgents />
            <CallSummary />
          </div>
        </div>
      </div>
      </div>
      <CallWidget />
    </div>
  );
}
