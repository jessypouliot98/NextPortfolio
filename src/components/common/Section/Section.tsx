import React, { ComponentPropsWithoutRef } from "react";
import { PickRequired } from "@/utils/types/object-type-utils";
import { SectionTitle } from "@/components/common/Section/SectionTitle/SectionTitle";
import clsx from "clsx";
import { SectionContent } from "@/components/common/Section/SectionContent/SectionContent";

export type SectionProps = PickRequired<ComponentPropsWithoutRef<"section">, "id">

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section {...props} className={clsx("section-content", className)}>
      {children}
    </section>
  )
}

export namespace Section {

  export function Card({ children, className, ...props }: SectionProps) {
    return (
      <Section {...props} className={clsx("section-content rounded shadow bg-white", className)}>
        {children}
      </Section>
    )
  }

  export function Zone({ children, className, ...props }: SectionProps) {
    return (
      <Section {...props} className={clsx("section-content", className)}>
        {children}
      </Section>
    )
  }

  export const Title = SectionTitle;
  export const Content = SectionContent;

}