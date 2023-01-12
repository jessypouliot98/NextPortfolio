import { useTranslation } from "next-i18next";
import clsx from "clsx";

import { useNextDate } from "@/hooks/utils";

export type DateRangeProps = {
  className?: string,
  startDate?: string,
  endDate?: string,
}

export const DateRange: React.FC<DateRangeProps> = ({ className, startDate, endDate }) => {
  const { t } = useTranslation();
  const { getMonthYear } = useNextDate();

  if (!startDate) {
    return null;
  }

  return (
    <h4 className={clsx(className)}>
      <span>{getMonthYear(new Date(startDate))}</span>
      <span>{' - '}</span>
      {endDate ? (
        <span>{getMonthYear(new Date(endDate))}</span>
      ) : (
        <span>{t('common:date.present')}</span>
      )}
    </h4>
  );
};