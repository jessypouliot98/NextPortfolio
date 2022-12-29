import React from "react";
import clsx from "clsx";
import { CardCTA as CardCTAType, ContentfulDisplay, getContentfulImageSrc } from "@/lib/contentful";

import Link from "@/components/general/Link/Link";

import styles from './CardCTA.module.css';

type CardCTAProps = CardCTAType & {
  className?: string;
}

export const CardCTA: React.FC<CardCTAProps> = ({ className, content, link, image }) => {
  return (
    <div className={clsx('card card-primary flex min-h-[400px]', className)}>
      <div className="flex-1 hidden md:block">
        <div className="p-4 w-full h-full">
          <div className="h-full w-full bg-center bg-no-repeat bg-contain" style={{ backgroundImage: `url(${getContentfulImageSrc(image)})` }} />
        </div>
      </div>
      <div className="flex-1 flex flex-center">
        <div className="px-8 py-16">
          <ContentfulDisplay className={styles.cardCTAContent} document={content} />
          <Link className="btn btn-white btn-lg" href={link.url}>
            {link.label}
          </Link>
        </div>
      </div>
    </div>
  );
};