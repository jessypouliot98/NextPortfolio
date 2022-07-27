import {createAction} from "@reduxjs/toolkit";
import {CurriculumActions, Job} from "./type";

export const setJobs = createAction<Job[]>(CurriculumActions.SET_JOBS);
