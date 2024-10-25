import { Prisma } from "@prisma/client";

export const list_include = {
  columns: { include: { question: true } },
  form: true,
} satisfies Prisma.ListInclude;

export type TList_data = Prisma.ListGetPayload<{
  include: typeof list_include;
}>;

export const form_include = {
  questions: { include: { options: true } },
  links: { take: 1 },
} satisfies Prisma.FormInclude;

export type TForm_data = Prisma.FormGetPayload<{
  include: typeof form_include;
}>;

export const link_include = {
  form: {
    include: { questions: { include: { options: true, column: true } } },
  },
} satisfies Prisma.LinkInclude;

export type TLink_data = Prisma.LinkGetPayload<{
  include: typeof link_include;
}>;

export type TRowContent = {
  [x: string]: string;
};

export type TJsonOptions = {
  id: string;
  name: string;
  color: string;
  columnId: string;
};

export interface ListData {
  list: TList_data;
  rows: TRowContent[];
}
