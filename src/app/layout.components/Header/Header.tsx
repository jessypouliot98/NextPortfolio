import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

export type HeaderProps = Omit<ComponentPropsWithoutRef<"header">, "children">;

export function Header({ className, ...props }: HeaderProps) {
  return (
    <header {...props} className={clsx("shadow bg-white", className)}>
      <h1>header</h1>
    </header>
  )
}