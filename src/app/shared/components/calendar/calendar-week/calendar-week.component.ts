import { Component } from '@angular/core';
import { UserSettings } from '@app/api/models';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-calendar-week',
  templateUrl: './calendar-week.component.html',
  styleUrls: ['./calendar-week.component.scss'],
})
export class CalendarWeekComponent {
  public isMonStart: Observable<boolean>;

  @Select(CurrentUserSelectors.settings)
  public userSettings$: Observable<UserSettings>;

  constructor() {
    this.isMonStart = this.userSettings$.pipe(map(x => x.is_monday_start_of_a_week));
  }

  public getWeek(isMonStart: boolean): string[] {
    return isMonStart
      ? ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
      : ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  }
}
