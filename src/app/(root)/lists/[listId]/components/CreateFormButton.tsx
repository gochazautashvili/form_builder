import NavigateButton from "@/components/NavigateButton";
import { Form } from "@prisma/client";
import { ArrowRight, Plus } from "lucide-react";
import LoadingButton from "@/components/LoadingButton";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { create_form } from "../actions";
import { toast } from "@/hooks/use-toast";

interface CreateFormButtonProps {
  listId: string;
  form: Form | null;
}

const CreateFormButton = ({ listId, form }: CreateFormButtonProps) => {
  const [isPending, startCreate] = useTransition();
  const router = useRouter();

  const handleCreateForm = () => {
    startCreate(() => {
      create_form(listId).then((res) => {
        if (res.error) {
          toast({ variant: "destructive", description: res.error });
        }

        if (res.success) {
          toast({ description: res.message });
          router.push(res.url);
        }
      });
    });
  };

  if (!form) {
    return (
      <LoadingButton
        size="sm"
        variant="secondary"
        isLoading={isPending}
        onClick={handleCreateForm}
      >
        <Plus className="mr-2 size-5" /> Create form
      </LoadingButton>
    );
  }

  return (
    <NavigateButton
      className="flex items-center gap-2"
      url={`/lists/${listId}/form`}
    >
      Form
      <ArrowRight className="size-4" />
    </NavigateButton>
  );
};

export default CreateFormButton;
