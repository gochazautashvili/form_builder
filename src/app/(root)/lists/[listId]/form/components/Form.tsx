"use client";
import { Button } from "@/components/ui/button";
import { TForm_data } from "@/types";
import { Label } from "@/components/ui/label";
import QuestionMoreButton from "./QuestionMoreButton";
import GenerateFormFields from "./GenerateFormFields";

interface ListFormProps {
  form: TForm_data;
}

const ListForm = ({ form }: ListFormProps) => {
  return (
    <div className="flex w-full max-w-[600px] flex-col gap-5 rounded-md bg-white p-4">
      {form.questions.map((question) => {
        return (
          <div key={question.id} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold" htmlFor={question.id}>
                {question.question}
              </Label>
              <QuestionMoreButton question={question} />
            </div>
            <GenerateFormFields key={question.id} question={question} />
          </div>
        );
      })}
      <Button className="mt-4">Submit</Button>
    </div>
  );
};

export default ListForm;
