import React from "react";

import { DesktopMainNavigation } from "@/components/parts/MainNavigation/DesktopMainNavigation/DesktopMainNavigation";
import { MobileMainNavigation } from "@/components/parts/MainNavigation/MobileMainNavigation/MobileMainNavigation";

export type MainNavigationProps = {
  navHeightClass: string,
  headerRef: React.RefObject<HTMLElement>,
}

export const MainNavigation: React.FC<MainNavigationProps> = ({ navHeightClass, headerRef }) => {
  return (
    <>
      <div className={'hidden md:block'}>
        <DesktopMainNavigation navHeightClass={navHeightClass} headerRef={headerRef} />
      </div>
      <div className={'block md:hidden'}>
        <MobileMainNavigation navHeightClass={navHeightClass} headerRef={headerRef} />
      </div>
    </>
  );
};
