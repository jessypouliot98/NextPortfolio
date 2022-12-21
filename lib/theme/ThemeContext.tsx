import React, { useCallback, useEffect, useState } from "react";
import { getPreferedTheme, setThemeToLocalStorage, Theme } from "@/lib/theme/utils";

import { isClient } from "@/utils/platform";

export const ThemeContext = React.createContext({
  theme: 'light' as Theme,
  setTheme: (() => {}) as React.Dispatch<React.SetStateAction<Theme>>,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getPreferedTheme());

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const nextTheme = prevTheme === Theme.light ? Theme.dark : Theme.light;

      if (isClient()) {
        window.document.body.classList.toggle(prevTheme, false);
        window.document.body.classList.toggle(nextTheme, true);
      }

      setThemeToLocalStorage(nextTheme);

      return nextTheme;
    });
  }, []);

  useEffect(() => {
    if (isClient()) {
      window.document.body.classList.toggle(theme, true);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};