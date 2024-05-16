import { CSSProperties } from "react";
import { flexRender, Header } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TableHeader = ({ header }: { header: Header<any, unknown> }) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id,
    });

  const style: CSSProperties = {
    position: "relative",
    opacity: isDragging ? 0.8 : 1,
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: "width transform 0.2s ease-in-out",
    whiteSpace: "nowrap",
    width: header.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <th
      colSpan={header.colSpan}
      ref={setNodeRef}
      //   className="relative px-6 py-3 text-left text-xs font-medium text-gray-500"
      style={style}
      onClick={header.column.getToggleSortingHandler()}
    >
      {header.column.columnDef.header?.toString() ?? null}
      {{
        asc: " 🔼",
        desc: " 🔽",
      }[header.column.getIsSorted() as string] ?? null}
      <button {...attributes} {...listeners}>
        🟰
      </button>
      <div
        onMouseDown={header.getResizeHandler()}
        onTouchStart={header.getResizeHandler()}
        className={`resizer ${
          header.column.getIsResizing() ? "isResizing" : ""
        }`}
      />
    </th>
  );
};

export default TableHeader;
