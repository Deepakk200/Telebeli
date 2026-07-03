import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Status } from "./status";

const meta = {
  title: "Primitives/Status",
  component: Status,
} satisfies Meta<typeof Status>;
export default meta;
type Story = StoryObj<typeof meta>;

export const AllStates: Story = {
  args: { state: "live" },
  render: () => (
    <div className="flex items-center gap-6">
      <Status state="live" />
      <Status state="paused" />
      <Status state="resolved" />
      <Status state="live">On call · 2:41</Status>
    </div>
  ),
};
