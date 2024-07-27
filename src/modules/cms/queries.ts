import { getCms } from "@/modules/cms/index";

export type Entry<T> = {
  metadata: object;
  sys: object;
  fields: T;
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

export async function getHeroSkillCircle() {
  const entry = await getCms().getEntry(
    '5vOJmStm2QB4yc9Iqx6KTs',
    { locale: "en-CA", include: 3 },
  );

  return entry as EntrySkillCircle;
}