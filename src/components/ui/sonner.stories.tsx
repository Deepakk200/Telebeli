import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { toast } from "sonner";

import { Button } from "./button";
import { Toaster } from "./sonner";

const meta = {
  title: "Primitives/Toast",
  component: Toaster,
} satisfies Meta<typeof Toaster>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Kinds: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toaster position="bottom-right" />
      <Button variant="secondary" onClick={() => toast.success("Call resolved")}>
        Success
      </Button>
      <Button variant="secondary" onClick={() => toast.info("Handoff context passed")}>
        Info
      </Button>
      <Button variant="secondary" onClick={() => toast.warning("Latency rising")}>
        Warning
      </Button>
      <Button variant="secondary" onClick={() => toast.error("Webhook failed")}>
        Error
      </Button>
    </div>
  ),
};
