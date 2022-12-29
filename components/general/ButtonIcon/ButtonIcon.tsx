import React from "react";

import { Button, ButtonProps } from "@/components/general";

export type ButtonIconProps = ButtonProps & {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const ButtonIcon: React.FC<ButtonIconProps> = ({ leftIcon, rightIcon, children, ...buttonProps }) => {
  return (
    <Button {...buttonProps}>
      <span className="inline-flex justify-center">
        {leftIcon && <span className="mr-1">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-1">{rightIcon}</span>}
      </span>
    </Button>
  );
};