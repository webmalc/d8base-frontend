import { Component, Input, OnInit } from '@angular/core';
import { CalendarDateInterface } from '@app/core/interfaces/calendar-date-interface';
import { CalendarGeneratorService } from '@app/core/services/calendar-generator.service';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

const MONTHS_NUMBER = 3;

@Component({
  selector: 'app-date-picker-popover',
  templateUrl: './date-picker-popover.component.html',
  styleUrls: ['./date-picker-popover.component.scss'],
})
export class DatePickerPopoverComponent implements OnInit {
  @Input()
  public professionalId: number;

  @Input()
  public serviceId: number;

  @Input()
  public selectedDate: Date;

  public months$: Observable<CalendarDateInterface[][]>;

  constructor(
    private readonly modalController: ModalController,
    private readonly calendarGenerator: CalendarGeneratorService,
  ) {}

  public ngOnInit(): void {
    if (!this.professionalId || !this.serviceId) {
      console.error("entity ids weren't provided", this.professionalId, this.serviceId);
      return;
    }
    this.months$ = this.calendarGenerator.generate(
      new Date(),
      MONTHS_NUMBER,
      `${this.professionalId}`,
      `${this.serviceId}`,
    );
  }

  public async pickDate(date: Date): Promise<void> {
    this.selectedDate = date;
  }

  public async confirm(): Promise<void> {
    await this.modalController.dismiss(this.selectedDate);
  }
}
