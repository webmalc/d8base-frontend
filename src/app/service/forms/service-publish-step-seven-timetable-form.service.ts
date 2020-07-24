import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ServicePublishStepSevenTimetableFormFields} from '@app/service/enums/service-publish-step-seven-timetable-form-fields';
import {ServiceTimetableInterface} from '@app/service/interfaces/service-timetable-interface';

@Injectable()
export class ServicePublishStepSevenTimetableFormService {

    public form: FormGroup;
    private defaultWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

    constructor(private formBuilder: FormBuilder) {
    }

    public createForm(timetable?: ServiceTimetableInterface): void {
        this.form = this.formBuilder.group({
            timetable: this.formBuilder.array([])
        });
        if (timetable) {
            this.fillTimeTable(timetable);
        } else {
            this.fillDefaultTimeTable();
        }

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
            (this.form.get(ServicePublishStepSevenTimetableFormFields.Timetable) as FormArray).push(
                this.getFormGroup(dayCode)
            )
        );
    }

    public unsetError(i: number): void {
        const endTimeValue = this.controls[i].controls[ServicePublishStepSevenTimetableFormFields.EndTime].value;
        this.controls[i].controls[ServicePublishStepSevenTimetableFormFields.EndTime].reset();
        this.controls[i].controls[ServicePublishStepSevenTimetableFormFields.EndTime].setValue(endTimeValue);
        const startTimeValue = this.controls[i].controls[ServicePublishStepSevenTimetableFormFields.StartTime].value;
        this.controls[i].controls[ServicePublishStepSevenTimetableFormFields.StartTime].reset();
        this.controls[i].controls[ServicePublishStepSevenTimetableFormFields.StartTime].setValue(startTimeValue);
    }

    private fillTimeTable(timetable: ServiceTimetableInterface): void {
        timetable.timetable.forEach(time =>
            (this.form.get(ServicePublishStepSevenTimetableFormFields.Timetable) as FormArray).push(
                this.getFormGroup(time.day, time.startTime, time.endTime, time.isEnabled)
            )
        );
    }

    private getFormGroup(dayCode: string, startTime: string = null, endTime: string = null, isEnabled: boolean = false): FormGroup {
        return this.formBuilder.group({
            [ServicePublishStepSevenTimetableFormFields.Day]: [dayCode],
            [ServicePublishStepSevenTimetableFormFields.StartTime]: [startTime],
            [ServicePublishStepSevenTimetableFormFields.EndTime]: [endTime],
            [ServicePublishStepSevenTimetableFormFields.IsEnabled]: [isEnabled]
        }, {
            validators: [
                this.startTimeValidator,
                this.endTimeValidator,
                this.startTimeFormatValidator,
                this.endTimeFormatValidator,
                this.timeIntervalValidator
            ]
        });
    }

    private timeIntervalValidator(group: FormGroup): any {
        if (!group.get(ServicePublishStepSevenTimetableFormFields.IsEnabled).value) {
            return;
        }
        const startTime = parseInt(
            (group.get(ServicePublishStepSevenTimetableFormFields.StartTime).value as string)?.slice(0, 2) +
            (group.get(ServicePublishStepSevenTimetableFormFields.StartTime).value as string)?.slice(3, 5),
            10
        );
        const endTimeTime = parseInt(
            (group.get(ServicePublishStepSevenTimetableFormFields.EndTime).value as string)?.slice(0, 2) +
            (group.get(ServicePublishStepSevenTimetableFormFields.EndTime).value as string)?.slice(3, 5),
            10
        );
        if (startTime >= endTimeTime) {
            group.get(ServicePublishStepSevenTimetableFormFields.EndTime).setErrors({timeError: true});
        }
    }

    private startTimeFormatValidator(group: FormGroup): any {
        if (group.get(ServicePublishStepSevenTimetableFormFields.IsEnabled).value &&
            ((group.get(ServicePublishStepSevenTimetableFormFields.StartTime).value as string)?.length !== 5 ||
            parseInt((group.get(ServicePublishStepSevenTimetableFormFields.StartTime).value as string)?.slice(0, 1), 10) > 2 ||
            parseInt((group.get(ServicePublishStepSevenTimetableFormFields.StartTime).value as string)?.slice(3, 5), 10) % 15 !== 0)
        ) {
            group.get(ServicePublishStepSevenTimetableFormFields.StartTime).setErrors({timeError: true});
        }
    }

    private endTimeFormatValidator(group: FormGroup): any {
        if (group.get(ServicePublishStepSevenTimetableFormFields.IsEnabled).value &&
            ((group.get(ServicePublishStepSevenTimetableFormFields.EndTime).value as string)?.length !== 5 ||
            parseInt((group.get(ServicePublishStepSevenTimetableFormFields.EndTime).value as string)?.slice(0, 1), 10) > 2 ||
            parseInt((group.get(ServicePublishStepSevenTimetableFormFields.EndTime).value as string)?.slice(3, 5), 10) % 15 !== 0)
        ) {
            group.get(ServicePublishStepSevenTimetableFormFields.EndTime).setErrors({timeError: true});
        }
    }

    private startTimeValidator(group: FormGroup): any {
        if (group.get(ServicePublishStepSevenTimetableFormFields.IsEnabled).value &&
            !group.get(ServicePublishStepSevenTimetableFormFields.StartTime).value) {
            group.get(ServicePublishStepSevenTimetableFormFields.StartTime).setErrors({timeError: true});
        }
    }

    private endTimeValidator(group: FormGroup): any {
        if (group.get(ServicePublishStepSevenTimetableFormFields.IsEnabled).value &&
            !group.get(ServicePublishStepSevenTimetableFormFields.EndTime).value) {
            group.get(ServicePublishStepSevenTimetableFormFields.EndTime).setErrors({timeError: true});
        }
    }
}
