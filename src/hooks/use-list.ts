import { TRowContent } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import usePage from "./use-page";

const useList = (listId: string) => {
  const page = usePage();

  return useQuery({
    queryKey: ["list", listId, page],
    queryFn: () =>
      axios
        .get<TRowContent[]>(`/api/list/${listId}?page=${page}`)
        .then((res) => res.data),
  });
};

export default useList;
