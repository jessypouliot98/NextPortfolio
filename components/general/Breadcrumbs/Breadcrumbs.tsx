import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { FaAngleRight, FaHome } from "react-icons/fa";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import Link from "@/components/general/Link/Link";


export type BreadcrumbsProps = {
  i18nProps?: Record<string, string>,
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ i18nProps }) => {
  const router = useRouter();
  const pathSplit = router.asPath.split('/');
  const routeSplit = router.route.split('/').splice(1);
  const { t } = useTranslation('router');
  
  const links = useMemo(() => {
    return pathSplit.reduce<{
      href: string,
      label: string,
    }[]>((linkAccumulator, path, i) => {
      const lastLink = linkAccumulator[i - 1];
      const hrefPrefix = i <= 1 ? '' : lastLink?.href;
      
      linkAccumulator.push({
        href: `${hrefPrefix}/${path}`,
        label: [...routeSplit.filter((_, j) => j < i), 'title'].join('.'),
      });
      
  
      return linkAccumulator;
    }, []);
  }, [pathSplit, routeSplit]);

  if (router.route === '/') {
    return null;
  }

  return (
    <AnimatePresence initial={true   }>  
      <div className={'flex flex-wrap'}>
        {links.map(({ href, label }, i, arr) => {
          const isHome = i === 0;
          const isCurrent = i === arr.length - 1;
          const labelStyle = clsx('flex flex-center h-full truncate');
          const linkStyle = clsx(labelStyle, 'link link-primary');
          
          return (
            <motion.div
              key={href}
              className={'flex'}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 * (i / arr.length) }}
            >
              <div className={'mr-2'}>
                {isCurrent ? (
                  <span className={labelStyle} aria-current={'page'}>
                    {t(label, i18nProps)}
                  </span>
                ) : (
                  <Link
                    className={linkStyle}
                    title={isHome ? t(label) : undefined}
                    href={href}
                  >
                    {isHome ? <FaHome size={'1.3em'} /> : t(label, i18nProps)}
                  </Link>
                )}
              </div>
              {!isCurrent && (
                <div className={'mr-2 flex flex-center'}><FaAngleRight/></div>
              )}
            </motion.div>
          );
        })}
      </div>
    </AnimatePresence>
  );
};