import { ServiceSchedule } from '@app/api/models';

export type ScheduleUnion = Omit<ServiceSchedule, 'service'>;

type DayOrder = Readonly<ScheduleUnion['day_of_week'][]>;

export const MONDAY_ORDER: DayOrder = [0, 1, 2, 3, 4, 5, 6];
export const SUNDAY_ORDER: DayOrder = [6, 0, 1, 2, 3, 4, 5];

export const mondayOrSundayOrder = (isMondayFirstDayOfWeek: boolean): DayOrder =>
  isMondayFirstDayOfWeek ? MONDAY_ORDER : SUNDAY_ORDER;

export const dayOfWeekSorter = (order: DayOrder) => (a: ScheduleUnion, b: ScheduleUnion) =>
  order.indexOf(a.day_of_week) - order.indexOf(b.day_of_week);
