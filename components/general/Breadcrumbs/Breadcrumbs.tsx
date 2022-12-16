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
  const { t } = useTranslation('navigation');

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
          const labelStyle = clsx('truncate max-w-[200px] lg:max-w-none');
          const linkStyle = clsx(labelStyle, 'link link-primary');
          const title = t(label, i18nProps);

          return (
            <motion.div
              key={href}
              className={'flex'}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 * (i / arr.length) }}
            >
              <div className={'mr-2 flex flex-center'}>
                {isCurrent ? (
                  <span className={labelStyle} title={title} aria-current={'page'}>
                    {title}
                  </span>
                ) : (
                  <Link
                    className={linkStyle}
                    title={title}
                    href={href}
                  >
                    {isHome ? <FaHome size={'1.3em'} /> : title}
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
