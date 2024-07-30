import React from "react";

export function RootNavigation() {
  return (
    <nav className="bg-white/90 dark:bg-gray-900/70 backdrop-blur">
      <menu className="p-4 flex gap-4 items-center">
        <li>Home</li>
        <li>Portfolio</li>
      </menu>
    </nav>
  )
}