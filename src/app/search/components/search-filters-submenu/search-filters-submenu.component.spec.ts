import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SearchFiltersSubmenuComponent } from './search-filters-submenu.component';

describe('SearchFiltersSubmenuComponent', () => {
    let component: SearchFiltersSubmenuComponent;
    let fixture: ComponentFixture<SearchFiltersSubmenuComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SearchFiltersSubmenuComponent],
            imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(SearchFiltersSubmenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
