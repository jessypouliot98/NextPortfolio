import React from "react";
import clsx from "clsx";

export enum CardType {
  default = 'default',
  primary = 'primary',
  none = 'none',
}

export type CardProps = {
  className?: string,
  style?: React.CSSProperties,
  type?: CardType,
  children: React.ReactNode,
  "aria-describedby"?: string,
}

export const Card: React.FC<CardProps> = (props) => {
  const { children, className, style, type = CardType.default } = props;

  return (
    <div
      aria-describedby={props['aria-describedby']}
      className={clsx(
        'card',
        type === CardType.default && 'card-default',
        type === CardType.primary && 'card-primary',
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};
