import { z } from "zod";

/**
 * Base entity schemas — the single source of truth for data shapes at every
 * boundary (Zod-as-source-of-truth, engineering-architecture §state). TS
 * types derive from these; the mock service and the future API client both
 * validate against them, so swapping mock → live in M12 can't drift shapes.
 */

export const CallDirectionSchema = z.enum(["inbound", "outbound"]);
export const CallStatusSchema = z.enum(["resolved", "transferred", "missed"]);

export const CallRecordSchema = z.object({
  id: z.string(),
  contact: z.string(),
  direction: CallDirectionSchema,
  status: CallStatusSchema,
  durationSec: z.number().nonnegative(),
  latencyMs: z.number().nonnegative(),
  language: z.string(),
  startedAt: z.iso.datetime(),
});

export const KpiSchema = z.object({
  label: z.string(),
  value: z.number(),
  decimals: z.number().int().optional(),
  prefix: z.string().optional(),
  suffix: z.string().optional(),
  /** Percentage change vs previous period. */
  delta: z.number(),
});

export const VolumePointSchema = z.object({
  date: z.iso.date(),
  inbound: z.number(),
  outbound: z.number(),
});

export const LatencyPointSchema = z.object({
  time: z.string(),
  p50: z.number(),
  p95: z.number(),
});

export const AgentSchema = z.object({
  name: z.string(),
  role: z.string(),
  live: z.boolean(),
  calls: z.number().int().nonnegative(),
  latency: z.number().nonnegative(),
});

export type CallDirection = z.infer<typeof CallDirectionSchema>;
export type CallStatus = z.infer<typeof CallStatusSchema>;
export type CallRecord = z.infer<typeof CallRecordSchema>;
export type Kpi = z.infer<typeof KpiSchema>;
export type VolumePoint = z.infer<typeof VolumePointSchema>;
export type LatencyPoint = z.infer<typeof LatencyPointSchema>;
export type Agent = z.infer<typeof AgentSchema>;
