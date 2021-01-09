import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ScheduleViewerComponent} from './schedule-viewer.component';

describe('ScheduleViewerComponent', () => {
    let component: ScheduleViewerComponent;
    let fixture: ComponentFixture<ScheduleViewerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ScheduleViewerComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(ScheduleViewerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
