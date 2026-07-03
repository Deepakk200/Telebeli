import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

const meta = {
  title: "Primitives/Tooltip",
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TooltipProvider delayDuration={60}>
      <Tooltip defaultOpen>
        <TooltipTrigger asChild>
          <Button variant="secondary">Hover or focus me</Button>
        </TooltipTrigger>
        <TooltipContent>Latency p95 across the last 24h</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
