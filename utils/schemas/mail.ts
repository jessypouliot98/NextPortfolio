import { z } from "zod";

export const mailCreateSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  referral: z.string().optional(),
  body: z.string(),
});