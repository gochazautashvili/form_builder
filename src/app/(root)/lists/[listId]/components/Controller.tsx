"use client";
import ListDeleteDialog from "@/components/ListDeleteDialog";
import ListDialog from "@/components/ListDialog";
import NavigateButton from "@/components/NavigateButton";
import { TList_data } from "@/types";
import { ArrowLeft } from "lucide-react";
import CreateFormButton from "./CreateFormButton";

interface ControllerProps {
  list: TList_data;
}

const Controller = ({ list }: ControllerProps) => {
  return (
    <header className="mb-10 flex h-16 w-full items-center shadow-md">
      <nav className="mx-auto flex w-full max-w-screen-2xl items-center gap-4 px-4">
        <NavigateButton url="/">
          <ArrowLeft />
        </NavigateButton>
        <ListDeleteDialog listId={list.id} />
        <ListDialog list={list} />
        <CreateFormButton listId={list.id} form={list.form} />
      </nav>
    </header>
  );
};

export default Controller;
