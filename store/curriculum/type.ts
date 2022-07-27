import { Document } from "@contentful/rich-text-types";

export type Job = {
  title: string,
  slug: string,
  startDate?: string,
  endDate?: string,
  companyName: string,
  companySlug: string,
  companyLink: string,
  content: Document,
}

export type CurriculumState = {
  isLoading: boolean,
  error?: Error,
  jobs: Job[],
}

export enum CurriculumActions {
  SET_JOBS = 'curriculum/set_jobs',
}
