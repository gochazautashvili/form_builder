import { Option } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useChoices = (columnId: string) => {
  return useQuery({
    queryKey: ["choices", columnId],
    queryFn: () =>
      axios
        .get<Option[]>(`/api/list/choices/${columnId}`)
        .then((res) => res.data),
  });
};

export default useChoices;
