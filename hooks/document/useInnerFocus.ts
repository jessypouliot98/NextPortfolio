import React, {useEffect, useState} from "react";

const getFocusId = (e: FocusEvent) => {
  const target =  (e.target as { id?: string, href?: string });
  return target.id || target.href || null;
};

export const useInnerFocus = (elementRef: React.RefObject<HTMLElement>) => {
  const [focus, setFocus] = useState<string | null>(null);
  const isFocused = focus !== null;

  useEffect(() => {
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

    elementRef.current?.addEventListener('focusin', handleFocusIn);
    elementRef.current?.addEventListener('focusout', handleFocusOut);

    return () => {
      elementRef.current?.removeEventListener('focusin', handleFocusIn);
      elementRef.current?.removeEventListener('focusout', handleFocusOut);
    }
  }, [elementRef.current]);

  return {
    isFocused,
  }
}
