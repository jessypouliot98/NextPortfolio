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
    <CvPdf
      title={page.title}
      subtitle={page.subtitle}
      intro="Full-Stack JavaScript (TypeScript ❤️) expert focusing mostly on React based technologies like React-Native and Next.js. I&apos;m passionate about coding, learning, improving and helping others where I have an impact."
      jobs={page.jobs}
      skills={page.skills}
      contacts={[
        { label: "(514) 267-2784", url: "tel:5142672784" },
        { label: "jessypouliot98@gmail.com", url: "mailto:jessypouliot98@gmail.com" },
        { label: "linkedin.com/in/jessypouliot", url: "https://www.linkedin.com/in/jessypouliot" },
        { label: "github.com/jessypouliot98", url: "https://github.com/jessypouliot98" },
        { label: "jessypouliot.ca", url: "https:/jessypouliot.ca" },
      ]}
    />
  );

  pdfStream.pipe(res);
};

export default handler;