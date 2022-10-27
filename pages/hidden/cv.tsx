import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FaDownload, FaHome, FaLanguage } from "react-icons/fa";
import clsx from "clsx";
import { CVPage,getCVPage } from "@/lib/contentful";
import { ContentfulDisplay } from "@/lib/contentful/components/ContentfulDisplay";

import { useLang } from "@/hooks/app";
import { Routes } from "@/utils/link";

import { Button } from "@/components/general";
import { DateRange } from "@/components/parts/DateRange/DateRange";
import { SkillIcon } from "@/components/parts/SkillIcon/SkillIcon";

import styles from '@/styles/pages/cv.module.css';

import { AppLanguage } from "../../types";

const profilePic = '/assets/cv/avatar.jpg';

export type CVPageProps = {
  page: CVPage,
};

const CVPage: NextPage<CVPageProps> = ({ page }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const lang = useLang();

  const asideSectionStyle = clsx('mb-8');
  const asideTitleStyle = clsx('font-bold text-2xl mb-2');

  const mainSectionStyle = clsx('mb-10');
  const mainTitleStyle = clsx('font-bold text-2xl mb-2 text-gray-700');

  return (
    <div className={'m-auto flex text-base'} style={{ width: '8.5in', height: '11in' }}>

      <header className="transition opacity-50 hover:opacity-100 print:hidden fixed top-10 right-10 p-2 flex flex-col">
        <div className="w-full">
          <Button
            className={'mb-2 w-full'}
            type={'primary'}
            title={'Home'}
            onPress={() => router.push(Routes.getHome(lang).href)}
          >
            <FaHome />
            <span className="ml-2">{t('page:cv.website')}</span>
          </Button>
        </div>
        <div className="w-full">
          <Button
            className={'mb-2 w-full'}
            type={'primary'}
            title={'Change language'}
            onPress={() => router.push(
              router.asPath,
              router.asPath,
              { locale: { en: 'fr', fr: 'en' }[lang] }
            )}
          >
            <FaLanguage />
            <span className="ml-2">{t('page:cv.changeLanguage')}</span>
          </Button>
        </div>
        <div className="w-full">
          <Button
            className={'mb-2 w-full'}
            type={'primary'}
            title={'Download'}
            onPress={() => {
              window.open(Routes.getPdfCV(lang).href, '_self');
            }}
          >
            <FaDownload />
            <span className="ml-2">{t('page:cv.downloadPdf')}</span>
          </Button>
        </div>
      </header>

      <aside className={'w-full px-4 py-4 text-white bg-blue-600'} style={{ width: '2.8in' }}>
        <section id={'presentation'} className={asideSectionStyle}>
          <div className={'w-full bg-white rounded-3xl bg-cover shadow-lg'} style={{ paddingBottom: '100%', backgroundImage: `url(${profilePic})` }} />
        </section>

        <section id={'contact'} className={asideSectionStyle}>
          <h2 className={asideTitleStyle}>Contact</h2>
          <ContentfulDisplay className={clsx(styles.richText, styles.richTextContact)} document={page.contact} />
        </section>

        <section id={'education'} className={asideSectionStyle}>
          <h2 className={asideTitleStyle}>Education</h2>
          <ContentfulDisplay className={clsx(styles.richText, styles.richTextEducation)} document={page.education} />
        </section>

        <section id={'skills'} className={asideSectionStyle}>
          <h2 className={asideTitleStyle}>Skills</h2>
          <ul className={'flex flex-wrap -m-1'}>
            {page.skills.filter((skill) => skill.isMajorSkill).map((skill) => (
              <li key={skill.slug} className={'flex w-full max-w-[50%] p-1'}>
                <div className={'flex flex-center mr-1'}>
                  <SkillIcon skill={skill.slug} size={'1.2em'} />
                </div>
                <div className={'font-bold text-sm truncate'}>{skill.name}</div>
              </li>
            ))}
          </ul>
        </section>
      </aside>

      <main className={'h-full px-4 py-4 flex-1'} >
        <section id={'intro'} className={'mb-5'}>
          <hgroup className={'mb-6'}>
            <h1 className={'font-bold text-4xl leading-none text-blue-600 mb-3'}>{page.title}</h1>
            <h2 className={'font-normal text-lg leading-none text-gray-600'}>{page.subtitle}</h2>
          </hgroup>
          <ContentfulDisplay className={styles.richText} document={page.intro} />
        </section>

        <section id={'jobs'} className={mainSectionStyle}>
          <h2 className={mainTitleStyle}>{t('page:cv.workExperiences')}</h2>
          <div>
            {page.jobs.map((job) => {
              return (
                <div key={job.slug} className={'mb-5'}>
                  <DateRange
                    startDate={job.startDate}
                    endDate={job.endDate}
                    className={'text-gray-600 dark:text-gray-400 text-xs leading-tight'}
                  />
                  <h3 className={'font-bold text-blue-700 text-xl leading-tight'}>
                    {t('page:curriculum.jobAtCompany', {
                      job: job.title,
                      companyName: job.companyName,
                    })}
                  </h3>
                  <ul className={'flex -mx-1'}>
                    {job.skills.map((skill) => (
                      <li key={skill.slug} className={'p-1'}>
                        <SkillIcon skill={skill.slug} color={skill.color} title={skill.name} />
                      </li>
                    ))}
                  </ul>
                  <ContentfulDisplay className={clsx(styles.richText, 'mb-2 leading-snug')} document={job.content} />
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<CVPageProps> = async (context) => {
  const lang = context.locale as AppLanguage;
  const page = await getCVPage({ lang });

  return {
    props: {
      page,
      ...(await serverSideTranslations(lang, ['common', 'global', 'page']) as any),
    },
  };
};


export default CVPage;
