import {createClient, Entry} from "contentful";
import {Project} from "../../store/project/type";

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

export const getProjects = async () => {
  const client = createClient(/* TODO */);

  const entry = await client.getEntry<ContentfulProjectPage>('9Fvhg1FFcvesojFqhg6PK');

  const projectPage: ProjectPage = {
    ...entry.fields,
    projects: entry.fields.projects.map((projectEntry) => {
      return projectEntry.fields;
    })
  };

  return projectPage;
}
