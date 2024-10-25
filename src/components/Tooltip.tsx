import {
  Tooltip as TooltipContainer,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  className?: string;
}

const Tooltip = ({ children, content, className }: TooltipProps) => {
  return (
    <TooltipProvider delayDuration={500}>
      <TooltipContainer>
        <TooltipTrigger asChild className={className}>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </TooltipContainer>
    </TooltipProvider>
  );
};

export default Tooltip;
