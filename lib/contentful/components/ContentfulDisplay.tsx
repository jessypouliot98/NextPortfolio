import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import {Document} from "@contentful/rich-text-types";
import React from "react";
import styles from './Contentful.module.css'
import clsx from "clsx";

export type ContentfulDisplayProps = {
  className?: string,
  document: Document,
}

export const ContentfulDisplay: React.FC<ContentfulDisplayProps> = ({ className, document: contentfulDocument}) => {
  return (
    <div className={clsx(styles.wrapper, className)}>
      {documentToReactComponents(contentfulDocument)}
    </div>
  )
}
