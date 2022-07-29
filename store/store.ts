import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {curriculumReducer} from "./curriculum/reducer";
import {projectReducer} from "./project/reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {applicationReducer} from "@/store/application/reducer";

export const rootReducer = combineReducers({
  applicationState: applicationReducer,
  curriculumState: curriculumReducer,
  projectState: projectReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export const createStore = (preloadedState?: any) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type StoreType = ReturnType<typeof createStore>;

let store: StoreType | undefined;

export const getStore = () => {
  if (!store) {
    throw new Error('Store in not initialized');
  }

  return store;
};

export const initializeStore = (preloadedState?: RootState) => {
  if (store) {
    return store;
  }

  store = createStore(preloadedState);

  return store;
}

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;


