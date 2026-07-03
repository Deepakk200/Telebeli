import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Label } from "./label";
import { Textarea } from "./textarea";

const meta = {
  title: "Primitives/Textarea",
  component: Textarea,
} satisfies Meta<typeof Textarea>;
export default meta;
type Story = StoryObj<typeof meta>;

export const States: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-6">
      <div className="grid gap-2">
        <Label htmlFor="ta-default">Escalation notes</Label>
        <Textarea id="ta-default" placeholder="What should the human agent know?" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="ta-invalid">Invalid</Label>
        <Textarea id="ta-invalid" aria-invalid defaultValue="Too short" />
      </div>
      <Textarea disabled value="Disabled" readOnly />
    </div>
  ),
};
