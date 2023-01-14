import React from "react";
import { documentToReactComponents, Options } from "@contentful/rich-text-react-renderer";
import { Document, INLINES } from "@contentful/rich-text-types";
import clsx from "clsx";

import Anchor from "@/components/general/Anchor/Anchor";

export type ContentfulDisplayProps = {
  className?: string,
  document: Document,
}

const options: Options = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      return (
        <Anchor href={node.data.uri} target={'_blank'}>
          {children}
        </Anchor>
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
