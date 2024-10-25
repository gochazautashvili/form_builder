import { CircleX, Loader2 } from "lucide-react";
import useChoiceDelete from "../hooks/use-choice-delete";

interface DeleteOptionsProps {
  optionId: string;
  columnId: string;
}

const DeleteOptions = ({ optionId, columnId }: DeleteOptionsProps) => {
  const { mutate, isLoading } = useChoiceDelete(columnId);

  const handleDelete = () => {
    mutate(optionId);
  };

  return (
    <>
      {isLoading ? (
        <Loader2 className="size-5 animate-spin" />
      ) : (
        <CircleX onClick={handleDelete} className="size-5 cursor-pointer" />
      )}
    </>
  );
};

export default DeleteOptions;
