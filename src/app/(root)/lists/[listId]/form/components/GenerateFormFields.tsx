import Choices from "@/components/Choices";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Option, Question } from "@prisma/client";

interface GenerateFormFieldsProps {
  question: Question & { options: Option[] };
}

const GenerateFormFields = ({ question }: GenerateFormFieldsProps) => {
  switch (question.type) {
    case "TEXT":
    case "NUMBER":
      return <Input id={question.id} placeholder="Type here..." />;
    case "TEXTAREA":
      return <Textarea id={question.id} placeholder="Type here..." />;
    case "CHOICE":
      return <Choices question={question} />;
    case "DATE":
      return <Input type="date" id={question.id} />;
    default:
      return null;
  }
};

export default GenerateFormFields;
