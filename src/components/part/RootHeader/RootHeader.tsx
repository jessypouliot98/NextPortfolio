import React from "react";
import { RootNavigation } from "@/components/part/RootNavigation/RootNavigation";

export function RootHeader() {
  return (
    <header className="z-10 sticky top-0">
      <RootNavigation/>
    </header>
  )
}