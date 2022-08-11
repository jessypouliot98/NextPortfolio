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
  const styleBuilder = ['w-full', 'max-w-full'];

  const col: ResponsiveColumn = typeof columns === 'object' ? columns : {
    default: columns,
  };

  switch (col.default) {
    case 3: {
      styleBuilder.push('max-w-[33.33%]');
      break;
    }
    case 2: {
      styleBuilder.push('max-w-[50%]');
      break;
    }
  }

  switch (col.sm) {
    case 3: {
      styleBuilder.push('sm:max-w-[33.33%]');
      break;
    }
    case 2: {
      styleBuilder.push('sm:max-w-[50%]');
      break;
    }
      
  }

  switch (col.md) {
    case 3: {
      styleBuilder.push('md:max-w-[33%]');
      break;
    }
    case 2: {
      styleBuilder.push('md:max-w-[50%]');
      break;
    }
  }

  switch (col.lg) {
    case 3: {
      styleBuilder.push('lg:max-w-[33.33%]');
      break;
    }
    case 2: {
      styleBuilder.push('lg:max-w-[50%]');
      break;
    }
  }

  switch (col.xl) {
    case 3: {
      styleBuilder.push('xl:max-w-[33.33%]');
      break;
    }
    case 2: {
      styleBuilder.push('xl:max-w-[50%]');
      break;
    }
  }

  return styleBuilder.join(' ');
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
