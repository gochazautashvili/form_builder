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
  FormDescription,
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
import useListId from "@/hooks/use-listId";
import { create_column } from "../actions";
import { useTransition } from "react";
import { toast } from "@/hooks/use-toast";

const CreateColumn = () => {
  const [isLoading, startCreate] = useTransition();
  const listId = useListId();

  const form = useForm<TAdd_colum>({
    resolver: zodResolver(add_column),
    defaultValues: {
      name: "",
      type: "TEXT",
      description: "",
    },
  });

  const onSubmit = (value: TAdd_colum) => {
    startCreate(() => {
      create_column({ listId, value }).then((res) => {
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
        <Button size="sm" variant="outline">
          <Plus className="mr-2 size-4" /> Add Column
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-5">
        <SheetHeader>
          <SheetTitle>Create list column</SheetTitle>
          <SheetDescription>
            You can create new column or add form elements
          </SheetDescription>
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
                  {form.getValues("type") === "CHOICE" && (
                    <FormDescription>
                      Create column and then you can create choices
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton
              type="submit"
              isLoading={isLoading}
              disabled={!form.formState.isValid}
            >
              Create column
            </LoadingButton>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateColumn;
