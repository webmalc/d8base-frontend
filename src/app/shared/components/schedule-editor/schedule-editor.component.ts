import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfessionalSchedule } from '@app/api/models';
import { AbstractSchedule } from '@app/core/models/abstract-schedule';
import { PopoverController } from '@ionic/angular';
import * as ScheduleConstants from '../../../core/constants/schedule.constants';
import { DaySelectorComponent } from './day-selector/day-selector.component';
import { ScheduleEditorFormFields } from './schedule-editor-form-fields.enum';
import { ScheduleEditorFormService } from './schedule-editor-form.service';

function normalizeTimeFormat(time: string | null): string {
  // convert "HH:MM:SS" to "HH:MM"
  return time?.substr(0, 5);
}

function normalizeScheduleFormat(schedule: ProfessionalSchedule): ProfessionalSchedule {
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
  providers: [ScheduleEditorFormService],
})
export class ScheduleEditorComponent {

  @Input() public disabled: boolean = false;

  @Output() public save = new EventEmitter<AbstractSchedule[]>();

  public formFields = ScheduleEditorFormFields;

  constructor(
    public readonly formService: ScheduleEditorFormService,
    private readonly popoverController: PopoverController,
  ) {
  }

  @Input()
  public set schedule(schedule: ProfessionalSchedule[]) {
    const initialValue = schedule || ScheduleConstants.defaultSchedule;
    this.formService.createForm(initialValue.map(normalizeScheduleFormat));
  }

  public submitForm(): void {
    this.save.emit(this.formService.form.get(this.formFields.Timetable).value);
  }

  public onIsEnabledChange(event: CustomEvent, index: number): void {
    this.formService.updateIsEnabled((event.detail as any).checked, index);
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
}
