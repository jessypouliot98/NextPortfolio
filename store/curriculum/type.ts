export type Job = {
  id: number,
  jobTitle: string,
  fromDate?: string,
  toDate?: string,
  companyName: string,
  companySlug: string,
  companyLink: string,
}

export type CurriculumState = {
  isLoading: boolean,
  error?: Error,
  jobs: Job[],
}
