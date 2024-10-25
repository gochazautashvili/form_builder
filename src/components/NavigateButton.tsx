import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NavigateButtonProps {
  children: React.ReactNode;
  className?: string;
  url: string;
}

const NavigateButton = ({ children, url, className }: NavigateButtonProps) => {
  return (
    <Button size="sm" asChild>
      <Link className={className} href={url}>
        {children}
      </Link>
    </Button>
  );
};

export default NavigateButton;
