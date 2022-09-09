import React, { useRef } from "react";
import clsx from "clsx";

import { MainNavigation } from "@/components/parts/MainNavigation/MainNavigation";

export type HeaderProps = {}

const NAV_HEIGHT_CLASS = 'h-16';

export const Header: React.FC<HeaderProps> = () => {
  const headerRef = useRef<HTMLElement>(null);

  return (
    <header ref={headerRef} className={clsx('relative', NAV_HEIGHT_CLASS)}>
      <MainNavigation headerRef={headerRef} navHeightClass={NAV_HEIGHT_CLASS} />
    </header>
  );
};
