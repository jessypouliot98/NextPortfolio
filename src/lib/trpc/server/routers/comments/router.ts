import { z } from "zod";
import { validateRecaptchaToken } from "@/lib/node-recaptcha";
import { procedure, router } from "@/lib/trpc/server/trpc";

export const commentRouter = router({
  create: procedure.input(z.object({
    contentfulEntryId: z.string(),
    content: z.string(),
    authorName: z.string(),
    recaptchaToken: z.string(),
  })).mutation(async ({ ctx, input }) => {
    const { recaptchaToken, ...data } = input;

    const reCAPTCHAValidation = await validateRecaptchaToken(recaptchaToken);
    if (!reCAPTCHAValidation.success) {
      throw new Error('Invalid ReCAPTCHA token');
    }

    await ctx.prisma.comment.create({ data });
  })
});