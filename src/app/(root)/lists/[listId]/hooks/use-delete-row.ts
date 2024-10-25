import { useMutation, useQueryClient } from "@tanstack/react-query";
import { delete_row } from "../actions";
import useListId from "@/hooks/use-listId";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/utils";
import usePage from "@/hooks/use-page";
import { TRowContent } from "@/types";

const useDeleteRow = () => {
  const listId = useListId();
  const page = usePage();
  const queryClient = useQueryClient();
  const queryKey = ["list", listId, page];

  return useMutation({
    mutationFn: delete_row,
    onSuccess: (data, rowId) => {
      queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<TRowContent[]>(queryKey, (prevData) => {
        if (!prevData) return;

        return prevData.filter((row) => row.rowId !== rowId);
      });

      toast({ description: data.message });
    },
    onError(error) {
      toast({ variant: "destructive", description: getErrorMessage(error) });
    },
  });
};

export default useDeleteRow;
