import { useEffect, useState } from "react";

import { isServer } from './../../utils/platform';
import { isWeb } from '@/utils/platform';

enum Theme {
  light = 'light',
  dark = 'dark',
}

const getThemeFromLocalStorage = () => {
  if (isServer()) {
    return null;
  }
  
  return window.localStorage.getItem('currentTheme') as Theme | null;
};

const setThemeToLocalStorage = (theme: Theme) => {
  if (isServer()) {
    return;
  }
  
  window.localStorage.setItem('currentTheme', theme);
};

const getPreferedTheme = () => {
  const savedPreferenceTheme = getThemeFromLocalStorage();

  if (savedPreferenceTheme) {
    return savedPreferenceTheme;
  }

  if (isWeb() && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return Theme.dark;
  }

  return Theme.light;
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getPreferedTheme());

  const toggleTheme = () => setTheme((prevTheme) => {
    const nextTheme = prevTheme === Theme.light ? Theme.dark : Theme.light;

    if (isWeb()) {
      window.document.body.classList.toggle(prevTheme, false);
      window.document.body.classList.toggle(nextTheme, true);
    }

    setThemeToLocalStorage(nextTheme);

    return nextTheme;
  });

  useEffect(() => {
    if (isWeb()) {
      window.document.body.classList.toggle(theme, true);
    }
  }, []);

  return {
    theme,
    isDark: theme === Theme.dark,
    isLight: theme === Theme.light,
    toggleTheme,
  };
};
