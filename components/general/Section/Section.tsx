import React from "react";
import clsx from "clsx";

export type SectionProps = {
  className?: string,
  children: React.ReactNode,
}

export const Section: React.FC<SectionProps> = ({ children, className }) => {
  return (
    <section className={clsx(
      'py-6',
      className
    )}>
      {children}
    </section>
  );
};
