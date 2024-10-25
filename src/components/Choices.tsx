import { Label } from "@/components/ui/label";
import { Option, Question } from "@prisma/client";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface ChoicesProps {
  question: Question & { options: Option[] };
  form?: UseFormReturn<FieldValues, any, undefined>;
}

const Choices = ({ question, form }: ChoicesProps) => {
  return (
    <div className="flex flex-col gap-1">
      {question.options.map((option, i) => {
        return (
          <div key={option.id} className="flex items-center gap-2">
            <input
              type="radio"
              id={option.id}
              value={option.id}
              className="size-4"
              name={question.question}
              defaultChecked={i === 0}
              {...form?.register(question.columnId || "")}
            />
            <Label
              htmlFor={option.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option.name}
            </Label>
          </div>
        );
      })}
    </div>
  );
};

export default Choices;
