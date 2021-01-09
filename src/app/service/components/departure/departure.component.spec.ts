import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {StorageManagerMock} from 'src/testing/mocks';
import {ServicePublishStepSevenDepartureFormService} from '../../forms/service-publish-step-seven-departure-form.service';
import {ServicePublishDataHolderService} from '../../services/service-publish-data-holder.service';
import {DepartureComponent} from './departure.component';

describe('DepartureComponent', () => {
    let component: DepartureComponent;
    let fixture: ComponentFixture<DepartureComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DepartureComponent],
            imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule, TranslateModule.forRoot(), RouterTestingModule],
            providers: [
                ServicePublishStepSevenDepartureFormService,
                ServicePublishDataHolderService,
                {provide: StorageManagerService, useClass: StorageManagerMock},
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DepartureComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
