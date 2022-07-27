import type { NextPage } from 'next'
import {useRouter} from "next/router";
import {FaExternalLinkAlt} from "react-icons/all";

import {useProjectList} from "@/hooks/projects";

import {KeywordSEO, Section, SectionTitle} from "@/components/general";
import Link from "@/components/general/Link/Link";
import {StylishBox} from "@/components/general/StylishBox/StylishBox";
import {PageDefaultLayout} from "@/components/layout";
import {ContentfulDisplay} from "@/lib/contentful/components/ContentfulDisplay";

const Project: NextPage = () => {
  const router = useRouter();
  const query = router.query;
  const { projects } = useProjectList();

  const project = projects.find(({ slug }) => slug === query.slug)

  if (!project) {
    return null;
  }

  return (
    <PageDefaultLayout>
      <Section>
        <SectionTitle>
          {project.name}
        </SectionTitle>
        {project.keywords && (
          <KeywordSEO keywords={project.keywords}/>
        )}
        <StylishBox className={'mb-2'} effects={[
          { top: -10, left: -10, blur: true },
          { top: 200, right: 50, blur: true },
        ]}>
          <ContentfulDisplay document={project.content} />
        </StylishBox>
        <div className={'flex flex-row justify-end'}>
          {project.link && (
            <Link
              className={'flex flex-center text-blue-500 hover:text-blue-400'}
              href={project.link}
              target={'_blank'}
            >
              <span>View Project</span>
              <FaExternalLinkAlt className={'ml-2'} />
            </Link>
          )}
        </div>
      </Section>
    </PageDefaultLayout>
  )
}

export default Project
