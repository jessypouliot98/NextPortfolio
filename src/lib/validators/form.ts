import { z } from "zod";

export const zReCAPTCHASchema = z.string();
export const zFormReCAPTCHASchema = z.object({
  recaptchaToken: zReCAPTCHASchema,
});