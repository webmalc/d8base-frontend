import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {SearchFilterStateService} from '@app/search/services/search-filter-state.service';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {SearchFiltersMainTabComponent} from './search-filters-main-tab.component';

describe('SearchFiltersMainTabComponent', () => {
    let component: SearchFiltersMainTabComponent;
    let fixture: ComponentFixture<SearchFiltersMainTabComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SearchFiltersMainTabComponent],
            imports: [IonicModule.forRoot(), TranslateModule.forRoot(), HttpClientTestingModule],
            providers: [
                SearchFilterStateService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SearchFiltersMainTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
