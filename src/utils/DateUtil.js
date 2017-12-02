// @flow

export const convertToSlashFormat = (date: string): string => {
  if (typeof date !== 'string' || date.length !== 8) return date;
  return `${date.slice(0, 4)}/${date.slice(4, 6)}/${date.slice(6, 8)}`;
};

export const convertDateObjToZeroFillDate = (dateObj: any): ?string => {
  if (!!dateObj && dateObj.constructor.name.indexOf('Date') > -1) {
    return (
      dateObj.getFullYear() +
      `0${dateObj.getMonth() + 1}`.slice(-2) +
      `0${dateObj.getDate()}`.slice(-2)
    );
  }
  return null;
};

export const convertTimeToColonFormat = (time: string): string => {
  if (typeof time !== 'string' || time.length !== 4) return time;
  return `${time.slice(0, 2)}:${time.slice(2, 4)}`;
};
