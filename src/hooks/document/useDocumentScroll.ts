import { useEffect, useState } from "react";

export enum ScrollDir {
  up = 0,
  down = 1,
}

export const useDocumentScroll = (offset?: { y?: number }) => {
  const { y: offsetY = 0 } = offset || {};
  const [scrollData, setScrollData] = useState({ dir: ScrollDir.up, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollData((prevState) => {
        const nextDir = prevState.y > window.scrollY ? ScrollDir.up : ScrollDir.down;

        if (nextDir === ScrollDir.down && Math.abs(prevState.y - window.scrollY) < offsetY) {
          return prevState;
        }

        return {
          dir: nextDir,
          y: window.scrollY,
        };
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return scrollData;
};
