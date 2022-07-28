import React from "react";
import clsx from "clsx";

type Effect = {
  top?: number | string,
  right?: number | string,
  bottom?: number | string,
  left?: number | string,
  filled?: boolean,
  blur?: boolean,
};

export type StylishBoxProps = {
  children: React.ReactNode,
  className?: string,
  effects: Effect[],
}

export const StylishBox: React.FC<StylishBoxProps> = ({ children, className, effects }) => {
  return (
    <div className={clsx('relative z-10', className)}>
      <div className={'relative z-20'}>{children}</div>
      <div className={'absolute top-0 right-0 bottom-0 left-0'}>
        <div className={'relative w-full h-full -z-10 pointer-events-none'}>
          {effects.map((effect, i) => {
            const {
              top,
              right,
              bottom,
              left,
              filled = (i + 1) % 2 === 0,
              blur = (i + 1) % 3 === 0,
            } = effect;
            const rotation = (['rotate-12', '-rotate-12', 'rotate-45'] as const)[i % 3];
            const size = (['w-16 h-16', 'w-20 h-20', 'w-24 h-24'] as const)[i % 3];

            return (
              <div
                key={i}
                className={clsx(
                  'absolute transform shadow-lg',
                  filled ? 'bg-blue-500' : 'border-4 border-blue-500',
                  blur && 'filter blur',
                  rotation,
                  size,
                  'rounded-2xl',
                )}
                style={{ top, right, bottom, left }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
