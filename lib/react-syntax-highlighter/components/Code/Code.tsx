import { useMemo } from 'react';
import SyntaxHighlighter, { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { atelierSulphurpoolDark as themeStyle } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import clsx from 'clsx';

export type CodeProps = SyntaxHighlighterProps;

export const Code: React.FC<CodeProps> = ((props) => {
  const content = useMemo(() => {
    if (typeof props.children !== 'string') {
      return props.children;
    }

    return props.children.replace(/(^\s*\n|\n\s*$)/g, '');
  }, [props.children]);

  return (
    <div className={clsx('rounded-lg shadow-lg overflow-hidden')}>
      <SyntaxHighlighter style={{ ...themeStyle, hljs: { ...themeStyle.hljs, background: '#111827' } }} {...props}>
        {content}
      </SyntaxHighlighter>
    </div>
  );
});