import React from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { FaMoon, FaSun } from "react-icons/fa";
import clsx from "clsx";
import { useTheme } from "@/lib/theme";

import { ScrollDir, useDocumentScroll } from "@/hooks/document";

import { Button } from "@/components/general";
import { useMainNavigationLinks } from "@/components/parts/MainNavigation/useMainNavigationLinks";

export type DesktopMainNavigationProps = {
  className?: string,
  navHeightClass: string,
}

export const DesktopMainNavigation: React.FC<DesktopMainNavigationProps> = ({ className, navHeightClass }) => {
  const { t } = useTranslation();

  const { dir } = useDocumentScroll({ y: 80 });
  const { toggleTheme, isDark } = useTheme();

  const { homeLink, links } = useMainNavigationLinks();

  const positionOffset = dir === ScrollDir.up ? 0 : -100;

  const linkStyle = 'btn btn-default';
  const activeLinkStyle = 'btn btn-primary dark:btn-white';

  return (
    <nav
      className={clsx(
        navHeightClass,
        'transition px-5 flex items-center fixed z-50 top-0 left-0 right-0 shadow-lg',
        'bg-white dark:bg-blue-500 dark:text-white',
        'focus-within:!translate-y-0',
        className,
      )}
      style={{ transform: `translateY(${positionOffset}%)` }}
    >
      <div className="w-full max-w-[1500px] m-auto">
        <ul className="-m-2 flex flex-1 flex-row items-center justify-end">
          <li className="flex items-center p-2 mr-auto">
            <Link
              className="btn btn-default !p-1 -m-1"
              href={homeLink.href}
              title={homeLink.title}
              locale={homeLink.locale}
              aria-label={homeLink.label}
            >
              <img src={isDark ? '/assets/logo_bw.svg' : '/assets/logo_color.svg'} className="inline-block w-10 h-10" alt="logo" />
            </Link>
          </li>
          <li className="p-2">
            <Button
              id="toggle-theme"
              variant="default"
              aria-label={t('global:header.toggleTheme')}
              className={linkStyle}
              onClick={toggleTheme}
            >
              {isDark ? <FaSun /> : <FaMoon />}
            </Button>
          </li>
          {links.map(({ href, title, isActive, label, locale }) => (
            <li key={title} className="p-2">
              <Link
                className={isActive ? activeLinkStyle : linkStyle}
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
