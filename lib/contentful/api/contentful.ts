import getConfig from 'next/config';
import { createClient, Entry } from "contentful";

import { AppLanguage } from "@/store/application/types";
import { Job } from "@/store/curriculum/type";
import { Project } from "@/store/project/type";
import {HomePage} from "@/store/pages/type";

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

type BaseApiParams = { lang: AppLanguage };

const getBaseQuery = (lang: AppLanguage) => {
  return {
    locale: lang === 'en' ? 'en-CA' : 'fr-CA',
  };
};

export const getProjects = async ({ lang }: BaseApiParams) => {
  const entry = await getClient().getEntry<ContentfulProjectPage>(
    '9Fvhg1FFcvesojFqhg6PK',
    getBaseQuery(lang),
  );

  const projectPage: ProjectPage = {
    ...entry.fields,
    projects: entry.fields.projects.map((projectEntry) => {
      return {
        ...projectEntry.fields,
        thumbnail: (projectEntry.fields.thumbnail as any)?.fields,
      };
    })
  };

  return projectPage;
};

export const getCurriculum = async ({ lang }: BaseApiParams) => {
  const entry = await getClient().getEntry<ContentfulCurriculumPage>(
    '6FVeb5FsvzCHdWgz85Dclx',
    getBaseQuery(lang)
  );

  const projectPage: CurriculumPage = {
    ...entry.fields,
    jobs: entry.fields.jobs.map((jobEntry) => {
      return jobEntry.fields;
    })
  };

  return projectPage;
};

export const getHomePage = async ({ lang }: BaseApiParams) => {
  const entry = await getClient().getEntry<HomePage>(
    'O1yWAroLh52b0wKZtWrVR',
    getBaseQuery(lang)
  );

  const homePage = {
    ...entry.fields,
  };

  return homePage;
}
