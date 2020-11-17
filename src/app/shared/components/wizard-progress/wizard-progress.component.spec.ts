import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import {WizardProgressComponent} from './wizard-progress.component';

describe('WizardProgressComponent', () => {
    let component: WizardProgressComponent;
    let fixture: ComponentFixture<WizardProgressComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [WizardProgressComponent],
            imports: [IonicModule.forRoot(), TranslateModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(WizardProgressComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
