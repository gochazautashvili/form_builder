import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create_row } from "../actions";
import useListId from "@/hooks/use-listId";
import { TRowContent } from "@/types";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage, parseJsonData } from "@/lib/utils";
import usePage from "@/hooks/use-page";

const useCreateRow = () => {
  const listId = useListId();
  const queryClient = useQueryClient();
  const page = usePage();
  const queryKey = ["list", listId, page];

  return useMutation({
    mutationFn: create_row,
    onSuccess: (data) => {
      queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<TRowContent[]>(queryKey, (prevData) => {
        if (!prevData) return;

        const content = {
          rowId: data.row.id,
          ...(parseJsonData(data.row.content) as TRowContent),
        };

        return [...prevData, content];
      });

      toast({ description: data.message });
    },
    onError(error) {
      toast({ variant: "destructive", description: getErrorMessage(error) });
    },
  });
};

export default useCreateRow;
