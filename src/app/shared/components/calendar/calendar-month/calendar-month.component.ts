import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarDateInterface } from '@app/core/interfaces/calendar-date-interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.scss'],
})
export class CalendarMonthComponent {
  @Input() public month: CalendarDateInterface[];
  @Input() public isMonStart: Observable<boolean>;
  @Output() public selectedDate: EventEmitter<Date> = new EventEmitter<Date>();

  public getMonthTransKey(): number {
    return this.month[0].date.getMonth();
  }

  public getYear(): string {
    return this.month[0].date.getFullYear().toString();
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
