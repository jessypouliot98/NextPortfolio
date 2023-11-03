import React from "react";
import { NextApiRequest, NextApiResponse } from "next";
import Pdf from "@react-pdf/renderer";
import { getCVPage } from "@/lib/contentful";

import { getValidLang } from "@/utils/locale";

import { CvPdf } from "@/components/pdf/CvPdf/CvPdf";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const lang = getValidLang((req.query as { lang: string }).lang);
  const page = await getCVPage({ lang });

  try {
    await CvPdf.init();
    const pdf = await Pdf.renderToStream(<CvPdf {...page} />);
    pdf.pipe(res);
  } catch (err) {
    res.status(400).send((err as Error).message);
  }
};

export default handler;