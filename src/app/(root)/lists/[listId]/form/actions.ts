"use server";
import { getErrorMessage } from "@/lib/utils";
import { TCreate_schema, add_column } from "./validations";
import { revalidatePath } from "next/cache";
import db from "@/lib/db";
import { form_include } from "@/types";
import { notFound } from "next/navigation";
import { colors } from "@/constants";

export const getForm = async (listId: string) => {
  const form = await db.form.findUnique({
    where: { listId },
    include: form_include,
  });

  if (!form) return notFound();

  return form;
};

export const create_question = async (
  value: TCreate_schema,
  listId: string,
  formId: string,
) => {
  try {
    const { data, error } = add_column.safeParse(value);

    if (error) {
      return { error: error.message };
    }

    const column = await db.column.create({
      data: {
        description: data.question,
        name: data.question,
        type: data.type,
        listId: listId,
        question: {
          create: {
            ...data,
            formId,
          },
        },
      },
      select: { id: true, question: { select: { id: true } } },
    });

    if (data.type === "CHOICE") {
      await db.option.createMany({
        data: Array.from({ length: 3 }).map((_, i) => ({
          color: colors[i],
          columnId: column.id,
          questionId: column.question?.id,
          name: `Choice ${i + 1}`,
        })),
      });
    }

    revalidatePath(`/lists/${listId}/form`);
    return {
      success: true,
      message: `List column successfully created`,
    };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export const edit_question = async (
  value: TCreate_schema,
  listId: string,
  questionId: string,
) => {
  try {
    const { data, error } = add_column.safeParse(value);

    if (error) {
      return { error: error.message };
    }

    await db.question.update({
      where: { id: questionId },
      data: { ...data },
    });

    revalidatePath(`/lists/${listId}/form`);
    return {
      success: true,
      message: `List column successfully edited`,
    };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export const delete_question = async (questionId: string, listId: string) => {
  try {
    const question = await db.question.delete({ where: { id: questionId } });

    await db.column.delete({ where: { id: question.columnId } });

    revalidatePath(`/lists/${listId}/form`);
    return {
      success: true,
      message: `List column successfully deleted`,
    };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};
