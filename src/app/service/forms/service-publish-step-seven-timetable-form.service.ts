import { Injectable } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Injectable()
export class ServicePublishStepSevenTimetableFormService {

    public form: FormGroup;
    private defaultWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

    constructor(private formBuilder: FormBuilder) {
    }

    public createForm(): void {
        this.form = this.formBuilder.group({
            timetable: this.formBuilder.array([])
        });
        this.fillDefaultTimeTable();

        return;
    }

    get controls(): FormGroup[] {
        return (this.form.controls.timetable as FormArray).controls as FormGroup[];
    }

    public isSubmitDisabled(): boolean {
        return !(this.form.valid && this.form.dirty);
    }

    public fillDefaultTimeTable(): void {
        this.defaultWeek.forEach(dayCode =>
            (this.form.get('timetable') as FormArray).push(
                this.formBuilder.group({
                    day: [dayCode],
                    startTime: [null],
                    endTime: [null],
                    isEnabled: [false]
                }, {validators: [this.startTimeValidator, this.endTimeValidator]})
            )
        );
    }

    private startTimeValidator(group: FormGroup): any {
        if (group.get('isEnabled').value && !group.get('startTime').value) {
            group.get('startTime').setErrors({timeError: true});
        } else {
            group.get('startTime').setErrors(null);
        }
    }

    private endTimeValidator(group: FormGroup): any {
        if (group.get('isEnabled').value && !group.get('endTime').value) {
            group.get('endTime').setErrors({timeError: true});
        } else {
            group.get('endTime').setErrors(null);
        }
    }
}
