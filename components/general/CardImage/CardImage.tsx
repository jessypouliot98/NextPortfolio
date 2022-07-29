import React from "react";
import {Card, CardProps} from "@/components/general";
import clsx from "clsx";

export type CardImageProps = CardProps & {
  containerClassName?: string,
  backgroundImage: string,
}

export const CardImage: React.FC<CardImageProps> = (props) => {
  const { children, className, containerClassName, backgroundImage, ...cardProps } = props;

  const baseImageClass = clsx(
    'absolute top-0 right-0 bottom-0 left-0',
    'bg-cover bg-center',
    'transition duration-300 transform',
  );
  const baseImageStyle = { backgroundImage: `url(${backgroundImage})`};

  return (
    <Card
      {...cardProps}
      className={clsx(
        'relative',
        containerClassName,
      )}
    >

      <>
        <div
          className={clsx(
            baseImageClass,
          )}
          style={baseImageStyle}
        />
        <div
          className={clsx(
            baseImageClass,
            'filter blur-md saturate-50 dark:saturate-0 opacity-100',
            'group-hover:opacity-0',
            'bg-blue-800 bg-blend-overlay',
            'scale-125'
          )}
          style={baseImageStyle}
        />
      </>

      <div className={clsx(
        'absolute top-0 right-0 bottom-0 left-0 bg-cover',
        className,
      )}>
        {children}
      </div>

    </Card>
  )
}
