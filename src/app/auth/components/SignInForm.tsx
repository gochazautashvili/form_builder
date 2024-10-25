"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sign_in_schema, TSign_in } from "../validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import LoadingButton from "@/components/LoadingButton";
import { sign_in } from "../actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<TSign_in>({
    resolver: zodResolver(sign_in_schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: TSign_in) => {
    startTransition(() => {
      sign_in(values).then((res) => {
        if (res.error) {
          toast({ variant: "destructive", description: res.error });
        }

        if (res.success) {
          toast({ description: res.message });
          router.push(res.url);
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email*</FormLabel>
              <FormControl>
                <Input placeholder="Type here..." type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password*</FormLabel>
              <FormControl>
                <Input placeholder="Type here..." type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton isLoading={isPending} type="submit">
          Sign in
        </LoadingButton>
      </form>
    </Form>
  );
};

export default SignInForm;
