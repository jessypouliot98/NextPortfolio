import React from "react";
import ReactMarkdown from 'react-markdown';

import { FocusableImage, StylishCode } from "@/components/general";

const lineNumberStyle = {
  color: 'rgba(255, 255, 255, 0.4)',
  minWidth: '2.2em',
  padding: '0 0.5em',
  marginRight: '0.5em',
  borderRight: '1px solid rgba(255, 255, 255, 0.2)',
};

export type MarkdownProps = {
  markdown: string,
}

export const Markdown: React.FC<MarkdownProps> = ({ markdown }) => {
  return (
    <ReactMarkdown
      className={'content'}
      components={{
        pre: ({ children }) => <>{children}</>,
        code: (props) => {
          const properties: Record<string, any> = props.node.properties || {};
          const language = properties?.className?.[0].replace(/^language-/, '');
          
          return (
            <StylishCode className="mb-6" language={language} showLineNumbers={true} lineNumberStyle={lineNumberStyle}>
              {props.children as string[]}
            </StylishCode>
          );
        },
        img: (props) => {
          return (
            <FocusableImage src={props.src as string} alt={props.alt || ''} />
          );
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};