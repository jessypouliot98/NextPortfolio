import React, {useState} from "react";
import clsx from "clsx";
import {ScrollDir, useDocumentScroll, useInnerFocus, useTheme} from "@/hooks/document";
import {Button} from "@/components/general";
import {useRouter} from "next/router";
import {getIsActive, getIsHomeActive, Routes} from "@/utils/link";
import {AppLanguage} from "../../../../types";
import {useLang} from "@/hooks/app";
import {useTranslation} from "next-i18next";
import {FaMoon, FaSun} from "react-icons/fa";
import Link from "@/components/general/Link/Link";

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
      route: Routes.getContact(lang),
      title: t('global:header.contact'),
    },
  ];
  const otherLang: AppLanguage = ({ en: 'fr', fr: 'en' } as const)[lang];
  const changeLangText = { en: 'FR', fr: 'EN' }[lang];

  const linkStyle = clsx('btn btn-white text-2xl');
  const activeLinkStyle = clsx(
    '!bg-blue-700 !text-white',
    'dark:!bg-blue-500'
  );

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
        <Button type="primary" onPress={() => setIsMenuOpen(true)}>
          Open
        </Button>
      </div>
      <aside
        className={'fixed z-50 top-0 right-0 bottom-0 left-0 transition-all duration-500 ease-in-out bg-blue-500 dark:bg-gray-700'}
        style={{
          clipPath: `circle(${isMenuOpen ? '100% at 50% 50%' : '0% at 45px 35px'})`,
        }}
      >
        <div className={'relative h-full'}>
          <div className={clsx(navHeightClass, 'absolute px-5 flex items-center top-0 left-0')}>
            <Button type="white" onPress={() => setIsMenuOpen(false)}>
              Close
            </Button>
          </div>

          <nav className={'h-full flex-center'}>
            <ul className={'-m-4 flex-center flex-col'}>
              {links.map(({ route, title, getCustomIsActive }) => {
                const isActive = getCustomIsActive ? getCustomIsActive() : getIsActive(router, route?.path);
                return (
                  <li key={title} className={'p-4'}>
                    <Link
                      className={clsx(
                        linkStyle,
                        isActive && activeLinkStyle,
                      )}
                      href={route.href}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {title}
                    </Link>
                  </li>
                )
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
  )
}
