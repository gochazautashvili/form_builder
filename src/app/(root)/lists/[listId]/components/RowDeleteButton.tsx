import LoadingButton from "@/components/LoadingButton";
import useDeleteRow from "../hooks/use-delete-row";

interface RowDeleteButtonProps {
  rowId: string;
}
const RowDeleteButton = ({ rowId }: RowDeleteButtonProps) => {
  const { mutate, isLoading } = useDeleteRow();

  const handleDelete = () => {
    mutate(rowId);
  };

  return (
    <LoadingButton
      variant="destructive"
      onClick={handleDelete}
      isLoading={isLoading}
      size="sm"
    >
      Delete
    </LoadingButton>
  );
};

export default RowDeleteButton;
