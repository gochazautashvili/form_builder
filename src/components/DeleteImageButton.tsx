import { delete_image } from "@/actions";
import { toast } from "@/hooks/use-toast";
import { Loader2, X } from "lucide-react";
import { useTransition } from "react";
import Tooltip from "./Tooltip";

interface DeleteImageButtonProps {
  image: string;
  onDelete: (e: string) => void;
}

const DeleteImageButton = ({ image, onDelete }: DeleteImageButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(() => {
      delete_image(image).then((res) => {
        if (res.error) {
          toast({ variant: "destructive", description: res.error });
        }

        if (res.success) {
          toast({ description: res.message });
          onDelete("");
        }
      });
    });
  };

  return (
    <Tooltip
      content="Delete image"
      className="absolute right-2 top-2 flex size-5 cursor-pointer items-center justify-center rounded-full border border-white bg-white/50"
    >
      <div onClick={handleDelete}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <X className="size-4" />
        )}
      </div>
    </Tooltip>
  );
};

export default DeleteImageButton;
