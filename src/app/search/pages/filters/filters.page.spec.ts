import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SearchFilterStateService } from '@app/search/services/search-filter-state.service';
import { IonicModule } from '@ionic/angular';
import { FiltersPage } from './filters.page';

describe('FiltersPage', () => {
    let component: FiltersPage;
    let fixture: ComponentFixture<FiltersPage>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [FiltersPage],
                imports: [IonicModule.forRoot()],
                providers: [SearchFilterStateService]
            }).compileComponents();

            fixture = TestBed.createComponent(FiltersPage);
            component = fixture.componentInstance;
            fixture.detectChanges();
        })
    );

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
