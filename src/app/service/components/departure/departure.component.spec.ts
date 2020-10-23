import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {StorageManagerMock} from 'src/testing/mocks';
import {StorageManagerService} from '../../../core/proxies/storage-manager.service';
import {ServicePublishStepSevenDepartureFormService} from '../../forms/service-publish-step-seven-departure-form.service';
import {ServicePublishDataHolderService} from '../../services/service-publish-data-holder.service';
import {DepartureComponent} from './departure.component';

describe('DepartureComponent', () => {
    let component: DepartureComponent;
    let fixture: ComponentFixture<DepartureComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DepartureComponent],
            imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule, TranslateModule.forRoot(), RouterTestingModule],
            providers: [
                ServicePublishStepSevenDepartureFormService,
                ServicePublishDataHolderService,
                {provide: StorageManagerService, useClass: StorageManagerMock}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DepartureComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
