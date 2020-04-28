import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {Master} from '@app/core/models/master';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {EditMasterFormFields} from '@app/master/enums/edit-master-form-fields';
import {EditMasterFormService} from '@app/master/forms/edit-master-form.service';
import {Subcategory} from '@app/master/models/subcategory';
import {SubcategoriesApiService} from '@app/master/services/subcategories-api.service';
import {plainToClass} from 'class-transformer';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-edit-master',
    templateUrl: './edit-master.page.html',
    styleUrls: ['./edit-master.page.scss'],
})
export class EditMasterPage implements OnInit {

    public formFields = EditMasterFormFields;
    public subcategoriesList$: BehaviorSubject<Subcategory[]> = new BehaviorSubject<Subcategory[]>([]);

    constructor(
        public formService: EditMasterFormService,
        private masterManager: MasterManagerService,
        private route: ActivatedRoute,
        private subcategoriesApi: SubcategoriesApiService
    ) { }

    public ngOnInit(): void { // TODO: cannot set default subcategory value
        this.initSubcategoriesList();
        if (this.route.snapshot.paramMap.get('id')) {
            this.masterManager.getMaster(parseInt(this.route.snapshot.paramMap.get('id'), 10)).subscribe(
                (master: Master) => this.formService.createForm(master)
            );
        } else {
            this.formService.createForm();
        }
    }

    public submitForm(): void {
        if (this.route.snapshot.paramMap.get('id')) {
            const master: Master = plainToClass(Master, this.formService.form.getRawValue());
            master.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
            this.masterManager.updateMaster(master).subscribe(
                (updatedMaster: Master) => console.log(updatedMaster)
            );
        } else {
            this.masterManager.saveMaster(plainToClass(Master, this.formService.form.getRawValue())).subscribe(
                (master: Master) => console.log(master)
            );
        }
    }

    public initSubcategoriesList(): void {
        this.subcategoriesApi.getList().subscribe(
            (data: ApiListResponseInterface<Subcategory>) => this.subcategoriesList$.next(data.results)
        );
    }
}
