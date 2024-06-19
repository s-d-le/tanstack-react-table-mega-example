import { CSSProperties } from "react";
import { flexRender, Cell } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TableCell = ({ cell }: { cell: Cell<any, unknown> }) => {
  console.log(cell);
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: "width transform 0.2s ease-in-out",
    width: cell.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <td className="td cell-padding" style={style} ref={setNodeRef}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
};

export default TableCell;
