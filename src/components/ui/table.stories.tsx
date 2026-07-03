import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "./badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

const meta = {
  title: "Primitives/Table",
  component: Table,
} satisfies Meta<typeof Table>;
export default meta;
type Story = StoryObj<typeof meta>;

const rows = [
  { id: "CALL-41280", contact: "Priya Nair", status: "resolved", duration: "2:05" },
  { id: "CALL-41279", contact: "Marcus Webb", status: "handoff", duration: "4:12" },
  { id: "CALL-41278", contact: "Sofia Alvarez", status: "flag", duration: "0:48" },
] as const;

/** Rows separate by hairline, never shadow; records read in mono. */
export const Records: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Call</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.id}>
            <TableCell className="font-mono tabular-nums">{r.id}</TableCell>
            <TableCell>{r.contact}</TableCell>
            <TableCell>
              <Badge variant={r.status}>{r.status}</Badge>
            </TableCell>
            <TableCell className="font-mono tabular-nums">{r.duration}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
