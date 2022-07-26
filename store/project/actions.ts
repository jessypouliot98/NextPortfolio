import {createAction} from "@reduxjs/toolkit";
import {Project, ProjectActions} from "./type";

export const setProjects = createAction<Project[]>(ProjectActions.SET_PROJECTS);
