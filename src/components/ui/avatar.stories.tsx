import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "./avatar";

const meta = {
  title: "Primitives/Avatar",
  component: Avatar,
} satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const SizesAndGroup: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      {(["sm", "default", "lg"] as const).map((size) => (
        <Avatar key={size} size={size}>
          <AvatarFallback>PN</AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroup>
        <Avatar><AvatarFallback>PN</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>MW</AvatarFallback></Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    </div>
  ),
};
