import { Slot, SlotProps, Slottable } from "@radix-ui/react-slot";
import clsx from "clsx";

export type SectionContentProps = SlotProps & {
  asChild?: boolean;
}

export function SectionContent({ children, asChild, className, ...props }: SectionContentProps) {
  const Component = asChild ? Slot : "div";
  return (
    <Component {...props} className={clsx("mt-2", className)}>
      <Slottable>{children}</Slottable>
    </Component>
  )
}