import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractSchedule} from '@app/core/models/abstract-schedule';
import {PopoverController} from '@ionic/angular';
import {DaySelectorComponent} from './day-selector/day-selector.component';
import {ScheduleEditorFormFields} from './schedule-editor-form-fields.enum';
import {ScheduleEditorFormService} from './schedule-editor-form.service';
import * as ScheduleConstants from './schedule.constants';

@Component({
    selector: 'app-schedule-editor',
    templateUrl: './schedule-editor.component.html',
    styleUrls: ['./schedule-editor.component.scss'],
    providers: [ScheduleEditorFormService]
})
export class ScheduleEditorComponent {

    @Output() public save = new EventEmitter<AbstractSchedule[]>();

    public formFields = ScheduleEditorFormFields;

    constructor(
        public readonly formService: ScheduleEditorFormService,
        private readonly popoverController: PopoverController
    ) {
    }

    @Input()
    public set schedule(schedule: AbstractSchedule[]) {
        const initialValue = schedule || ScheduleConstants.defaultSchedule;
        this.formService.createForm([...initialValue]);
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
    }

    public onEndTimeChange(event: CustomEvent, index: number): void {
        if (this.formService.isControlValid(this.formFields.EndTime, index)) {
            this.formService.updateEndTime((event.detail as any).value, index);
        }
    }

    public async showDaySelector(): Promise<void> {
        const popover = await this.popoverController.create({
            component: DaySelectorComponent,
            translucent: true
        });
        await popover.present();
        const {data} = await popover.onDidDismiss();

        if (data !== undefined) {
            this.formService.pushNewDay(data);
        }
    }

    public deleteDay(index: number): void {
        this.formService.deleteDay(index);
    }

}
