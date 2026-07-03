import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

const meta = {
  title: "Primitives/DropdownMenu",
  component: DropdownMenu,
} satisfies Meta<typeof DropdownMenu>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Filters</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Show calls</DropdownMenuLabel>
        <DropdownMenuCheckboxItem checked>Resolved</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Handoffs</DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value="24h">
          <DropdownMenuRadioItem value="24h">Last 24h</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="7d">Last 7 days</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Clear filters</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
