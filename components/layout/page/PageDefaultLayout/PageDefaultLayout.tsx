import React from "react";
import Head from "next/head";
import clsx from "clsx";
import { motion } from 'framer-motion';

import { Breadcrumbs, BreadcrumbsProps } from "@/components/general/Breadcrumbs/Breadcrumbs";
import { Footer, Header } from "@/components/parts";

export enum OGType {
  article = 'article'
}
export enum TwitterCard {
  summaryLargeImage = 'summary_large_image'
}

export type PageDefaultLayoutProps = {
  children: React.ReactNode,
  title?: string,
  description?: string,
  sharing?: {
    'og:title'?: string,
    'og:description'?: string,
    'og:type'?: OGType,
    'og:image'?: string,
    'og:url'?: string,
    'og:site_name'?: string,
    'twitter:card'?: TwitterCard,
    'twitter:image:alt'?: string,
    'twitter:site'?: string,
    'fb:app_id'?: string,
  }
  breadcrumbsI18nProps?: BreadcrumbsProps['i18nProps'],
}

export const PageDefaultLayout: React.FC<PageDefaultLayoutProps> = ({ children, title, description, sharing, breadcrumbsI18nProps }) => {
  return (
    <>
      <Head>
        {title && <title key={'title'}>{title}</title>}
        {description && (<meta key={'description'} name={'description'} content={description} />)}
        {(sharing?.['og:title'] || title) && (<meta key={'og:title'} name={'og:title'} content={sharing?.['og:title'] || description} />)}
        {(sharing?.['og:description'] || description) && (<meta key={'og:description'} name={'og:description'} content={sharing?.['og:description'] || description} />)}
        {sharing?.['og:type'] && (<meta key={'og:type'} name={'og:type'} content={sharing?.['og:type']} />)}
        {sharing?.['og:image'] && (<meta key={'og:image'} name={'og:image'} content={sharing?.['og:image']} />)}
        {sharing?.['og:url'] && (<meta key={'og:url'} name={'og:url'} content={sharing?.['og:url']} />)}
        {sharing?.['og:site_name'] && (<meta key={'og:site_name'} name={'og:site_name'} content={sharing?.['og:site_name']} />)}
        {sharing?.['twitter:card'] && (<meta key={'twitter:card'} name={'twitter:card'} content={sharing?.['twitter:card']} />)}
        {sharing?.['twitter:image:alt'] && (<meta key={'twitter:image:alt'} name={'twitter:image:alt'} content={sharing?.['twitter:image:alt']} />)}
        {sharing?.['twitter:site'] && (<meta key={'twitter:site'} name={'twitter:site'} content={sharing?.['twitter:site']} />)}
        {sharing?.['fb:app_id'] && (<meta key={'fb:app_id'} name={'fb:app_id'} content={sharing?.['fb:app_id']} />)}
      </Head>
      <div className={clsx(
        'relative flex flex-col min-h-screen overflow-hidden',
        'bg-gray-100 dark:bg-gray-800',
        'text-gray-900 dark:text-gray-200',
      )}>
        <Header />
        <main className={clsx('p-5 w-full h-full flex-1 max-w-[1200px] mx-auto')}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Breadcrumbs i18nProps={breadcrumbsI18nProps} />
            {children}
          </motion.div>
        </main>
        <Footer />
      </div>
    </>
  );
};
