"use client";
import { useTransition } from "react";
import LoadingButton from "./LoadingButton";
import { LogOut } from "lucide-react";
import { logout } from "@/actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const SignOut = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
      logout().then((res) => {
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
    <LoadingButton onClick={handleLogout} isLoading={isPending}>
      <LogOut className="mr-2 size-4" /> Logout
    </LoadingButton>
  );
};

export default SignOut;
