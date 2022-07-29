import {createAction} from "@reduxjs/toolkit";
import {HomePage, PagesActions, ProjectsPage} from "@/store/pages/type";

export const setHomePage = createAction<HomePage>(PagesActions.SET_HOME_PAGE);
export const setProjectsPage = createAction<ProjectsPage>(PagesActions.SET_PROJECTS_PAGE);
