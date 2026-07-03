import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Checkbox } from "./checkbox";
import { Label } from "./label";

const meta = {
  title: "Primitives/Label",
  component: Label,
} satisfies Meta<typeof Label>;
export default meta;
type Story = StoryObj<typeof meta>;

export const WithControl: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="lbl-demo" />
      <Label htmlFor="lbl-demo">Notify me when a call is flagged</Label>
    </div>
  ),
};
