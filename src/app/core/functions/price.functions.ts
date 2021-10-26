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
