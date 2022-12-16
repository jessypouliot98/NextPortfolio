import { useMemo } from "react";
import { useTranslation } from "next-i18next";

import { useLang } from "@/hooks";
import { ROUTES } from "@/utils/navigation/routes";

export const useMainNavigationLinks = (isMobileNavigation = false) => {
  const lang = useLang();
  const { i18n } = useTranslation();

  const links =  useMemo(() => {
    return [
      isMobileNavigation && ({
        title: ROUTES['home'].title(i18n),
        href: ROUTES['home'].url(lang),
        isActive: false,
      }),
      {
        title: ROUTES['projects'].title(i18n),
        href: ROUTES['projects'].url(lang),
        isActive: false,
      },
      {
        title: ROUTES['blog'].title(i18n),
        href: ROUTES['blog'].url(lang),
        isActive: false,
      },
      {
        title: 'Contact',
        href: 'mailto:jessypouliot98@gmail.com',
        isActive: false,
      },
    ].filter((r) => !!r);
  }, [i18n, isMobileNavigation, lang]);

  return {
    links,
  };
};