import { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';
import { validateRecaptchaToken } from '@/lib/node-recaptcha';
import { NextPrisma } from '@/lib/prisma-client';

import { mailCreateSchema } from "@/utils/schemas/mail";
import { reCAPTCHASchema } from "@/utils/schemas/reCAPTCHA";

const mailApi = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      return createMail(req, res);
    default:
      res.status(404);
  }
};

const createMail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { recaptchaToken, ...data } = mailCreateSchema.merge(reCAPTCHASchema).parse(req.body);

  const reCAPTCHAValidation = await validateRecaptchaToken(recaptchaToken);
  if (!reCAPTCHAValidation.success) {
    return res.status(400).send('Invalid reCAPTCHA token');
  }
  
  await NextPrisma.getClient().mail.create({ data });
  
  res.status(201).end();
};

export default mailApi;