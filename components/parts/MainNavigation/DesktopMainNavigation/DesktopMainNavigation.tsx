import React from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { FaMoon, FaSun } from "react-icons/fa";
import clsx from "clsx";

import { useLang } from "@/hooks/app";
import { ScrollDir, useDocumentScroll, useTheme } from "@/hooks/document";
import { getAlternateRoute, Routes } from "@/utils/link";

import { Button } from "@/components/general";
import Link from "@/components/general/Link/Link";
import { useMainNavigationLinks } from "@/components/parts/MainNavigation/useMainNavigationLinks";

import { AppLanguage } from "@/types";

export type DesktopMainNavigationProps = {
  className?: string,
  navHeightClass: string,
}

export const DesktopMainNavigation: React.FC<DesktopMainNavigationProps> = ({ className, navHeightClass }) => {
  const { t } = useTranslation();

  const lang = useLang();

  const { dir } = useDocumentScroll({ y: 80 });
  const { toggleTheme, isDark } = useTheme();

  const { links } = useMainNavigationLinks();

  const changeLangText = { en: 'FR', fr: 'EN' }[lang];
  const positionOffset = dir === ScrollDir.up ? 0 : -100;

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
        'focus-within:!translate-y-0',
        className,
      )}
      style={{ transform: `translateY(${positionOffset}%)` }}
    >
      <div className="w-full max-w-[1500px] m-auto">
        <ul className={'-m-2 flex flex-1 flex-row items-center justify-end'}>
          <li className={'flex items-center p-2 mr-auto'}>
            <Link
              className="btn btn-default !p-1 -m-1"
              href={Routes.getHome(lang).href}
              title={t('global:header.home')}
            >
              <img src={isDark ? '/assets/logo_bw.svg' : '/assets/logo_color.svg'} className="inline-block w-10 h-10" alt="logo" />
            </Link>
          </li>
          <li className={'p-2'}>
            <Button
              id={'toggle-theme'}
              type={'default'}
              aria-label={t('global:header.toggleTheme')}
              className={linkStyle}
              onPress={toggleTheme}
            >
              {isDark ? <FaSun /> : <FaMoon />}
            </Button>
          </li>
          {links.map(({ href, title, isActive, label, locale }) => (
            <li key={title} className={'p-2'}>
              <Link
                className={clsx(
                  linkStyle,
                  isActive && activeLinkStyle,
                )}
                href={href}
                locale={locale}
                aria-label={label}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
