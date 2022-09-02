import { useMemo } from "react";
import type {GetStaticProps, NextPage} from 'next';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getProjectsPage } from "@/lib/contentful/api/contentful";

import { useFilterQuery } from "@/hooks/filter";
import { getSecondsFromMilliSeconds, MINUTE } from "@/utils/time";

import { Button, Section, SectionTitle } from "@/components/general";
import { StylishBox } from "@/components/general/StylishBox/StylishBox";
import { PageDefaultLayout } from "@/components/layout";
import { ProjectList } from "@/components/parts/ProjectList/ProjectList";
import {AppLanguage} from "../../types";
import {ProjectPage} from "@/lib/contentful";

export type ProjectListPageProps = ProjectPage;

const ProjectListPage: NextPage<ProjectListPageProps> = (props) => {
  const { t } = useTranslation();
  const projectsPage = props;
  const allProjects = projectsPage.projects;
  const { hasFilter, filter, clearFilter } = useFilterQuery();

  const projects = useMemo(() => {
    if (filter.length === 0) {
      return allProjects;
    }

    return allProjects.filter((project) => project.keywords?.some((keyword) => filter.includes(keyword)));
  }, [filter, allProjects]);

  return (
    <PageDefaultLayout title={projectsPage.title} description={projectsPage.seoDescription}>
      <Section>
        <SectionTitle className={'mb-2'}>{projectsPage.title}</SectionTitle>
        {hasFilter && (
          <div className={'flex flex-row-reverse mb-2'}>
            <Button type={'primary'} className={'relative w-full md:w-auto z-20 mb-2'} onPress={clearFilter}>
              {t('global:common.clearFilters')}
            </Button>
          </div>
        )}
        <StylishBox effects={[
          { top: -30, right: '33%', blur: false },
          { top: 130, left: '15%', blur: true },
          { top: 280, right: '35%', blur: true },
          { top: 330, left: -30, blur: false },
          { top: 560, left: '25%', blur: true },
          { top: 700, right: -15, blur: false },
        ]}>
          <ProjectList projects={projects} />
        </StylishBox>
      </Section>
    </PageDefaultLayout>
  );
};

export const getStaticProps: GetStaticProps<ProjectListPageProps> = async (context) => {
  const lang = context.locale as AppLanguage;
  const projectPage = await getProjectsPage({ lang });

  return {
    props: {
      ...projectPage,
      ...(await serverSideTranslations(lang, ['common', 'global', 'page', 'router']) as any),
    },
    revalidate: getSecondsFromMilliSeconds(30 * MINUTE),
  };
}

export default ProjectListPage;
