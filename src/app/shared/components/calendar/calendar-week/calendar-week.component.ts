import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-calendar-week',
  templateUrl: './calendar-week.component.html',
  styleUrls: ['./calendar-week.component.scss'],
})
export class CalendarWeekComponent {

  @Input() public isMonStart: Observable<boolean>;

  public getWeek(isMonStart: boolean): string[] {
    return isMonStart
      ? ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
      : ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  }
}
