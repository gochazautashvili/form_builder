"use client";
import { TForm_data } from "@/types";
import CreateQuestion from "./CreateQuestion";
import NavigateButton from "@/components/NavigateButton";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ControllersProps {
  form: TForm_data;
}

const Controllers = ({ form }: ControllersProps) => {
  return (
    <div className="fixed right-3 top-3 flex items-center gap-2 rounded-lg bg-white p-3 shadow-md">
      <NavigateButton url={`/lists/${form.listId}`}>
        <ArrowLeft className="size-5" />
      </NavigateButton>
      {!!form.links.length && (
        <NavigateButton url={`/public/form/${form.links[0].id}`}>
          Preview
          <ArrowRight className="ml-2 size-4" />
        </NavigateButton>
      )}
      <CreateQuestion formId={form.id} />
    </div>
  );
};

export default Controllers;
