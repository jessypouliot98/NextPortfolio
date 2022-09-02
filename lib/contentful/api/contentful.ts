import getConfig from 'next/config';
import { createClient } from "contentful";
import { CVPage, HomePage, ProjectPage } from "@/lib/contentful/types";

import { AppLanguage } from "../../../types";

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

const mapEntry = <R extends {} = any>(entry: any): R => {
  if (entry.fields) {
    return Object.entries(entry.fields).reduce<any>((acc, [key, entry]) => {
      acc[key] = mapEntry(entry);
      return acc;
    }, {});
  }

  if (Array.isArray(entry)) {
    return entry.map(mapEntry) as any;
  }

  return entry;
};

export const getHomePage = async ({ lang }: BaseApiParams) => {
  const entry = await getClient().getEntry(
    'O1yWAroLh52b0wKZtWrVR',
    getBaseQuery(lang)
  );

  return mapEntry<HomePage>(entry);
};

export const getCVPage = async ({ lang }: BaseApiParams) => {
  const entry = await getClient().getEntry(
    '7I1lyspj1Pv4n4GqXI5HJW',
    getBaseQuery(lang)
  );

  return mapEntry<CVPage>(entry);
};

export const getProjectsPage = async ({ lang }: BaseApiParams) => {
  const entry = await getClient().getEntry(
    '9Fvhg1FFcvesojFqhg6PK',
    getBaseQuery(lang),
  );

  return mapEntry<ProjectPage>(entry);
};
