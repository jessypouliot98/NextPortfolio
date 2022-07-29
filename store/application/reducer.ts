import {createReducer} from "@reduxjs/toolkit";
import {ApplicationState} from "@/store/application/types";
import {setLang} from "@/store/application/actions";

export const initialState: ApplicationState = {
  lang: 'en',
};

export const applicationReducer = createReducer(initialState, (builder => builder
  .addCase(setLang, (state, action) => {
    const lang = action.payload;

    state.lang = lang;
  })
  .addDefaultCase(() => {})));
