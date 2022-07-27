import React from "react";
import {Card, FlexGrid} from "../../general";
import {KeywordSEO} from "../../general/KeywordSEO/KeywordSEO";
import {Project} from "../../../store/project/type";
import Link from "../../general/Link/Link";

export type ProjectListProps = {
  projects: Project[],
};

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <FlexGrid>
      {projects.map((project) => (
        <Link className={'block transition transform scale-100 hover:scale-105'} href={`/projects/${project.slug}`}>
          <Card key={project.slug} className={'h-full'}>
            <KeywordSEO keywords={project.keywords || []}/>
            <h3>{project.name}</h3>
          </Card>
        </Link>
      ))}
    </FlexGrid>
  );
}
