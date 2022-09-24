import React, { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { FaBars, FaMoon, FaSun, FaWindowClose } from "react-icons/fa";
import clsx from "clsx";

import { useLang } from "@/hooks/app";
import { ScrollDir, useDocumentScroll, useInnerFocus, useTheme } from "@/hooks/document";
import { getIsActive, getIsHomeActive, Routes } from "@/utils/link";

import { Button } from "@/components/general";
import Link from "@/components/general/Link/Link";

import { AppLanguage } from "../../../../types";

export type MobileMainNavigationProps = {
  navHeightClass: string,
  headerRef: React.RefObject<HTMLElement>,
}

export const MobileMainNavigation: React.FC<MobileMainNavigationProps> = ({ navHeightClass, headerRef }) => {
  const lang = useLang();
  const { toggleTheme, isDark } = useTheme();
  const { t } = useTranslation();
  const { dir } = useDocumentScroll({ y: 80 });
  const { isFocused } = useInnerFocus(headerRef);
  const router = useRouter();
  const positionOffset = isFocused || dir === ScrollDir.up ? 0 : -100;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    {
      route: Routes.getHome(lang),
      title: t('global:header.home'),
      getCustomIsActive: () => getIsHomeActive(router),
    },
    {
      route: Routes.getProjectList(lang),
      title: t('global:header.projects'),
    },
    {
      route: Routes.getBlogList(lang),
      title: t('global:header.blog'),
    },
    {
      route: Routes.getContact(lang),
      title: t('global:header.contact'),
    },
  ];
  const otherLang: AppLanguage = ({ en: 'fr', fr: 'en' } as const)[lang];
  const changeLangText = { en: 'FR', fr: 'EN' }[lang];

  const linkStyle = clsx('btn btn-white');

  return (
    <>
      <div
        className={clsx(
          navHeightClass,
          'transition px-5 flex items-center fixed z-50 top-0 left-0 right-0 shadow-lg',
          'bg-white dark:bg-blue-500 dark:bg-opacity-90',
        )}
        style={{ transform: `translateY(${positionOffset}%)` }}
      >
        <div className="flex-1">
          <Link
            className={clsx(
              'btn btn-default text-xl',
              getIsHomeActive(router) && '!bg-blue-500 !text-white'
            )}
            href={Routes.getHome(lang).href}
          >
            {t('global:header.home')}
          </Link>
        </div>
        <Button
          className="text-xl min-w-touch min-h-touch"
          type="default"
          aria-label={t('global:header.mainMenuBtn')}
          onPress={() => setIsMenuOpen(true)}
        >
          <FaBars />
        </Button>
      </div>
      <aside
        className={'fixed z-50 top-0 right-0 bottom-0 left-0 transition-all duration-500 ease-in-out bg-blue-500 dark:bg-gray-700'}
        style={{
          clipPath: `circle(${isMenuOpen ? '100% at 50% 50%' : '0% at calc(100% - 32px) 28px'})`,
        }}
      >
        <div className={'relative h-full'}>
          <div className={clsx(navHeightClass, 'absolute px-5 flex items-center top-0 right-0')}>
            <Button
              className="text-xl min-w-touch min-h-touch"
              type="white"
              aria-label={t('global:header.mainMenuBtn')}
              onPress={() => setIsMenuOpen(false)}
            >
              <FaWindowClose />
            </Button>
          </div>

          <nav className={'h-full flex flex-center'}>
            <ul className={'-m-4 flex flex-center flex-col'}>
              {links.map(({ route, title, getCustomIsActive }) => {
                const isActive = getCustomIsActive ? getCustomIsActive() : getIsActive(router, route?.path);
                return (
                  <li key={title} className={'p-4'}>
                    <Link
                      className={clsx(
                        linkStyle,
                        isActive && '!bg-blue-700 dark:!bg-blue-500 !text-white',
                      )}
                      href={route.href}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {title}
                    </Link>
                  </li>
                );
              })}
              <li className={'p-4'}>
                <Link
                  className={clsx(linkStyle)}
                  aria-label={t({ en: 'common:language.fr', fr: 'common:language.en' }[lang])}
                  // TODO Refactor to current page instead of home
                  href={'/'}
                  locale={otherLang}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {changeLangText}
                </Link>
              </li>
              <li className={'p-4'}>
                <button
                  id={'toggle-theme'}
                  aria-label={t('global:header.toggleTheme')}
                  className={linkStyle}
                  onClick={toggleTheme}
                >
                  {isDark ? <FaSun /> : <FaMoon />}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};
