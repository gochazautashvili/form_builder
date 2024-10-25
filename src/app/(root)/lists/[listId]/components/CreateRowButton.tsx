"use client";
import { Plus } from "lucide-react";
import LoadingButton from "@/components/LoadingButton";
import useListId from "@/hooks/use-listId";
import useCreateRow from "../hooks/use-create-row";

const CreateRowButton = () => {
  const listId = useListId();
  const { mutate, isLoading } = useCreateRow();

  const handleCreateRow = () => {
    mutate(listId);
  };

  return (
    <LoadingButton
      size="sm"
      variant="ghost"
      isLoading={isLoading}
      onClick={handleCreateRow}
    >
      <Plus className="mr-2 size-4" /> Add row
    </LoadingButton>
  );
};

export default CreateRowButton;
