import { useTranslation } from "next-i18next";
import clsx from "clsx";

import { getMonthYear } from "@/utils/date";

export type DateRangeProps = {
  className?: string,
  startDate?: string,
  endDate?: string,
}

export const DateRange: React.FC<DateRangeProps> = ({ className, startDate, endDate }) => {
  const { t } = useTranslation();

  if (!startDate) {
    return null;
  }

  return (
    <h4 className={clsx(className)}>
      <span>{getMonthYear(new Date(startDate), t)}</span>
      <span>{' - '}</span>
      {endDate ? (
        <span>{getMonthYear(new Date(endDate), t)}</span>
      ) : (
        <span>{t('common:date.present')}</span>
      )}
    </h4>
  );
};