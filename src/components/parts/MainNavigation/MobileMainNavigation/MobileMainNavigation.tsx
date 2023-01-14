import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { FaBars, FaMoon, FaSun, FaWindowClose } from "react-icons/fa";
import clsx from "clsx";
import { useTheme } from "@/lib/theme";

import { ScrollDir, useDocumentScroll } from "@/hooks/document";

import { Button } from "@/components/general";
import Anchor from "@/components/general/Anchor/Anchor";
import { useMainNavigationLinks } from "@/components/parts/MainNavigation/useMainNavigationLinks";

export type MobileMainNavigationProps = {
  className?: string,
  navHeightClass: string,
}

export const MobileMainNavigation: React.FC<MobileMainNavigationProps> = ({ className, navHeightClass }) => {
  const { toggleTheme, isDark } = useTheme();
  const { t } = useTranslation();
  const { dir } = useDocumentScroll({ y: 80 });
  const positionOffset = dir === ScrollDir.up ? 0 : -100;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { homeLink, links } = useMainNavigationLinks(true);

  const linkStyle = clsx('btn btn-white');

  return (
    <>
      <div
        className={clsx(
          navHeightClass,
          'transition px-5 flex items-center fixed z-50 top-0 left-0 right-0 shadow-lg',
          'bg-white dark:bg-blue-500 dark:text-white',
          'focus-within:!translate-y-0',
          className,
        )}
        style={{ transform: `translateY(${positionOffset}%)` }}
      >
        <div className="flex-1 flex items-center">
          <Link
            className="btn btn-default !p-0"
            href={homeLink.href}
            title={homeLink.title}
            locale={homeLink.locale}
            aria-label={homeLink.label}
          >
            <img src={isDark ? '/assets/logo_bw.svg' : '/assets/logo_color.svg'} className="inline-block w-10 h-10" alt="logo" />
          </Link>
        </div>
        <Button
          className="text-xl min-w-touch min-h-touch"
          variant="default"
          aria-label={t('global:header.mainMenuBtn')}
          onClick={() => setIsMenuOpen(true)}
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
              variant="white"
              aria-label={t('global:header.mainMenuBtn')}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaWindowClose />
            </Button>
          </div>

          <nav className={'h-full flex flex-center'}>
            <ul className={'-m-4 flex flex-center flex-col'}>
              {links.map(({ title, href, isActive, locale, label  }) => {
                return (
                  <li key={title} className={'p-4'}>
                    <Link
                      className={clsx(
                        linkStyle,
                        isActive && '!bg-blue-700 dark:!bg-blue-500 !text-white',
                      )}
                      href={href}
                      locale={locale}
                      aria-label={label}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {title}
                    </Link>
                  </li>
                );
              })}
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
