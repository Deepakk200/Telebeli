import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "./button";
import { IconEscalate } from "./icon";

const meta = {
  title: "Primitives/Button",
  component: Button,
  args: { children: "Button" },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

const variants = ["primary", "secondary", "ghost", "danger"] as const;
const sizes = ["sm", "md", "lg"] as const;

export const VariantsAndSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <div key={variant} className="flex items-center gap-3">
          {sizes.map((size) => (
            <Button key={size} variant={variant} size={size}>
              {variant} {size}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
      <Button variant="secondary">
        <IconEscalate /> Leading icon
      </Button>
      <Button size="icon" aria-label="Escalate">
        <IconEscalate />
      </Button>
    </div>
  ),
};

export const Primary: Story = { args: { variant: "primary" } };
export const Danger: Story = { args: { variant: "danger", children: "Delete" } };
