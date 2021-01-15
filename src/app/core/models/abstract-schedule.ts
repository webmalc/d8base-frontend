export class AbstractSchedule {
  /* eslint-disable @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match */
  public id: number;
  public day_of_week: number;
  public start_time: string | null;
  public end_time: string | null;
  public is_enabled: boolean;
}
