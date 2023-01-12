import { isClient, isServer } from "@/utils/platform";

export enum Theme {
  light = 'light',
  dark = 'dark',
}

export const getThemeFromLocalStorage = () => {
  if (isServer()) {
    return null;
  }

  return window.localStorage.getItem('currentTheme') as Theme | null;
};

export const setThemeToLocalStorage = (theme: Theme) => {
  if (isServer()) {
    return;
  }

  window.localStorage.setItem('currentTheme', theme);
};

export const getPreferedTheme = () => {
  const savedPreferenceTheme = getThemeFromLocalStorage();

  if (savedPreferenceTheme) {
    return savedPreferenceTheme;
  }

  if (isClient() && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return Theme.dark;
  }

  return Theme.light;
};