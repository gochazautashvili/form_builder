"use server";

import db from "@/lib/db";
import { cookies } from "next/headers";

export const getOrganization = async () => {
  try {
    const orgId = cookies().get("organization_session")?.value;

    if (!orgId) return null;

    const org = await db.organization.findUnique({ where: { id: orgId } });

    if (!org) return null;

    return org;
  } catch (error) {
    return null;
  }
};
