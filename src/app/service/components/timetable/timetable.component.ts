import {Location} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {ServicePublishStepSevenTimetableFormService} from '@app/service/forms/service-publish-step-seven-timetable-form.service';
import {ServicePublishService} from '@app/service/services/service-publish.service';

@Component({
    selector: 'app-timetable',
    templateUrl: './timetable.component.html',
    styleUrls: ['./timetable.component.scss'],
})
export class TimetableComponent implements OnInit {

    constructor(
        public servicePublish: ServicePublishService,
        private location: Location,
        public formService: ServicePublishStepSevenTimetableFormService
    ) { }

    public ngOnInit(): void {
        this.formService.createForm();
        console.log(this.formService.controls);
    }

    public submitForm(): void {
        console.log(this.formService.form.getRawValue());
    }
}
