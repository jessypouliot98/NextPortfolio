import {createReducer} from "@reduxjs/toolkit";
import {CurriculumState} from "./type";

export const initialState: CurriculumState = {
  isLoading: false,
  error: undefined,
  jobs: [
    {
      id: 1,
      jobTitle: 'WordPress Developer',
      companyName: 'PAR Design',
      companySlug: 'pardesign',
      companyLink: 'https://pardesign.net/',
    },
    {
      id: 2,
      jobTitle: 'Full-Stack Developer',
      fromDate: 'May 2020',
      toDate: 'September 2021',
      companyName: 'Activix',
      companySlug: 'activix',
      companyLink: 'https://activix.ca/',
    },
    {
      id: 3,
      jobTitle: 'Software Developer',
      fromDate: 'September 2021',
      toDate: 'Present',
      companyName: 'RenoRun',
      companySlug: 'renorun',
      companyLink: 'https://renorun.com/',
    },
  ].reverse(),
};

export const curriculumReducer = createReducer(initialState, (builder => builder.addDefaultCase(() => {})));
