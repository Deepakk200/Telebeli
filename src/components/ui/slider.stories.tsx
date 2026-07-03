import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Label } from "./label";
import { Slider } from "./slider";

const meta = {
  title: "Primitives/Slider",
  component: Slider,
} satisfies Meta<typeof Slider>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="grid w-72 gap-3">
      <Label htmlFor="sl-calls">Calls per month</Label>
      <Slider id="sl-calls" defaultValue={[4000]} min={0} max={10000} step={100} />
      <output className="text-evidence font-mono tabular-nums text-muted-foreground">4,000</output>
      <Slider defaultValue={[25, 75]} aria-label="Range" />
      <Slider defaultValue={[50]} disabled aria-label="Disabled" />
    </div>
  ),
};
