import {createReducer} from "@reduxjs/toolkit";
import {CurriculumState} from "./type";
import {setJobs} from "./actions";

export const initialState: CurriculumState = {
  isLoading: false,
  error: undefined,
  jobs: [],
};

export const curriculumReducer = createReducer(initialState, (builder => builder
  .addCase(setJobs, (state, action) => {
    const jobs = action.payload;

    state.jobs = jobs;
    state.isLoading = false;
  })
  .addDefaultCase(() => {})));
