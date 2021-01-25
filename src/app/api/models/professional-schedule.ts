/* eslint-disable */
export interface ProfessionalSchedule {
  created?: string;
  created_by?: number;
  day_of_week: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  end_time?: string;
  get_day_of_week_display?: string;
  id?: number;
  is_enabled?: boolean;
  modified?: string;
  modified_by?: number;
  professional: number;
  start_time?: string;
}
