import React from "react";

export function RootNavigation() {
  return (
    <nav className="bg-white/90 dark:bg-gray-900/70 border-b border-white dark:border-gray-800 backdrop-blur">
      <menu className="px-8 py-6 flex gap-4 items-center">
        <li>Home</li>
        <li>Portfolio</li>
      </menu>
    </nav>
  )
}