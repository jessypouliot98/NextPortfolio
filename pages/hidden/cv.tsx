import React, { useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { FaCalendar, FaDownload, FaHome, FaLanguage } from "react-icons/fa";
import clsx from "clsx";
import { useCalendly } from "@/lib/calendly";
import { CVPage,getCVPage } from "@/lib/contentful";
import { ContentfulDisplay } from "@/lib/contentful/components/ContentfulDisplay";

import { useLang } from "@/hooks/app";
import { ROUTES } from "@/utils/navigation/routes";
import { generateGetServerSideProps } from "@/utils/nextjs/getServerSideProps";

import { Button, RatioContainer } from "@/components/general";
import { DateRange } from "@/components/parts/DateRange/DateRange";
import { SkillIcon } from "@/components/parts/SkillIcon/SkillIcon";

import styles from '@/styles/pages/cv.module.css';

const DARK_CLASS = 'dark';

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

  const { handleInitPopupWidget, stylesheet } = useCalendly('jessypouliot98/30min');

  useEffect(() => {
    const isDark = document.body.classList.contains(DARK_CLASS);

    if (isDark) {
      document.body.classList.remove(DARK_CLASS);
    }
    
    return () => {
      if (isDark) {
        document.body.classList.add(DARK_CLASS);
      }
    };
  }, []);

  return (
    <>
      <Head>
        {stylesheet}
      </Head>

      <header className="print:hidden mb-12 bg-white shadow-lg">
        <nav className="flex p-2 gap-2 mx-auto w-[8.5in] justify-center">
          <Button
            className="flex-1"
            variant="outline-gray"
            size="lg"
            onClick={() => router.push(ROUTES['home'].url(lang))}
          >
            <FaHome />
            <span className="ml-2">{t('page:cv.website')}</span>
          </Button>
          <Button
            className="flex-1"
            variant="gray"
            size="lg"
            onClick={() => router.push(
              router.asPath,
              router.asPath,
              { locale: { en: 'fr', fr: 'en' }[lang] }
            )}
          >
            <FaLanguage />
            <span className="ml-2">{t('page:cv.changeLanguage')}</span>
          </Button>
          <Button
            className="flex-1"
            variant="outline-primary"
            size="lg"
            onClick={handleInitPopupWidget}
          >
            <FaCalendar />
            <span className="ml-2">{t('page:cv.scheduleMeeting')}</span>
          </Button>
          <Button
            className="flex-1"
            variant="primary"
            onClick={() => {
              window.open(ROUTES['api.pdf.cv'].url(lang), '_self');
            }}
          >
            <FaDownload />
            <span className="ml-2">{t('page:cv.downloadPdf')}</span>
          </Button>
        </nav>
      </header>

      <div className="m-auto flex text-base mb-12 shadow-2xl w-[8.5in] h-[11in]">

        <aside className="w-full px-4 py-4 text-white bg-blue-600" style={{ width: '2.8in' }}>
          <section id={'presentation'} className={asideSectionStyle}>
            <RatioContainer ratio={[1, 1]} className="overflow-hidden rounded-3xl shadow-lg">
              <img className="object-cover" src="/assets/cv/avatar.jpg" alt="avatar" />
            </RatioContainer>
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
    </>
  );
};

export const getServerSideProps = generateGetServerSideProps<CVPageProps>(async (context) => {
  const page = await getCVPage({ lang: context.locale });

  return { props: { page } };
}, {
  i18nNamespaces: ['common', 'global', 'page'],
});


export default CVPage;
