/**
 * In case there are too many columns, we can force some columns to be visible on render
 */
import { ColumnDef } from "@tanstack/react-table";

export const visibleColumns: ColumnDef<unknown, any>[] = [
  {
    accessorKey: "Name",
    id: "Name",
    header: "Name",
  },
  {
    accessorKey: "Review (Stars)",
    id: "Review (Stars)",
    header: "Review (Stars)",
  },
  {
    accessorKey: "Price Range",
    id: "Price Range",
    header: "Price Range",
  },
  {
    accessorKey: "Cuisine Type",
    id: "Cuisine Type",
    header: "Cuisine Type",
  },
  {
    accessorKey: "Location",
    id: "Location",
    header: "Location",
  },
  {
    accessorKey: "Established",
    id: "Established",
    header: "Established",
  },
];
