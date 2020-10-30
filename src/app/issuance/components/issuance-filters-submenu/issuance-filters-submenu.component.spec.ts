import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {IssuanceFiltersSubmenuComponent} from './issuance-filters-submenu.component';

describe('IssuanceFiltersSubmenuComponent', () => {
    let component: IssuanceFiltersSubmenuComponent;
    let fixture: ComponentFixture<IssuanceFiltersSubmenuComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [IssuanceFiltersSubmenuComponent],
            imports: [IonicModule.forRoot(), TranslateModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(IssuanceFiltersSubmenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
