import { z } from "zod";

export const zContactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  referral: z.string().optional(),
  body: z.string().min(1),
});