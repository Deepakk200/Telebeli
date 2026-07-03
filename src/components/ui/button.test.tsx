import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "./button";

/* Smoke test proving the jsdom + Testing Library pipeline (execution-handbook §7). */
describe("Button", () => {
  it("renders an accessible button", () => {
    render(<Button>Save changes</Button>);
    expect(screen.getByRole("button", { name: "Save changes" })).toBeInTheDocument();
  });

  it("respects disabled", () => {
    render(<Button disabled>Save changes</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
