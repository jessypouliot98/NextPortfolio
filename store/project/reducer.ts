import {createReducer} from "@reduxjs/toolkit";
import {ProjectState} from "./type";
import {setProjects} from "./actions";

export const initialState: ProjectState = {
  isLoading: false,
  error: undefined,
  projects: [],
};

export const projectReducer = createReducer(initialState, (builder => builder
  .addCase(setProjects, (state, action) => {
    const projects = action.payload;

    state.projects = projects;
    state.isLoading = false;
  })
  .addDefaultCase(() => {})));
