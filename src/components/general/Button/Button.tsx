import React, { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

type ButtonVariant = 'primary' | 'outline-primary' | 'gray' | 'outline-gray' | 'white' | 'default';
type ButtonSize = 'base' | 'lg';

export type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: ButtonVariant,
  size?: ButtonSize,
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, variant = 'default', size = 'base', onClick } = props;

  const handleClick = !props.disabled ? onClick : undefined;

  return (
    <button
      {...props}
      className={clsx(
        'btn',
        variant && `btn-${variant}`,
        size && `btn-${size}`,
        props.disabled && 'btn-disabled',
        props.className,
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
