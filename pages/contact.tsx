import React from "react";
import type { NextPage } from 'next';
import { useTranslation } from "next-i18next";

import { useCreateMail } from "@/hooks";
import { generateGetStaticProps } from "@/utils/nextjs/getStaticProps";

import { Section, SectionTitle, StylishBox } from "@/components/general";
import { ButtonAsync } from "@/components/general/ButtonAsync/ButtonAsync";
import { FormField } from "@/components/general/FormField/FormField";
import { PageDefaultLayout } from "@/components/layout";

export type ContactPageProps = {};

const ContactPage: NextPage<ContactPageProps> = () => {
  const { t } = useTranslation();
  const { handleSubmit, register, formState, submitError } = useCreateMail();

  const inputDisabled = formState.isSubmitting;
  
  return (
    <PageDefaultLayout title={'Contact'} description={undefined}>
      <Section>
        <SectionTitle>{'Contact'}</SectionTitle>
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
                  label={t('page:contact.form.firstName.label')}
                  placeholder={t('page:contact.form.firstName.placeholder')}
                  {...register('firstName', { disabled: inputDisabled })}
                />
                <FormField
                  type="text"
                  className="flex-1"
                  label={t('page:contact.form.lastName.label')}
                  placeholder={t('page:contact.form.lastName.placeholder')}
                  {...register('lastName', { disabled: inputDisabled })}
                />
              </div>
              <FormField
                type="email"
                className="flex-1"
                label={t('page:contact.form.email.label')}
                placeholder={t('page:contact.form.email.placeholder')}
                {...register('email', { disabled: inputDisabled })}
              />
              <FormField
                type="textarea"
                className="flex-1"
                label={t('page:contact.form.body.label')}
                placeholder={t('page:contact.form.body.placeholder')}
                {...register('body', { disabled: inputDisabled })}
              />
              <FormField
                type="text"
                className="flex-1"
                label={t('page:contact.form.referral.label')}
                placeholder={t('page:contact.form.referral.placeholder')}
                {...register('subject', { disabled: inputDisabled })}
              />
              <div className="flex justify-end">
                {submitError && <div>{submitError.message}</div>}
                <ButtonAsync type="primary" disabled={inputDisabled} isLoading={formState.isSubmitting}>
                  {t('page:contact.form.send')}
                </ButtonAsync>
              </div>
            </form>
            <div className="hidden md:block bg-gray-300 dark:bg-gray-900 border-none flex-1 -mr-5 -my-5 ">
              <img className="object-cover w-full h-full" alt="contact" src="https://images.unsplash.com/photo-1664575600796-ffa828c5cb6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"/>
            </div>
          </div>
        </StylishBox>
      </Section>
    </PageDefaultLayout>
  );
};

export const getStaticProps = generateGetStaticProps(() => {
  return {
    props: {},
  };
}, {
  i18nNamespaces: ['common', 'global', 'page', 'navigation'],
});

export default ContactPage;
