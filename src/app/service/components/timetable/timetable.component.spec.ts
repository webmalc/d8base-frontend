import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {Location} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StorageManagerService} from '../../../core/proxies/storage-manager.service';
import {StorageManagerMock} from '../../../core/services/token-manager.service.spec';
import {ServicePublishStepSevenTimetableFormService} from '../../forms/service-publish-step-seven-timetable-form.service';
import {ServicePublishDataHolderService} from '../../services/service-publish-data-holder.service';
import {TimetableComponent} from './timetable.component';

describe('TimetableComponent', () => {
    let component: TimetableComponent;
    let fixture: ComponentFixture<TimetableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TimetableComponent],
            imports: [
                IonicModule.forRoot(),
                ReactiveFormsModule,
                FormsModule
            ],
            providers: [
                ServicePublishDataHolderService,
                {provide: StorageManagerService, useClass: StorageManagerMock},
                Location,
                ServicePublishStepSevenTimetableFormService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TimetableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
