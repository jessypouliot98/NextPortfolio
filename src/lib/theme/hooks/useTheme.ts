import { useContext } from "react";
import { ThemeContext } from "@/lib/theme/ThemeContext";
import { Theme } from "@/lib/theme/utils";

export const useTheme = () => {
  const { theme, setTheme, toggleTheme } = useContext(ThemeContext);

  return {
    theme,
    setTheme,
    isDark: theme === Theme.dark,
    isLight: theme === Theme.light,
    toggleTheme,
  };
};