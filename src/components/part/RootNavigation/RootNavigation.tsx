import React from "react";
import { ThemeSwitch } from "@/modules/theme/ThemeSwitch";

export function RootNavigation() {
  return (
    <nav className="px-8 py-6 gap-8 flex items-center justify-between bg-white/90 dark:bg-gray-900/70 border-b border-white dark:border-gray-800 backdrop-blur">
      <menu className="flex gap-4 items-center">
        <li>Home</li>
        <li>Portfolio</li>
      </menu>
      <ThemeSwitch/>
    </nav>
  )
}