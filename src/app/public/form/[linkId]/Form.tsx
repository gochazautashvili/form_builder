"use client";
import { TLink_data } from "@/types";
import { Label } from "@/components/ui/label";
import GenerateFormFields from "@/components/GenerateFormFields";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { create_response } from "./actions";
import LoadingButton from "@/components/LoadingButton";
import { toast } from "@/hooks/use-toast";

interface ListFormProps {
  link: TLink_data;
}

interface TData {
  [x: string]: string;
}

const ListForm = ({ link }: ListFormProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm();

  const onSubmit = (data: TData) => {
    const content = JSON.stringify(data);

    startTransition(() => {
      create_response(content, link.form.listId).then((res) => {
        if (res.error) {
          toast({ variant: "destructive", description: res.error });
        }

        if (res.success) {
          toast({ description: res.message });
          form.reset();
        }
      });
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex w-full max-w-[600px] flex-col gap-5 rounded-md bg-white p-4"
    >
      {link.form.questions.map((question) => {
        return (
          <div key={question.id} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold" htmlFor={question.id}>
                {question.question}
              </Label>
            </div>
            <GenerateFormFields
              form={form}
              key={question.id}
              question={question}
            />
          </div>
        );
      })}
      <LoadingButton isLoading={isPending} type="submit" className="mt-4">
        Submit
      </LoadingButton>
    </form>
  );
};

export default ListForm;
