import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Tag } from "./tag";

const meta = {
  title: "Primitives/Tag",
  component: Tag,
  args: { children: "Spanish" },
} satisfies Meta<typeof Tag>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Static: Story = {};

export const Removable: Story = {
  render: () => <Tag onRemove={() => {}}>Spanish</Tag>,
};

function SelectableDemo() {
  const [selected, setSelected] = useState(true);
  return (
    <div className="flex gap-2">
      <Tag selected={selected} onSelect={() => setSelected((s) => !s)}>
        Selected
      </Tag>
      <Tag selected={false} onSelect={() => {}}>
        Unselected
      </Tag>
    </div>
  );
}

export const Selectable: Story = { render: () => <SelectableDemo /> };
