import React from "react";
import clsx from "clsx";

type ButtonType = 'primary' | 'outline-primary' | 'gray' | 'outline-gray' | 'white' | 'default';
type ButtonSize = 'base' | 'lg';

export type ButtonProps = {
  children: React.ReactNode,
  className?: string,
  id?: string,
  type?: ButtonType,
  size?: ButtonSize,
  title?: string,
  disabled?: boolean,
  onPress?: () => void,
  'aria-label'?: string,
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, className, type = 'default', size = 'base', title, disabled, onPress } = props;

  const handleClick = !disabled ? onPress : undefined;

  return (
    <button
      className={clsx(
        'btn',
        type && `btn-${type}`,
        size && `btn-${size}`,
        disabled && 'btn-disabled',
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
