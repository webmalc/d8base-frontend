import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserSettings } from '@app/api/models/user-settings';
import { CalendarDateInterface } from '@app/core/interfaces/calendar-date-interface';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.scss'],
})
export class CalendarMonthComponent {
  @Input()
  public month: CalendarDateInterface[] = [];

  @Output()
  public selectedDate: EventEmitter<Date> = new EventEmitter<Date>();

  @Select(CurrentUserSelectors.settings)
  public userSettings$: Observable<UserSettings>;

  public isMonStart: Observable<boolean>;

  constructor() {
    this.isMonStart = this.userSettings$.pipe(map(settings => settings.is_monday_start_of_a_week));
  }

  public getMonthTransKey(): number {
    return this.month[0]?.date.getMonth();
  }

  public getYear(): string {
    return this.month[0]?.date.getFullYear().toString();
  }

  public getDay(day: number, isMonStart: boolean): number {
    if (isMonStart) {
      if (day === 0) {
        return 7;
      }
      return day;
    }
    return day + 1;
  }

  public select(day: CalendarDateInterface): void {
    if (day.isAvailable) {
      this.selectedDate.emit(day.date);
    }
  }
}
