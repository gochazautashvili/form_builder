import { z } from "zod";

export const create_list = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(150),
  background: z.string().min(1),
});

export type TCreate_list = z.infer<typeof create_list>;
