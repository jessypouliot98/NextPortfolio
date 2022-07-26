import React from "react";
import clsx from "clsx";

export type CardProps = {
  className?: string,
  children: React.ReactNode,
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={clsx(
      'p-5 shadow-lg rounded-lg overflow-hidden',
      'bg-white dark:bg-gray-700',
      className
    )}>
      {children}
    </div>
  )
}
