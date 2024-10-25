import Table from "./Table";
import { getList } from "./actions";

interface ListPageProps {
  params: { listId: string };
}

const ListPage = async ({ params: { listId } }: ListPageProps) => {
  const list = await getList(listId);

  return <Table list={list} />;
};

export default ListPage;
