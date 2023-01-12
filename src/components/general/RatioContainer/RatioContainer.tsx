import React from "react";

export type RatioContainerProps = {
  children: React.ReactNode,
  style?: React.CSSProperties,
  className?: string,
  ratio: [number, number],
}

export const RatioContainer: React.FC<RatioContainerProps> = ({ children, className, style, ratio }) => {
  const [w, h] = ratio ;
  
  return (
    <div className={className} style={style}>
      <div className={'relative w-full h-0'} style={{ paddingBottom: `${(h/w) * 100}%` }}>
        <div className={'absolute trbl'}>
          {children}
        </div>
      </div>
    </div>
  );
};
