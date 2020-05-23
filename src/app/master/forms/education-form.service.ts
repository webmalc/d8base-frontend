import { Injectable } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {EducationFormFields} from '@app/master/enums/education-form-fields';
import {Education} from '@app/master/models/education';

@Injectable()
export class EducationFormService {

    public form: FormGroup;
    private defaultEducationListLength: number;

    constructor(private formBuilder: FormBuilder) { }

    public createForm(educationList?: Education[]): FormGroup {
        this.defaultEducationListLength = educationList?.length;
        this.form = this.formBuilder.group({
            [EducationFormFields.Education]: this.formBuilder.array([])
        });
        educationList?.forEach(education => this.addEducation(education));

        return this.form;
    }

    public addEducation(education?: Education): void {
        this.getEducationFormArray().push(
            this.formBuilder.group({
                [EducationFormFields.University]: education?.university ?? undefined,
                [EducationFormFields.Degree]: education?.deegree ?? undefined,
                [EducationFormFields.FieldOfStudy]: education?.field_of_study ?? undefined,
                [EducationFormFields.IsStillHere]: education?.is_still_here ?? undefined,
                [EducationFormFields.StartDate]: education?.start_date ?? undefined,
                [EducationFormFields.EndDate]: education?.end_date ?? undefined,
                [EducationFormFields.Description]: education?.description ?? undefined,
                [EducationFormFields.ID]: education?.id ?? undefined
            })
        );
    }

    public isSubmitDisabled(): boolean {
        return !(this.form.dirty && this.form.valid || this.getEducationFormArray.length !== this.defaultEducationListLength);
    }

    public removeEducation(index: number): void {
        this.getEducationFormArray().removeAt(index);
    }

    public getEducationFormArray(): FormArray {
        return this.form.get(EducationFormFields.Education) as FormArray;
    }
}
