import React from "react";
import { getContentfulImageAlt, getContentfulImageSrc, Project } from "@/lib/contentful";

import { useLang } from "@/hooks";
import { ROUTES } from "@/utils/navigation/routes";

import { Card, KeywordSEO } from "@/components/general";
import Link from "@/components/general/Link/Link";

export type ProjectCardProps = {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const lang = useLang();

  return (
    <Link
      className={'group block h-full w-full transition transform scale-100 hover:scale-105'}
      href={ROUTES['projects.single'].url(lang, { slug: project.slug })}
    >
      <Card className="flex h-32">
        <KeywordSEO keywords={project.keywords} />
        <div className="h-full aspect-square rounded-lg">
          <img
            src={getContentfulImageSrc(project.thumbnail)}
            alt={getContentfulImageAlt(project.thumbnail)}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        <div className="card-body flex flex-col flex-1 h-full">
          <h3 className="text-h4">{project.name}</h3>
          <div className="relative overflow-y-hidden flex-1">
            <ul className="flex flex-wrap gap-1">
              {project.skills?.map((skill) => (
                <li
                  key={skill.id}
                  className="bg-blue-500 text-white text-xs rounded-sm p-0.5"
                  style={{ backgroundColor: skill.color }}
                >
                  {skill.name}
                </li>
              ))}
            </ul>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-white dark:to-gray-700 bottom-0 h-6"/>
          </div>
        </div>
      </Card>
    </Link>
  );
};