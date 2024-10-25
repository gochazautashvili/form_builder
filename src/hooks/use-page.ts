import { useSearchParams } from "next/navigation";

const usePage = () => {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 0;

  return page;
};

export default usePage;
