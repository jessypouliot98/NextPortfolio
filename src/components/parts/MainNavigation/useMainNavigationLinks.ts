import { useMemo } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { useLang } from "@/hooks";
import { getMatchingRouteUrl } from "@/utils/navigation/getMatchingRoute";
import { ROUTES } from "@/utils/navigation/routes";

import { AppLanguage } from "@/types";

type NavLink = {
  title: string;
  href: string;
  label?: string;
  isActive: boolean;
  locale?: AppLanguage;
};

export const useMainNavigationLinks = (isMobileNavigation = false) => {
  const { i18n } = useTranslation();
  const lang = useLang();
  const router = useRouter();

  const homeLink: NavLink = useMemo(() => ({
    title: ROUTES['home'].title(i18n),
    href: ROUTES['home'].url(lang),
    isActive: ROUTES['home'].getIsExactActive(router),
  }), [i18n, lang, router]);

  const switchLangLink: NavLink = useMemo(() => {
    const otherLang: AppLanguage = ({ en: 'fr', fr: 'en' } as const)[lang];

    return {
      title: otherLang.toUpperCase(),
      href: getMatchingRouteUrl(otherLang, router),
      isActive: false,
      label: i18n.t(({ en: 'common:language.fr', fr: 'common:language.en' } as const)[otherLang]),
      locale: otherLang,
    };
  }, [i18n, lang, router]);

  const links =  useMemo(() => {
    const baseLinks: NavLink[] = [
      {
        title: ROUTES['services'].title(i18n),
        href: ROUTES['services'].url(lang),
        isActive: ROUTES['services'].getIsActive(router),
      },
      {
        title: ROUTES['projects'].title(i18n),
        href: ROUTES['projects'].url(lang),
        isActive: ROUTES['projects'].getIsActive(router),
      },
      {
        title: ROUTES['blog'].title(i18n),
        href: ROUTES['blog'].url(lang),
        isActive: ROUTES['blog'].getIsActive(router),
      },
      {
        title: ROUTES['contact'].title(i18n),
        href: ROUTES['contact'].url(lang),
        isActive: ROUTES['contact'].getIsActive(router),
      },
    ];

    if (isMobileNavigation) {
      return [
        homeLink,
        ...baseLinks,
        switchLangLink,
      ];
    }

    return [
      ...baseLinks,
      switchLangLink,
    ];
  }, [homeLink, i18n, isMobileNavigation, lang, router, switchLangLink]);

  return {
    homeLink,
    links,
  };
};