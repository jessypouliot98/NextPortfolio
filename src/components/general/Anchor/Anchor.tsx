import React from 'react';

export type AnchorProps = React.HTMLProps<HTMLAnchorElement>;

const Anchor: React.FC<AnchorProps> = ({ children, ...props }) => {

  return (
    <a
      rel={props.target === '_blank' ? 'noreferrer noopener' : undefined}
      {...props}
    >
      {children}
    </a>
  );
};

export default Anchor;
