import React from "react";
import ReactMarkdown from 'react-markdown';

import { StylishCode } from "@/components/general";

import styles from './Markdown.module.css';

export type MarkdownProps = {
  markdown: string,
}

export const Markdown: React.FC<MarkdownProps> = ({ markdown }) => {
  return (
    <ReactMarkdown
      className={styles.wrapper}
      components={{
        pre: ({ children }) => <>{children}</>,
        code: (props) => {
          const properties: Record<string, any> = props.node.properties || {};
          const language = properties?.className?.[0].replace(/^language-/, '');
          
          
          return (
            <StylishCode language={language}>
              {props.children as string[]}
            </StylishCode>
          );
        }
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};