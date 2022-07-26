import React from "react";
import clsx from "clsx";

export type SectionTitleProps = {
  children: React.ReactNode,
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return (
    <h2 className={clsx(
      'font-bold text-4xl mb-2',
      'text-gray-600 dark:text-gray-100',
    )}>
      {children}
    </h2>
  )
}
