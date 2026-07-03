import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

const meta = {
  title: "Primitives/Select",
  component: Select,
} satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select defaultValue="en">
      <SelectTrigger className="w-48" aria-label="Language">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="es">Spanish</SelectItem>
        <SelectItem value="zh">Mandarin</SelectItem>
        <SelectItem value="hi" disabled>
          Hindi (coming soon)
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};
