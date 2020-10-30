import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {SearchFiltersFactoryComponent} from './search-filters-factory.component';

xdescribe('SearchFiltersFactoryComponent', () => {
    let component: SearchFiltersFactoryComponent;
    let fixture: ComponentFixture<SearchFiltersFactoryComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SearchFiltersFactoryComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(SearchFiltersFactoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
