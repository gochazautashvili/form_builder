import EditableInput from "@/components/EditableInput";
import { Badge } from "@/components/ui/badge";
import ColorPicker from "./ColorPicker";
import DeleteOptions from "./DeleteOptions";
import CreateOptions from "./CreateOptions";
import useChoices from "../hooks/use-choices";
import useEditChoiceName from "../hooks/use-choice-name";

interface ColumnOptionsProps {
  columnId: string;
  questionId?: string;
}

const ColumnOptions = ({ columnId, questionId }: ColumnOptionsProps) => {
  const { data, isLoading } = useChoices(columnId);
  const { mutate } = useEditChoiceName(columnId);

  const onEdit = (value: string, optionId: string) => {
    mutate({ name: value, optionId });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <Badge className="w-[100px] animate-pulse">loading...</Badge>
        <Badge className="w-[100px] animate-pulse">loading...</Badge>
        <Badge className="w-[100px] animate-pulse">loading...</Badge>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {data?.map((option, i) => {
        return (
          <div key={i} className="flex items-center justify-between">
            <EditableInput
              isLoading={false}
              content={option.name}
              onChange={(value) => onEdit(value, option.id)}
            >
              <Badge
                className="flex w-[100px] cursor-pointer items-center justify-center"
                style={{ background: option.color }}
              >
                {option.name}
              </Badge>
            </EditableInput>
            <div className="flex items-center gap-1">
              <ColorPicker
                columnId={columnId}
                optionId={option.id}
                selectedColor={option.color}
              />
              <DeleteOptions columnId={columnId} optionId={option.id} />
            </div>
          </div>
        );
      })}
      <CreateOptions questionId={questionId} columnId={columnId} />
    </div>
  );
};

export default ColumnOptions;
