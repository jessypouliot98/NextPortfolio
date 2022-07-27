import React, {useRef} from "react";
import clsx from "clsx";

import {ScrollDir, useDocumentScroll, useInnerFocus} from "@/hooks/document";

import Link from "@/components/general/Link/Link";

export type HeaderProps = {}

const links = [
  { link: '/projects', title: 'Projects' },
  { link: 'mailto:jessypouliot98@gmail.com', title: 'Contact' },
];

export const Header: React.FC<HeaderProps> = () => {
  const { dir } = useDocumentScroll({ y: 80 });
  const headerRef = useRef<HTMLElement>(null);
  const { isFocused } = useInnerFocus(headerRef);

  const positionOffset = isFocused || dir === ScrollDir.up ? 0 : -100;

  const handleToggleTheme = () => {
    window.document.body.classList.toggle('dark');
  }

  const linkStyle = clsx(
    'transition p-2 rounded',
    'bg-transparent hover:bg-gray-100',
    'dark:bg-gray-100 dark:bg-opacity-0 dark:hover:bg-opacity-30',
  );
  const height = 'h-16';

  return (
    <header ref={headerRef} className={clsx('relative', height)}>
      <nav
        className={clsx(
          height,
          'transition px-5 flex items-center fixed z-50 top-0 left-0 right-0 shadow-lg',
          'bg-white dark:bg-blue-500 dark:bg-opacity-90',
        )}
        style={{ transform: `translateY(${positionOffset}%)`}}
      >
        <div className={'p-2'}>
          <Link className={linkStyle} href={'/'}>
            {'Home'}
          </Link>
        </div>
        <ul className={'-m-2 flex flex-1 flex-row items-center justify-end'}>
          <li className={'p-2'}>
            <button
              id={'toggle-theme'}
              className={linkStyle}
              onClick={handleToggleTheme}
            >
              Toggle Theme
            </button>
          </li>
          {links.map(({ link, title}) => (
            <li key={title} className={'p-2'}>
              <Link className={linkStyle} href={link}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
