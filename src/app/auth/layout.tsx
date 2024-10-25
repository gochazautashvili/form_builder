import { getOrganization } from "@/data/getOrganization";
import { redirect } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const org = await getOrganization();

  if (org) redirect("/");

  return (
    <main className="flex h-screen w-full items-center justify-center px-4">
      {children}
    </main>
  );
}
