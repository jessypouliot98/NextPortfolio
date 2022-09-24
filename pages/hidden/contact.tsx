import React from "react";
import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { CustomInput, FlexGrid, Section, SectionTitle } from "@/components/general";
import { PageDefaultLayout } from "@/components/layout";

import { AppLanguage } from "../../types";

export type ContactPageProps = {};

const ContactPage: NextPage<ContactPageProps> = () => {
  return (
    <PageDefaultLayout title={'Contact'} description={undefined}>
      <Section>
        <SectionTitle>{'Contact'}</SectionTitle>
        <form className="p-4 bg-white rounded-lg shadow">
          <FlexGrid>
            <CustomInput label={'Email'} />
            <CustomInput label={'Phone'} />
            <CustomInput label={'Message'} />
          </FlexGrid>
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
