import { NextApiRequest } from "next";

import { AppLanguage } from "@/types";

export const getLanguageFromRequest = (req: NextApiRequest): AppLanguage => {
  const path = req.headers.referer?.replace(req.headers.origin || '', '') || '';

  if (/^\/fr/.test(path)) {
    return 'fr';
  }

  return 'en';
};