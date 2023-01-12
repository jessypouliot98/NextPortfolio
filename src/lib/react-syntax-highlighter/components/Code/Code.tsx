import { useMemo } from 'react';
import SyntaxHighlighter, { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { nightOwl as themeStyle } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export type CodeProps = SyntaxHighlighterProps;

export const Code: React.FC<CodeProps> = ((props) => {
  const content = useMemo(() => {
    if (typeof props.children !== 'string') {
      return props.children;
    }

    return props.children.replace(/(^\s*\n|\n\s*$)/g, '');
  }, [props.children]);

  return (
    <SyntaxHighlighter style={{ ...themeStyle, hljs: { ...themeStyle.hljs } }} {...props}>
      {content}
    </SyntaxHighlighter>
  );
});