import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Question, Column as TColumn } from "@prisma/client";
import ColumnDeleteDialog from "./ColumnDeleteDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TRowContent } from "@/types";
import EditColumn from "./EditColumn";

interface DataTableColumnHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  column: TColumn & { question: Question | null };
  tableColumn: Column<TRowContent>;
}

export function DataTableColumnHeader({
  tableColumn,
  title,
  className,
  column,
}: DataTableColumnHeaderProps) {
  if (!tableColumn.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex w-[200px] items-center space-x-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="-ml-3 h-8 text-sm capitalize text-black data-[state=open]:bg-accent"
            variant="ghost"
            size="sm"
          >
            <span>{title}</span>
            {tableColumn.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 size-4" />
            ) : tableColumn.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 size-4" />
            ) : (
              <CaretSortIcon className="ml-2 size-4" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex max-w-[120px] flex-col items-center gap-1 p-1">
          <Button
            size="sm"
            variant="ghost"
            className="w-full justify-start bg-none p-0 px-1 shadow-none"
            onClick={() => tableColumn.toggleSorting(false)}
          >
            <ArrowUpIcon className="mr-2 size-3.5" />
            Asc
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="w-full justify-start bg-none p-0 px-1 shadow-none"
            onClick={() => tableColumn.toggleSorting(true)}
          >
            <ArrowDownIcon className="mr-2 size-3.5" />
            Desc
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="w-full justify-start bg-none p-0 px-1 shadow-none"
            onClick={() => tableColumn.toggleVisibility(false)}
          >
            <EyeNoneIcon className="mr-2 size-3.5" />
            Hide
          </Button>
          <EditColumn column={column} />
          <ColumnDeleteDialog columnId={column.id} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
