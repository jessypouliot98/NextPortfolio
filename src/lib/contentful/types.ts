import { Document } from "@contentful/rich-text-types";

import { Entry } from "./index";

export type CVPage = Entry<{
  title: string,
  subtitle: string,
  intro: Document,
  education: Document,
  qualities: string[],
  contact: Document,
  skills: Skill[],
  jobs: Job[],
}>

export type HomePage = Entry<{
  title: string,
  seoDescription?: string,
  aboutMeTitle: string,
  aboutMeContent: Document,
  aboutMeImage?: ContentfulMediaImage,
  featuredProjectsTitle: string,
  featuredProjects: Project[],
  curriculumTitle: string,
  curriculumJobs: Job[],
  skillSetTitle: string,
  skills: Skill[],
}>

export type ContactPage = Entry<{
  title: string;
  slug: string;
  seoDescription?: string;
  content: Document;
  formImage: ContentfulMediaImage;
}>

export type ServicesPage = Entry<{
  title: string;
  slug: string;
  seoDescription?: string;
  contactCTA: CardCTA;
  services: Service[];
  contactMeParagraph: string;
  contactMeButton: string;
}>

export type Testimonial = Entry<{
  title: string;
  slug: string;
  text: string;
  writtenByName: string;
  writtenByTitle: string;
  relatedJob: Job;
}>

export type ProjectPage = Entry<{
  title: string;
  slug: string;
  seoDescription?: string;
  projects: Project[];
}>

export type BlogPage = Entry<{
  title: string;
  slug: string;
  seoDescription?: string;
  blogPosts: BlogPost[];
}>

export type Project = Entry<{
  name: string;
  slug: string;
  seoDescription?: string;
  keywords: string[];
  thumbnail: ContentfulMediaImage;
  skills?: Skill[];
  link?: string; // @deprecated
  linkSourceCode?: string;
  linkProject?: string;
  linkPresentation?: string;
  content: Document;
  relatedJob?: Job;
}>

export type Job = Entry<{
  title: string;
  slug: string;
  companyName: string;
  companySlug: string;
  companyLink: string;
  startDate?: string;
  endDate?: string;
  content: Document;
  skills: Skill[];
  logo: ContentfulMediaImage;
}>

export type Skill = Entry<{
  name: string,
  slug: string,
  color?: string,
  isMajorSkill: boolean,
}>

export type BlogPost = Entry<{
  title: string,
  slug: string,
  seoDescription?: string,
  content: string, // Markdown content
}>

export type CustomLink = Entry<{
  label: string;
  url: string;
}>

export type CardCTA = Entry<{
  content: Document;
  link: CustomLink;
  image: ContentfulMediaImage
}>

export type Service = Entry<{
  title: string;
  content: Document;
  image: ContentfulMediaImage;
}>

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
}

export type ContentfulMediaImage = {
  title: string,
  description: string,
  file: ContentfulFileImage,
}
