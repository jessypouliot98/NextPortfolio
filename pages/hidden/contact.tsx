import React from "react";
import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import clsx from "clsx";

import { Section, SectionTitle } from "@/components/general";
import { PageDefaultLayout } from "@/components/layout";

import { AppLanguage } from "../../types";

export type ContactPageProps = {};

const ContactPage: NextPage<ContactPageProps> = () => {
  return (
    <PageDefaultLayout title={'Contact'} description={undefined}>
      <Section>
        <SectionTitle>{'Contact'}</SectionTitle>
        <form>
          <label className={clsx('relative group')}>
            <input className={clsx('px-2 bg-transparent border border-blue-500 rounded-lg')} type="text" />
            <span className={clsx('select-none transition-all leading-none absolute left-2 top-1 group-focus-within:-top-3 transform group-focus-within:scale-90 group-focus-within:text-blue-500 bg-gray-100')} data-placeholder="Name">Name</span>
          </label>
        </form>
      </Section>
    </PageDefaultLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const lang = context.locale as AppLanguage;

  return {
    props: {
      ...(await serverSideTranslations(lang, ['common', 'global', 'page', 'router'])),
    }
  };
};

export default ContactPage;
