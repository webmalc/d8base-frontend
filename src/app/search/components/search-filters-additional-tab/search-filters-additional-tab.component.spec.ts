import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {SearchFiltersAdditionalTabComponent} from './search-filters-additional-tab.component';

describe('SearchFiltersAdditionalTabComponent', () => {
    let component: SearchFiltersAdditionalTabComponent;
    let fixture: ComponentFixture<SearchFiltersAdditionalTabComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SearchFiltersAdditionalTabComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(SearchFiltersAdditionalTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
