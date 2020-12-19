export class AbstractSchedule {
    // tslint:disable:variable-name
    public id: number;
    public day_of_week: number;
    public start_time: string | null;
    public end_time: string | null;
    public is_enabled: boolean;
}
