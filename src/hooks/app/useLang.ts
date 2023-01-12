import { useRouter } from "next/router";

import { getValidLang } from "@/utils/locale";

export const useLang = () => {
  const { locale } =  useRouter();

  return getValidLang(locale);
};
