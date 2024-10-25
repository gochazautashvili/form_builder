import { KeyboardEvent, useRef, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import useCreateChoice from "../hooks/use-create-choice";
import { useClickAway } from "react-use";
import { Button } from "@/components/ui/button";

interface CreateOptionsProps {
  columnId: string;
  questionId: string | undefined;
}

const CreateOptions = ({ columnId, questionId }: CreateOptionsProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const { mutate, isLoading } = useCreateChoice(columnId);
  const [create, setCreate] = useState(false);

  useClickAway(ref, () => {
    setCreate(false);
  });

  const onClick = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!ref.current) return;

    const value = ref.current.value;

    if (e.key === "Enter") {
      mutate({ columnId, questionId, text: value });
      setCreate(false);
    }
  };

  if (create) {
    return (
      <input
        ref={ref}
        autoFocus
        onKeyDown={onClick}
        disabled={isLoading}
        title="create options"
        placeholder="Type here..."
        className="mt-3 h-8 w-full rounded-none border-b border-black outline-none"
      />
    );
  }

  return (
    <Button
      onClick={() => setCreate(true)}
      type="button"
      variant="outline"
      className="mt-3"
      size="sm"
    >
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Plus className="cursor-pointer text-black/70 hover:text-black" />
      )}
    </Button>
  );
};

export default CreateOptions;
