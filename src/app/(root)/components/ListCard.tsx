import { List } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import ListMoreButton from "./ListMoreButton";

interface ListCardProps {
  list: List;
}

const ListCard = ({ list }: ListCardProps) => {
  return (
    <div className="relative h-[200px] basis-1/2 overflow-hidden rounded-xl border-gray-400 shadow-sm md:basis-1/3 lg:basis-1/4">
      <ListMoreButton list={list} />
      <Link className="relative h-full w-full" href={`/lists/${list.id}`}>
        <Image
          fill
          priority
          loading="eager"
          alt={list.title}
          src={list.background}
          className="-z-10 h-full w-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="flex h-full w-full flex-col justify-end bg-black/20 p-4 text-white">
          <h1 className="line-clamp-2 text-xl font-semibold">{list.title}</h1>
          <p className="line-clamp-3 text-sm">{list.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default ListCard;
