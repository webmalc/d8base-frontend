import { ProfessionalSchedule } from '@app/api/models';

export const defaultWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export const defaultSchedule: ProfessionalSchedule[] = [
  {
    day_of_week: 0,
    is_enabled: true,
    start_time: '09:00:00',
    end_time: '18:00:00',
    id: null,
    professional: null,
  },
  {
    day_of_week: 1,
    is_enabled: true,
    start_time: '09:00:00',
    end_time: '18:00:00',
    id: null,
    professional: null,
  },
  {
    day_of_week: 2,
    is_enabled: true,
    start_time: '09:00:00',
    end_time: '18:00:00',
    id: null,
    professional: null,
  },
  {
    day_of_week: 3,
    is_enabled: true,
    start_time: '09:00:00',
    end_time: '18:00:00',
    id: null,
    professional: null,
  },
  {
    day_of_week: 4,
    is_enabled: true,
    start_time: '09:00:00',
    end_time: '18:00:00',
    id: null,
    professional: null,
  },
  {
    day_of_week: 5,
    is_enabled: false,
    start_time: null,
    end_time: null,
    id: null,
    professional: null,
  },
  {
    day_of_week: 6,
    is_enabled: false,
    start_time: null,
    end_time: null,
    id: null,
    professional: null,
  },
];
