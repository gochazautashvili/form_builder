"use client";
import { useTransition } from "react";
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
import { types, TCreate_schema, add_column } from "../validations";
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
import { toast } from "@/hooks/use-toast";
import useListId from "@/hooks/use-listId";
import { create_question } from "../actions";

interface CreateColumnProps {
  formId: string;
}

const CreateQuestion = ({ formId }: CreateColumnProps) => {
  const [isPending, startTransition] = useTransition();
  const listId = useListId();

  const form = useForm<TCreate_schema>({
    resolver: zodResolver(add_column),
    defaultValues: {
      question: "",
      required: false,
      type: "TEXT",
    },
  });

  const onSubmit = (value: TCreate_schema) => {
    startTransition(() => {
      create_question(value, listId, formId).then((res) => {
        if (res.error) {
          toast({ variant: "destructive", description: res.error });
        }

        if (res.success) {
          toast({ description: res.message });
          form.reset();
        }
      });
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" variant="outline">
          <Plus className="mr-2 size-4" />
          Create question
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-5">
        <SheetHeader>
          <SheetTitle>Create form question</SheetTitle>
          <SheetDescription>
            You can create new column or add form elements
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question*</FormLabel>
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
                  <FormLabel>Question type*</FormLabel>
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
                        if (type === "PERSON") return null;

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
              isLoading={isPending}
              disabled={!form.formState.isValid}
            >
              Create question
            </LoadingButton>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateQuestion;
