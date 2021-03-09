// TODO use moment.js or date-fns for datetime formatting/transforming

export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}

export function addDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days); // getDate() increments month if necessary
    return newDate;
}

export function getMilliseconds(value: { minutes: number }): number {
  const { minutes } = value;
  return minutes * 60000;
}

export function stripTime(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function getCurrentDay(): Date {
  return stripTime(new Date());
}

export function getLocalDateString(date: Date | string): string {
  if (!date) {
    return null;
  }

  if (typeof date === 'string') {
    date = new Date(date);
  }

  return `${date.getFullYear()}-${getMonthNumberFormatted(date)}-${date.getDate()}`;
}

export function getMonthDateString(date: Date | string): string {
  if (!date) {
    return null;
  }

  if (typeof date === 'string') {
    date = new Date(date);
  }

  return `${date.getFullYear()}-${getMonthNumberFormatted(date)}`;
}

function getMonthNumberFormatted(date: Date): string {
  const month = date.getMonth() + 1;
  return `00${month}`.slice(-2);
}
