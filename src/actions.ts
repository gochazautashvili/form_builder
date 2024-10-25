"use server";
import { create_list, TCreate_list } from "@/validations";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { getErrorMessage } from "./lib/utils";
import { getOrganization } from "./data/getOrganization";
import db from "./lib/db";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const logout = async () => {
  try {
    cookies().delete("organization_session");

    return { success: true, message: "Logout successfully", url: "/auth" };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export const create_lists = async (
  value: TCreate_list,
  listId: string | undefined,
) => {
  try {
    const { data, error } = create_list.safeParse(value);

    if (error) {
      return { error: error.message };
    }

    if (!data.background) {
      return { error: "Background is required!" };
    }

    const org = await getOrganization();

    if (!org) return { error: "Organization not found!" };

    if (!listId) {
      const list = await db.list.create({
        data: { ...data, organizationId: org.id },
      });

      return {
        success: true,
        message: "List successfully created",
        url: `/lists/${list.id}`,
      };
    }

    await db.list.update({ where: { id: listId }, data: { ...data } });

    revalidatePath("/");
    return { success: true, message: "List successfully updated" };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export const delete_list = async (listId: string) => {
  try {
    const deleted = await db.$transaction([
      db.column.deleteMany({ where: { listId } }),
      db.row.deleteMany({ where: { listId } }),
      db.question.deleteMany({ where: { form: { listId } } }),
      db.form.deleteMany({ where: { listId } }),
      db.list.delete({ where: { id: listId } }),
    ]);

    const key = deleted[4].background.split("f/")[1];

    await utapi.deleteFiles(key);

    revalidatePath("/");
    return { success: true, message: "List successfully deleted." };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export const delete_image = async (image: string) => {
  try {
    const key = image.split("f/")[1];

    await utapi.deleteFiles(key);

    return { success: true, message: "Image successfully deleted." };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};
