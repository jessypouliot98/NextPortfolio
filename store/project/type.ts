import { Document } from "@contentful/rich-text-types";
import {ContentfulMediaImage} from "@/lib/contentful/types";

export type Project = {
  name: string,
  slug: string,
  link?: string,
  keywords?: string[],
  content: Document,
  thumbnail?: ContentfulMediaImage,
};

export type ProjectState = {
  isLoading: boolean,
  error?: Error,
  projects: Project[],
}

export enum ProjectActions {
  SET_PROJECTS = 'projects/set_projects',
}
