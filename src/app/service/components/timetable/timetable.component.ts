import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {TimetableAddTimePopoverComponent} from '@app/service/components/timetable-add-time-popover/timetable-add-time-popover.component';
import {ServicePublishStepSevenTimetableFormFields} from '@app/service/enums/service-publish-step-seven-timetable-form-fields';
import {ServicePublishStepSevenTimetableFormService} from '@app/service/forms/service-publish-step-seven-timetable-form.service';
import {ServiceSchedule} from '@app/service/models/service-schedule';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {PopoverController} from '@ionic/angular';

@Component({
    selector: 'app-timetable',
    templateUrl: './timetable.component.html',
    styleUrls: ['./timetable.component.scss'],
})
export class TimetableComponent extends Reinitable implements OnInit {

    public formFields = ServicePublishStepSevenTimetableFormFields;
    private readonly STEP = 6;

    constructor(
        public servicePublishDataHolderService: ServicePublishDataHolderService,
        private location: Location,
        public formService: ServicePublishStepSevenTimetableFormService,
        private readonly popoverController: PopoverController
    ) {
        super();
    }

    public ngOnInit(): void {
        if (this.servicePublishDataHolderService.issetStepPartialData(this.STEP, ServicePublishStepSevenTimetableFormFields.Timetable)) {
            this.formService.createForm(
                this.servicePublishDataHolderService.getPartialStepData<ServiceSchedule[]>(
                    this.STEP,
                    ServicePublishStepSevenTimetableFormFields.Timetable
                )
            );
        } else {
            this.formService.createForm();
        }
    }

    public submitForm(): void {
        this.servicePublishDataHolderService.assignStepData(
            this.STEP,
            this.formService.form.getRawValue()
        );
        this.location.back();
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

    public initPopover(): void {
        this.popoverController.create({
            component: TimetableAddTimePopoverComponent,
            translucent: true
        }).then(pop => pop.present().then(
            () => {
                const subscription = TimetableAddTimePopoverComponent.day$.subscribe(
                    (dayCode: number) => {
                        if (null !== dayCode) {
                            this.formService.pushNewDay(dayCode);
                            this.popoverController.dismiss();
                            subscription.unsubscribe();
                        }
                    }
                );
            }
        ));
    }

    public deleteDay(index: number): void {
        this.formService.deleteDay(index);
    }
}
