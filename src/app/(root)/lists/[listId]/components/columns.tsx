"use client";
import { Column, Question } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./Column";
import { TRowContent } from "@/types";
import TableSwitch from "./TableSwitch";
import TableActions from "./TableActions";

type ColumnWithQuestion = Column & { question: Question | null };

export const getColumns = (columns: ColumnWithQuestion[]) => {
  const generatedColumns: ColumnDef<TRowContent>[] = columns.map((item) => {
    return {
      accessorKey: item.id,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={item}
          title={item.name}
          tableColumn={column}
        />
      ),
      cell: ({ row }) => {
        return (
          <TableSwitch
            rowId={row.original?.rowId}
            content={row.getValue(item.id) || "no data..."}
            column={item}
            type={item.type}
          />
        );
      },
    };
  });

  const data: ColumnDef<TRowContent>[] = [
    ...generatedColumns,
    {
      accessorKey: "actions",
      header: () => <div className="text-black">Actions</div>,
      cell: ({ row }) => {
        return <TableActions rowId={row.original.rowId} />;
      },
    },
  ];

  return data;
};
