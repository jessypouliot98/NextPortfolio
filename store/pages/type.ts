import {Document} from "@contentful/rich-text-types";

export enum PagesActions {
  SET_HOME_PAGE = 'pages/set_home_page',
  SET_PROJECTS_PAGE = 'pages/set_projects_page',
}

export type HomePage = {
  title: string,
  slug: string,
  aboutMeTitle: string,
  aboutMeContent: Document,
  featuredProjectsTitle: string,
  curriculumTitle: string,
  skillSetTitle: string,
  skillSetContent: Document,
}

export type ProjectsPage = {
  title: string,
  slug: string,
}

export type PagesState = {
  pages: {
    home?: HomePage,
    projects?: ProjectsPage,
  }
}
