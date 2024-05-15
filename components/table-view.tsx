"use client";

import { FC, useState } from "react";
import { Box } from "@chakra-ui/react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import DATA, { ITask } from "./mock";

const columns = [
  {
    accessorKey: "task",
    header: "Task",
    cell: (props: any) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (props: any) => <p>{props.getValue()?.name}</p>,
  },
  {
    accessorKey: "due",
    header: "Due",
    cell: (props: any) => <p>{props.getValue()?.toLocaleTimeString()}</p>,
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: (props: any) => <p>{props.getValue()}</p>,
  },
];

interface TableViewProps {
  columns: ColumnDef<any, any>[];
  data: any[];
  onSortingChange?: (sorting: SortingState) => void;
}

const TableView: FC<TableViewProps> = ({ columns, data }) => {
  // const [data, setData] = useState<ITask[]>(DATA); //use props later
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel<ITask>(),
  });

  console.log(table.getHeaderGroups());

  return (
    <Box>
      <Box className="table" w={table.getTotalSize()}>
        {table.getHeaderGroups().map((headerGroup) => (
          <Box className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box className="th" key={header.id} w={header.getSize()}>
                {header.column.columnDef.header?.toString() ?? null}
              </Box>
            ))}
          </Box>
        ))}
        {table.getRowModel().rows.map((row) => (
          <Box className="tr" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Box className="td" key={cell.id} w={cell.column.getSize()}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TableView;
