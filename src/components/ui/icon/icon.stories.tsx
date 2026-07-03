import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Icon,
  IconAlert,
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconChevronUp,
  IconCircle,
  IconCircleCheck,
  IconCircleX,
  IconEscalate,
  IconEventMarker,
  IconHandoff,
  IconInfo,
  IconInspect,
  IconLoader,
  IconMinus,
  IconScoreTag,
  IconTimelineNode,
  IconX,
} from "./index";

const meta = {
  title: "Primitives/Icon",
  component: Icon,
} satisfies Meta<typeof Icon>;
export default meta;
type Story = StoryObj<typeof meta>;

const core = [
  ["X", IconX], ["Check", IconCheck], ["Minus", IconMinus],
  ["ChevronDown", IconChevronDown], ["ChevronUp", IconChevronUp], ["ChevronRight", IconChevronRight],
  ["Circle", IconCircle], ["CircleCheck", IconCircleCheck], ["CircleX", IconCircleX],
  ["Info", IconInfo], ["Alert", IconAlert], ["Loader", IconLoader],
] as const;

const annotation = [
  ["TimelineNode", IconTimelineNode], ["EventMarker", IconEventMarker], ["ScoreTag", IconScoreTag],
  ["Handoff", IconHandoff], ["Escalate", IconEscalate], ["Inspect", IconInspect],
] as const;

function Grid({ glyphs }: { glyphs: ReadonlyArray<readonly [string, typeof IconX]> }) {
  return (
    <div className="grid grid-cols-6 gap-4">
      {glyphs.map(([name, Glyph]) => (
        <div key={name} className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
          <Glyph label={name} />
          {name}
        </div>
      ))}
    </div>
  );
}

export const CoreSet: Story = { render: () => <Grid glyphs={core} /> };
export const AnnotationFamily: Story = { render: () => <Grid glyphs={annotation} /> };
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      {([16, 18, 20, 24] as const).map((s) => (
        <IconInspect key={s} size={s} label={`${s}px`} />
      ))}
    </div>
  ),
};
