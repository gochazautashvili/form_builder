"use client";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { create_list, TCreate_list } from "@/validations";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "./LoadingButton";
import { List } from "@prisma/client";
import UploadImage from "./UploadImage";
import { create_lists } from "@/actions";
import { toast } from "@/hooks/use-toast";
import { Pencil } from "lucide-react";

interface ListDialogProps {
  list?: List;
}

const ListDialog = ({ list }: ListDialogProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<TCreate_list>({
    resolver: zodResolver(create_list),
    defaultValues: {
      title: list?.title || "",
      description: list?.description || "",
      background: list?.background || "",
    },
  });

  const onSubmit = (values: TCreate_list) => {
    startTransition(() => {
      create_lists(values, list?.id).then((res) => {
        if (res.error) {
          toast({ variant: "destructive", description: res.error });
        }

        if (res.success) {
          toast({ description: res.message });
          if (res.url) router.push(res.url);
        }
      });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-blue-500 hover:bg-blue-800">
          <Pencil className="mr-2 size-4" />
          {list ? "Edit list" : "Create list"}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-1">
        <DialogTitle>{list ? "Edit List" : "Create List"}</DialogTitle>
        <DialogDescription>
          You can create and edit your lists.
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-3"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>List Title*</FormLabel>
                  <FormControl>
                    <Input placeholder="Type here..." {...field} />
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
                  <FormLabel>List Description*</FormLabel>
                  <FormControl>
                    <Input placeholder="Type here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="background"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>List Image*</FormLabel>
                  <FormControl>
                    <UploadImage
                      onUpload={field.onChange}
                      background={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton isLoading={isPending} type="submit">
              {list ? "Edit List" : "Create List"}
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ListDialog;
