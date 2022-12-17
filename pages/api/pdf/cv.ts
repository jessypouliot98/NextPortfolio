import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from "puppeteer";

import { ROUTES } from "@/utils/navigation/routes";

import { AppLanguage } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Buffer>
) {
  const lang = (req.query.lang || 'en') as AppLanguage;
  const cvUrl = process.env.SITE_URL + ROUTES['hidden.cv'].url(lang);

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-sandbox',
    ]
  });

  const page = await browser.newPage();
  await page.goto(cvUrl, {
    waitUntil: 'networkidle0'
  });
  const pdf = await page.pdf({
    printBackground: true,
    format: 'LETTER',
  });

  await browser.close();

  res.setHeader('Content-Disposition', `filename="cv_${lang}_jessy_pouliot.pdf"`).send(pdf);
}
