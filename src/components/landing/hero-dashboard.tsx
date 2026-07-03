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
    <div className="flex flex-col rounded-md border border-border bg-surface p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-foreground">Call Analytics</span>
        <span className="inline-flex items-center gap-1 rounded-md border border-border px-1.5 py-0.5 text-[9px] text-ink-muted">
          This Week
          <ChevronDown className="size-2.5" aria-hidden />
        </span>
      </div>
      <svg
        viewBox="0 0 320 145"
        className="mt-2 w-full"
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
    <div className="flex flex-col gap-2 rounded-md border border-border bg-surface p-3">
      <span className="text-xs font-semibold text-foreground">Top Performing Agents</span>
      <div className="flex flex-col gap-2.5">
        {agents.map((a) => (
          <div key={a.name} className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-wash text-[8px] font-semibold text-accent">
                {a.initials}
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate font-medium text-foreground">{a.name}</p>
                <p className="text-[9px] text-ink-faint">{a.calls}</p>
              </div>
              <span className="font-mono text-[10px] font-semibold tabular-nums text-foreground">
                {a.pct}%
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-sunken">
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
    <div className="flex flex-col gap-2 rounded-md border border-border bg-surface p-3">
      <span className="text-xs font-semibold text-foreground">Call Summary</span>
      <div className="flex items-center gap-2">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white">
          <Play className="size-3.5 fill-current" aria-hidden />
        </span>
        <div aria-hidden className="flex h-8 flex-1 items-center justify-between">
          {waveform.map((h, i) => (
            <span
              key={i}
              className="w-0.5 shrink-0 rounded-full bg-accent/50"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between font-mono text-[9px] tabular-nums text-ink-faint">
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
    <div className="flex flex-col rounded-md border border-border bg-surface p-3">
      <span className="text-xs font-semibold text-foreground">Recent Calls</span>
      <ul className="mt-2 flex flex-col gap-2">
        {recentCalls.map((c) => (
          <li key={c.number} className="flex items-center gap-2">
            <span
              className={`flex size-6 shrink-0 items-center justify-center rounded-full ${
                c.ok ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
              }`}
            >
              <Phone className="size-3" aria-hidden />
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate font-mono text-[10px] font-medium text-foreground">
                {c.number}
              </p>
              <p className="text-[9px] text-ink-faint">
                {c.time} · {c.dur}
              </p>
            </div>
            <Badge
              variant={c.ok ? "resolved" : "flag"}
              className="h-auto shrink-0 px-1.5 py-0.5 text-[9px]"
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
      className="mx-auto mt-3 w-[210px] rounded-xl p-3 text-white shadow-floating ring-1 ring-white/10 sm:absolute sm:bottom-4 sm:right-4 sm:mt-0 sm:w-52"
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium">AI Agent Calling…</span>
        <ChevronDown className="size-3.5 text-white/70" aria-hidden />
      </div>
      <p className="mt-1.5 font-mono text-sm font-semibold tracking-tight">+1 (555) 123-4567</p>
      <p className="font-mono text-[11px] text-white/70">04:12</p>
      <div aria-hidden className="mt-2.5 flex h-6 items-center justify-between">
        {widgetWave.map((h, i) => (
          <span key={i} className="w-0.5 rounded-full bg-white/70" style={{ height: `${h}px` }} />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-around">
        {widgetControls.map((c) => (
          <div key={c.label} className="flex flex-col items-center gap-1">
            <span className="flex size-8 items-center justify-center rounded-full bg-white/15">
              <c.icon className="size-3.5" aria-hidden />
            </span>
            <span className="text-[8px] text-white/70">{c.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-center">
        <span className="flex size-10 items-center justify-center rounded-full bg-red-500 shadow-md">
          <Phone className="size-4 rotate-[135deg]" aria-hidden />
        </span>
      </div>
    </div>
  );
}

export function HeroDashboard() {
  return (
    <div className="relative">
      <div
        role="img"
        aria-label="Telebeli product dashboard preview"
        className="w-full overflow-hidden rounded-lg border border-border bg-surface text-[11px] leading-tight text-foreground shadow-floating"
      >
      {/* minmax(0,…) lifts the 1fr track's min-content floor so the mockup can
          compress to any phone width; the sidebar is desktop furniture and
          hides below sm — the composed mobile view leads with the KPIs. */}
      <div className="grid grid-cols-[minmax(0,1fr)] sm:grid-cols-[150px_minmax(0,1fr)]">
        {/* ── Sidebar ─────────────────────────────────────────────── */}
        <div className="hidden min-h-[440px] flex-col gap-3 border-r border-border bg-sunken/50 p-3 sm:flex">
          <div className="flex items-center gap-2 px-1 py-1">
            <LogoMark className="size-6" />
            <span className="text-sm font-semibold tracking-tight">
              Tele<span className="text-gradient-brand">beli</span>
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            {navItems.map((item) => (
              <span
                key={item.label}
                className={
                  item.active
                    ? "flex items-center gap-2 rounded-md bg-accent-wash px-2 py-1.5 font-medium text-accent"
                    : "flex items-center gap-2 rounded-md px-2 py-1.5 text-ink-muted"
                }
              >
                <item.icon className="size-3.5 shrink-0" aria-hidden />
                <span className="truncate">{item.label}</span>
              </span>
            ))}
          </div>

          {/* Pro Plan card, pinned to the bottom. */}
          <div className="mt-auto rounded-md border border-border bg-surface p-2.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">Pro Plan</span>
              <span className="rounded-full bg-success/15 px-1.5 py-0.5 text-[9px] font-semibold text-success">
                Active
              </span>
            </div>
            <p className="mt-1 text-ink-faint">Unlimited Calls</p>
            <p className="mt-2 font-medium text-accent">Manage Plan →</p>
          </div>
        </div>

        {/* ── Main area — named slots filled by P008–P013 ─────────── */}
        <div className="flex flex-col gap-3 p-3.5">
          {/* P008 — greeting header */}
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  Good Morning, Arjun <span aria-hidden>👋</span>
                </p>
                <p className="truncate text-ink-faint">
                  Here&apos;s what&apos;s happening with your AI agents today.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Gift className="size-4 text-ink-muted" aria-hidden />
                <span className="relative">
                  <Bell className="size-4 text-ink-muted" aria-hidden />
                  <span
                    aria-hidden
                    className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-destructive ring-2 ring-surface"
                  />
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-border bg-surface py-0.5 pl-0.5 pr-1.5">
                  <span className="flex size-5 items-center justify-center rounded-full bg-gradient-brand text-[8px] font-semibold text-white">
                    AS
                  </span>
                  <span className="hidden flex-col leading-none sm:flex">
                    <span className="text-[10px] font-semibold text-foreground">Arjun Sharma</span>
                    <span className="text-[9px] text-ink-faint">Admin</span>
                  </span>
                  <ChevronDown className="size-3 text-ink-faint" aria-hidden />
                </span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 self-end rounded-md border border-border bg-surface px-2 py-1 text-[10px] font-medium text-ink-muted">
              May 20 - May 26, 2024
              <ChevronDown className="size-3" aria-hidden />
            </span>
          </div>
          {/* P009 — KPI row (reflows 4 → 2 → 1) */}
          <div className="grid grid-cols-1 gap-2 min-[400px]:grid-cols-2 sm:grid-cols-4">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-md border border-border bg-surface p-2.5">
                <div className="flex items-start gap-2">
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-md text-white ${kpi.tile}`}
                  >
                    <kpi.icon className="size-3.5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[9px] leading-tight text-ink-faint">{kpi.label}</p>
                    <p className="font-mono text-sm font-bold tabular-nums text-foreground">
                      {kpi.value}
                    </p>
                  </div>
                </div>
                <p className="mt-1 inline-flex items-center gap-0.5 text-[10px] font-semibold text-success">
                  <ArrowUp className="size-2.5" aria-hidden />
                  {kpi.delta}
                </p>
              </div>
            ))}
          </div>
          {/* P010–P011 — call analytics chart + recent calls */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1.6fr_1fr]">
            <MockupChart />
            <RecentCalls />
          </div>
          {/* P012 — top agents + call summary */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
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
