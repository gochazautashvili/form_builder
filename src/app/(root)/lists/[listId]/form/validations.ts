import { z } from "zod";

export const types = [
  "TEXT",
  "DATE",
  "CHOICE",
  "NUMBER",
  "PERSON",
  "TEXTAREA",
] as const;

export const add_column = z.object({
  question: z.string().min(1).max(50),
  required: z.boolean().default(false),
  type: z.enum(types),
});

export type TCreate_schema = z.infer<typeof add_column>;
