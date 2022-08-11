import React from "react";
import { useTranslation } from "next-i18next";
import clsx from "clsx";

import Link from "@/components/general/Link/Link";
import { SocialLinks } from "@/components/parts";

export type FooterProps = {}

export const Footer: React.FC<FooterProps> = () => {
  const { t } = useTranslation();

  return (
    <footer
      className={clsx(
        'px-5 py-8 flex flex-col items-center',
        'bg-gray-200 dark:bg-gray-800',
      )}
    >
      <SocialLinks />
      <div className={'flex-1 text-center'}>
        <Link
          className={'hover:underline'}
          href={'https://github.com/jessypouliot98/NextPortfolio'}
          target={'_blank'}
          aria-label={t('global:footer.builtAndDesignedARIA')}
        >
          {t('global:footer.builtAndDesigned')}
        </Link>
      </div>
    </footer>
  );
};
