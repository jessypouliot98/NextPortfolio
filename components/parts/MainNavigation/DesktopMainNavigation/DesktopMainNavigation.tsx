import React, { useRef } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { FaMoon, FaSun } from "react-icons/fa";
import clsx from "clsx";

import { useLang } from "@/hooks/app";
import { ScrollDir, useDocumentScroll, useInnerFocus, useTheme } from "@/hooks/document";
import { getIsActive, getIsHomeActive, Routes } from "@/utils/link";

import Link from "@/components/general/Link/Link";

import { AppLanguage } from "../../../../types";

export type DesktopMainNavigationProps = {
  navHeightClass: string,
  headerRef: React.RefObject<HTMLElement>,
}

export const DesktopMainNavigation: React.FC<DesktopMainNavigationProps> = ({ navHeightClass, headerRef }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const lang = useLang();

  const { dir } = useDocumentScroll({ y: 80 });
  const { isFocused } = useInnerFocus(headerRef);
  const { toggleTheme, isDark } = useTheme();

  const links = [
    {
      route: Routes.getProjectList(lang),
      title: t('global:header.projects'),
    },
    {
      route: Routes.getContact(lang),
      title: t('global:header.contact'),
    },
  ];
  const otherLang: AppLanguage = ({ en: 'fr', fr: 'en' } as const)[lang];

  const homeRoute = Routes.getHome(lang);
  const changeLangText = { en: 'FR', fr: 'EN' }[lang];
  const positionOffset = isFocused || dir === ScrollDir.up ? 0 : -100;

  const linkStyle = clsx('btn btn-default');
  const activeLinkStyle = clsx(
    '!bg-blue-500 !text-white',
    'dark:!bg-white dark:!text-blue-500'
  );

  return (
    <nav
      className={clsx(
        navHeightClass,
        'transition px-5 flex items-center fixed z-50 top-0 left-0 right-0 shadow-lg',
        'bg-white dark:bg-blue-500 dark:bg-opacity-90',
      )}
      style={{ transform: `translateY(${positionOffset}%)` }}
    >
      <div className={'p-2'}>
        <Link
          className={clsx(
            linkStyle,
            getIsHomeActive(router) && activeLinkStyle,
          )}
          href={homeRoute.href}
        >
          {t('global:header.home')}
        </Link>
      </div>
      <ul className={'-m-2 flex flex-1 flex-row items-center justify-end'}>
        <li className={'p-2'}>
          <button
            id={'toggle-theme'}
            aria-label={t('global:header.toggleTheme')}
            className={linkStyle}
            onClick={toggleTheme}
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
        </li>
        {links.map(({ route, title }) => (
          <li key={title} className={'p-2'}>
            <Link
              className={clsx(
                linkStyle,
                getIsActive(router, route?.path) && activeLinkStyle,
              )}
              href={route.href}
            >
              {title}
            </Link>
          </li>
        ))}
        <li className={'p-2'}>
          <Link
            className={clsx(linkStyle)}
            aria-label={t({ en: 'common:language.fr', fr: 'common:language.en' }[lang])}
            // TODO Refactor to current page instead of home
            href={'/'}
            locale={otherLang}
          >
            {changeLangText}
          </Link>
        </li>
      </ul>
    </nav>
  );
};
