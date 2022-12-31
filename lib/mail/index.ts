import getConfig from "next/config";
import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";

import { AppLanguage } from "@/types";

const { MAIL_SERVICE, MAIL_HOST, MAIL_USER, MAIL_PASSWORD } = getConfig().serverRuntimeConfig;

export type MailOptions = {
  to: string;
  subject: string;
  text: string;
}

export const sendMail = async (mailOptions: MailOptions) => {
  const transporter = nodemailer.createTransport(smtpTransport({
    service: MAIL_SERVICE,
    host: MAIL_HOST,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD
    }
  }));

  return transporter.sendMail({
    from: MAIL_USER,
    ...mailOptions,
  });
};

export type SendMailConfirmationOptions = {
  to: string;
  text: string;
  lang: AppLanguage;
}
export const sendMailConfirmation = async ({ lang, text, ...mailOptions }: SendMailConfirmationOptions) => {
  await sendMail({
    ...mailOptions,
    subject: lang === 'en' ? 'Email confirmation' : 'Confirmation d\'envoie',
    text: [
      lang === 'en' ? 'Message received, we\'ll respond as soon as possible' : 'Message reçu, nous allons vous répondre dès que possible',
      '',
      lang === 'en' ? '--- Message sent ---' : '--- Message envoyé ---',
      '',
      text,
    ].join('\n'),
  });
};