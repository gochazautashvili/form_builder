import { z } from "zod";

export const sign_up_schema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email().min(1),
  password: z.string().min(1).max(100),
});

export type TSign_up = z.infer<typeof sign_up_schema>;

export const sign_in_schema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1).max(100),
});

export type TSign_in = z.infer<typeof sign_in_schema>;
