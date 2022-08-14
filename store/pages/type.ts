import { Document } from "@contentful/rich-text-types";

import { Project } from "@/store/project/type";

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

export enum PagesActions {
  SET_HOME_PAGE = 'pages/set_home_page',
  SET_PROJECTS_PAGE = 'pages/set_projects_page',
}

export type HomePage = {
  title: string,
  slug: string,
  seoDescription: string,
  aboutMeTitle: string,
  aboutMeContent: Document,
  featuredProjectsTitle: string,
  featuredProjects: Project[],
  curriculumTitle: string,
  curriculumJobs: Job[],
  skillSetTitle: string,
  skillSetContent: Document,
}

export type ProjectsPage = {
  title: string,
  slug: string,
  seoDescription: string,
  projects: Project[],
}

export type PagesState = {
  pages: {
    home?: HomePage,
    projects?: ProjectsPage,
  }
}
