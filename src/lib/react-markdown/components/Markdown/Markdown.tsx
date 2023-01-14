import React from "react";
import ReactMarkdown from 'react-markdown';

import { FocusableImage, StylishCode } from "@/components/general";
import Anchor from "@/components/general/Anchor/Anchor";

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
      className="content"
      components={{
        pre: ({ node }) => {
          const { properties = {}, children } = node.children?.[0] as any;
          const language = properties?.className?.[0].replace(/^language-/, '') as string || '';
          const code = children.map(({ value }: any) => value) as string[];
           
          return (
            <StylishCode className="mb-6" language={language} showLineNumbers={true} lineNumberStyle={lineNumberStyle}>
              {code}
            </StylishCode>
          );
        },
        a: (props) => {
          return (
            <Anchor href={props.href} target="_blank">{props.children}</Anchor>
          );
        },
        img: (props) => {
          return (
            <FocusableImage src={props.src} alt={props.alt} />
          );
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};