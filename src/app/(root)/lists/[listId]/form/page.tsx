import { getForm } from "./actions";
import Controllers from "./components/Controllers";
import ListForm from "./components/Form";

interface FormPageProps {
  params: { listId: string };
}

const FormPage = async ({ params: { listId } }: FormPageProps) => {
  const form = await getForm(listId);

  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-gray-200">
      <Controllers form={form} />
      <ListForm form={form} />
    </section>
  );
};

export default FormPage;
