import React from "react";
import clsx from "clsx";

export type SectionTitleProps = {
  children: React.ReactNode,
  className?: string,
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children, className }) => {
  return (
    <h2 className={clsx(
      'font-bold text-4xl mb-2',
      'text-gray-600 dark:text-gray-100',
      className,
    )}>
      {children}
    </h2>
  );
};
