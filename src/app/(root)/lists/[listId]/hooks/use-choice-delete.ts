import { useMutation, useQueryClient } from "@tanstack/react-query";
import { delete_choice } from "../actions";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/utils";
import { Option } from "@prisma/client";

const useChoiceDelete = (columnId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["choices", columnId];

  return useMutation({
    mutationFn: delete_choice,
    onMutate: (optionId) => {
      queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<Option[]>(queryKey, (prevData) => {
        if (!prevData) return;

        return prevData.filter((o) => o.id != optionId);
      });
    },
    onError(error) {
      toast({ variant: "destructive", description: getErrorMessage(error) });
    },
  });
};

export default useChoiceDelete;
