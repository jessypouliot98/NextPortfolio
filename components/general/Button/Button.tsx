import React from "react";
import clsx from "clsx";

type ButtonType = 'primary' | 'gray' | 'white' | 'default';

export type ButtonProps = {
  children: React.ReactNode,
  className?: string,
  type?: ButtonType,
  title?: string,
  disabled?: boolean,
  onPress?: () => void,
}

export const Button: React.FC<ButtonProps> = ({ children, className, type = 'default', title, disabled, onPress }) => {
  const handleClick = !disabled ? onPress : undefined;

  return (
    <button
      className={clsx(
        'btn',
        type && `btn-${type}`,
        className,
      )}
      title={title}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
