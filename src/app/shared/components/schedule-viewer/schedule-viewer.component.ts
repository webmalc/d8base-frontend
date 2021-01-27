import { Component, Input } from '@angular/core';
import { ProfessionalSchedule } from '@app/api/models';
import * as ScheduleConstants from '@app/core/constants/schedule.constants';

@Component({
  selector: 'app-schedule-viewer',
  templateUrl: './schedule-viewer.component.html',
  styleUrls: ['./schedule-viewer.component.scss'],
})
export class ScheduleViewerComponent {
  private _schedule: ProfessionalSchedule[];

  public get schedule(): ProfessionalSchedule[] {
    return this._schedule;
  }

  @Input()
  public set schedule(schedule: ProfessionalSchedule[]) {
    this._schedule = schedule.filter(x => x.is_enabled);
  }

  public getDayName(index: number): string {
    return ScheduleConstants.defaultWeek[index];
  }
}
