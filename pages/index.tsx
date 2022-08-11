import React from "react";
import type { GetStaticPropsContext, NextPage } from 'next';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getHomePage } from "@/lib/contentful/api/contentful";
import { ContentfulDisplay } from "@/lib/contentful/components/ContentfulDisplay";

import { AppLanguage } from "@/store/application/types";
import { HomePage } from "@/store/pages/type";

import { useLang } from "@/hooks/app";
import { Routes } from "@/utils/link";
import { getSecondsFromMilliSeconds, MINUTE } from "@/utils/time";

import { Section, SectionTitle } from "@/components/general";
import Link from "@/components/general/Link/Link";
import { StylishBox } from "@/components/general/StylishBox/StylishBox";
import { PageDefaultLayout } from "@/components/layout";
import { Curriculum } from "@/components/parts";
import { ProjectList } from "@/components/parts/ProjectList/ProjectList";

export type HomePageProps = HomePage

const Home: NextPage<HomePageProps> = (props) => {
  const { t } = useTranslation();
  const lang = useLang();
  const homePage = props;

  return (
    <PageDefaultLayout title={homePage.title} description={homePage.seoDescription}>
      <Section>
        <SectionTitle>{homePage.aboutMeTitle}</SectionTitle>
        <ContentfulDisplay document={homePage.aboutMeContent} />
      </Section>

      <Section>
        <SectionTitle className={'relative z-20'}>{homePage.featuredProjectsTitle}</SectionTitle>
        <StylishBox className={'mb-2'} effects={[
          { top: -10, right: '20%', blur: true,  },
          { bottom: -10, left: '-10%', blur: true },
        ]}>
          <ProjectList projects={homePage.featuredProjects}/>
        </StylishBox>
        <div className={'flex flex-row justify-end'}>
          <Link className={'text-blue-500 hover:text-blue-400'} href={Routes.getProjectList({ lang })}>
            {t('page:projects.seeAllProjects')}
          </Link>
        </div>
      </Section>

      <Section>
        <SectionTitle>{homePage.curriculumTitle}</SectionTitle>
        <StylishBox effects={[
          { bottom: 50, left: -30 },
          { top: -50, right: -80 },
          { bottom: -80, right: -80 },
        ]}>
          <Curriculum jobs={homePage.curriculumJobs} />
        </StylishBox>
      </Section>

      <Section>
        <SectionTitle>{homePage.skillSetTitle}</SectionTitle>
        <ContentfulDisplay document={homePage.skillSetContent}/>
      </Section>
    </PageDefaultLayout>
  );
};

export async function getStaticProps(context: GetStaticPropsContext ) {    
  const lang = context.locale as AppLanguage;
  const homePage = await getHomePage({ lang });
  
  return {
    props: {
      ...homePage,
      ...(await serverSideTranslations(lang, ['common', 'global', 'page'])),
    },
    revalidate: getSecondsFromMilliSeconds(30 * MINUTE),
  };
}

export default Home;
