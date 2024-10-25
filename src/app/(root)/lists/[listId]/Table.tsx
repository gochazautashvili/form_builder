"use client";
import useList from "@/hooks/use-list";
import Controller from "./components/Controller";
import { DataTable } from "./components/DataTable";
import { TList_data } from "@/types";

interface TableProps {
  list: TList_data;
}

const Table = ({ list }: TableProps) => {
  const { data, isLoading } = useList(list.id);

  return (
    <section>
      <Controller list={list} />
      <div className="mx-auto w-full max-w-screen-2xl px-4">
        <h1 className="mb-1 border-b-2 border-green-600 pb-1 text-2xl font-bold">
          {list.title}
        </h1>
        <p className="line-clamp-2 w-[70%] text-sm text-gray-500">
          {list.description}
        </p>
        <DataTable list={list} data={data || []} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default Table;
