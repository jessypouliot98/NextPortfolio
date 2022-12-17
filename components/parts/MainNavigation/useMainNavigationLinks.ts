import { useMemo } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { useLang } from "@/hooks";
import { getAlternateRoute } from "@/utils/link";
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
    isActive: false,
  }), [i18n, lang]);

  const switchLangLink: NavLink = useMemo(() => {
    const otherLang: AppLanguage = ({ en: 'fr', fr: 'en' } as const)[lang];

    return {
      title: otherLang.toUpperCase(),
      href: getAlternateRoute(router, otherLang).localizedHref,
      isActive: false,
      label: i18n.t({ en: 'common:language.fr', fr: 'common:language.en' }[otherLang]),
      locale: otherLang,
    };
  }, [i18n, lang, router]);

  const links =  useMemo(() => {
    const baseLinks: NavLink[] = [
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
  }, [homeLink, i18n, isMobileNavigation, lang, switchLangLink]);

  return {
    homeLink,
    links,
  };
};