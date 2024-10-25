"use client";
import { Column, Option, Type } from "@prisma/client";
import EditableInput from "../../../../../components/EditableInput";
import ChoiceElement from "./ChoiceElement";
import { cn } from "@/lib/utils";
import useEditRow from "../hooks/use-edit-row";

interface TableSwitchProps {
  type: Type;
  content: string;
  rowId: string;
  column: Column;
}

const TableSwitch = ({ column, content, rowId, type }: TableSwitchProps) => {
  const { mutate, isLoading } = useEditRow();

  const onChange = (text: string) => {
    mutate({ columnId: column.id, content: text, rowId });
  };

  switch (type) {
    case "TEXT":
    case "TEXTAREA":
    case "NUMBER":
    case "DATE":
    case "PERSON":
      return (
        <EditableInput
          className={cn(content === "no data..." && "text-black/30")}
          isLoading={isLoading}
          onChange={onChange}
          content={content}
        >
          {content}
        </EditableInput>
      );
    case "CHOICE":
      return <ChoiceElement rowId={rowId} column={column} content={content} />;
    default:
      return null;
  }
};

export default TableSwitch;
