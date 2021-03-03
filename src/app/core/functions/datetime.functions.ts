// TODO use moment.js for datetime formatting

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
