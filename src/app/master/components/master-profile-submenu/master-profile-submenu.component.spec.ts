import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {MasterProfileSubmenuComponent} from './master-profile-submenu.component';

describe('MasterProfileSubmenuComponent', () => {
    let component: MasterProfileSubmenuComponent;
    let fixture: ComponentFixture<MasterProfileSubmenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MasterProfileSubmenuComponent],
            imports: [IonicModule.forRoot(), TranslateModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(MasterProfileSubmenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
