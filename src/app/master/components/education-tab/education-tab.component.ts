import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ListComponentTrait} from '@app/core/traits/list-component-trait';
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
export class EducationTabComponent extends ListComponentTrait implements OnInit {

    public formFields = EducationFormFields;
    private masterId: number;
    private educationsList: Education[] = [];

    constructor(
        public formService: EducationFormService,
        private api: EducationApiService,
        private route: ActivatedRoute
    ) {
        super();
    }

    public ngOnInit(): void {
        this.masterId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
        this.api.get(this.masterId).subscribe(
            results => {
                this.createHashArray(results.results, this.educationsList);
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
        const dataToDelete = this.getDataToDelete<Education>(form, this.educationsList);
        forkJoin({
            created: this.api.create(this.getDataToCreate<Education>(form, this.masterId)),
            updated: this.api.update(this.getDataToUpdate<Education>(form, this.masterId, this.educationsList)),
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

    protected updateListAfterPost(elements: Education[]): void {
        elements.forEach(exp => this.educationsList.push(exp));
    }

    protected updateListAfterDelete(elements: Education[]): void {
        elements.forEach(element => delete this.educationsList[element.id]);
    }
}
