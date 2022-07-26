import type { NextPage } from 'next'
import {Button, Section, SectionTitle} from "../../components/general";
import {ProjectList} from "../../components/parts/ProjectList/ProjectList";
import {PageDefaultLayout} from "../../components/layout";
import {useProjectList} from "../../hooks/projects/useProjectList";
import {useFilterQuery} from "../../hooks/filter/useFilterQuery";
import {useMemo} from "react";

const Projects: NextPage = () => {
  const { projects: allProjects } = useProjectList();
  const { hasFilter, filter, clearFilter } = useFilterQuery();

  const projects = useMemo(() => {
    if (filter.length === 0) {
      return allProjects;
    }

    return allProjects.filter((project) => project.keywords?.some((keyword) => filter.includes(keyword)));
  }, [filter, allProjects]);

  return (
    <PageDefaultLayout>
      <Section>
        <div className={'flex mb-2'}>
          <SectionTitle>Portfolio</SectionTitle>
          {hasFilter && (
            <div className={'flex flex-row justify-end flex-1'}>
              <Button onPress={clearFilter}>Clear filter</Button>
            </div>
          )}
        </div>
        <ProjectList projects={projects} />
      </Section>
    </PageDefaultLayout>
  )
}

export default Projects
