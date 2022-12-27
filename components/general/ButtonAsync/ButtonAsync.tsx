import React from "react";
import { FaSpinner } from "react-icons/fa";

import { Button, ButtonProps } from "@/components/general";

export type ButtonAsyncProps = ButtonProps & {
  isLoading: boolean;
}

export const ButtonAsync: React.FC<ButtonAsyncProps> = ({ children, isLoading, disabled, ...buttonProps }) => {
  const isDisabled = isLoading || disabled;

  return (
    <Button {...buttonProps} disabled={isDisabled}>
      <span className="inline-flex">
        {children}
        <span className="ml-1">
          {isLoading && <FaSpinner className="animate-spin" />}
        </span>
      </span>
    </Button>
  );
};