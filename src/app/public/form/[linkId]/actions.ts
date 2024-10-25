"use server";
import db from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { link_include } from "@/types";
import { notFound } from "next/navigation";

export const getForm = async (linkId: string) => {
  const link = await db.link.findUnique({
    where: { id: linkId },
    include: link_include,
  });

  if (!link) return notFound();

  return link;
};

export const create_response = async (content: string, listId: string) => {
  try {
    await db.row.create({
      data: { content, listId },
    });

    return { success: true, message: "Message successfully sended" };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};
