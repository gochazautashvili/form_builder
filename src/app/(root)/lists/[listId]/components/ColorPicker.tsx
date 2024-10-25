import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Palette } from "lucide-react";
import { colors } from "@/constants";
import { cn } from "@/lib/utils";
import useEditChoiceColor from "../hooks/use-choice-color";
import { useState } from "react";

interface ColorPickerProps {
  selectedColor: string;
  optionId: string;
  columnId: string;
}

const ColorPicker = ({
  selectedColor,
  optionId,
  columnId,
}: ColorPickerProps) => {
  const [open, setOpen] = useState(false);
  const { mutate } = useEditChoiceColor(columnId);

  const onSelect = (color: string) => {
    mutate({ color, optionId });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Palette className="size-5" />
      </PopoverTrigger>
      <PopoverContent className="flex max-w-[230px] flex-wrap gap-1 p-2">
        {colors.map((color, i) => {
          return (
            <div
              onClick={() => onSelect(color)}
              style={{ background: color }}
              className={cn(
                "flex size-9 flex-1 basis-1/6 cursor-pointer items-center justify-center rounded text-white",
                selectedColor === color && "text-transparent",
              )}
            >
              {i + 1}
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
