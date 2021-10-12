import { Component, OnInit } from '@angular/core';
import {CalendarGeneratorService} from '@app/core/services/calendar-generator.service';
import {CalendarDateInterface} from '@app/core/interfaces/calendar-date-interface';
import {first, map} from 'rxjs/operators';
import {AuthenticationService} from '@app/core/services';
import {UserSettingsService} from '@app/core/services/facades';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
})
export class CalendarPageComponent implements OnInit {

  public data: CalendarDateInterface[][];
  public isMonStart: Observable<boolean>;

  constructor(
    private readonly gen: CalendarGeneratorService,
    private readonly auth: AuthenticationService,
    private readonly settings: UserSettingsService
  ) {
    this.isMonStart = this.settings.userSettings$.pipe(
      map(data => data.is_monday_start_of_a_week)
    )
  }

  ngOnInit() {
    const start = new Date();
    this.gen.generate(start.getMonth(), start.getFullYear(), 3, "2").pipe(first()).subscribe(
      res => this.data = res
    );
  }

  public handle(date: Date): void {
    this.data.forEach(month => month.forEach(day =>
      day.date.toDateString() === date.toDateString() ? day.selected = !day.selected : day.selected = false));
  }
}
