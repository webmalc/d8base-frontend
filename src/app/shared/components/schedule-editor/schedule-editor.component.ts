import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormArray, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as ScheduleConstants from '@app/core/constants/schedule.constants';
import { AbstractSchedule } from '@app/core/models/abstract-schedule';
import { NgDestroyService } from '@app/core/services';
import { PopoverController } from '@ionic/angular';
import { takeUntil } from 'rxjs/operators';
import { DaySelectorComponent } from './day-selector/day-selector.component';
import { createFormGroup, normalizeScheduleFormat } from './functions';
import { ScheduleEditorFormFields } from './schedule-editor-form-fields.enum';

const DEFAULT_START_TIME = '09:00';
const DEFAULT_END_TIME = '18:00';

@Component({
  selector: 'app-schedule-editor',
  templateUrl: './schedule-editor.component.html',
  styleUrls: ['./schedule-editor.component.scss'],
  providers: [
    NgDestroyService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScheduleEditorComponent),
      multi: true,
    },
  ],
})
export class ScheduleEditorComponent implements ControlValueAccessor {
  // TODO remove Input(), use setDisabledState()
  @Input() public disabled: boolean = false;

  public timetable: FormArray;
  public formFields = ScheduleEditorFormFields;

  private onChange: (value: AbstractSchedule[]) => void;
  private onTouched: () => void;

  constructor(private readonly popoverController: PopoverController, private readonly ngDestroy$: NgDestroyService) {
    this.initializeTimetable();
  }

  @Input()
  public set schedule(schedule: AbstractSchedule[]) {
    // TODO remove Input(), use only writeValue()
    const initialValue = schedule ?? ScheduleConstants.defaultSchedule;
    this.fillFromSchedules(initialValue.map(normalizeScheduleFormat));
  }

  public get controls(): FormGroup[] {
    return this.timetable.controls as FormGroup[];
  }

  public getDayByIndex(i: number): string {
    return ScheduleConstants.defaultWeek[i];
  }

  public async showDaySelector(): Promise<void> {
    const popover = await this.popoverController.create({
      component: DaySelectorComponent,
      translucent: true,
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();

    if (data !== undefined) {
      this.addNewFormGroup(data, DEFAULT_START_TIME, DEFAULT_END_TIME);
    }
  }

  public deleteDay(index: number): void {
    if (this.onTouched) {
      this.onTouched();
    }
    this.timetable.removeAt(index);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public writeValue(value: AbstractSchedule[]): void {
    if (!value) {
      return;
    }
    this.schedule = value;
  }

  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  private initializeTimetable(): void {
    this.timetable = new FormArray([]);
    this.timetable.valueChanges.pipe(takeUntil(this.ngDestroy$)).subscribe((timetable: AbstractSchedule[]) => {
      if (this.onChange) {
        this.onChange(timetable);
      }
    });
  }

  private fillFromSchedules(schedules: AbstractSchedule[]): void {
    this.timetable.clear();
    schedules.forEach(data => this.addNewFormGroup(data.day_of_week, data.start_time, data.end_time));
  }

  private addNewFormGroup(dayCode: number, startTime: string = null, endTime: string = null): void {
    const newFormGroup = createFormGroup({ dayCode, startTime, endTime });
    this.timetable.push(newFormGroup);
  }
}
