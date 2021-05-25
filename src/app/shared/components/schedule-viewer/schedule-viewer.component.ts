import { Component, Input } from '@angular/core';
import * as ScheduleConstants from '@app/core/constants/schedule.constants';
import { dayOfWeekSorter, mondayOrSundayOrder, ScheduleUnion } from '@app/core/models/schedule-union';
import { NgDestroyService } from '@app/core/services';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-schedule-viewer',
  templateUrl: './schedule-viewer.component.html',
  styleUrls: ['./schedule-viewer.component.scss'],
  providers: [NgDestroyService],
})
export class ScheduleViewerComponent {
  @Select(CurrentUserSelectors.isMondayFirstDayOfWeek)
  public isMondayFirstDayOfWeek$: Observable<boolean>;

  private _schedule: ScheduleUnion[];

  public get schedule(): ScheduleUnion[] {
    return this._schedule;
  }

  @Input()
  public set schedule(schedule: ScheduleUnion[]) {
    this.isMondayFirstDayOfWeek$.pipe(takeUntil(this.destroy$)).subscribe(isMondayFirstDayOfWeek => {
      this._schedule = schedule.filter(x => x.is_enabled).sort(dayOfWeekSorter(mondayOrSundayOrder(isMondayFirstDayOfWeek)));
    });
  }

  constructor(private readonly destroy$: NgDestroyService) {}

  public getDayName(index: number): string {
    return ScheduleConstants.defaultWeek[index];
  }
}
