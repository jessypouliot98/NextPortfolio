import { Slot, SlotProps, Slottable } from "@radix-ui/react-slot";
import React from "react";
import clsx from "clsx";

export type SectionTitleProps = SlotProps & {
  asChild?: boolean;
}

export function SectionTitle({ children, asChild, className, ...slotProps }: SectionTitleProps) {
  const Component = asChild ? Slot : "h2";
  return (
    <Component {...slotProps} className={clsx("text-2xl font-medium", className)}>
      <Slottable>{children}</Slottable>
    </Component>
  )
}