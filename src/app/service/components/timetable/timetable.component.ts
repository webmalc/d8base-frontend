import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ServicePublishStepSevenTimetableFormFields} from '@app/service/enums/service-publish-step-seven-timetable-form-fields';
import {ServicePublishStepSevenTimetableFormService} from '@app/service/forms/service-publish-step-seven-timetable-form.service';
import {ServiceTimetableInterface} from '@app/service/interfaces/service-timetable-interface';
import {ServicePublishService} from '@app/service/services/service-publish.service';
import {Reinitable} from '@app/shared/abstract/reinitable';

@Component({
    selector: 'app-timetable',
    templateUrl: './timetable.component.html',
    styleUrls: ['./timetable.component.scss'],
})
export class TimetableComponent extends Reinitable implements OnInit {

    public formFields = ServicePublishStepSevenTimetableFormFields;
    private readonly STEP = 6;

    constructor(
        public servicePublish: ServicePublishService,
        private location: Location,
        public formService: ServicePublishStepSevenTimetableFormService
    ) {
        super();
    }

    public ngOnInit(): void {
        if (this.servicePublish.issetStepPartialData(this.STEP, ServicePublishStepSevenTimetableFormFields.Timetable)) {
            this.formService.createForm(
                this.servicePublish.getPartialStepData<ServiceTimetableInterface>(
                    this.STEP,
                    ServicePublishStepSevenTimetableFormFields.Timetable
                )
            );
        } else {
            this.formService.createForm();
        }
    }

    public submitForm(): void {
        this.servicePublish.assignStepData(
            this.STEP,
            {[ServicePublishStepSevenTimetableFormFields.Timetable]: this.formService.form.getRawValue()}
        );
        this.location.back();
    }
}
