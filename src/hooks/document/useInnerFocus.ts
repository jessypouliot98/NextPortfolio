import React, { useEffect, useState } from "react";

const getFocusId = (e: FocusEvent) => {
  const target =  (e.target as { id?: string, href?: string });
  return target.id || target.href || null;
};

export const useInnerFocus = (elementRef: React.RefObject<HTMLElement>) => {
  const [focus, setFocus] = useState<string | null>(null);
  const isFocused = focus !== null;

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const handleFocusIn = (e: FocusEvent) => {
      setFocus(getFocusId(e));
    };
    const handleFocusOut = (e: FocusEvent) => {
      setFocus((prevFocus) => {
        const focusID = getFocusId(e);

        if (prevFocus === focusID) {
          return null;
        }

        return prevFocus;
      });
    };

    element.addEventListener('focusin', handleFocusIn);
    element.addEventListener('focusout', handleFocusOut);

    return () => {
      element.removeEventListener('focusin', handleFocusIn);
      element.removeEventListener('focusout', handleFocusOut);
    };
  }, [elementRef.current]);

  return {
    isFocused,
  };
};
