import ListDialog from "@/components/ListDialog";
import { getLists } from "./actions";
import ListCard from "./components/ListCard";

const Home = async () => {
  const lists = await getLists();

  return (
    <section className="mx-auto my-5 w-full max-w-screen-2xl px-3">
      <h1 className="mb-7 text-center text-2xl font-bold">Form Builder</h1>
      <div className="flex flex-col gap-3">
        <h1 className="font-semibold">Lists:</h1>
        <div className="flex gap-3">
          {lists.map((list) => (
            <ListCard key={list.id} list={list} />
          ))}
          <ListDialog />
        </div>
      </div>
    </section>
  );
};

export default Home;
