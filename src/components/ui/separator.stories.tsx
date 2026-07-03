import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Separator } from "./separator";

const meta = {
  title: "Primitives/Separator",
  component: Separator,
} satisfies Meta<typeof Separator>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Hairlines: Story = {
  render: () => (
    <div className="w-64 text-sm">
      Section one
      <Separator className="my-3" />
      <div className="flex h-5 items-center gap-3">
        Left
        <Separator orientation="vertical" />
        Right
      </div>
    </div>
  ),
};
