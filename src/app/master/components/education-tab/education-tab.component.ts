import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HelperService} from '@app/core/services/helper.service';
import {EducationFormFields} from '@app/master/enums/education-form-fields';
import {EducationFormService} from '@app/master/forms/education-form.service';
import {Education} from '@app/master/models/education';
import {EducationApiService} from '@app/master/services/education-api.service';
import {forkJoin, throwError} from 'rxjs';

@Component({
    selector: 'app-education-tab',
    templateUrl: './education-tab.component.html',
    styleUrls: ['./education-tab.component.scss'],
})
export class EducationTabComponent implements OnInit {

    public formFields = EducationFormFields;
    private masterId: number;
    private educationsList: Education[] = [];

    constructor(
        public formService: EducationFormService,
        private api: EducationApiService,
        private route: ActivatedRoute
    ) {
    }

    public ngOnInit(): void {
        this.masterId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
        this.api.get(this.masterId).subscribe(
            results => {
                this.createEducationArray(results.results);
                this.formService.createForm(results.results);
            },
            (error: HttpErrorResponse) => {
                if (error.status === 404) {
                    return this.formService.createForm();
                }
                throwError(error);
            }
        );
    }

    public submitEducationForm(): void {
        const form = this.formService.form.getRawValue()[this.formFields.Education];
        forkJoin({
            created: this.api.create(this.getEducationsToCreate(form)),
            updated: this.api.update(this.getEducationsToUpdate(form)),
            deleted: this.api.delete(this.getEducationsToDelete(form))
        }).subscribe(
            ({created, updated, deleted}) => console.log('updated')
        );
    }

    private getEducationsToUpdate(educations: Education[]): Education[] {
        const toUpdate: Education[] = [];
        educations.forEach(education => {
            if (this.educationsList[education.id]) {
                education.professional = this.masterId;
                toUpdate.push(education);
            }
        });

        return toUpdate;
    }

    private getEducationsToCreate(educations: Education[]): Education[] {
        const toCreate: Education[] = [];
        educations.forEach(education => {
            if (!education.id) {
                education.professional = this.masterId;
                toCreate.push(education);
            }
        });

        return HelperService.cleanArray(toCreate);
    }

    private getEducationsToDelete(educations: Education[]): Education[] {
        const toDelete: Education[] = [];
        const combinedEducationArray: Education[] = this.combineArray(educations);
        for (const defaultEducation of this.educationsList) {
            if (defaultEducation && !combinedEducationArray[defaultEducation.id]) {
                toDelete.push(defaultEducation);
            }
        }

        return HelperService.cleanArray(toDelete);
    }

    private combineArray(educations: Education[]): Education[] {
        const ret: Education[] = [];
        educations.forEach(education => ret[education.id] = education);

        return ret;
    }

    private createEducationArray(educations: Education[]): void {
        educations.forEach(education => this.educationsList[education.id] = education);
    }
}
