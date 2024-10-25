import useListId from "@/hooks/use-listId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { edit_choice_row } from "../actions";
import { TRowContent } from "@/types";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/utils";
import usePage from "@/hooks/use-page";

const useSelectChoice = () => {
  const listId = useListId();
  const page = usePage();
  const queryClient = useQueryClient();
  const queryKey = ["list", listId, page];

  return useMutation({
    mutationFn: edit_choice_row,
    onMutate: ({ rowId, columnId, optionId }) => {
      queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData<TRowContent[]>(queryKey);

      queryClient.setQueryData<TRowContent[]>(queryKey, (prevData) => {
        if (!prevData) return;

        return prevData.map((row) => {
          if (row.rowId === rowId) {
            const content = { ...row, [columnId]: optionId } as TRowContent;

            return content;
          }

          return row;
        });
      });

      return { prevData };
    },
    onError(error, _, prev) {
      queryClient.setQueryData<TRowContent[]>(queryKey, () => prev?.prevData);
      toast({ variant: "destructive", description: getErrorMessage(error) });
    },
  });
};

export default useSelectChoice;
