import getConfig from 'next/config';
import { createClient } from "contentful";
import { BlogPage, ContactPage, CVPage, HomePage, ProjectPage, ServicesPage } from "@/lib/contentful/types";

import { AppLanguage } from "../../../types";

const { serverRuntimeConfig } = getConfig();

const getClient = () => {
  return createClient({
    space: serverRuntimeConfig.CONTENTFUL_SPACE_ID as string,
    accessToken: serverRuntimeConfig.CONTENTFUL_ACCESS_TOKEN as string,
  });
};

const getPreviewClient = () => {
  return createClient({
    space: serverRuntimeConfig.CONTENTFUL_SPACE_ID as string,
    accessToken: serverRuntimeConfig.CONTENTFUL_PREVIEW_TOKEN as string,
    host: 'preview.contentful.com'
  });
};

type BaseApiParams = { lang: AppLanguage };
export type Entry<T extends {} = {}> = { id: string, createdAt: string, updatedAt: string } & T;

const getBaseQuery = (lang: AppLanguage, queryExtra: Record<string, string | number> = {}) => {
  return {
    locale: lang === 'en' ? 'en-CA' : 'fr-CA',
    ...queryExtra,
  };
};

const mapEntry = <R extends {} = any>(entry: any): R => {
  if (entry.fields) {
    return Object.entries(entry.fields).reduce<any>((acc, [key, entry]) => {
      acc[key] = mapEntry(entry);
      return acc;
    }, {
      id: entry.sys.id,
      createdAt: entry.sys.createdAt,
      updatedAt: entry.sys.updatedAt,
    });
  }

  if (Array.isArray(entry)) {
    return entry.map(mapEntry) as any;
  }

  return entry;
};

export const getHomePage = async ({ lang }: BaseApiParams) => {
  const entry = await getClient().getEntry(
    'O1yWAroLh52b0wKZtWrVR',
    getBaseQuery(lang, { include: 5 })
  );

  return mapEntry<HomePage>(entry);
};

export const getCVPage = async ({ lang }: BaseApiParams) => {
  const entry = await getClient().getEntry(
    '7I1lyspj1Pv4n4GqXI5HJW',
    getBaseQuery(lang, { include: 5 })
  );

  return mapEntry<CVPage>(entry);
};

export const getContactPage = async ({ lang }: BaseApiParams) => {
  const entry = await getClient().getEntry(
    '4Wzzyjtze1U6G6bEW4lMRb',
    getBaseQuery(lang),
  );

  return mapEntry<ContactPage>(entry);
};

export const getServicesPage = async ({ lang }: BaseApiParams) => {
  const entry = await getClient().getEntry(
    '3aV7DlDpBFOzybp0oDc3Oo',
    getBaseQuery(lang, { include: 5 }),
  );

  return mapEntry<ServicesPage>(entry);
};

export const getProjectsPage = async ({ lang }: BaseApiParams) => {
  const entry = await getClient().getEntry(
    '9Fvhg1FFcvesojFqhg6PK',
    getBaseQuery(lang, { include: 10 }),
  );

  return mapEntry<ProjectPage>(entry);
};

export const getBlogListPage = async ({ lang }: BaseApiParams) => {
  const entry = await getClient().getEntry(
    '6gG0r1TVZhsuHiyrYgAvxM',
    getBaseQuery(lang),
  );
  
  
  return mapEntry<BlogPage>(entry);
};

type FetchEntryApiParams = BaseApiParams & { entryId: string }
export const getEntry = async <T extends {} = any>({ entryId, lang }: FetchEntryApiParams) => {
  const entry = await getPreviewClient().getEntry(
    entryId,
    getBaseQuery(lang),
  );
  
  return mapEntry<T>(entry);
};