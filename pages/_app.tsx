import '../styles/globals.css'
import type {AppContext, AppProps} from 'next/app'
import {Provider} from "react-redux";
import {createStore, getStore, initializeStore, RootState} from "../store/store";
import App from "next/app";
import {getCurriculum, getProjects} from "../lib/contentful/api/contentful";
import {useEffect, useState} from "react";
import {setProjects} from "../store/project/actions";
import {isWeb} from "../utils/platform";
import {setJobs} from "../store/curriculum/actions";

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
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  if (isWeb()) {
    return appProps;
  }

  const [projectPage, curriculumPage] = await Promise.all([
    getProjects(),
    getCurriculum(),
  ]);

  const store = createStore();
  store.dispatch(setProjects(projectPage.projects));
  store.dispatch(setJobs(curriculumPage.jobs));

  const props: MyAppProps = {
    ...appProps as AppProps,
    initialState: store.getState(),
  }

  return props;
}

export default MyApp
