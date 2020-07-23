import { Injectable } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Injectable()
export class ServicePublishStepSevenTimetableFormService {

    public form: FormGroup;
    private defaultWeek = ['mon', ];

    constructor(private formBuilder: FormBuilder) {
    }

    public createForm(): void {
        this.form = this.formBuilder.group({
            timetable: this.formBuilder.array([])
        });
    }

    public isSubmitDisabled(): boolean {
        return !(this.form.valid && this.form.dirty);
    }

    public fillDefaultTimeTable(): void {
        (this.form.get('timetable') as FormArray).push(
            this.formBuilder.group({
                day: ['mon'],
                startTime: [''],
                endTime: ['']
            })
        );
    }
}
