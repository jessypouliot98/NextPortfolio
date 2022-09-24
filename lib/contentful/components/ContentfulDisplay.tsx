import React from "react";
import { documentToReactComponents, Options } from "@contentful/rich-text-react-renderer";
import { Document, INLINES } from "@contentful/rich-text-types";
import clsx from "clsx";

import Link from "@/components/general/Link/Link";

export type ContentfulDisplayProps = {
  className?: string,
  document: Document,
}

const options: Options = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      return (
        <Link href={node.data.uri} target={'_blank'}>
          {children}
        </Link>
      );
    }
  }
};

export const ContentfulDisplay: React.FC<ContentfulDisplayProps> = ({ className, document: contentfulDocument }) => {
  return (
    <div className={clsx('content', className)}>
      {documentToReactComponents(contentfulDocument, options)}
    </div>
  );
};
