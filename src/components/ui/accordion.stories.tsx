import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

const meta = {
  title: "Primitives/Accordion",
  component: Accordion,
  args: { type: "single" },
} satisfies Meta<typeof Accordion>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="a" className="w-96">
      <AccordionItem value="a">
        <AccordionTrigger>How are calls scored?</AccordionTrigger>
        <AccordionContent>
          Every call is scored against a rubric — intent match, compliance, resolution.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>What happens on a handoff?</AccordionTrigger>
        <AccordionContent>
          The full context is passed to a human agent, and the record shows exactly what was passed.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
