import {createReducer} from "@reduxjs/toolkit";
import {setHomePage, setProjectsPage} from "@/store/pages/actions";
import {PagesState} from "@/store/pages/type";

export const initialState: PagesState = {
  pages: {
    home: undefined,
    projects: undefined,
  }
};

export const pagesReducer = createReducer(initialState, (builder => builder
  .addCase(setHomePage, (state, action) => {
    const homePage = action.payload;

    state.pages = {
      ...state.pages,
      home: homePage,
    };
  })
  .addCase(setProjectsPage, (state, action) => {
    const projectsPage = action.payload;

    state.pages = {
      ...state.pages,
      projects: projectsPage,
    };
  })
  .addDefaultCase(() => {})));
