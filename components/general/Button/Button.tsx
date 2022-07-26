import React from "react";
import clsx from "clsx";

export type ButtonProps = {
  children: React.ReactNode,
  className?: string,
  disabled?: boolean,
  onPress?: () => void,
}

export const Button: React.FC<ButtonProps> = ({ children, className, disabled, onPress }) => {
  const handleClick = !disabled ? onPress : undefined;

  return (
    <button className={clsx('p-2 bg-blue-500 text-white rounded hover:bg-blue-400', className)} onClick={handleClick}>
      {children}
    </button>
  );
}
