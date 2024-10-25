import { Button } from "@/components/ui/button";
import usePage from "@/hooks/use-page";
import useListId from "@/hooks/use-listId";
import { useRouter } from "next/navigation";

export function DataTablePagination() {
  const router = useRouter();
  const page = usePage();
  const listId = useListId();

  const nextPage = () => {
    router.push(`/lists/${listId}?page=${page + 1}`);
  };

  const prevPage = () => {
    if (page > 1) {
      router.push(`/lists/${listId}?page=${page - 1}`);
    }

    if (page == 1) {
      router.push(`/lists/${listId}`);
    }
  };

  return (
    <div className="flex items-center justify-end gap-3">
      <Button
        disabled={page < 1}
        onClick={prevPage}
        variant="outline"
        size="sm"
      >
        Prev
      </Button>
      <Button onClick={nextPage} variant="outline" size="sm">
        Next
      </Button>
    </div>
  );
}
