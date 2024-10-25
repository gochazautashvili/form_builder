"use server";
import { getOrganization } from "@/data/getOrganization";
import db from "@/lib/db";

export const getLists = async () => {
  const org = await getOrganization();

  if (!org) return [];

  const lists = await db.list.findMany({ where: { organizationId: org.id } });

  return lists;
};
