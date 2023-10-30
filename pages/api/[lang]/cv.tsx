import React from "react";
import { NextApiRequest, NextApiResponse } from "next";
import ReactPDF from "@react-pdf/renderer";
import { getCVPage } from "@/lib/contentful";

import { getValidLang } from "@/utils/locale";

import { CvPdf } from "@/components/pdf/CvPdf/CvPdf";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const lang = getValidLang((req.query as { lang: string }).lang);
  const page = await getCVPage({ lang });

  const pdfStream = await ReactPDF.renderToStream(
    <CvPdf {...page} />
  );

  pdfStream.pipe(res);
};

export default handler;