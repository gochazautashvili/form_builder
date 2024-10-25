import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreVertical } from "lucide-react";
import RowDeleteButton from "./RowDeleteButton";

interface TableActionsProps {
  rowId: string;
}

const TableActions = ({ rowId }: TableActionsProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <MoreVertical className="size-5" />
      </PopoverTrigger>
      <PopoverContent className="flex max-w-[100px] flex-col gap-1">
        <RowDeleteButton rowId={rowId} />
      </PopoverContent>
    </Popover>
  );
};

export default TableActions;
