import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Question } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import DeleteQuestion from "./DeleteQuestion";
import EditQuestion from "./EditQuestion";

interface GenerateFormFieldsProps {
  question: Question;
}

const QuestionMoreButton = ({ question }: GenerateFormFieldsProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <MoreHorizontal />
      </PopoverTrigger>
      <PopoverContent className="flex max-w-[100px] flex-col gap-1">
        <DeleteQuestion questionId={question.id} />
        <EditQuestion question={question} />
      </PopoverContent>
    </Popover>
  );
};

export default QuestionMoreButton;
