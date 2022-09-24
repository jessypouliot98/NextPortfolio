import React from "react";
import clsx from "clsx";

type ResponsiveColumn = Partial<Record<'default' | 'sm' | 'md' | 'lg' | 'xl', number>>
type Column = number | ResponsiveColumn;

export type FlexGridProps = {
  className?: string,
  children: React.ReactElement[],
  columns?: Column,
}

// Todo Refactor with recursion & templating. Use tailwind config to force these always compiled to fix undefined issue
const getColumnStyle = (columns: Column) => {
  const col: ResponsiveColumn = typeof columns === 'object' ? columns : {
    default: columns,
  };

  return Object.entries(col).reduce<string>((styleBuilder, [type, nbCols]) => {
    const size = `max-w-1-${nbCols}`;

    return `${styleBuilder} ${type === 'default' ? size : `${type}:${size}`}`;
  }, 'w-full');
};

export const FlexGrid: React.FC<FlexGridProps> = ({ children: gridItems, className, columns = 2 }) => {
  return (
    <div className={className}>
      <div className={'-m-2 flex flex-wrap'}>
        {gridItems.map((gridItem, i) => {
          return (
            <div key={gridItem.key || i} className={clsx('p-2', getColumnStyle(columns))}>
              {gridItem}
            </div>
          );
        })}
      </div>
    </div>
  );
};
