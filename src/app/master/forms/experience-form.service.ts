import { Injectable } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ExperienceFormFields} from '@app/master/enums/experience-form-fields';
import {Experience} from '@app/master/models/experience';

@Injectable()
export class ExperienceFormService {

    public form: FormGroup;
    private defaultExperienceListLength: number;

    constructor(private formBuilder: FormBuilder) { }

    public createForm(experienceList?: Experience[]): FormGroup {
        this.defaultExperienceListLength = experienceList?.length;
        this.form = this.formBuilder.group({
            [ExperienceFormFields.Experience]: this.formBuilder.array([])
        });
        experienceList?.forEach(experience => this.addExperience(experience));

        return this.form;
    }

    public addExperience(experience?: Experience): void {
        this.getExperienceFormArray().push(
            this.formBuilder.group({
                [ExperienceFormFields.Title]: experience?.title ?? undefined,
                [ExperienceFormFields.Company]: experience?.company ?? undefined,
                [ExperienceFormFields.IsStillHere]: experience?.is_still_here ?? undefined,
                [ExperienceFormFields.StartDate]: experience?.start_date ?? undefined,
                [ExperienceFormFields.EndDate]: experience?.end_date ?? undefined,
                [ExperienceFormFields.Description]: experience?.description ?? undefined,
                [ExperienceFormFields.ID]: experience?.id ?? undefined
            })
        );
    }

    public isSubmitDisabled(): boolean {
        return !(this.form.dirty && this.form.valid || this.getExperienceFormArray.length !== this.defaultExperienceListLength);
    }

    public removeExperience(index: number): void {
        this.getExperienceFormArray().removeAt(index);
    }

    public getExperienceFormArray(): FormArray {
        return this.form.get(ExperienceFormFields.Experience) as FormArray;
    }
}
