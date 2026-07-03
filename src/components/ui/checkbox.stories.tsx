import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Checkbox } from "./checkbox";
import { Label } from "./label";

const meta = {
  title: "Primitives/Checkbox",
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="cb-1" />
        <Label htmlFor="cb-1">Unchecked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="cb-2" defaultChecked />
        <Label htmlFor="cb-2">Checked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="cb-3" checked="indeterminate" />
        <Label htmlFor="cb-3">Indeterminate</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="cb-4" disabled />
        <Label htmlFor="cb-4">Disabled</Label>
      </div>
    </div>
  ),
};
