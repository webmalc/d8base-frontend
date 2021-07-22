import { ScheduleUnion } from '../models/schedule-union';

export const defaultWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const defaultDay: ScheduleUnion = {
  day_of_week: 0,
  is_enabled: true,
  start_time: '09:00:00',
  end_time: '17:00:00',
  id: null,
};

export const defaultSchedule: ScheduleUnion[] = [
  {
    ...defaultDay,
    day_of_week: 0,
  },
  {
    ...defaultDay,
    day_of_week: 1,
  },
  {
    ...defaultDay,
    day_of_week: 2,
  },
  {
    ...defaultDay,
    day_of_week: 3,
  },
  {
    ...defaultDay,
    day_of_week: 4,
  },
];
