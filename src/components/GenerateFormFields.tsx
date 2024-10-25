import Choices from "@/components/Choices";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Column, Option, Question } from "@prisma/client";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface GenerateFormFieldsProps {
  question: Question & { options: Option[]; column: Column | null };
  form: UseFormReturn<FieldValues, any, undefined>;
}

const GenerateFormFields = ({ question, form }: GenerateFormFieldsProps) => {
  switch (question.type) {
    case "TEXT":
    case "NUMBER":
      return (
        <Input
          id={question.id}
          placeholder="Type here..."
          {...form.register(question.column?.id || "")}
        />
      );
    case "TEXTAREA":
      return (
        <Textarea
          id={question.id}
          placeholder="Type here..."
          {...form.register(question.column?.id || "")}
        />
      );
    case "CHOICE":
      return <Choices form={form} question={question} />;
    case "DATE":
      return (
        <Input
          type="date"
          id={question.id}
          {...form.register(question.column?.id || "")}
        />
      );
    default:
      return null;
  }
};

export default GenerateFormFields;
