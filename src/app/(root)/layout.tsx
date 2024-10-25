import { getOrganization } from "@/data/getOrganization";
import { redirect } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const org = await getOrganization();

  if (!org) redirect("/auth");

  return <main>{children}</main>;
}
