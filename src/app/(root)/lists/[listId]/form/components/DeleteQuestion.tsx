import LoadingButton from "@/components/LoadingButton";
import { useTransition } from "react";
import { delete_question } from "../actions";
import useListId from "@/hooks/use-listId";
import { toast } from "@/hooks/use-toast";
import { Trash } from "lucide-react";

interface DeleteQuestionProps {
  questionId: string;
}

const DeleteQuestion = ({ questionId }: DeleteQuestionProps) => {
  const [isPending, startDelete] = useTransition();
  const listId = useListId();

  const handleDelete = () => {
    startDelete(() => {
      delete_question(questionId, listId).then((res) => {
        if (res.error) {
          toast({ variant: "destructive", description: res.error });
        }

        if (res.success) {
          toast({ description: res.message });
        }
      });
    });
  };

  return (
    <LoadingButton
      size="sm"
      variant="destructive"
      isLoading={isPending}
      onClick={handleDelete}
    >
      <Trash className="mr-2 size-4" />
      Delete
    </LoadingButton>
  );
};

export default DeleteQuestion;
