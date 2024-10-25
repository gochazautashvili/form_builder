import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create_choice } from "../actions";
import { toast } from "@/hooks/use-toast";
import { Option } from "@prisma/client";

const useCreateChoice = (columnId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["choices", columnId];

  return useMutation({
    mutationFn: create_choice,
    onSuccess: (data) => {
      queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<Option[]>(queryKey, (prevData) => {
        if (!prevData) return;

        return [...prevData, data.option];
      });

      toast({ description: data.message });
    },
    onError(error: string) {
      toast({ variant: "destructive", description: error });
    },
  });
};

export default useCreateChoice;
