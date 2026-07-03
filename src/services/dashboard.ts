import {
  CallRecordSchema,
  KpiSchema,
  LatencyPointSchema,
  VolumePointSchema,
  type CallRecord,
  type CallStatus,
  type Kpi,
  type LatencyPoint,
  type VolumePoint,
} from "@/lib/schemas";

/**
 * Dashboard data layer — the swappable interface. Mock bodies return typed,
 * deterministic sample data behind a small delay so loading states are real,
 * and every response is validated against the shared Zod schemas (the same
 * ones the lib/api client scaffold uses). M12 swaps these bodies for api.*
 * calls; the shapes cannot drift because both sides parse the same schemas.
 */

export type {
  CallDirection,
  CallStatus,
  CallRecord,
  Kpi,
  VolumePoint,
  LatencyPoint,
} from "@/lib/schemas";

const delay = <T>(value: T, ms = 350) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));

export function getKpis(): Promise<Kpi[]> {
  return delay(
    KpiSchema.array().parse([
      // 4996 = the volume chart's final-day inbound+outbound, so the KPI and chart agree on-screen.
      { label: "Calls today", value: 4996, delta: 12.4 },
      { label: "Resolution rate", value: 87.2, decimals: 1, suffix: "%", delta: 3.1 },
      { label: "Median latency", value: 128, suffix: "ms", delta: -8.0 },
      { label: "Avg handle time", value: 2.4, decimals: 1, suffix: "m", delta: -5.2 },
    ]),
  );
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
  return delay(VolumePointSchema.array().parse(data));
}

export function getLatencySeries(): Promise<LatencyPoint[]> {
  const points = 24;
  const data: LatencyPoint[] = Array.from({ length: points }, (_, i) => ({
    time: `${String(i).padStart(2, "0")}:00`,
    p50: Math.round(120 + Math.sin(i / 2) * 18 + 8),
    p95: Math.round(240 + Math.sin(i / 2.4) * 40 + 30),
  }));
  return delay(LatencyPointSchema.array().parse(data));
}

const contacts = [
  "Priya Nair", "Marcus Webb", "Sofia Alvarez", "Kenji Tanaka", "Amara Okafor",
  "Liam Doyle", "Nina Petrov", "Diego Santos", "Hana Kim", "Omar Farouk",
  "Elena Rossi", "Jamal Carter",
];
const languages = ["English", "Spanish", "Mandarin", "Hindi", "Arabic", "German"];
// 13/15 resolved ≈ 86.7%, matching the 87.2% resolution-rate KPI (was 3/5 = 60%);
// transferred/missed interleaved so a table page never shows a solid resolved block.
const statuses: CallStatus[] = [
  "resolved", "resolved", "resolved", "resolved", "transferred",
  "resolved", "resolved", "resolved", "resolved", "resolved",
  "missed", "resolved", "resolved", "resolved", "resolved",
];

export function getRecentCalls(): Promise<CallRecord[]> {
  const data: CallRecord[] = Array.from({ length: 24 }, (_, i) => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - i * 7 - 3);
    return {
      id: `CALL-${(41280 - i).toString()}`,
      contact: contacts[i % contacts.length]!,
      direction: i % 3 === 0 ? "outbound" : "inbound",
      status: statuses[i % statuses.length]!,
      durationSec: 45 + ((i * 37) % 200), // mean ≈ 137s ≈ the 2.4m avg-handle-time KPI (was ≈ 4.2m)
      latencyMs: 108 + ((i * 13) % 90),
      language: languages[i % languages.length]!,
      startedAt: d.toISOString(),
    };
  });
  return delay(CallRecordSchema.array().parse(data));
}
