import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from "puppeteer";

import { AppLanguage } from "@/store/application/types";

import { Routes } from "@/utils/link";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Buffer>
) {
  const lang = req.query.lang || 'en';
  const protocol = /localhost:\d+/.test(req.headers.host as string) ? 'http' : 'https';
  const cvUrl = `${protocol}://${req.headers.host}${Routes.getCVPage(lang as AppLanguage).localizedHref}`;

  const browser = await puppeteer.launch({ headless: true });

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
