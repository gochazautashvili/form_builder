import { useMutation, useQueryClient } from "@tanstack/react-query";
import { edit_choice_name } from "../actions";
import { toast } from "@/hooks/use-toast";
import { Option } from "@prisma/client";

const useEditChoiceName = (columnId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["choices", columnId];

  return useMutation({
    mutationFn: edit_choice_name,
    onMutate: ({ name, optionId }) => {
      queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData<Option[]>(queryKey);

      queryClient.setQueryData<Option[]>(queryKey, (prevData) => {
        if (!prevData) return;

        return prevData.map((option) => {
          if (option.id === optionId) {
            return { ...option, name };
          }

          return option;
        });
      });

      return { prevData };
    },
    onError(error: string, _, prev) {
      queryClient.setQueryData<Option[]>(queryKey, () => prev?.prevData);
      toast({ variant: "destructive", description: error });
    },
  });
};

export default useEditChoiceName;
