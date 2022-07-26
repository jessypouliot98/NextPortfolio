import React from 'react';
import NextLink, { LinkProps as NextLinkProps } from "next/link";

export type LinkProps = React.HTMLProps<HTMLAnchorElement> & NextLinkProps;

const Link: React.FC<LinkProps> = ({ children, ...props }) => {
  const {
    href,
    as,
    replace,
    scroll,
    shallow,
    passHref,
    prefetch,
    locale,
    ...otherProps
  } = props;

  const linkProps = {
    href,
    as,
    replace,
    scroll,
    shallow,
    passHref,
    prefetch,
    locale,
  };

  const anchorProps = {
    href,
    ...otherProps,
  }

  return (
    <NextLink {...linkProps}>
      <a {...anchorProps}>
        {children}
      </a>
    </NextLink>
  )
}

export default Link;
