import { Table } from "@tanstack/react-table";
import { DataTableViewOptions } from "./DataTableViewOptions";
import CreateColumn from "./CreateColumn";
import CreateRowButton from "./CreateRowButton";
import { TRowContent } from "@/types";

interface TableControllersProps {
  table: Table<TRowContent>;
}

const TableControllers = ({ table }: TableControllersProps) => {
  return (
    <div className="flex items-center justify-end gap-2">
      <CreateRowButton />
      <CreateColumn />
      <DataTableViewOptions table={table} />
    </div>
  );
};

export default TableControllers;
