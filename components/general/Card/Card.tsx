import React from "react";
import clsx from "clsx";

export type CardProps = {
  className?: string,
  style?: React.CSSProperties,
  children: React.ReactNode,
  "aria-describedby"?: string,
}

export const Card: React.FC<CardProps> = (props) => {
  const { children, className, style } = props;

  return (
    <div
      aria-describedby={props['aria-describedby']}
      className={clsx(
        'p-5 shadow-lg rounded-lg overflow-hidden',
        'bg-white dark:bg-gray-700',
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};
