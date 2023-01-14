import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { FaAngleRight, FaHome } from "react-icons/fa";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import { useLang } from "@/hooks";
import { ROUTES, ROUTES_PATH_MAP } from "@/utils/navigation/routes";

const SELF = '--SELF--';

export type BreadcrumbsProps = {
  i18nProps?: Record<string, string>,
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ i18nProps }) => {
  const router = useRouter();
  const lang = useLang();
  const { i18n } = useTranslation('navigation');
  const routes = ROUTES_PATH_MAP.get(router.route);

  if (!routes || router.route === ROUTES['home'].path) {
    return null;
  }

  return (
    <AnimatePresence initial={true}>
      <div className="flex flex-wrap mt-5">
        {[...routes.breadcrumbs, SELF].map((breadcrumb, i, { length }) => {
          const isSelf = breadcrumb === SELF;

          const route = isSelf
            ? ROUTES_PATH_MAP.get(router.route)
            : ROUTES?.[breadcrumb as keyof typeof ROUTES];

          if (!route) {
            return null;
          }

          const isHome = route.path === ROUTES['home'].path;
          const labelStyle = clsx('truncate max-w-[200px] lg:max-w-none');
          const linkStyle = clsx(labelStyle, 'link link-primary');
          const title = route.breadcrumbTitle(i18n, i18nProps);
          const url = route.url(lang, router.query as any);

          return (
            <motion.div
              key={route.path}
              className="flex"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i / length }}
            >
              <div className="mr-2 flex flex-center">
                {isSelf ? (
                  <span className={labelStyle} title={title} aria-current="page">
                    {title}
                  </span>
                ) : (
                  <Link
                    className={linkStyle}
                    title={title}
                    href={url}
                  >
                    {isHome ? <FaHome size="1.3em" /> : title}
                  </Link>
                )}
              </div>
              {!isSelf && (
                <div className="mr-2 flex flex-center"><FaAngleRight/></div>
              )}
            </motion.div>
          );
        })}
      </div>
    </AnimatePresence>
  );
};
