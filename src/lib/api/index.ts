import { z } from "zod";

import {
  CallRecordSchema,
  KpiSchema,
  LatencyPointSchema,
  VolumePointSchema,
} from "@/lib/schemas";

/**
 * Typed API client scaffold. NOT live — nothing calls these yet; the
 * dashboard consumes the mock in services/dashboard.ts, which shares the
 * same schemas, so the shapes are locked on both sides.
 *
 * TODO(M12): point the dashboard's TanStack Query hooks at `api.*`, delete
 * the mock bodies, and set the real base URL/auth here. The swap is
 * mechanical: same names, same Zod-validated shapes.
 */
async function apiFetch<Schema extends z.ZodType>(
  path: string,
  schema: Schema,
  init?: RequestInit,
): Promise<z.output<Schema>> {
  const res = await fetch(path, init);
  if (!res.ok) {
    throw new Error(`API ${path} failed: ${res.status} ${res.statusText}`);
  }
  // Validate at the boundary — a backend drift fails loudly here, not in a chart.
  return schema.parse(await res.json());
}

export const api = {
  getKpis: () => apiFetch("/api/kpis", KpiSchema.array()),
  getCallVolume: () => apiFetch("/api/calls/volume", VolumePointSchema.array()),
  getLatencySeries: () => apiFetch("/api/calls/latency", LatencyPointSchema.array()),
  getRecentCalls: () => apiFetch("/api/calls/recent", CallRecordSchema.array()),
};
