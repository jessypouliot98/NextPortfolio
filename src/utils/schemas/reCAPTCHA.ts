import { z } from "zod";

export const reCAPTCHASchema = z.object({
  recaptchaToken: z.string(),
});