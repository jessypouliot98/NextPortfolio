import React from "react";
import clsx from "clsx";

export type SectionTitleProps = {
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  children: React.ReactNode,
  className?: string,
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children, className, component = 'h2' }) => {
  return React.createElement(
    component,
    {
      className: clsx('text-h1 mb-8', className),
    },
    children,
  );
};
