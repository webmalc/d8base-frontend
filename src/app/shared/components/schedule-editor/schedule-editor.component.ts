import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as ScheduleConstants from '@app/core/constants/schedule.constants';
import { AbstractSchedule } from '@app/core/models/abstract-schedule';
import { NgDestroyService } from '@app/core/services';
import { PopoverController } from '@ionic/angular';
import { takeUntil } from 'rxjs/operators';
import { DaySelectorComponent } from './day-selector/day-selector.component';
import { ScheduleEditorFormFields } from './schedule-editor-form-fields.enum';
import { ScheduleEditorFormService } from './schedule-editor-form.service';

function normalizeTimeFormat(time: string | null): string {
  // convert "HH:MM:SS" to "HH:MM"
  return time?.substr(0, 5);
}

function normalizeScheduleFormat(schedule: AbstractSchedule): AbstractSchedule {
  return {
    ...schedule,
    start_time: normalizeTimeFormat(schedule.start_time),
    end_time: normalizeTimeFormat(schedule.end_time),
  };
}

@Component({
  selector: 'app-schedule-editor',
  templateUrl: './schedule-editor.component.html',
  styleUrls: ['./schedule-editor.component.scss'],
  providers: [
    ScheduleEditorFormService,
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

  public formFields = ScheduleEditorFormFields;

  private onChange: (value: AbstractSchedule[]) => void;
  private onTouched: () => void;

  constructor(
    public readonly formService: ScheduleEditorFormService,
    private readonly popoverController: PopoverController,
    private readonly ngDestroy$: NgDestroyService,
  ) {
    this.subOnValueChanges();
  }

  @Input()
  public set schedule(schedule: AbstractSchedule[]) {
    // TODO remove Input(), use only writeValue()
    const initialValue = schedule ?? ScheduleConstants.defaultSchedule;
    this.formService.fillTimeTable(initialValue.map(normalizeScheduleFormat));
  }

  public onStartTimeChange(event: CustomEvent, index: number): void {
    if (this.formService.isControlValid(this.formFields.StartTime, index)) {
      this.formService.updateStartTime((event.detail as any).value, index);
    }
    this.formService.checkOverlapValidity(index);
  }

  public onEndTimeChange(event: CustomEvent, index: number): void {
    if (this.formService.isControlValid(this.formFields.EndTime, index)) {
      this.formService.updateEndTime((event.detail as any).value, index);
    }
    this.formService.checkOverlapValidity(index);
  }

  public async showDaySelector(): Promise<void> {
    const popover = await this.popoverController.create({
      component: DaySelectorComponent,
      translucent: true,
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();

    if (data !== undefined) {
      this.formService.pushNewDay(data);
    }
  }

  public deleteDay(index: number): void {
    this.formService.deleteDay(index);
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

  private subOnValueChanges() {
    this.formService.valueChanges.pipe(
      takeUntil(this.ngDestroy$),
    ).subscribe(timetable => {
      if (this.onChange) {
        this.onChange(timetable);
      }
    });
  }
}
