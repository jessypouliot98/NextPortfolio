import React from "react";
import clsx from "clsx";

import { MainNavigation } from "@/components/parts/MainNavigation/MainNavigation";

export type HeaderProps = {}

const NAV_HEIGHT_CLASS = 'h-16';

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className={clsx('relative', NAV_HEIGHT_CLASS)}>
      <MainNavigation navHeightClass={NAV_HEIGHT_CLASS} />
    </header>
  );
};
