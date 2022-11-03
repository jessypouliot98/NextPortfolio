import { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';
import { validateRecaptchaToken } from '@/lib/node-recaptcha';
import { NextPrisma } from '@/lib/prisma-client';

const mailApi = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      return createMail(req, res);
    default:
      res.status(404);
  }
};

const createMail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { firstName, lastName, email, subject, body, recaptchaToken } = JSON.parse(req.body);  

  if (!recaptchaToken) {
    return res.status(400).send('Missing reCAPTCHA token');
  }
  
  const reCAPTCHAvalidation = await validateRecaptchaToken(recaptchaToken);

  if (!reCAPTCHAvalidation.success) {
    return res.status(400).send('Invalid reCAPTCHA token');
  }
  
  await NextPrisma.getClient().mail.create({
    data: {
      firstName,
      lastName,
      email,
      subject,
      body,
    }
  });
  
  res.status(201).end();
};

export default mailApi;