import * as DateFns from 'date-fns';
import { enCA, frCA } from 'date-fns/locale';
import i18next from "i18next";

const getDateLocale = () => {
  const lng = i18next?.language || '';
  
  if (/fr/i.test(lng)) {
    return frCA;
  }

  return enCA;
};

export namespace NextDate {
  export const getMonth = (date: Date) => {
    return DateFns.format(date, 'MMMM', { locale: getDateLocale() });
  };
  
  export const getMonthYear = (date: Date) => {
    return DateFns.format(date, 'MMMM yyyy', { locale: getDateLocale() });
  };

  export const formatFullDate = (date: Date) => {
    return DateFns.format(date, 'PPP', { locale: getDateLocale() });
  };
  
  export const now = () => {
    return new Date();
  };
  
  export const distanceFromNow = (date: Date) => {
    return DateFns.formatDistance(date, now(), {
      addSuffix: true,
      locale: getDateLocale(),
    });
  };

  export const diffFromNowAorB = (date: Date, hoursBreakpoint: number, aCallback: (d: Date) => string, bCallback: (d: Date) => string) => {
    const n = now();
    const diffInHours = DateFns.differenceInHours(date, n);

    if (Math.abs(diffInHours) >= hoursBreakpoint) {
      return bCallback(date);
    }

    return aCallback(date);
  };
}
