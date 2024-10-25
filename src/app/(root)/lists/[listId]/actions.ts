"use server";
import db from "@/lib/db";
import { getErrorMessage, parseJsonData } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { add_column, TAdd_colum } from "./validations";
import { list_include, TRowContent } from "@/types";
import { notFound } from "next/navigation";
import { colors } from "@/constants";

export const getList = async (listId: string) => {
  const list = await db.list.findUnique({
    where: { id: listId },
    include: list_include,
  });

  if (!list) return notFound();

  return list;
};

export const create_column = async ({ listId, value }: TCreate_column) => {
  try {
    const { data, error } = add_column.safeParse(value);

    if (error) {
      throw new Error(error.message);
    }

    const column = await db.column.create({
      data: {
        ...data,
        listId,
      },
      include: { options: true, question: true },
    });

    if (data.type === "CHOICE") {
      await db.option.createMany({
        data: Array.from({ length: 3 }).map((_, i) => ({
          color: colors[i],
          columnId: column.id,
          name: `Choice ${i + 1}`,
        })),
      });
    }

    revalidatePath(`/lists/${listId}`);
    return {
      success: true,
      message: "List column successfully created",
    };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const edit_column = async ({
  value,
  columnId,
  listId,
}: TEdit_column) => {
  try {
    const { data, error } = add_column.safeParse(value);

    if (error) {
      throw new Error(error.message);
    }

    await db.column.update({
      where: { id: columnId },
      include: { options: true, question: true },
      data: {
        ...data,
      },
    });

    revalidatePath(`/lists/${listId}`);
    return {
      success: true,
      message: "List column successfully updated",
    };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const delete_column = async (columnId: string, listId: string) => {
  try {
    const column = await db.column.delete({ where: { id: columnId } });

    revalidatePath(`/lists/${listId}`);
    return {
      success: true,
      message: `List column ${column.name} successfully deleted`,
    };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const create_row = async (listId: string) => {
  try {
    const columns = await db.column.findMany({
      where: { listId },
      include: { options: true },
    });

    const content: TRowContent = columns.reduce((acc, column) => {
      acc[column.id] = column.type === "CHOICE" ? column.options[0].id : "";
      return acc;
    }, {} as TRowContent);

    const jsonData = JSON.stringify(content);

    const row = await db.row.create({
      data: { content: jsonData, listId },
    });

    return {
      row: row,
      success: true,
      message: "Row successfully created",
    };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const edit_row = async ({ columnId, content, rowId }: TEdit_row) => {
  try {
    const row = await db.row.findUnique({ where: { id: rowId } });

    if (!row) {
      throw new Error("Row not found");
    }

    const parsedData = parseJsonData(row.content) as TRowContent;

    const newContent = { ...parsedData, [columnId]: content };

    const jsonData = JSON.stringify(newContent);

    const data = await db.row.update({
      where: { id: row.id },
      data: { content: jsonData },
    });

    return { success: true, message: "Row successfully edited", row: data };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const delete_row = async (rowId: string) => {
  try {
    await db.row.delete({
      where: { id: rowId },
    });

    return { success: true, message: "Row successfully deleted" };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const create_form = async (listId: string) => {
  try {
    await db.form.create({ data: { listId, links: { create: {} } } });

    revalidatePath(`/lists/${listId}`);
    return {
      success: true,
      message: "Form successfully edited",
      url: `/lists/${listId}/form`,
    };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

// choices

export const edit_choice_row = async ({
  columnId,
  optionId,
  rowId,
}: TEdit_choice) => {
  try {
    const row = await db.row.findUnique({ where: { id: rowId } });

    if (!row) {
      throw new Error("Row not found");
    }

    const parseJson = parseJsonData(row.content) as TRowContent;

    const content = { ...parseJson, [columnId]: optionId };

    const jsonData = JSON.stringify(content);

    await db.row.update({
      where: { id: row.id },
      data: { content: jsonData },
    });

    return { message: "Row successfully edited" };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const create_choice = async ({
  columnId,
  questionId,
  text,
}: TCreate_choice) => {
  try {
    const option = await db.option.create({
      data: { name: text, color: "#000", columnId, questionId },
    });

    return { option, message: "Choice successfully created" };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const edit_choice_color = async ({ color, optionId }: TEdit_color) => {
  try {
    await db.option.update({
      where: { id: optionId },
      data: { color },
    });

    return { message: "Choice successfully edited" };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const edit_choice_name = async ({
  name,
  optionId,
}: TEdit_choice_name) => {
  try {
    await db.option.update({
      where: { id: optionId },
      data: { name },
    });

    return { message: "Choice successfully edited" };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const delete_choice = async (optionId: string) => {
  try {
    await db.option.delete({
      where: { id: optionId },
    });

    return { message: "Choice successfully deleted" };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

type TEdit_color = { color: string; optionId: string };

type TCreate_choice = {
  text: string;
  columnId: string;
  questionId: string | undefined;
};

type TEdit_choice_name = {
  name: string;
  optionId: string;
};

type TEdit_choice = {
  rowId: string;
  optionId: string;
  columnId: string;
};

type TEdit_row = {
  columnId: string;
  rowId: string;
  content: string;
};

type TCreate_column = {
  value: TAdd_colum;
  listId: string;
};

type TEdit_column = {
  value: TAdd_colum;
  columnId: string;
  listId: string;
};
