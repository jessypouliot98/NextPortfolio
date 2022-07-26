export type Project = {
  name: string,
  slug: string,
  link?: string,
  keywords?: string[],
};

export type ProjectState = {
  isLoading: boolean,
  error?: Error,
  projects: Project[],
}

export enum ProjectActions {
  SET_PROJECTS = 'projects/set_projects',
}
