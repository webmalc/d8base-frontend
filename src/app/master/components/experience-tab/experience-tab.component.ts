import {HttpErrorResponse} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ListComponentTrait} from '@app/core/traits/list-component-trait';
import {ExperienceFormFields} from '@app/master/enums/experience-form-fields';
import {ExperienceFormService} from '@app/master/forms/experience-form.service';
import {Experience} from '@app/master/models/experience';
import {ExperienceApiService} from '@app/master/services/experience-api.service';
import {forkJoin, throwError} from 'rxjs';

@Component({
    selector: 'app-experience-tab',
    templateUrl: './experience-tab.component.html',
    styleUrls: ['./experience-tab.component.scss'],
})
export class ExperienceTabComponent extends ListComponentTrait implements OnInit {

    public formFields = ExperienceFormFields;
    private masterId: number;
    private experiencesList: Experience[] = [];

    constructor(
        public formService: ExperienceFormService,
        private api: ExperienceApiService,
        private route: ActivatedRoute
    ) {
        super();
    }

    public ngOnInit(): void {
        this.masterId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
        this.api.get(this.masterId).subscribe(
            results => {
                this.createHashArray(results.results, this.experiencesList);
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

    public submitExperienceForm(): void {
        const form = this.formService.form.getRawValue()[this.formFields.Experience];
        const dataToDelete = this.getDataToDelete<Experience>(form, this.experiencesList);
        forkJoin({
            created: this.api.create(this.getDataToCreate<Experience>(form, this.masterId)),
            updated: this.api.update(this.getDataToUpdate<Experience>(form, this.masterId, this.experiencesList)),
            deleted: this.api.delete(dataToDelete)
        }).subscribe(
            ({created, updated, deleted}) => {
                if (created) {
                    this.updateListAfterPost(created);
                }
                this.updateListAfterDelete(dataToDelete);
            }
        );
    }

    protected updateListAfterPost(elements: Experience[]): void {
        elements.forEach(exp => this.experiencesList.push(exp));
    }

    protected updateListAfterDelete(elements: Experience[]): void {
        elements.forEach(element => delete this.experiencesList[element.id]);
    }
}
