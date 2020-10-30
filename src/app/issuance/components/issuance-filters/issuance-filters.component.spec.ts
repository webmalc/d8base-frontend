import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IssuanceFilterStateService} from '@app/issuance/services/issuance-filter-state.service';
import {IonicModule} from '@ionic/angular';
import {IssuanceFiltersComponent} from './issuance-filters.component';

xdescribe('IssuanceFiltersComponent', () => {
    let component: IssuanceFiltersComponent;
    let fixture: ComponentFixture<IssuanceFiltersComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [IssuanceFiltersComponent],
            imports: [IonicModule.forRoot()],
            providers: [
                IssuanceFilterStateService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(IssuanceFiltersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
