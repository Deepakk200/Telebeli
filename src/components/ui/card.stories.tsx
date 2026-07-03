import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { surface } from "@/lib/surface";

const meta = {
  title: "Primitives/Card",
  component: Card,
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Record aesthetic: flat + hairline by default; e1 only when interactive. */
export const Default: Story = {
  render: () => (
    <Card className="w-72">
      <CardHeader>
        <CardTitle>Resolution rate</CardTitle>
        <CardDescription>Last 14 days</CardDescription>
      </CardHeader>
      <CardContent className="font-mono text-2xl tabular-nums">87.2%</CardContent>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className={surface({ interactive: true, className: "w-72 p-6" })}>
      <p className="text-sm font-medium">Interactive surface (e1 on hover)</p>
      <p className="mt-1 text-sm text-muted-foreground">Composed via surface().</p>
    </div>
  ),
};
