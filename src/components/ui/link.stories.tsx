import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Link } from "./link";

const meta = {
  title: "Primitives/Link",
  component: Link,
  args: { href: "/security", children: "read the security packet" },
} satisfies Meta<typeof Link>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Inline: Story = {
  render: () => (
    <p className="max-w-md text-sm text-foreground">
      Every call is scored against the rubric — <Link href="/security">read the security packet</Link>{" "}
      for the full evidence chain.
    </p>
  ),
};
