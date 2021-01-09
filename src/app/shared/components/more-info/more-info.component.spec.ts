import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { MoreInfoComponent } from './more-info.component';

describe('MoreInfoComponent', () => {
    let component: MoreInfoComponent;
    let fixture: ComponentFixture<MoreInfoComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [MoreInfoComponent],
            imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(MoreInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
