import { getForm } from "./actions";
import ListForm from "./Form";

interface PublicFormPageProps {
  params: { linkId: string };
}

const PublicFormPage = async ({ params: { linkId } }: PublicFormPageProps) => {
  const link = await getForm(linkId);

  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-gray-200">
      <ListForm link={link} />
    </section>
  );
};

export default PublicFormPage;
