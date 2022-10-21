import { useRef } from 'react';
import { useEffect } from 'react';

export const useMount = (callback: () => void) => {
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) {
      return;
    }

    callback();
    initRef.current = true;
  }, []);
};