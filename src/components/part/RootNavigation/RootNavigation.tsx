import React from "react";
import { ThemeSwitch } from "@/modules/theme/ThemeSwitch";
import Link from "next/link";

export function RootNavigation() {
  return (
    <nav className="px-8 py-3 gap-8 flex items-center justify-between bg-white/90 dark:bg-gray-900/70 border-b border-white dark:border-gray-800 backdrop-blur">
      <menu className="flex gap-4 items-center">
        <li>
          <Link className="transition p-2 rounded-md bg-transparent hover:bg-blue-100 dark:hover:bg-blue-950" href="#home">
            Home
          </Link>
        </li>
        <li>
          <Link className="transition p-2 rounded-md bg-transparent hover:bg-blue-100 dark:hover:bg-blue-950" href="#portfolio">
            Portfolio
          </Link>
        </li>
      </menu>
      <ThemeSwitch/>
    </nav>
  )
}