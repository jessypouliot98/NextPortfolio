import getConfig from 'next/config';
import { createClient, Entry } from "contentful";

import { Job } from "@/store/curriculum/type";
import { Project } from "@/store/project/type";

type ContentfulProjectPage = {
  title: string,
  slug: string,
  projects: Entry<Project>[],
}

type ContentfulCurriculumPage = {
  title: string,
  slug: string,
  jobs: Entry<Job>[],
}

type ProjectPage = {
  title: string,
  slug: string,
  projects: Project[],
}

type CurriculumPage = {
  title: string,
  slug: string,
  jobs: Job[],
}

const { serverRuntimeConfig } = getConfig();

const getClient = () => {
  return createClient({
    space: serverRuntimeConfig.CONTENTFUL_SPACE_ID as string,
    accessToken: serverRuntimeConfig.CONTENTFUL_ACCESS_TOKEN as string,
  });
};

export const getProjects = async () => {
  const entry = await getClient().getEntry<ContentfulProjectPage>('9Fvhg1FFcvesojFqhg6PK');

  const projectPage: ProjectPage = {
    ...entry.fields,
    projects: entry.fields.projects.map((projectEntry) => {
      return projectEntry.fields;
    })
  };

  return projectPage;
};

export const getCurriculum = async () => {
  const entry = await getClient().getEntry<ContentfulCurriculumPage>('6FVeb5FsvzCHdWgz85Dclx');

  const projectPage: CurriculumPage = {
    ...entry.fields,
    jobs: entry.fields.jobs.map((jobEntry) => {
      return jobEntry.fields;
    })
  };

  return projectPage;
};
