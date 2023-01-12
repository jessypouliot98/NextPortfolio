import React from "react";
import { FaSpinner } from "react-icons/fa";

import { ButtonIcon, ButtonIconProps } from "@/components/general/ButtonIcon/ButtonIcon";

export type ButtonAsyncProps = ButtonIconProps & {
  isLoading: boolean;
}

export const ButtonAsync: React.FC<ButtonAsyncProps> = ({ children, isLoading, disabled, ...buttonProps }) => {
  const isDisabled = isLoading || disabled;

  return (
    <ButtonIcon
      {...buttonProps}
      disabled={isDisabled}
      rightIcon={isLoading ? <FaSpinner className="animate-spin" /> : buttonProps.rightIcon}
    >
      {children}
    </ButtonIcon>
  );
};