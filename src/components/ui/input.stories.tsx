import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Input } from "./input";
import { Label } from "./label";

const meta = {
  title: "Primitives/Input",
  component: Input,
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

export const States: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-6">
      <div className="grid gap-2">
        <Label htmlFor="in-default">Workspace name</Label>
        <Input id="in-default" placeholder="Acme Support" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="in-disabled">Disabled</Label>
        <Input id="in-disabled" disabled value="Locked value" readOnly />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="in-error">Email (error preserves value)</Label>
        <Input
          id="in-error"
          aria-invalid
          aria-describedby="in-error-msg"
          defaultValue="not-an-email"
        />
        <p id="in-error-msg" className="text-xs text-destructive">
          Enter a valid email address.
        </p>
      </div>
    </div>
  ),
};
