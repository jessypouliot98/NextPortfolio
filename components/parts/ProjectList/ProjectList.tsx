import React from "react";
import {Card, FlexGrid} from "../../general";
import {KeywordSEO} from "../../general/KeywordSEO/KeywordSEO";
import {Project} from "../../../store/project/type";

export type ProjectListProps = {
  projects: Project[],
};

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <FlexGrid>
      {projects.map((project) => (
        <Card key={project.slug} className={'h-full'}>
          <KeywordSEO keywords={project.keywords || []}/>
          <h3>{project.name}</h3>
          {project.link && (
            <a href={project.link} target={'_blank'}>Link</a>
          )}
        </Card>
      ))}
    </FlexGrid>
  );
}
