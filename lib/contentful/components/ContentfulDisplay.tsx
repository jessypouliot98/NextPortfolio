import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import clsx from "clsx";

import styles from './Contentful.module.css';

export type ContentfulDisplayProps = {
  className?: string,
  document: Document,
}

export const ContentfulDisplay: React.FC<ContentfulDisplayProps> = ({ className, document: contentfulDocument }) => {
  return (
    <div className={clsx(styles.wrapper, className)}>
      {documentToReactComponents(contentfulDocument)}
    </div>
  );
};
