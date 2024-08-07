import { getCms } from "@/modules/cms/index";

export type Entry<T> = {
  metadata: object;
  sys: object;
  fields: T;
}

export type Entries<T extends Entry<unknown>> = {
  sys: object;
  total: number;
  skip: number;
  limit: number;
  items: T[];
  includes: {
    Entry: object[];
    Asset: object[];
  }
}

export type FileDetails = {
  size: number;
  image: {
    width: number;
    height: number;
  }
}

export type File = {
  url: string;
  details: FileDetails;
  fileName: string;
  contentType: string;
}

export type Json = any;

export type EntryMedia = Entry<{
  title: string;
  description: string;
  file: File;
}>;

export type EntrySkill = Entry<{
  name: string;
  slug: string;
  image: EntryMedia;
  extra: any;
}>

export type EntryRing = Entry<{
  title: string;
  skills: EntrySkill[];
  configuration: Json;
}>;

export type EntrySkillCircle = Entry<{
  title: string;
  rings: EntryRing[];
}>

export type EntrySocial = Entry<{
  title: string;
  slug: string;
  icon: string;
  highlightColor?: string;
  href: string;
}>

export type EntryHeroSocials = Entry<{
  title: string;
  socials: EntrySocial[];
}>

export type EntryProject = Entry<{
  name: string;
  slug: string;
  keywords: string[];
  thumbnail: EntryMedia;
  skills: object[];
  link?: string;
  linkPresentation?: string;
  linkProject?: string;
  relatedJob: object;
  content: object;
}>

export type EntryDockApp = Entry<{
  title: string;
  slug: string;
  appIcon: EntryMedia;
}>

export type EntryDock = Entry<{
  title: string;
  slug: string;
  apps: EntryDockApp[];
}>

export async function getHeroSkillCircle() {
  const entry = await getCms().getEntry(
    '5vOJmStm2QB4yc9Iqx6KTs',
    { locale: "en-CA", include: 3 },
  );

  return entry as EntrySkillCircle;
}

export async function getHeroSocials() {
  const entry = await getCms().getEntry(
    '53ewG5xgg3VToGcFaqbjT6',
    { locale: "en-CA" },
  );

  return entry as EntryHeroSocials;
}

export async function getProjects() {
  const entries = await getCms().getEntries({
    locale: "en-CA",
    content_type: "project",
    order: ["-sys.createdAt"],
  });

  return entries as Entries<EntryProject>;
}

export async function getMacDock() {
  const entry = await getCms().getEntry(
    "6Tf1ZvtW3Kci9dDCd5l8Fw",
    { locale: "en-CA" },
  );

  return entry as EntryDock;
}