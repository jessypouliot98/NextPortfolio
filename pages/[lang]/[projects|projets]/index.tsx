import { useMemo } from "react";
import type { NextPage } from 'next';

import { useRootSelector } from "@/store/store";

import { useFilterQuery } from "@/hooks/filter";
import { useProjectList } from "@/hooks/projects";

import { Button, Section, SectionTitle } from "@/components/general";
import { StylishBox } from "@/components/general/StylishBox/StylishBox";
import { PageDefaultLayout } from "@/components/layout";
import { ProjectList } from "@/components/parts/ProjectList/ProjectList";

const Projects: NextPage = () => {
  const projectsPage = useRootSelector((state) => state.pagesState.pages.projects)!;
  const { projects: allProjects } = useProjectList();
  const { hasFilter, filter, clearFilter } = useFilterQuery();

  const projects = useMemo(() => {
    if (filter.length === 0) {
      return allProjects;
    }

    return allProjects.filter((project) => project.keywords?.some((keyword) => filter.includes(keyword)));
  }, [filter, allProjects]);

  return (
    <PageDefaultLayout title={projectsPage.title}>
      <Section>
        <div className={'flex mb-2'}>
          <SectionTitle>Portfolio</SectionTitle>
          {hasFilter && (
            <div className={'flex flex-row justify-end flex-1'}>
              <Button onPress={clearFilter}>Clear filter</Button>
            </div>
          )}
        </div>
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

export default Projects;
