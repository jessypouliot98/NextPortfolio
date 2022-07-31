import React from "react";
import type { NextPage } from 'next';
import { useTranslation } from "react-i18next";
import { ContentfulDisplay } from "@/lib/contentful/components/ContentfulDisplay";

import { useRootSelector } from "@/store/store";

import { Section, SectionTitle } from "@/components/general";
import Link from "@/components/general/Link/Link";
import { StylishBox } from "@/components/general/StylishBox/StylishBox";
import { PageDefaultLayout } from "@/components/layout";
import { Curriculum } from "@/components/parts";
import { ProjectList } from "@/components/parts/ProjectList/ProjectList";

const Home: NextPage = () => {
  const { t } = useTranslation();
  const homePage = useRootSelector((state) => state.pagesState.pages.home)!;

  return (
    <PageDefaultLayout title={homePage.title}>
      <Section>
        <SectionTitle>{homePage.aboutMeTitle}</SectionTitle>
        <ContentfulDisplay document={homePage.aboutMeContent} />
      </Section>

      <Section>
        <SectionTitle>{homePage.featuredProjectsTitle}</SectionTitle>
        <StylishBox className={'mb-2'} effects={[
          { top: -10, left: '33%', blur: true },
        ]}>
          <ProjectList projects={homePage.featuredProjects}/>
        </StylishBox>
        <div className={'flex flex-row justify-end'}>
          <Link className={'text-blue-500 hover:text-blue-400'} href={'/projects'}>
            {t('projects.seeAllProjects')}
          </Link>
        </div>
      </Section>

      <Section>
        <SectionTitle>Curriculum</SectionTitle>
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

export default Home;
