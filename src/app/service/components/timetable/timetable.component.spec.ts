import {Location} from '@angular/common';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {IonicModule} from '@ionic/angular';
import {StorageManagerMock} from 'src/testing/mocks';
import {ServicePublishStepSevenTimetableFormService} from '../../forms/service-publish-step-seven-timetable-form.service';
import {ServicePublishDataHolderService} from '../../services/service-publish-data-holder.service';
import {TimetableComponent} from './timetable.component';

describe('TimetableComponent', () => {
    let component: TimetableComponent;
    let fixture: ComponentFixture<TimetableComponent>;

    beforeEach(waitForAsync(() => {
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
