import React from "react";
import type { GetStaticPropsContext, NextPage } from 'next';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AnimatePresence, motion } from "framer-motion";
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
import { SkillIcon } from "@/components/parts/SkillIcon/SkillIcon";

export type HomePageProps = {
  page: HomePage,
}

const HomePage: NextPage<HomePageProps> = ({ page }) => {
  const { t } = useTranslation();
  const lang = useLang();

  return (
    <PageDefaultLayout title={page.title} description={page.seoDescription}>
      <Section>
        <SectionTitle>{page.aboutMeTitle}</SectionTitle>
        <ContentfulDisplay document={page.aboutMeContent} />
      </Section>

      <Section>
        <SectionTitle className={'relative z-20'}>{page.featuredProjectsTitle}</SectionTitle>
        <StylishBox className={'mb-2'} effects={[
          { top: -10, right: '20%', blur: true,  },
          { bottom: -10, left: '-10%', blur: true },
        ]}>
          <ProjectList projects={page.featuredProjects}/>
        </StylishBox>
        <div className={'flex flex-row justify-end'}>
          <Link className={'text-blue-500 hover:text-blue-400'} href={Routes.getProjectList(lang).href}>
            {t('page:projects.seeAllProjects')}
          </Link>
        </div>
      </Section>

      <Section>
        <SectionTitle>{page.curriculumTitle}</SectionTitle>
        <StylishBox effects={[
          { bottom: 50, left: -30 },
          { top: -50, right: -80 },
          { bottom: -80, right: -80 },
        ]}>
          <Curriculum jobs={page.curriculumJobs} />
        </StylishBox>
      </Section>

      <Section>
        <SectionTitle>{page.skillSetTitle}</SectionTitle>
        <AnimatePresence initial={true}>
          <div className={'-m-4 flex flex-wrap'}>
            {page.skills.map((skill, i, { length }) => {
              const transition = { delay: (2 * (i / length)), duration: 0.3 };
              return (
                <div key={skill.slug} className={'flex flex-center p-4 text-gray-700 dark:text-gray-300 text-lg md:text-2xl'}>
                  <motion.div
                    className={'mr-1'}
                    initial={{ opacity: 0, translateX: -10 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={transition}
                  >
                    <SkillIcon color={skill.color} skill={skill.slug} size={'1.5em'} />
                  </motion.div>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ...transition, delay: transition.delay + 0.1 }}
                  >
                    {skill.name}
                  </motion.span>
                </div>
              );
            })}
          </div>
        </AnimatePresence>
      </Section>
    </PageDefaultLayout>
  );
};

export async function getStaticProps(context: GetStaticPropsContext ) {
  const lang = context.locale as AppLanguage;
  const page = await getHomePage({ lang });

  return {
    props: {
      page,
      ...(await serverSideTranslations(lang, ['common', 'global', 'page', 'router'])),
    },
    revalidate: getSecondsFromMilliSeconds(30 * MINUTE),
  };
}

export default HomePage;
