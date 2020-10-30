import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {IssuanceFiltersFactoryComponent} from './issuance-filters-factory.component';

xdescribe('IssuanceFiltersFactoryComponent', () => {
    let component: IssuanceFiltersFactoryComponent;
    let fixture: ComponentFixture<IssuanceFiltersFactoryComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [IssuanceFiltersFactoryComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(IssuanceFiltersFactoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
