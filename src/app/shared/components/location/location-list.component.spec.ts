import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {StorageManagerService} from '../../../core/proxies/storage-manager.service';
import {MasterLocationApiService} from '../../../master/services/master-location-api.service';
import {LocationListComponent} from './location-list.component';

describe('LocationListComponent', () => {
    let component: LocationListComponent;
    let fixture: ComponentFixture<LocationListComponent>;

    beforeEach(async(() => {
        const spy = jasmine.createSpyObj(
            'StorageManagerService', {get: Promise.resolve(null), set: null}
        );
        TestBed.configureTestingModule({
            declarations: [LocationListComponent],
            providers: [
                MasterLocationApiService,
                {provide: StorageManagerService, useValue: spy}
            ],
            imports: [IonicModule.forRoot(), ReactiveFormsModule, HttpClientTestingModule, TranslateModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(LocationListComponent);
        component = fixture.componentInstance;
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
