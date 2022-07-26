import '../styles/globals.css'
import type {AppContext, AppProps} from 'next/app'
import {Provider} from "react-redux";
import {createStore, getStore, initializeStore, RootState} from "../store/store";
import App from "next/app";
import {getProjects} from "../lib/contentful/contentful";
import {useEffect, useState} from "react";
import {setProjects} from "../store/project/actions";
import {isWeb} from "../utils/platform";

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

  const projectPage = await getProjects();

  const store = createStore();
  store.dispatch(setProjects(projectPage.projects));

  const props: MyAppProps = {
    ...appProps as AppProps,
    initialState: store.getState(),
  }

  return props;
}

export default MyApp
