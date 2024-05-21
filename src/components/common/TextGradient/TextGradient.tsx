import React from "react";
import clsx from "clsx";

export type TextGradientProps = React.ComponentProps<"span">;

export function TextGradient({ children, className, ...props }: TextGradientProps) {
  return (
    <span className={clsx("inline-block text-transparent bg-clip-text", className)} {...props}>{children}</span>
  )
}