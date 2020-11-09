import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {OnMapPopoverComponent} from './on-map-popover.component';

describe('OnMapPopoverComponent', () => {
    let component: OnMapPopoverComponent;
    let fixture: ComponentFixture<OnMapPopoverComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OnMapPopoverComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(OnMapPopoverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
