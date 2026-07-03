import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "./badge";

const meta = {
  title: "Primitives/Badge",
  component: Badge,
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const EvidencePalette: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge variant="live">Live</Badge>
      <Badge variant="resolved">Resolved</Badge>
      <Badge variant="handoff">Handoff</Badge>
      <Badge variant="flag">Flagged</Badge>
      <Badge variant="neutral">Neutral</Badge>
    </div>
  ),
};
