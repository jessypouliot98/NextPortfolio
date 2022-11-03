import React from "react";
import type { GetStaticPropsContext, NextPage } from 'next';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ContentfulDisplay, getContentfulImageAlt, getContentfulImageSrc, getHomePage, HomePage } from "@/lib/contentful";

import { useLang } from "@/hooks/app";
import { Routes } from "@/utils/link";

import { Section, SectionTitle } from "@/components/general";
import Link from "@/components/general/Link/Link";
import { StylishBox } from "@/components/general/StylishBox/StylishBox";
import { PageDefaultLayout } from "@/components/layout";
import { Curriculum } from "@/components/parts";
import { ProjectList } from "@/components/parts/ProjectList/ProjectList";
import { SkillIcon } from "@/components/parts/SkillIcon/SkillIcon";

import { AppLanguage } from "../types";

export type HomePageProps = {
  page: HomePage,
}

const HomePage: NextPage<HomePageProps> = ({ page }) => {
  const { t } = useTranslation()
  const lang = useLang();

  return (
    <PageDefaultLayout title={page.title} description={page.seoDescription}>
      <Section>
        <SectionTitle component="h1">{page.aboutMeTitle}</SectionTitle>
        <div className="flex flex-row">
          <ContentfulDisplay className="flex-1 z-1" document={page.aboutMeContent} />
          <AnimatePresence initial={true}>
            {page.aboutMeImage && (
              <motion.div
                className={clsx(
                  'flex-1 relative',
                  'hidden',
                  'md:block md:max-w-[30%]',
                  'lg:max-w-[40%]',
                )}
                initial={{ opacity: 0, translateX: '50%', scale: 0.3 }}
                animate={{ opacity: 1, translateX: '0%', scale: 1 }}
                exit={{ opacity: 0, translateX: '50%', scale: 0.3 }}
                transition={{ duration: 0.7 }}
              >
                <div className={clsx(
                  'flex absolute trbl',
                  'flex-center',
                  'xl:justify-end'
                )}>
                  <img
                    className={clsx(
                      'block h-full drop-shadow-xl transform select-none pointer-events-none',
                      'opacity-10 scale-150',
                      'lg:opacity-100 lg:scale-150',
                      'xl:scale-175'
                    )}
                    src={getContentfulImageSrc(page.aboutMeImage)}
                    alt={getContentfulImageAlt(page.aboutMeImage)}
                    loading="lazy"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
          <Link className={'link link-primary'} href={Routes.getProjectList(lang).href}>
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
            {page.skills.filter((skill) => skill.isMajorSkill).map((skill, i, { length }) => {
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
  };
}

export default HomePage;
