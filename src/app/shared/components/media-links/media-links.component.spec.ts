import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {MediaLinksComponent} from './media-links.component';

describe('MediaLinksComponent', () => {
    let component: MediaLinksComponent;
    let fixture: ComponentFixture<MediaLinksComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MediaLinksComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(MediaLinksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
