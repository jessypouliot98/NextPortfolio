import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { CardCTA as CardCTAType, ContentfulDisplay, getContentfulImageSrc } from "@/lib/contentful";

import { Card, StylishBox } from "@/components/general";
import Anchor from "@/components/general/Anchor/Anchor";

import styles from './CardCTA.module.css';

type CardCTAProps = CardCTAType & {
  className?: string;
}

export const CardCTA: React.FC<CardCTAProps> = ({ className, content, link, image }) => {
  return (
    <Card className={clsx('bg-gradient-to-tr from-blue-700 to-blue-500 flex min-h-[400px]', className)}>
      <div className="flex-1 hidden md:block">
        <div className="p-4 w-full h-full">
          <div className="h-full w-full bg-center bg-no-repeat bg-contain" style={{ backgroundImage: `url(${getContentfulImageSrc(image)})` }} />
        </div>
      </div>
      <div className="flex-1 flex flex-center">
        <StylishBox className="px-8 py-16" effects={[
          { top: -10, blur: true, filled: true },
          { top: 30, right: 20, blur: true, filled: true },
          { bottom: 30, right: '30%', blur: true, filled: false },
          { bottom: 30, right: '30%', blur: true, filled: true },
        ]}>
          <ContentfulDisplay className={styles.cardCTAContent} document={content} />
          <Link className="btn btn-white btn-lg" href={link.url}>
            {link.label}
          </Link>
        </StylishBox>
      </div>
    </Card>
  );
};