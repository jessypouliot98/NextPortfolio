import { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';
import getConfig from "next/config";
import { Mail } from "@prisma/client";
import { sendMail, sendMailConfirmation } from "@/lib/mail";
import { validateRecaptchaToken } from '@/lib/node-recaptcha';
import { NextPrisma } from '@/lib/prisma-client';

import { getLanguageFromRequest } from "@/utils/request/getLanguageFromRequest";
import { mailCreateSchema } from "@/utils/schemas/mail";
import { reCAPTCHASchema } from "@/utils/schemas/reCAPTCHA";

const { MAIL_ADDRESS } = getConfig().serverRuntimeConfig;

const mailApi = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      return createMail(req, res);
    default:
      res.status(404);
  }
};

const createMail = async (req: NextApiRequest, res: NextApiResponse) => {
  const zodParse = mailCreateSchema.merge(reCAPTCHASchema).safeParse(req.body);

  if (!zodParse.success) {
    return res.status(400).send(zodParse.error.formErrors);
  }

  const { recaptchaToken, ...data } = zodParse.data;

  const reCAPTCHAValidation = await validateRecaptchaToken(recaptchaToken);
  if (!reCAPTCHAValidation.success) {
    return res.status(400).send('Invalid reCAPTCHA token');
  }

  const mail = await NextPrisma.getClient().mail.create({ data });

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
    await sendMailConfirmation({
      to: data.email,
      text,
      lang: getLanguageFromRequest(req),
    });
    mailData = {
      isSent: true,
      dump: JSON.stringify(sentMail),
    };
  } catch (e) {
    mailData = {
      isSent: false,
      dump: (e as Error).message,
    };
  }
  await NextPrisma.getClient().mail.update({
    where: { id: mail.id },
    data: mailData,
  });

  res.status(201).end();
};

export default mailApi;