import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {TranslateModule} from '@ngx-translate/core';
import {TimetableAddTimePopoverComponent} from './timetable-add-time-popover.component';

describe('TimetableAddTimePopoverComponent', () => {
    let component: TimetableAddTimePopoverComponent;
    let fixture: ComponentFixture<TimetableAddTimePopoverComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TimetableAddTimePopoverComponent],
            imports: [
                IonicModule.forRoot(),
                TranslateModule.forRoot()
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TimetableAddTimePopoverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
