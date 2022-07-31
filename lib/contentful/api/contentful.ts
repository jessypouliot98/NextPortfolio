import getConfig from 'next/config';
import { createClient, Entry } from "contentful";

import { AppLanguage } from "@/store/application/types";
import { HomePage } from "@/store/pages/type";
import { Project } from "@/store/project/type";

type ContentfulProjectPage = {
  title: string,
  slug: string,
  projects: Entry<Project>[],
}

type ProjectPage = {
  title: string,
  slug: string,
  projects: Project[],
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

export const getHomePage = async ({ lang }: BaseApiParams) => {
  const entry = await getClient().getEntry<HomePage>(
    'O1yWAroLh52b0wKZtWrVR',
    getBaseQuery(lang)
  );

  const homePage: HomePage = {
    ...entry.fields,
    curriculumJobs: entry.fields.curriculumJobs.map((jobEntry: any) => {
      return {
        ...jobEntry.fields,
      };
    }),
    featuredProjects: entry.fields.featuredProjects.map((projectEntry: any) => {
      return {
        ...projectEntry.fields,
        thumbnail: (projectEntry.fields.thumbnail as any)?.fields,
      };
    })
  };

  return homePage;
};

export const getProjectsPage = async ({ lang }: BaseApiParams) => {
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
