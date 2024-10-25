import { useMutation, useQueryClient } from "@tanstack/react-query";
import { edit_row } from "../actions";
import useListId from "@/hooks/use-listId";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/utils";
import usePage from "@/hooks/use-page";
import { TRowContent } from "@/types";

const useEditRow = () => {
  const listId = useListId();
  const page = usePage();
  const queryClient = useQueryClient();
  const queryKey = ["list", listId, page];

  return useMutation({
    mutationFn: edit_row,
    onMutate: ({ columnId, rowId, content }) => {
      queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<TRowContent[]>(queryKey);

      queryClient.setQueryData<TRowContent[]>(queryKey, (prevData) => {
        if (!prevData) return;

        return prevData.map((row) => {
          if (row.rowId === rowId) {
            return { ...row, [columnId]: content };
          }

          return row;
        });
      });

      return { previousData };
    },
    onError(error, _, prev) {
      toast({ variant: "destructive", description: getErrorMessage(error) });
      queryClient.setQueryData<TRowContent[]>(
        queryKey,
        () => prev?.previousData,
      );
    },
  });
};

export default useEditRow;
