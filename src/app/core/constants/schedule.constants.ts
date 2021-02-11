import { AbstractSchedule } from '@app/core/models/abstract-schedule';

export const defaultWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export const defaultSchedule: AbstractSchedule[] = [
  {
    day_of_week: 0,
    is_enabled: true,
    start_time: '09:00:00',
    end_time: '18:00:00',
    id: null,
  },
  {
    day_of_week: 1,
    is_enabled: true,
    start_time: '09:00:00',
    end_time: '18:00:00',
    id: null,
  },
  {
    day_of_week: 2,
    is_enabled: true,
    start_time: '09:00:00',
    end_time: '18:00:00',
    id: null,
  },
  {
    day_of_week: 3,
    is_enabled: true,
    start_time: '09:00:00',
    end_time: '18:00:00',
    id: null,
  },
  {
    day_of_week: 4,
    is_enabled: true,
    start_time: '09:00:00',
    end_time: '18:00:00',
    id: null,
  },
];
