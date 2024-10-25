import { Loader2 } from "lucide-react";

const loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2 className="size-7 animate-spin" />
    </div>
  );
};

export default loading;
