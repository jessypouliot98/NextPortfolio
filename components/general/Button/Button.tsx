import React from "react";
import clsx from "clsx";

type ButtonType = 'primary' | 'gray' | 'white' | 'default';

export type ButtonProps = {
  children: React.ReactNode,
  className?: string,
  id?: string,
  type?: ButtonType,
  title?: string,
  disabled?: boolean,
  onPress?: () => void,
  'aria-label'?: string,
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, className, type = 'default', title, disabled, onPress } = props;

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
      aria-label={props['aria-label']}
    >
      {children}
    </button>
  );
};
