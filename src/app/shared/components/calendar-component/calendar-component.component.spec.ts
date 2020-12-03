import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {of} from 'rxjs';
import {StorageManagerMock} from '../../../../testing/mocks';
import {CalendarComponentComponent} from './calendar-component.component';

describe('CalendarComponentComponent', () => {
    let component: CalendarComponentComponent;
    let fixture: ComponentFixture<CalendarComponentComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CalendarComponentComponent],
            imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
            providers: [{provide: StorageManagerService, useClass: StorageManagerMock}]
        }).compileComponents();

        fixture = TestBed.createComponent(CalendarComponentComponent);
        component = fixture.componentInstance;
        component.disabledPeriods = of([
            {start_datetime: '2020-12-03T09:00:00+01:00', end_datetime: '2020-12-03T18:00:00+01:00', professional: 1, service: null}]
        );
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
