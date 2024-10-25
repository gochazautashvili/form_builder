import { KeyboardEventHandler, useRef, useState } from "react";
import { useClickAway } from "react-use";

interface RowInputProps {
  content: string;
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  onChange: (v: string) => void;
}

const EditableInput = ({
  content,
  children,
  isLoading,
  onChange,
  className,
}: RowInputProps) => {
  const [text, setText] = useState(content);
  const [edit, setEdit] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useClickAway(ref, () => {
    setEdit(false);
  });

  const handleKeyDow: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      onChange(text);
      setEdit(false);
    }
  };

  if (edit) {
    return (
      <input
        ref={ref}
        autoFocus
        value={text}
        title="edit row"
        disabled={isLoading}
        onKeyDown={handleKeyDow}
        onChange={(e) => setText(e.target.value)}
        className="border-b border-black bg-transparent pl-1 outline-none"
      />
    );
  }

  return (
    <span className={className} onDoubleClick={() => setEdit(true)}>
      {children}
    </span>
  );
};

export default EditableInput;
