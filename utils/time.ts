export const MILLISECOND = 1;
export const SECOND = 1000 * MILLISECOND;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export const MS_TO_S = 1 / 1000;

export const getSecondsFromMilliSeconds = (ms: number) => {
  return ms * MS_TO_S;
};