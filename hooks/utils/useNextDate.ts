import { useMemo } from 'react';
import { useTranslation } from 'next-i18next';

import { NextDate } from '@/utils/NextDate';

export const useNextDate = () => {
  const { i18n } = useTranslation();

  return useMemo(() => {
    return NextDate;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n]);
};