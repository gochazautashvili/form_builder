"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { add_column, TAdd_colum, types } from "../validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ColumnOptions from "./ColumnOptions";
import { Column, Question } from "@prisma/client";
import { useTransition } from "react";
import { edit_column } from "../actions";
import useListId from "@/hooks/use-listId";
import { toast } from "@/hooks/use-toast";

export interface EditColumnProps {
  column: Column & { question: Question | null };
}

const EditColumn = ({ column }: EditColumnProps) => {
  const listId = useListId();
  const [isLoading, startEdit] = useTransition();
  const form = useForm<TAdd_colum>({
    resolver: zodResolver(add_column),
    defaultValues: {
      name: column.name,
      type: column.type,
      description: column.description,
    },
  });

  const onSubmit = (value: TAdd_colum) => {
    startEdit(() => {
      edit_column({ columnId: column.id, listId, value }).then((res) => {
        toast({
          variant: res.success ? "default" : "destructive",
          description: res.message,
        });
      });
    });
  };

  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button
          className="w-full justify-start border-none bg-none p-0 px-1 shadow-none"
          size="sm"
          variant="outline"
        >
          <Plus className="mr-2 size-4" /> Edit
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-5">
        <SheetHeader>
          <SheetTitle>Edit list column</SheetTitle>
          <SheetDescription>edit your column and options</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Column name*</FormLabel>
                  <FormControl>
                    <Input autoFocus placeholder="Type here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Column description*</FormLabel>
                  <FormControl>
                    <Input placeholder="Type here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Column type*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a column type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {types.map((type) => {
                        return (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.getValues("type") === "CHOICE" && (
              <div>
                <FormLabel>Column choses*</FormLabel>
                <ColumnOptions
                  columnId={column.id}
                  questionId={column.question?.id}
                />
              </div>
            )}
            <LoadingButton
              type="submit"
              isLoading={isLoading}
              disabled={!form.formState.isValid}
            >
              Edit column
            </LoadingButton>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default EditColumn;
