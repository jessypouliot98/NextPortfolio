import type { GetStaticPropsContext, NextPage } from 'next';
import Image from 'next/image';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FaExternalLinkAlt } from "react-icons/fa";
import clsx from "clsx";
import { getProjectsPage } from '@/lib/contentful/api/contentful';
import { ContentfulDisplay } from "@/lib/contentful/components/ContentfulDisplay";

import { AppLanguage } from '@/store/application/types';
import { Project } from '@/store/project/type';

import { getSecondsFromMilliSeconds, MINUTE } from '@/utils/time';

import { KeywordSEO, RatioContainer, Section, SectionTitle } from "@/components/general";
import Link from "@/components/general/Link/Link";
import { StylishBox } from "@/components/general/StylishBox/StylishBox";
import { PageDefaultLayout } from "@/components/layout";

const IS_IN_CONSTRUCTION = true;

export type ProjectSinglePageProps = {
  title: string,
  project: Project;
}

const ProjectSinglePage: NextPage<ProjectSinglePageProps> = ({ title, project }) => {
  const { t } = useTranslation();

  return (
    <PageDefaultLayout title={title} description={project.shortDescription} breadcrumbsI18nProps={{ projectTitle: project.name }}>
      <Section>
        <SectionTitle>
          {project.name}
        </SectionTitle>
        {project.keywords && (
          <KeywordSEO keywords={project.keywords}/>
        )}
        {project.thumbnail && (
          <RatioContainer
            className={clsx(
              'mb-2 bg-gray-300 dark:bg-gray-700',
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
          { top: 200, right: 50, blur: true },
        ]}>
          {IS_IN_CONSTRUCTION ? (
            <p className={'font-bold text-xl'}>{t('global:common.toBeConstructedContent')}</p>
          ) : (
            <ContentfulDisplay document={project.content} />
          )}
        </StylishBox>
        <div className={'flex flex-row justify-end'}>
          {project.link && (
            <Link
              className={'flex flex-center text-blue-500 hover:text-blue-400'}
              href={project.link}
              target={'_blank'}
            >
              <span>{t('page:projects.viewProject')}</span>
              <FaExternalLinkAlt className={'ml-2'} />
            </Link>
          )}
        </div>
      </Section>
    </PageDefaultLayout>
  );
};

export async function getStaticPaths(context: GetStaticPropsContext) {
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
}

export async function getStaticProps(context: GetStaticPropsContext<{ slug: string }>) {    
  const lang = context.locale as AppLanguage;
  const projectsPage = await getProjectsPage({ lang });
  const slug = context.params?.slug as string;
  
  return {
    props: {
      title: projectsPage.title,
      project: projectsPage.projects.find((project) => project.slug === slug),
      ...(await serverSideTranslations(lang, ['common', 'global', 'page', 'router'])),
    } as ProjectSinglePageProps,
    revalidate: getSecondsFromMilliSeconds(30 * MINUTE),
  };
}

export default ProjectSinglePage;