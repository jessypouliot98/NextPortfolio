import {createAction} from "@reduxjs/toolkit";
import {AppLanguage, ApplicationActions} from "@/store/application/types";

export const setLang = createAction<AppLanguage>(ApplicationActions.SET_LANG)
