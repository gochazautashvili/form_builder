import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Column } from "@prisma/client";
import useSelectChoice from "../hooks/use-select-choice";
import useChoices from "../hooks/use-choices";

interface ChoiceElementProps {
  rowId: string;
  content: string;
  column: Column;
}

const ChoiceElement = ({ content, column, rowId }: ChoiceElementProps) => {
  const { mutate } = useSelectChoice();
  const { data, isLoading } = useChoices(column.id);

  const handleEditChoice = (optionId: string) => {
    mutate({ columnId: column.id, optionId, rowId });
  };

  if (isLoading) {
    return <Badge className="w-[100px] animate-pulse">loading...</Badge>;
  }

  if (!data) {
    return (
      <Badge className="flex w-[100px] items-center justify-center text-center">
        empty
      </Badge>
    );
  }

  const option = data.find((option) => option.id === content);

  return (
    <Popover>
      <PopoverTrigger>
        <Badge
          className="flex w-[100px] items-center justify-center text-center"
          style={{ background: option?.color }}
        >
          {option?.name || "select"}
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="flex max-w-[100px] flex-col gap-1">
        {data.map((option) => (
          <Badge
            key={option.id}
            style={{ background: option.color }}
            onClick={() => handleEditChoice(option.id)}
            className="cursor-pointer select-none transition-opacity hover:opacity-70"
          >
            {option.name}
          </Badge>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default ChoiceElement;
