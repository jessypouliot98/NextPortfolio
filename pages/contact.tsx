import React from "react";
import type { NextPage } from 'next';
import { useTranslation } from "next-i18next";
import {
  ContactPage,
  ContentfulDisplay,
  getContactPage,
  getContentfulImageAlt,
  getContentfulImageSrc
} from "@/lib/contentful";

import { useCreateMail } from "@/hooks";
import { generateGetStaticProps } from "@/utils/nextjs/getStaticProps";

import { Section, SectionTitle, StylishBox } from "@/components/general";
import { ButtonAsync } from "@/components/general/ButtonAsync/ButtonAsync";
import { FormField } from "@/components/general/FormField/FormField";
import { PageDefaultLayout } from "@/components/layout";

export type ContactPageProps = {
  page: ContactPage;
};

const ContactPage: NextPage<ContactPageProps> = ({ page }) => {
  const { t } = useTranslation();
  const { handleSubmit, register, formState } = useCreateMail();

  const inputDisabled = formState.isSubmitting;
  
  return (
    <PageDefaultLayout title={page.title} description={page.seoDescription}>
      <Section>
        <div className="mb-12">
          <SectionTitle component="h2" className="text-h1 !mb-2">{page.title}</SectionTitle>
          <ContentfulDisplay document={page.content} />
        </div>
        <StylishBox effects={[
          { top: -10, left: -30 },
          { top: 50, right: -30 },
          { bottom: -50, left: '30%' },
        ]}>
          <div className="card card-default flex">
            <form className="flex-1 py-16 px-8" onSubmit={handleSubmit}>
              <div className="input-row">
                <FormField
                  type="text"
                  className="flex-1"
                  autoComplete="firstName"
                  label={t('page:contact.form.firstName.label')}
                  placeholder={t('page:contact.form.firstName.placeholder')}
                  {...register('firstName', { disabled: inputDisabled })}
                />
                <FormField
                  type="text"
                  className="flex-1"
                  autoComplete="lastName"
                  label={t('page:contact.form.lastName.label')}
                  placeholder={t('page:contact.form.lastName.placeholder')}
                  {...register('lastName', { disabled: inputDisabled })}
                />
              </div>
              <FormField
                type="email"
                className="flex-1"
                autoComplete="email"
                label={t('page:contact.form.email.label')}
                placeholder={t('page:contact.form.email.placeholder')}
                {...register('email', { disabled: inputDisabled })}
              />
              <FormField
                type="text"
                className="flex-1"
                label={t('page:contact.form.referral.label')}
                placeholder={t('page:contact.form.referral.placeholder')}
                {...register('referral', { disabled: inputDisabled })}
              />
              <FormField
                type="textarea"
                className="flex-1"
                label={t('page:contact.form.body.label')}
                placeholder={t('page:contact.form.body.placeholder')}
                {...register('body', { disabled: inputDisabled })}
              />
              <div className="flex justify-end">
                <ButtonAsync variant="primary" disabled={inputDisabled} isLoading={formState.isSubmitting}>
                  {formState.isSubmitSuccessful ? t('page:contact.form.submitted') : t('page:contact.form.submit')}
                </ButtonAsync>
              </div>
            </form>
            <div className="hidden md:flex flex-center bg-gray-500 border-none flex-1 p-4">
              <img
                className="object-contain w-full h-full max-w-[400px]"
                src={getContentfulImageSrc(page.formImage)}
                alt={getContentfulImageAlt(page.formImage)}
              />
            </div>
          </div>
        </StylishBox>
      </Section>
    </PageDefaultLayout>
  );
};

export const getStaticProps = generateGetStaticProps<ContactPageProps>(async (context) => {
  const page = await getContactPage({ lang: context.locale });

  return {
    props: {
      page,
    },
  };
}, {
  i18nNamespaces: ['common', 'global', 'page', 'navigation'],
});

export default ContactPage;
