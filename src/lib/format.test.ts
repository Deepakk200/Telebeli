import { describe, expect, it } from "vitest";

import { formatCurrency, formatDuration, formatLatency, formatRelativeTime } from "./format";

describe("evidence formatters", () => {
  it("formats duration as m:ss", () => {
    expect(formatDuration(125)).toBe("2:05");
    expect(formatDuration(45)).toBe("0:45");
    expect(formatDuration(600)).toBe("10:00");
  });

  it("formats latency in ms", () => {
    expect(formatLatency(128)).toBe("128 ms");
    expect(formatLatency(127.6)).toBe("128 ms");
  });

  it("formats relative time with suffix", () => {
    const fiveMinAgo = new Date(Date.now() - 5 * 60_000);
    expect(formatRelativeTime(fiveMinAgo)).toBe("5 minutes ago");
  });

  it("formats currency with fixed two fractions (tabular columns align)", () => {
    expect(formatCurrency(1234.5)).toBe("$1,234.50");
    expect(formatCurrency(0.129)).toBe("$0.13");
  });
});
