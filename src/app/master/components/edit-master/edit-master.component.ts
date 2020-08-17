import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {Master} from '@app/core/models/master';
import {Subcategory} from '@app/core/models/subcategory';
import {HelperService} from '@app/core/services/helper.service';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {SubcategoriesApiService} from '@app/core/services/subcategories-api.service';
import {EditMasterFormFields} from '@app/master/enums/edit-master-form-fields';
import {EditMasterFormService} from '@app/master/forms/edit-master-form.service';
import {plainToClass} from 'class-transformer';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-edit-master',
    templateUrl: './edit-master.component.html',
    styleUrls: ['./edit-master.component.scss'],
})
export class EditMasterComponent implements OnInit {

    public formFields = EditMasterFormFields;
    public subcategoriesList$: BehaviorSubject<Subcategory[]> = new BehaviorSubject<Subcategory[]>([]);
    private masterId: number;

    constructor(
        public formService: EditMasterFormService,
        private masterManager: MasterManagerService,
        private route: ActivatedRoute,
        private subcategoriesApi: SubcategoriesApiService
    ) { }

    public ngOnInit(): void {
        this.masterId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
        this.initSubcategoriesList().subscribe(
            _ => {
                if (this.masterId) {
                    this.masterManager.getMaster(this.masterId).subscribe(
                        (master: Master) => this.formService.createForm(master)
                    );
                } else {
                    this.formService.createForm();
                }
            }
        );
    }

    public submitForm(): void {
        if (this.masterId) {
            const master: Master = plainToClass(Master, this.formService.form.getRawValue());
            master.id = this.masterId;
            this.masterManager.updateMaster(master).subscribe(
                (updatedMaster: Master) => console.log(updatedMaster)
            );
        } else {
            this.masterManager.createMaster(
                HelperService.clear(plainToClass(Master, this.formService.form.getRawValue()))
            ).subscribe(
                (master: Master) => console.log(master)
            );
        }
    }

    public initSubcategoriesList(): Observable<any> {
        return this.subcategoriesApi.get().pipe(
            tap((data: ApiListResponseInterface<Subcategory>) => this.subcategoriesList$.next(data.results))
        );
    }
}
