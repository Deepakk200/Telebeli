"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { surface } from "@/lib/surface";

export function DataTable<TData, TValue>({
  columns,
  data,
  caption,
  onRowActivate,
  onSortChange,
}: {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /** Screen-reader table summary (rendered as an sr-only <caption>). */
  caption?: string;
  /** When set, rows become click/Enter/Space-activatable (e.g. open call detail). */
  onRowActivate?: (row: TData) => void;
  /** Notified after any header-driven sort change (analytics etc.). */
  onSortChange?: (sorting: SortingState) => void;
}) {
  "use no memo"; // TanStack Table returns unmemoizable fns; opt out of React Compiler
  const [sorting, setSorting] = useState<SortingState>([]);
  const handleSortingChange = (
    updater: SortingState | ((previous: SortingState) => SortingState),
  ) => {
    const next = typeof updater === "function" ? updater(sorting) : updater;
    setSorting(next);
    onSortChange?.(next);
  };
  // eslint-disable-next-line react-hooks/incompatible-library -- headless table output is rendered immediately, not passed to memoized children
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: handleSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className={cn(surface({ elevation: "flat" }), "overflow-hidden")}>
      <Table>
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id} className="hover:bg-transparent">
              {hg.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const sorted = header.column.getIsSorted();
                return (
                  <TableHead
                    key={header.id}
                    className="whitespace-nowrap"
                    aria-sort={
                      canSort
                        ? sorted === "asc"
                          ? "ascending"
                          : sorted === "desc"
                            ? "descending"
                            : "none"
                        : undefined
                    }
                  >
                    {header.isPlaceholder ? null : canSort ? (
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-foreground"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <ArrowUpDown
                          className={cn(
                            "size-3.5 opacity-40",
                            header.column.getIsSorted() && "opacity-100",
                          )}
                        />
                      </button>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              tabIndex={onRowActivate ? 0 : undefined}
              onClick={onRowActivate ? () => onRowActivate(row.original) : undefined}
              onKeyDown={
                onRowActivate
                  ? (event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onRowActivate(row.original);
                      }
                    }
                  : undefined
              }
              className={cn(
                onRowActivate &&
                  "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
