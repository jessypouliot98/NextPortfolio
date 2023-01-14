import getConfig from "next/config";
import { Mail } from "@prisma/client";
import { sendMail, sendMailConfirmation } from "@/lib/mail";
import { validateRecaptchaToken } from "@/lib/node-recaptcha";
import { procedure, router } from "@/lib/trpc/server/trpc";
import { zFormReCAPTCHASchema } from "@/lib/validators/form";

import { mailCreateSchema } from "@/utils/schemas/mail";

const { MAIL_ADDRESS } = getConfig().serverRuntimeConfig;

export const mailRouter = router({
  contact: procedure.input(mailCreateSchema.merge(zFormReCAPTCHASchema)).mutation(async ({ ctx, input }) => {
    const { recaptchaToken, ...data } = input;

    const reCAPTCHAValidation = await validateRecaptchaToken(recaptchaToken);
    if (!reCAPTCHAValidation.success) {
      throw new Error('Invalid reCAPTCHA token');
    }

    const mail = await ctx.prisma.mail.create({ data });

    const text = [
      `Email: ${data.email}`,
      `Referral: ${data.referral || '-'}`,
      'Body:',
      data.body
    ].join('\n');

    let mailData: Partial<Mail> = {};

    try {
      const sentMail = await sendMail({
        to: MAIL_ADDRESS,
        subject: `[NextPortfolio] - ${data.firstName} ${data.lastName}`,
        text,
      });
      const sentConfirmationMail = await sendMailConfirmation({
        to: data.email,
        text,
        lang: ctx.lang,
      });
      mailData = {
        isSent: true,
        dump: JSON.stringify({ sentMail, sentConfirmationMail }),
      };
    } catch (e) {
      mailData = {
        isSent: false,
        dump: (e as Error).message,
      };
    }
    await ctx.prisma.mail.update({
      where: { id: mail.id },
      data: mailData,
    });
  }),
});