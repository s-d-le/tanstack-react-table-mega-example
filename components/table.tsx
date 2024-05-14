"use client";

import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
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
    cell: (props: any) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "due",
    header: "Due",
    cell: (props: any) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: (props: any) => <p>{props.getValue()}</p>,
  },
];

const Table = () => {
  const [data, setData] = useState<ITask[]>(DATA); //use props later
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel<ITask>(),
  });

  console.log(table.getHeaderGroups());

  return (
    <Box>
      <Box className="table">
        {table.getHeaderGroups().map((headerGroup) => (
          <Box className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box className="th" key={header.id}>
                {header.column.columnDef.header?.toString() ?? null}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Table;
