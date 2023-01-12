import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "@/utils/constants";

import { AppLanguage } from "@/types";

export const getValidLang = (locale?: string): AppLanguage => {
  if (SUPPORTED_LANGUAGES.includes((locale || '') as any)) {
    return locale as AppLanguage;
  }

  return DEFAULT_LANGUAGE;
};
