import { Document } from "@contentful/rich-text-types";

export type CVPage = {
  title: string,
  subtitle: string,
  intro: Document,
  qualities: string[],
  contact: Document,
  skills: Skill[],
  jobs: Job[],
}

export type HomePage = {
  title: string,
  seoDescription?: string,
  aboutMeTitle: string,
  aboutMeContent: Document,
  featuredProjectsTitle: string,
  featuredProjects: Project[],
  curriculumTitle: string,
  curriculumJobs: Job[],
  skillSetTitle: string,
  skills: Skill[],
}

export type ProjectPage = {
  title: string,
  slug: string,
  seoDescription?: string,
  projects: Project[],
}

export type BlogPage = {
  title: string,
  slug: string,
  seoDescription?: string,
  blogPosts: BlogPost[],
}

export type Project = {
  name: string,
  slug: string,
  seoDescription?: string,
  keywords: string[],
  thumbnail: ContentfulMediaImage,
  skills?: Skill[],
  link?: string,
  content: Document,
}

export type Job = {
  title: string,
  slug: string,
  companyName: string,
  companySlug: string,
  companyLink: string,
  startDate?: string,
  endDate?: string,
  content: Document,
  skills: Skill[],
}

export type Skill = {
  name: string,
  slug: string,
  color?: string,
  isMajorSkill: boolean,
}

export type BlogPost = {
  title: string,
  slug: string,
  seoDescription?: string,
  content: string, // Markdown content
}

export type ContentfulFileImage = {
  url: string,
  details: {
    size: number,
    image: {
      width: number,
      height: number,
    }
  },
  contentType: string,
};

export type ContentfulMediaImage = {
  title: string,
  description: string,
  file: ContentfulFileImage,
}
