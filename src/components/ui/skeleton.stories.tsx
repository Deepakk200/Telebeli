import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Skeleton } from "./skeleton";

const meta = {
  title: "Primitives/Skeleton",
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Skeleton mirrors the shape it replaces — a stat card here. */
export const MirrorsShape: Story = {
  render: () => (
    <div className="w-64 rounded-xl border bg-card p-6">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-3 h-8 w-32" />
      <Skeleton className="mt-3 h-3 w-40" />
    </div>
  ),
};
