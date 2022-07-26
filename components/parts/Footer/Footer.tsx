import React from "react";
import {SocialLinks} from "../SocialLinks/SocialLinks";
import clsx from "clsx";

export type FooterProps = {}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer
      className={clsx(
        'px-5 py-8 flex flex-col items-center',
        'bg-gray-200 dark:bg-gray-800',
      )}
    >
      <SocialLinks />
      <div className={'flex-1 text-center'}>Built & Designed by Jessy Pouliot</div>
    </footer>
  )
}
