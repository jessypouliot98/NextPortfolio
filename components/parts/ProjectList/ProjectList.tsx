import React from "react";

import { Project } from "@/store/project/type";

import { Card, FlexGrid } from "@/components/general";
import { KeywordSEO } from "@/components/general/KeywordSEO/KeywordSEO";
import Link from "@/components/general/Link/Link";

export type ProjectListProps = {
  projects: Project[],
};

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <FlexGrid>
      {projects.map((project) => (
        <Link key={project.slug} className={'block transition transform scale-100 hover:scale-105'} href={`/projects/${project.slug}`}>
          <Card className={'h-full'}>
            <KeywordSEO keywords={project.keywords || []}/>
            <h3>{project.name}</h3>
          </Card>
        </Link>
      ))}
    </FlexGrid>
  );
};
