import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { FaExternalLinkAlt } from "react-icons/fa";
import clsx from "clsx";
import { ContentfulDisplay } from "@/lib/contentful/components/ContentfulDisplay";

import { useRootSelector } from "@/store/store";

import { useProjectList } from "@/hooks/projects";

import { KeywordSEO, RatioContainer, Section, SectionTitle } from "@/components/general";
import Link from "@/components/general/Link/Link";
import { StylishBox } from "@/components/general/StylishBox/StylishBox";
import { PageDefaultLayout } from "@/components/layout";

const IS_IN_CONSTRUCTION = true;

const Project: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const query = router.query;
  const projectsPage = useRootSelector((state) => state.pagesState.pages.projects)!;
  const { projects } = useProjectList();

  const project = projects.find(({ slug }) => slug === query.slug);

  if (!project) {
    return null;
  }

  return (
    <PageDefaultLayout title={[projectsPage.title, project.name].join(' - ')}>
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
            <p className={'font-bold text-xl'}>{t('common.toBeConstructedContent')}</p>
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
              <span>{t('projects.viewProject')}</span>
              <FaExternalLinkAlt className={'ml-2'} />
            </Link>
          )}
        </div>
      </Section>
    </PageDefaultLayout>
  );
};

export default Project;
