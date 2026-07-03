import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

const meta = {
  title: "Primitives/Dialog",
  component: Dialog,
} satisfies Meta<typeof Dialog>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Focus is trapped inside; Esc closes and returns focus to the trigger.
    On compact viewports (viewport addon) it becomes a bottom sheet. */
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Open call detail</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Call CALL-41277</DialogTitle>
          <DialogDescription>
            Resolved · 2:05 · 128 ms median latency
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          The full transcript and score rubric render here in the product.
        </p>
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  ),
};
