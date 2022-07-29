import { useEffect, useState } from "react";
import type { AppContext, AppProps } from 'next/app';
import App from "next/app";
import { Provider } from "react-redux";
import {getCurriculum, getHomePage, getProjects} from "@/lib/contentful/api/contentful";

import { setLang } from "@/store/application/actions";
import { AppLanguage } from "@/store/application/types";
import { setJobs } from "@/store/curriculum/actions";
import { setProjects } from "@/store/project/actions";
import { createStore, getStore, initializeStore, RootState } from "@/store/store";

import { isWeb } from "@/utils/platform";

import '@/styles/globals.css';
import {setHomePage, setProjectsPage} from "@/store/pages/actions";

export type MyAppProps = AppProps & {
  initialState?: RootState,
}

const MyApp = (props: MyAppProps) => {
  const { Component, pageProps, initialState } = props;

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeStore(initialState);
    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return null;
  }

  return (
    <Provider store={getStore()}>
      <Component {...pageProps} />
    </Provider>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  if (isWeb()) {
    return appProps;
  }

  const store = createStore();
  let lang = appContext.router.query.lang as AppLanguage || undefined;

  if (lang) {
    store.dispatch(setLang(lang));
  }

  lang = store.getState().applicationState.lang;

  const [homePage, projectsPage, curriculumPage] = await Promise.all([
    getHomePage({ lang }),
    getProjects({ lang }),
    getCurriculum({ lang }),
  ]);

  store.dispatch(setHomePage(homePage));
  store.dispatch(setProjectsPage(projectsPage));
  store.dispatch(setProjects(projectsPage.projects));
  store.dispatch(setJobs(curriculumPage.jobs));

  const props: MyAppProps = {
    ...appProps as AppProps,
    initialState: store.getState(),
  };

  return props;
};

export default MyApp;
