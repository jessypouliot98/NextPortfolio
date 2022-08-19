import React from "react";
import clsx from "clsx";

export type ButtonProps = {
  children: React.ReactNode,
  className?: string,
  title?: string,
  disabled?: boolean,
  onPress?: () => void,
}

export const Button: React.FC<ButtonProps> = ({ children, className, title, disabled, onPress }) => {
  const handleClick = !disabled ? onPress : undefined;

  return (
    <button
      className={clsx(
        'flex flex-center rounded p-2',
        'bg-blue-500 text-white hover:bg-blue-400',
        className,
      )}
      title={title}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
