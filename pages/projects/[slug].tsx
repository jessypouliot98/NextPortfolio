import { useMemo } from "react";
import type { GetStaticPaths, NextPage } from 'next';
import Image from 'next/image';
import { useTranslation } from "next-i18next";
import { FaCode, FaExternalLinkAlt, FaLaptopCode } from "react-icons/fa";
import clsx from "clsx";
import { ContentfulDisplay, getProjectsPage, Project } from '@/lib/contentful';

import { generateGetStaticProps } from "@/utils/nextjs/getStaticProps";

import { Card, KeywordSEO, RatioContainer, Section, SectionTitle } from "@/components/general";
import Link from "@/components/general/Link/Link";
import { StylishBox } from "@/components/general/StylishBox/StylishBox";
import { PageDefaultLayout } from "@/components/layout";
import { SkillIcon } from "@/components/parts/SkillIcon/SkillIcon";

import { AppLanguage } from "../../types";

export type ProjectSinglePageProps = {
  title: string,
  project: Project;
}

const ProjectSinglePage: NextPage<ProjectSinglePageProps> = ({ title, project }) => {
  const { t } = useTranslation();
  const isInConstruction = useMemo(() => JSON.stringify(project.content).includes('### TODO'),[project.content]);

  return (
    <PageDefaultLayout title={title} description={project.seoDescription} breadcrumbsI18nProps={{ projectTitle: project.name }}>
      <Section>
        <SectionTitle component="h1">
          {project.name}
        </SectionTitle>
        {project.keywords && (
          <KeywordSEO keywords={project.keywords}/>
        )}
        {project.thumbnail && (
          <RatioContainer
            className={clsx(
              'mb-6 bg-gray-300 dark:bg-gray-700 rounded-lg shadow',
              'relative z-20' // Fix to keep decoration under
            )}
            ratio={[21, 9]}
          >
            <Image
              className={'w-full h-full object-contain'}
              src={`https:${project.thumbnail.file.url}`}
              layout={'fill'}
              title={project.thumbnail.title}
              alt={project.thumbnail.description}
            />
          </RatioContainer>
        )}
        <StylishBox className={'mb-2'} effects={[
          { top: -10, left: -10, blur: true },
          { bottom: -100, right: 50, blur: true },
        ]}>
          <div className={'flex flex-col xl:flex-row-reverse'}>
            {project.skills && (
              <Card className={'mb-4 xl:mb-0 xl:ml-4 xl:min-w-[200px]'}>
                <ul className={'flex flex-wrap xl:flex-col'}>
                  {project.skills.map((skill) => (
                    <li key={skill.slug} className={'text-md flex items-center p-2 xl:p-1 w-[50%] sm:w-auto'}>
                      <SkillIcon className={'inline mr-2'} skill={skill.slug} color={skill.color} size="1.3em" />
                      <span>{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
            <div className={'flex-1'}>
              {isInConstruction ? (
                <p className={'font-bold text-xl mb-4'}>{t('global:common.toBeConstructedContent')}</p>
              ) : (
                <ContentfulDisplay className={'mb-4'} document={project.content} />
              )}
              <div className="-m-2 flex flex-wrap">
                {project.linkSourceCode && (
                  <div className="p-2">
                    <Link
                      className={'btn btn-primary'}
                      href={project.linkSourceCode}
                      target={'_blank'}
                    >
                      <span>{t('page:projects.link.viewSource')}</span>
                      <FaCode className={'ml-2'} />
                    </Link>
                  </div>
                )}
                {project.linkProject && (
                  <div className="p-2">
                    <Link
                      className={'btn btn-primary'}
                      href={project.linkProject}
                      target={'_blank'}
                    >
                      <span>{t('page:projects.link.viewProject')}</span>
                      <FaLaptopCode className={'ml-2'} />
                    </Link>
                  </div>
                )}
                {project.linkPresentation && (
                  <div className="p-2">
                    <Link
                      className={'btn btn-primary'}
                      href={project.linkPresentation}
                      target={'_blank'}
                    >
                      <span>{t('page:projects.link.viewDetails')}</span>
                      <FaExternalLinkAlt className={'ml-2'} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </StylishBox>
      </Section>
    </PageDefaultLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const projectsPage = await getProjectsPage({ lang: 'en' });

  return {
    paths: projectsPage.projects.reduce((accPaths, project) => {
      context.locales?.forEach((locale: string) => {
        accPaths.push({ params: { slug: project.slug }, locale: locale as AppLanguage });
      });

      return accPaths;
    }, [] as { params: { slug: string }, locale: AppLanguage }[]),
    fallback: 'blocking',
  };
};

export const getStaticProps = generateGetStaticProps<ProjectSinglePageProps, { slug: string }>(async (context) => {
  const projectsPage = await getProjectsPage({ lang: context.locale });
  const slug = context.params.slug;
  const project = projectsPage.projects.find((project) => project.slug === slug);

  if (!project) {
    throw new Error('Project not found');
  }

  return {
    props: {
      title: `${projectsPage.title} - ${project.name}`,
      project: project,
    },
  };
}, {
  i18nNamespaces: ['common', 'global', 'page', 'router'],
});

export default ProjectSinglePage;
