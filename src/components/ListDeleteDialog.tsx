"use client";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import LoadingButton from "./LoadingButton";
import { delete_list } from "@/actions";
import { toast } from "@/hooks/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { Trash } from "lucide-react";

interface ListDeleteDialogProps {
  listId: string;
}

const ListDeleteDialog = ({ listId }: ListDeleteDialogProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isListPage = pathname.includes(`/lists/${listId}`);

  const handleDelete = () => {
    startTransition(() => {
      delete_list(listId).then((res) => {
        if (res.error) {
          toast({ variant: "destructive", description: res.error });
        }

        if (res.success) {
          toast({ description: res.message });

          if (isListPage) router.push("/");
        }
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive">
          <Trash className="mr-2 size-4" /> Delete list
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Delete List?</DialogTitle>
        <DialogDescription>
          Yuo are sure? if you delete this list all the data will be deleted.
        </DialogDescription>
        <div className="flex items-center justify-end gap-2">
          <Button onClick={() => setOpen(false)} variant="outline" size="sm">
            Cancel
          </Button>
          <LoadingButton
            isLoading={isPending}
            onClick={handleDelete}
            variant="destructive"
            size="sm"
          >
            Delete
          </LoadingButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ListDeleteDialog;
