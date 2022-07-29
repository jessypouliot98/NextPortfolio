import {useEffect, useState} from "react";

enum Theme {
  light = 'light',
  dark = 'dark',
}

const getThemeFromLocalStorage = () => {
  return window.localStorage.getItem('currentTheme') as Theme | null;
}

const setThemeToLocalStorage = (theme: Theme) => {
  window.localStorage.setItem('currentTheme', theme);
}

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getThemeFromLocalStorage() || Theme.light);

  const toggleTheme = () => setTheme((prevTheme) => {
    const nextTheme = prevTheme === Theme.light ? Theme.dark : Theme.light;
    window.document.body.classList.toggle(prevTheme, false);
    window.document.body.classList.toggle(nextTheme, true);
    setThemeToLocalStorage(nextTheme);

    return nextTheme;
  });

  useEffect(() => {
    window.document.body.classList.toggle(theme, true);
  }, []);

  return {
    theme,
    isDark: theme === Theme.dark,
    isLight: theme === Theme.light,
    toggleTheme,
  }
}
