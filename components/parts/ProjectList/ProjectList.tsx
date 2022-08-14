import React from "react";

import { Project } from "@/store/project/type";

import { useLang } from "@/hooks/app";
import { Routes } from "@/utils/link";

import { FlexGrid, RatioContainer } from "@/components/general";
import { CardImage } from "@/components/general/CardImage/CardImage";
import { KeywordSEO } from "@/components/general/KeywordSEO/KeywordSEO";
import Link from "@/components/general/Link/Link";

const PLACEHOLDER_IMAGE = 'https://images.ctfassets.net/8cut8f9cq03l/5v4rdL95gfVfUKjSR2rKXF/e94c1c81d76d56e2710b2b990482fda9/placeholder.png';

export type ProjectListProps = {
  projects: Project[],
};

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const lang = useLang();
  
  return (
    <FlexGrid columns={{ default: 1, sm: 2, lg: 3 }}>
      {projects.map((project) => (
        <RatioContainer key={project.slug} ratio={[21,9]}>
          <Link
            className={'group block h-full w-full transition transform scale-100 hover:scale-105'}
            href={Routes.getProjectSingle(lang, project.slug).href}
          >
            <CardImage
              className={'transition flex-center opacity-100 group-hover:opacity-0'}
              containerClassName={'h-full'}
              backgroundImage={project.thumbnail?.file.url || PLACEHOLDER_IMAGE}
              aria-describedby={project.thumbnail?.description}
            >
              {project.keywords && <KeywordSEO keywords={project.keywords} />}
              <h3 className={'transition transform p-1 text-white font-bold text-2xl text-center bg-blue-800 bg-opacity-50 group-hover:translate-y-10'}>
                {project.name}
              </h3>
            </CardImage>
          </Link>
        </RatioContainer>
      ))}
    </FlexGrid>
  );
};
