import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IssuanceFilterStateService} from '@app/issuance/services/issuance-filter-state.service';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {IssuanceFiltersMainTabComponent} from './issuance-filters-main-tab.component';

describe('IssuanceFiltersMainTabComponent', () => {
    let component: IssuanceFiltersMainTabComponent;
    let fixture: ComponentFixture<IssuanceFiltersMainTabComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [IssuanceFiltersMainTabComponent],
            imports: [IonicModule.forRoot(), TranslateModule.forRoot(), HttpClientTestingModule],
            providers: [
                IssuanceFilterStateService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(IssuanceFiltersMainTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
