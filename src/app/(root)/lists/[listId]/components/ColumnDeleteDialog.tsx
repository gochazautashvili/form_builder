"use client";
import { useState, useTransition } from "react";
import { Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import useListId from "@/hooks/use-listId";
import { delete_column } from "../actions";
import { toast } from "@/hooks/use-toast";

interface ListDeleteDialogProps {
  columnId: string;
}

const ColumnDeleteDialog = ({ columnId }: ListDeleteDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, startDelete] = useTransition();
  const listId = useListId();

  const handleDelete = () => {
    startDelete(() => {
      delete_column(columnId, listId).then((res) => {
        toast({
          variant: res.success ? "default" : "destructive",
          description: res.message,
        });
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="w-full justify-start bg-none p-0 px-1 shadow-none"
        >
          <Trash className="mr-2 size-3.5" /> Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Delete Column?</DialogTitle>
        <DialogDescription>
          Yuo are sure? if you delete this column all the row will be deleted.
        </DialogDescription>
        <div className="flex items-center justify-end gap-2">
          <Button onClick={() => setOpen(false)} variant="outline" size="sm">
            Cancel
          </Button>
          <LoadingButton
            isLoading={isLoading}
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

export default ColumnDeleteDialog;
