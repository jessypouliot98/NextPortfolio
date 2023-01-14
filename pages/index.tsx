import React from "react";
import type { NextPage } from 'next';
import Link from "next/link";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ContentfulDisplay, getContentfulImageAlt, getContentfulImageSrc, getHomePage, HomePage } from "@/lib/contentful";

import { useLang } from "@/hooks/app";
import { ROUTES } from "@/utils/navigation/routes";
import { generateGetStaticProps } from "@/utils/nextjs/getStaticProps";

import { Card, Section, SectionTitle } from "@/components/general";
import Anchor from "@/components/general/Anchor/Anchor";
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
        <SectionTitle component="h1">{page.aboutMeTitle}</SectionTitle>
        <div className="flex flex-row">
          <Card className="flex-1 z-1 card-body">
            <ContentfulDisplay document={page.aboutMeContent} />
          </Card>
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
        <SectionTitle className="relative z-20">{page.featuredProjectsTitle}</SectionTitle>
        <StylishBox className="mb-2" effects={[
          { top: -10, right: '20%', blur: true,  },
          { bottom: -10, left: '-10%', blur: true },
        ]}>
          <ProjectList projects={page.featuredProjects}/>
        </StylishBox>
        <div className="flex flex-row justify-end">
          <Link className="link link-primary" href={ROUTES['projects'].url(lang)}>
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
        <Card className="card-body">
          <AnimatePresence initial={true}>
            <div className="-m-4 flex flex-wrap">
              {page.skills.filter((skill) => skill.isMajorSkill).map((skill, i, { length }) => {
                const transition = { delay: (2 * (i / length)), duration: 0.3 };
                return (
                  <div key={skill.slug} className="flex flex-center p-4 text-gray-700 dark:text-gray-300 text-lg md:text-2xl">
                    <motion.div
                      className="mr-1"
                      initial={{ opacity: 0, translateX: -10 }}
                      animate={{ opacity: 1, translateX: 0 }}
                      transition={transition}
                    >
                      <SkillIcon color={skill.color} skill={skill.slug} size="1.5em" />
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
        </Card>
      </Section>
    </PageDefaultLayout>
  );
};

export const getStaticProps = generateGetStaticProps<HomePageProps>(async (context) => {
  const page = await getHomePage(({ lang: context.locale }));

  return { props: { page } };
}, {
  i18nNamespaces: ['common', 'global', 'page', 'navigation'],
});

export default HomePage;
