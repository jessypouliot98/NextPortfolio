import React from "react";
import { NextApiRequest, NextApiResponse } from "next";
import Pdf from "@react-pdf/renderer";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { getCVPage } from "@/lib/contentful";

import { getValidLang } from "@/utils/locale";

import { CvPdf } from "@/components/pdf/CvPdf/CvPdf";

import pageEn from "../../../public/locales/en/page.json";
import commonEn from "../../../public/locales/en/common.json";
import pageFr from "../../../public/locales/fr/page.json";
import commonFr from "../../../public/locales/fr/common.json";

i18next
  .init({
    resources: {
      en: {
        page: pageEn,
        common: commonEn,
      },
      fr: {
        page: pageFr,
        common: commonFr,
      }
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const lang = getValidLang((req.query as { lang: string }).lang);
  const page = await getCVPage({ lang });

  i18next.changeLanguage(lang);

  try {
    const pdf = await Pdf.renderToStream((
      <I18nextProvider i18n={i18next}>
        <CvPdf {...page} />
      </I18nextProvider>
    ));
    res.setHeader("Content-Disposition", `inline; filename="CV ${process.env.SITE_TITLE} (${lang}).pdf"`);
    pdf.pipe(res);
  } catch (err) {
    res.status(400).send((err as Error).message);
  }
};

export default handler;