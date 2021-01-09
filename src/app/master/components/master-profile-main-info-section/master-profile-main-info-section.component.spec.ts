import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MasterProfileMainInfoSectionComponent } from './master-profile-main-info-section.component';

describe('MasterProfileMainInfoSectionComponent', () => {
    let component: MasterProfileMainInfoSectionComponent;
    let fixture: ComponentFixture<MasterProfileMainInfoSectionComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [MasterProfileMainInfoSectionComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(MasterProfileMainInfoSectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
