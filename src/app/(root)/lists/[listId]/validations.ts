import { Type } from "@prisma/client";
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
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(50),
  type: z.enum(types),
});

export type TAdd_colum = z.infer<typeof add_column>;
