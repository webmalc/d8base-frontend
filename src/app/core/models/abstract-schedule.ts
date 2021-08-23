export class AbstractSchedule {
  public id?: number;
  public day_of_week: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  public start_time?: string;
  public end_time?: string;
  public is_enabled?: boolean;
}
