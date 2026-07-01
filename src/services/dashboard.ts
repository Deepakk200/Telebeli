/**
 * Dashboard data layer. In production these hit the voice-agent backend;
 * here they return typed, deterministic sample data behind a small delay so
 * loading states are real. Swap the bodies for fetch() calls — the shapes hold.
 */

export type CallDirection = "inbound" | "outbound";
export type CallStatus = "resolved" | "transferred" | "missed";

export type CallRecord = {
  id: string;
  contact: string;
  direction: CallDirection;
  status: CallStatus;
  durationSec: number;
  latencyMs: number;
  language: string;
  startedAt: string; // ISO
};

export type Kpi = {
  label: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  delta: number; // percentage change vs previous period
};

export type VolumePoint = { date: string; inbound: number; outbound: number };
export type LatencyPoint = { time: string; p50: number; p95: number };

const delay = <T>(value: T, ms = 350) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));

export function getKpis(): Promise<Kpi[]> {
  return delay([
    { label: "Calls today", value: 8421, delta: 12.4 },
    { label: "Resolution rate", value: 87.2, decimals: 1, suffix: "%", delta: 3.1 },
    { label: "Median latency", value: 128, suffix: "ms", delta: -8.0 },
    { label: "Avg handle time", value: 2.4, decimals: 1, suffix: "m", delta: -5.2 },
  ]);
}

export function getCallVolume(): Promise<VolumePoint[]> {
  const days = 14;
  const data: VolumePoint[] = Array.from({ length: days }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (days - 1 - i));
    const base = 2600 + Math.round(Math.sin(i / 2) * 700 + i * 40);
    return {
      date: d.toISOString().slice(0, 10),
      inbound: base,
      outbound: Math.round(base * 0.55 + Math.cos(i / 3) * 200),
    };
  });
  return delay(data);
}

export function getLatencySeries(): Promise<LatencyPoint[]> {
  const points = 24;
  const data: LatencyPoint[] = Array.from({ length: points }, (_, i) => ({
    time: `${String(i).padStart(2, "0")}:00`,
    p50: Math.round(120 + Math.sin(i / 2) * 18 + 8),
    p95: Math.round(240 + Math.sin(i / 2.4) * 40 + 30),
  }));
  return delay(data);
}

const contacts = [
  "Priya Nair", "Marcus Webb", "Sofia Alvarez", "Kenji Tanaka", "Amara Okafor",
  "Liam Doyle", "Nina Petrov", "Diego Santos", "Hana Kim", "Omar Farouk",
  "Elena Rossi", "Jamal Carter",
];
const languages = ["English", "Spanish", "Mandarin", "Hindi", "Arabic", "German"];
const statuses: CallStatus[] = ["resolved", "resolved", "resolved", "transferred", "missed"];

export function getRecentCalls(): Promise<CallRecord[]> {
  const data: CallRecord[] = Array.from({ length: 24 }, (_, i) => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - i * 7 - 3);
    return {
      id: `CALL-${(41280 - i).toString()}`,
      contact: contacts[i % contacts.length]!,
      direction: i % 3 === 0 ? "outbound" : "inbound",
      status: statuses[i % statuses.length]!,
      durationSec: 45 + ((i * 37) % 420),
      latencyMs: 108 + ((i * 13) % 90),
      language: languages[i % languages.length]!,
      startedAt: d.toISOString(),
    };
  });
  return delay(data);
}
