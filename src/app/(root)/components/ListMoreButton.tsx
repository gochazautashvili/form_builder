import ListDeleteDialog from "@/components/ListDeleteDialog";
import ListDialog from "@/components/ListDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { List } from "@prisma/client";
import { MoreVertical } from "lucide-react";

interface ListMoreButtonProps {
  list: List;
}

const ListMoreButton = ({ list }: ListMoreButtonProps) => {
  return (
    <Popover>
      <PopoverTrigger className="absolute right-2 top-2 z-10" asChild>
        <MoreVertical className="cursor-pointer text-white" />
      </PopoverTrigger>
      <PopoverContent className="flex max-w-[110px] flex-col gap-1 p-1">
        <ListDialog list={list} />
        <ListDeleteDialog listId={list.id} />
      </PopoverContent>
    </Popover>
  );
};

export default ListMoreButton;
