import React from "react";
import type { NextPage } from 'next';
import { useTranslation } from "next-i18next";

import { useCreateMail } from "../../hooks";
import { generateGetStaticProps } from "@/utils/nextjs/getStaticProps";

import { Button, Card, Section, SectionTitle, StylishBox } from "@/components/general";
import { PageDefaultLayout } from "@/components/layout";

export type ContactPageProps = {};

const ContactPage: NextPage<ContactPageProps> = () => {
  const { t } = useTranslation();
  const { isProcessing, handleSubmitMail } = useCreateMail();
  
  return (
    <PageDefaultLayout title={'Contact'} description={undefined}>
      <Section>
        <SectionTitle>{'Contact'}</SectionTitle>
        <StylishBox effects={[
          { top: -10, left: -30 },
          { top: 50, right: -30 },
          { bottom: -50, left: '30%' },
        ]}>
          <Card>
            <form className="grid gap-2" onSubmit={handleSubmitMail}>
              <div className="flex gap-2">
                <div className="input-group w-full">
                  <label htmlFor="firstName">{t('page:contact.form.firstName.label')}</label>
                  <input id="firstName" className="input w-full" type="text" name="firstName" placeholder={t('page:contact.form.firstName.placeholder')} required={true} disabled={isProcessing} />
                </div>
                <div className="input-group w-full">
                  <label htmlFor="lastName">{t('page:contact.form.lastName.label')}</label>
                  <input id="lastName" className="input w-full" type="text" name="lastName" placeholder={t('page:contact.form.lastName.placeholder')} required={true} disabled={isProcessing} />
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="email">{t('page:contact.form.email.label')}</label>
                <input id="email" className="input w-full" type="email" name="email" placeholder={t('page:contact.form.email.placeholder')} required={true} disabled={isProcessing} />
              </div>
              <div className="input-group">
                <label htmlFor="subject">{t('page:contact.form.subject.label')}</label>
                <input id="subject" className="input w-full" type="text" name="subject" placeholder={t('page:contact.form.subject.placeholder')} required={true} disabled={isProcessing} />
              </div>
              <div className="input-group">
                <label htmlFor="body">{t('page:contact.form.body.label')}</label>
                <textarea id="body" className="input w-full" name="body" placeholder={t('page:contact.form.body.placeholder')} required={true} disabled={isProcessing} />
              </div>
              <div className="flex justify-end">
                <Button type="primary" size="lg" disabled={isProcessing}>{t('page:contact.form.send')}</Button>
              </div>
            </form>
          </Card>
        </StylishBox>
      </Section>
    </PageDefaultLayout>
  );
};

export const getStaticProps = generateGetStaticProps(null, {
  i18nNamespaces: ['common', 'global', 'page', 'navigation'],
});

export default ContactPage;
