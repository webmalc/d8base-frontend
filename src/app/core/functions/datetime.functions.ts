// TODO use date-fns for datetime formatting/transforming

import { getDaysInMonth } from 'date-fns';

export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}

export function addDays(date: Date, days: number): Date {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days); // getDate() increments month if necessary
  return newDate;
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

export function calculateAge(birthday: string): number {
  const ageDifMs = Date.now() - new Date(birthday).getTime();
  const ageDate = new Date(ageDifMs);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

/**
 * returns first day of the month in the YYYY-MM-DD format
 */
export function getMonthFirstDay(month: number, year: number): string {
  const date = new Date(year, month - 1);
  const monthStr = `0${date.getMonth() + 1}`.slice(-2);
  return `${date.getFullYear()}-${monthStr}-01`;
}

/**
 * returns last day of the month in the YYYY-MM-DD format
 */
export function getMonthLastDay(month: number, year: number): string {
  const date = new Date(year, month - 1);
  const monthStr = `0${date.getMonth() + 1}`.slice(-2);
  const dayStr = `0${getDaysInMonth(date)}`.slice(-2);
  return `${date.getFullYear()}-${monthStr}-${dayStr}`;
}

function getMonthNumberFormatted(date: Date): string {
  const month = date.getMonth() + 1;
  return padWithZero(month);
}

function padWithZero(value: number, size: number = 2): string {
  return value.toString().padStart(size, '0');
}
