"use client";

import { FC, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

// needed for table body level scope DnD setup
import {
  DndContext,
  MouseSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import TableHeader from "@/components/table-header";
import TableCell from "@/components/table-cell";

interface TableViewProps {
  columns: ColumnDef<any, any>[];
  data: any[];
}

const TableView: FC<TableViewProps> = ({ columns, data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnOrder, setColumnOrder] = useState<string[]>(() =>
    columns.map((c) => c.id!)
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnOrder },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnOrderChange: setColumnOrder,
    columnResizeMode: "onChange",
  });

  // reorder columns after drag & drop
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
      });
    }
  }

  const sensors = useSensors(useSensor(MouseSensor, {}));

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <table
        className="min-w-full border border-gray-300 divide-y divide-gray-200"
        style={{ width: table.getTotalSize() }}
      >
        <thead className="">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <SortableContext
                items={columnOrder}
                strategy={horizontalListSortingStrategy}
              >
                {headerGroup.headers.map((header) => (
                  <>
                    <TableHeader key={header.id} header={header} />
                    {/* <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      style={{ width: header.column.getSize() }}
                    >
                      {header.column.columnDef.header?.toString() ?? null}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={`resizer ${
                          header.column.getIsResizing() ? "isResizing" : ""
                        }`}
                      />
                    </th> */}
                  </>
                ))}
              </SortableContext>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <SortableContext
                  key={cell.id}
                  items={columnOrder}
                  strategy={horizontalListSortingStrategy}
                >
                  <TableCell key={cell.id} cell={cell} />
                  {/* <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td> */}
                </SortableContext>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </DndContext>
  );
};

export default TableView;
