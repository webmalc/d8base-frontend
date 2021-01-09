import { Location } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { StorageManagerMock } from 'src/testing/mocks';
import { ServicePublishDataHolderService } from '../../services/service-publish-data-holder.service';
import { TimetableComponent } from './timetable.component';

describe('TimetableComponent', () => {
    let component: TimetableComponent;
    let fixture: ComponentFixture<TimetableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TimetableComponent],
            imports: [
                IonicModule.forRoot(),
                TranslateModule.forRoot(),
                RouterTestingModule,
            ],
            providers: [
                ServicePublishDataHolderService,
                { provide: StorageManagerService, useClass: StorageManagerMock},
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(TimetableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
