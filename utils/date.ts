import { TFunction } from "i18next";

const monthKeys = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export const getMonth = (date: Date, t: TFunction) => {
  const monthKey = monthKeys[date.getMonth()];

  return t(`common:date.months.${monthKey}`);
};

export const getMonthYear = (date: Date, t: TFunction) => {
  return `${getMonth(date, t)} ${date.getFullYear()}`;
};
