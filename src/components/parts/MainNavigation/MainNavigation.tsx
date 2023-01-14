import React from "react";

import { DesktopMainNavigation } from "@/components/parts/MainNavigation/DesktopMainNavigation/DesktopMainNavigation";
import { MobileMainNavigation } from "@/components/parts/MainNavigation/MobileMainNavigation/MobileMainNavigation";

export type MainNavigationProps = {
  navHeightClass: string,
}

export const MainNavigation: React.FC<MainNavigationProps> = ({ navHeightClass }) => {
  return (
    <>
      <div className="hidden md:block">
        <DesktopMainNavigation navHeightClass={navHeightClass} />
      </div>
      <div className="block md:hidden">
        <MobileMainNavigation navHeightClass={navHeightClass} />
      </div>
    </>
  );
};
