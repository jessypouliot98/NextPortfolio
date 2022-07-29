import React from "react";

import { Project } from "@/store/project/type";

import { useLang } from "@/hooks/app";
import { Routes } from "@/utils/link";

import { FlexGrid, RatioContainer } from "@/components/general";
import { CardImage } from "@/components/general/CardImage/CardImage";
import { KeywordSEO } from "@/components/general/KeywordSEO/KeywordSEO";
import Link from "@/components/general/Link/Link";

export type ProjectListProps = {
  projects: Project[],
};

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const lang = useLang();

  return (
    <FlexGrid>
      {projects.map((project) => (
        <RatioContainer key={project.slug} ratio={[21,9]}>
          <Link
            className={'group block h-full w-full transition transform scale-100 hover:scale-105'}
            href={Routes.getProject(lang, project.slug)}
          >
            <CardImage
              className={'transition flex-center opacity-100 group-hover:opacity-0'}
              containerClassName={'h-full'}
              backgroundImage={project.thumbnail?.file.url || 'https://images.ctfassets.net/8cut8f9cq03l/5v4rdL95gfVfUKjSR2rKXF/e94c1c81d76d56e2710b2b990482fda9/placeholder.png'}
              aria-describedby={project.thumbnail?.description}
            >
              <KeywordSEO keywords={project.keywords || []}/>
              <h3 className={'text-white font-bold text-2xl text-center'}>{project.name}</h3>
            </CardImage>
          </Link>
        </RatioContainer>
      ))}
    </FlexGrid>
  );
};
