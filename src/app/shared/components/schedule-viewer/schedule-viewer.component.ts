import { Component, Input } from '@angular/core';
import { AbstractSchedule } from '@app/core/models/abstract-schedule';
import * as ScheduleConstants from '@app/shared/components/schedule-editor/schedule.constants';

@Component({
    selector: 'app-schedule-viewer',
    templateUrl: './schedule-viewer.component.html',
    styleUrls: ['./schedule-viewer.component.scss'],
})
export class ScheduleViewerComponent {
    private _schedule: AbstractSchedule[];

    public get schedule(): AbstractSchedule[] {
        return this._schedule;
    }

    @Input()
    public set schedule(schedule: AbstractSchedule[]) {
        this._schedule = schedule.filter(x => x.is_enabled);
    }

    public getDayName(index: number): string {
        return ScheduleConstants.defaultWeek[index];
    }
}
