import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {SearchFilterStateService} from '@app/search/services/search-filter-state.service';
import {IonicModule, Platform} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {SearchPage} from './search-page.component';
import {SearchService} from './services/search.service';

describe('SearchPage', () => {
    let component: SearchPage;
    let fixture: ComponentFixture<SearchPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SearchPage],
            imports: [IonicModule.forRoot(), HttpClientTestingModule, TranslateModule.forRoot()],
            providers: [
                SearchService,
                {provide: Platform, useValue: {width: () => 1000}},
                SearchFilterStateService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SearchPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
