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

export function setDayEndTime(date: Date): Date {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
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

export function getLocalDateTimeString(date: Date): string {
  if (!date) {
    return null;
  }

  const YYYY = date.getFullYear();
  const MM = getMonthNumberFormatted(date);
  const DD = padWithZero(date.getDate());
  const HH = padWithZero(date.getHours());
  const mm = padWithZero(date.getMinutes());
  const ss = padWithZero(date.getSeconds());

  // 'YYYY-MM-DDTHH:mm:ss'
  return `${YYYY}-${MM}-${DD}T${HH}:${mm}:${ss}`;
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

export function fromDatetime(datetime: string): { date: string; time: string } {
  return datetime
    ? {
        date: datetime.slice(0, 10),
        time: datetime.slice(11, 16),
      }
    : { date: null, time: null };
}

/**
 * make 'from' start of the day and 'to' end of the day
 * don't allow 'from' being in the past
 */
export function alignTimeInterval(fromStr: string, toStr: string): { startDatetime: string; endDatetime: string } {
  const from = stripTime(new Date(fromStr));
  const to = setDayEndTime(new Date(toStr));
  const current = addMinutes(new Date(), 1);
  const startDatetime = fromStr ? getLocalDateTimeString(from > current ? from : current) : null;
  const endDatetime = toStr ? getLocalDateTimeString(to) : null;
  return { startDatetime, endDatetime };
}

function getMonthNumberFormatted(date: Date): string {
  const month = date.getMonth() + 1;
  return padWithZero(month);
}

function padWithZero(value: number, size: number = 2): string {
  return value.toString().padStart(size, '0');
}
