import { useMemo } from "react";
import type { NextPage } from 'next';
import { useTranslation } from "next-i18next";
import { ProjectPage } from "@/lib/contentful";
import { getProjectsPage } from "@/lib/contentful/api/contentful";

import { useFilterQuery } from "@/hooks/filter";
import { generateGetStaticProps } from "@/utils/nextjs/getStaticProps";

import { Button, Section, SectionTitle } from "@/components/general";
import { StylishBox } from "@/components/general/StylishBox/StylishBox";
import { PageDefaultLayout } from "@/components/layout";
import { ProjectList } from "@/components/parts/ProjectList/ProjectList";

export type ProjectListPageProps = {
  page: ProjectPage;
};

const ProjectListPage: NextPage<ProjectListPageProps> = ({  page  }) => {
  const { t } = useTranslation();
  const allProjects = page.projects;
  const { hasFilter, filter, clearFilter } = useFilterQuery();

  const projects = useMemo(() => {
    if (filter.length === 0) {
      return allProjects;
    }

    return allProjects.filter((project) => project.keywords?.some((keyword) => filter.includes(keyword)));
  }, [filter, allProjects]);

  return (
    <PageDefaultLayout title={page.title} description={page.seoDescription}>
      <Section>
        <SectionTitle component="h1">
          {page.title}
        </SectionTitle>
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

export const getStaticProps = generateGetStaticProps<ProjectListPageProps>(async (context) => {
  const page = await getProjectsPage({ lang: context.locale });

  return { props: { page } };
}, {
  i18nNamespaces: ['common', 'global', 'page', 'navigation']
});

export default ProjectListPage;
