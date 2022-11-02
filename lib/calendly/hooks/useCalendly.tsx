import { useEffect } from 'react';
import { useCallback } from 'react';
import { handleClientScriptLoad } from "next/script";

import { isClient } from '@/utils/platform';

export const useCalendly = (calendly: string) => {
  const stylesheet = <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />;

  useEffect(() => {
    if (isClient()) {
      handleClientScriptLoad({ id: 'calendly', src: 'https://assets.calendly.com/assets/external/widget.js' });
    }
  }, []);

  const handleInitPopupWidget = useCallback(() => {
    if (isClient()) {
      (window as any).Calendly?.initPopupWidget({ url: `https://calendly.com/${calendly}` });
    }
  }, [calendly]);

  return { stylesheet, handleInitPopupWidget };
};