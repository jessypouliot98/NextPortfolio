import React, { useRef } from "react";
import clsx from "clsx";

import {ScrollDir, useDocumentScroll, useInnerFocus, useTheme} from "@/hooks/document";

import Link from "@/components/general/Link/Link";
import {FaMoon, FaSun} from "react-icons/fa";
import {useRouter} from "next/router";
import {getIsActive, getIsHomeActive, getLink, Routes} from "@/utils/link";
import {useLang} from "@/hooks/app";

export type HeaderProps = {}

const NAV_HEIGHT_CLASS = 'h-16';

export const Header: React.FC<HeaderProps> = () => {
  const router = useRouter();
  const lang = useLang();
  const { dir } = useDocumentScroll({ y: 80 });
  const headerRef = useRef<HTMLElement>(null);
  const { isFocused } = useInnerFocus(headerRef);
  const { toggleTheme, isDark } = useTheme();

  const links = [
    {
      link: Routes.getProjects(lang),
      title: 'Projects'
    },
    {
      link: 'mailto:jessypouliot98@gmail.com',
      title: 'Contact'
    },
  ];

  const homeHref = Routes.getHome(lang);
  const [changeLangText, changeLangHref] = router.query.lang === 'en' ? ['FR', '/fr'] : ['EN', '/en'];
  const positionOffset = isFocused || dir === ScrollDir.up ? 0 : -100;

  const linkStyle = clsx(
    'transition p-2 rounded',
    'bg-transparent hover:bg-gray-100',
    'dark:bg-gray-100 dark:bg-opacity-0 dark:hover:bg-opacity-30',
  );
  const activeLinkStyle = clsx(
    '!bg-blue-600 !text-white',
    'dark:!bg-white dark:!text-blue-600'
  );

  return (
    <header ref={headerRef} className={clsx('relative', NAV_HEIGHT_CLASS)}>
      <nav
        className={clsx(
          NAV_HEIGHT_CLASS,
          'transition px-5 flex items-center fixed z-50 top-0 left-0 right-0 shadow-lg',
          'bg-white dark:bg-blue-500 dark:bg-opacity-90',
        )}
        style={{ transform: `translateY(${positionOffset}%)` }}
      >
        <div className={'p-2'}>
          <Link
            className={clsx(
              linkStyle,
              getIsHomeActive(router.asPath, lang) && activeLinkStyle,
            )}
            href={homeHref}
          >
            {'Home'}
          </Link>
        </div>
        <ul className={'-m-2 flex flex-1 flex-row items-center justify-end'}>
          <li className={'p-2'}>
            <button
              id={'toggle-theme'}
              className={linkStyle}
              onClick={toggleTheme}
            >
              {isDark ? <FaSun /> : <FaMoon />}
            </button>
          </li>
          {links.map(({ link, title }) => (
            <li key={title} className={'p-2'}>
              <Link
                className={clsx(
                  linkStyle,
                  getIsActive(router.asPath, link) && activeLinkStyle,
                )}
                href={link}
              >
                {title}
              </Link>
            </li>
          ))}
          <li className={'p-2'}>
            <a
              className={clsx(linkStyle)}
              href={getLink({
                en: '/fr',
                fr: '/en',
              }, lang)}
            >
              {changeLangText}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
