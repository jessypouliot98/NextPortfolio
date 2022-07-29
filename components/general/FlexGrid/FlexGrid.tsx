import React from "react";

export type FlexGridProps = {
  className?: string,
  children: React.ReactElement[],
}

export const FlexGrid: React.FC<FlexGridProps> = ({ children: gridItems, className }) => {
  return (
    <div className={className}>
      <div className={'-m-2 flex flex-wrap'}>
        {gridItems.map((gridItem, i) => {
          return (
            <div key={gridItem.key || i} className={'p-2 w-full max-w-full sm:max-w-[50%] lg:max-w-[33.33%]'}>
              {gridItem}
            </div>
          );
        })}
      </div>
    </div>
  );
};
