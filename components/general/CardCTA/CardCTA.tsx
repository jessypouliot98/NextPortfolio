import React from "react";
import { CardCTA as CardCTAProps, ContentfulDisplay, getContentfulImageSrc } from "@/lib/contentful";

import Link from "@/components/general/Link/Link";

import styles from './CardCTA.module.css';

export const CardCTA: React.FC<CardCTAProps> = ({ content, link, image }) => {
  return (
    <div className="card card-primary flex min-h-[400px]">
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