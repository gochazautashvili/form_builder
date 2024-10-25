import { Button, ButtonProps } from "./ui/button";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
}

const LoadingButton = ({ isLoading, ...props }: LoadingButtonProps) => {
  return (
    <Button {...props} disabled={isLoading || props.disabled}>
      {isLoading && <Loader2 className="mr-3 size-4 animate-spin" />}
      {props.children}
    </Button>
  );
};

export default LoadingButton;
