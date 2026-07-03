import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Label } from "./label";
import { RadioGroup, RadioGroupItem } from "./radio-group";

const meta = {
  title: "Primitives/RadioGroup",
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="all">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="all" id="rg-all" />
        <Label htmlFor="rg-all">All calls</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="flagged" id="rg-flagged" />
        <Label htmlFor="rg-flagged">Flagged only</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="handoff" id="rg-handoff" disabled />
        <Label htmlFor="rg-handoff">Handoffs (disabled)</Label>
      </div>
    </RadioGroup>
  ),
};
