import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = {
  title: "Primitives/Tabs",
  component: Tabs,
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="transcript" className="w-96">
      <TabsList>
        <TabsTrigger value="transcript">Transcript</TabsTrigger>
        <TabsTrigger value="timeline">Timeline</TabsTrigger>
        <TabsTrigger value="score" disabled>
          Score
        </TabsTrigger>
      </TabsList>
      <TabsContent value="transcript" className="text-sm text-muted-foreground">
        Turn-by-turn transcript renders here.
      </TabsContent>
      <TabsContent value="timeline" className="text-sm text-muted-foreground">
        The annotated call timeline renders here.
      </TabsContent>
    </Tabs>
  ),
};

export const Line: Story = {
  render: () => (
    <Tabs defaultValue="a" className="w-96">
      <TabsList variant="line">
        <TabsTrigger value="a">Overview</TabsTrigger>
        <TabsTrigger value="b">Details</TabsTrigger>
      </TabsList>
      <TabsContent value="a" className="text-sm text-muted-foreground">
        Line variant content.
      </TabsContent>
      <TabsContent value="b" className="text-sm text-muted-foreground">
        Second pane.
      </TabsContent>
    </Tabs>
  ),
};
