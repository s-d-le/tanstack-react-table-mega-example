"use client";

import { FC, useEffect, useState } from "react";
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
  const [columnOrder, setColumnOrder] = useState<string[]>([]);

  // set initial column order for DnD
  useEffect(() => {
    setColumnOrder(columns.map((c) => c.id!));
  }, [columns]);

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
      <table className="table" style={{ width: table.getTotalSize() }}>
        <thead className="th">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <SortableContext
                items={columnOrder}
                strategy={horizontalListSortingStrategy}
              >
                {headerGroup.headers.map((header) => (
                  <TableHeader key={header.id} header={header} />
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
