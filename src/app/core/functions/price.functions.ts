import { Price } from '@app/api/models/price';

export function getServicePriceStr(price: Price): string {
  const currency = price.price_currency || price.start_price_currency || price.end_price_currency;
  if (price.is_price_fixed && price.price) {
    return `${Math.round(parseInt(price.price, 10))} ${currency}`;
  }

  if (price.start_price) {
    if (price.end_price) {
      return `${Math.round(parseInt(price.start_price, 10))} - ${Math.round(
        parseInt(price.end_price, 10),
      )} ${currency}`;
    }

    return `${Math.round(parseInt(price.start_price, 10))}${currency}`;
  }
  if (price.end_price) {
    return `${Math.round(parseInt(price.end_price, 10))}${currency}`;
  }

  return '-';
}

interface Duration {
  days: number;
  hours: number;
  minutes: number;
}

// duration: number - minutes
export function getServiceDuration(duration: number): Duration {
  const hours = Math.floor(duration / 60);
  if (hours < 1) {
    return {
      minutes: duration,
      days: null,
      hours: null,
    };
  }
  if (hours < 24) {
    return {
      minutes: Math.round(duration - hours * 60),
      days: null,
      hours: hours,
    };
  }

  const days = Math.floor(hours / 24);
  const hoursAfterDays = Math.floor(duration - days * 24);
  const minutesAfterHours = Math.round(duration - days * 24 * 60 - hoursAfterDays * 60);

  return {
    minutes: minutesAfterHours,
    days: days,
    hours: hoursAfterDays,
  };
}
